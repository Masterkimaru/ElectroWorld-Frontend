import { useState, useEffect, useMemo, useCallback } from 'react';
import './BuyMerchandise.css';

interface Product {
  _id: string;
  name: string;
  category: 'Phones' | 'Covers & Protectors' | 'Laptops' | 'Accessories';
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

// Utility functions for localStorage
const saveToLocalStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

const getFromLocalStorage = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn('Failed to read from localStorage:', error);
    return defaultValue;
  }
};

export default function BuyMerchandise() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => getFromLocalStorage('cart', []));
  const [deliveryLocation, setDeliveryLocation] = useState<'Nairobi' | 'Outside Nairobi'>(() =>
    getFromLocalStorage('deliveryLocation', 'Nairobi')
  );
  const [showCart, setShowCart] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [formData, setFormData] = useState(() =>
    getFromLocalStorage('formData', {
      name: '',
      phone: '',
      email: '',
      location: '',
    })
  );

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage('cart', cart);
  }, [cart]);

  // Save deliveryLocation to localStorage
  useEffect(() => {
    saveToLocalStorage('deliveryLocation', deliveryLocation);
  }, [deliveryLocation]);

  // Save formData to localStorage
  useEffect(() => {
    saveToLocalStorage('formData', formData);
  }, [formData]);

  // Fetch products and clean up stale cart items
  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);

        // Clean up cart: remove items not in current product list
        setCart((prevCart) => {
          const validCart = prevCart.filter((item) =>
            data.some((product) => product._id === item._id)
          );
          saveToLocalStorage('cart', validCart); // Sync to localStorage
          return validCart;
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  // Debounced search functionality
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return products;

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [products, debouncedSearchQuery]);

  // Check if product is in cart
  const isInCart = (productId: string) => {
    return cart.some((item) => item._id === productId);
  };

  const addToCart = (product: Product) => {
    setSelectedProduct(product._id);

    setCart((prev) =>
      prev.find((item) => item._id === product._id)
        ? prev.map((item) =>
            item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prev, { ...product, quantity: 1 }]
    );

    // Reset selection after animation
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };

  // Smooth scroll to category section
  const scrollToCategory = useCallback((category: string) => {
    const element = document.getElementById(`category-${category}`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
      setActiveCategory(category);
      setSearchQuery('');
    }
  }, []);

  // Intersection Observer to update active category
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const categoryId = entry.target.id.replace('category-', '');
            setActiveCategory(categoryId);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px',
      }
    );

    const categoryElements = document.querySelectorAll('[id^="category-"]');
    categoryElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [products]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryLocation === 'Nairobi' ? 200 : 400;
  const totalToPay = cartTotal + deliveryFee;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          cart: cart.map((item) => ({ id: item._id, quantity: item.quantity })),
          deliveryLocation,
          deliveryFee,
          total: totalToPay,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Clear saved data after successful order
        localStorage.removeItem('cart');
        localStorage.removeItem('formData');
        localStorage.removeItem('deliveryLocation');

        // Reset state
        setCart([]);
        setFormData({
          name: '',
          phone: '',
          email: '',
          location: '',
        });
        setDeliveryLocation('Nairobi');

        window.open(result.whatsappUrl, '_blank');
        window.open(result.invoiceUrl, '_blank');
        alert('Order sent! Check WhatsApp and email.');
        setCheckout(false);
      } else {
        alert('Order failed. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const groupedProducts = filteredProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const categories: Array<'Phones' | 'Covers & Protectors' | 'Laptops' | 'Accessories'> = [
    'Phones',
    'Covers & Protectors',
    'Laptops',
    'Accessories',
  ];

  if (loading && products.length === 0) {
    return (
      <div className="merchandise-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="merchandise-container">
      <header className="merchandise-header">
        <h1 className="main-title">New Stock on Sale</h1>
        <div className="header-controls">
          <div className="delivery-selector">
            <label htmlFor="delivery-location">
              📍 Delivery Location:
              <select
                id="delivery-location"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value as any)}
              >
                <option value="Nairobi">Nairobi (Ksh 200)</option>
                <option value="Outside Nairobi">Outside Nairobi (Ksh 400)</option>
              </select>
            </label>
          </div>

          <button
            className={`cart-toggle ${showCart ? 'active' : ''}`}
            onClick={() => setShowCart(!showCart)}
          >
            <span className="cart-icon">🛒</span>
            <span className="cart-text">{showCart ? 'Hide Cart' : 'View Cart'}</span>
            <span className="cart-count">{cart.length}</span>
          </button>
        </div>
      </header>

      {showCart && (
        <div className={`cart-section ${showCart ? 'show' : ''}`}>
          <div className="cart-content">
            <h3>🛒 Shopping Cart</h3>
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div key={item._id} className="cart-item">
                      <img src={item.image} alt={item.name} className="cart-item-image" />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p className="cart-item-price">Ksh {item.price}</p>
                      </div>
                      <div className="cart-item-controls">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                          min="1"
                          className="quantity-input"
                        />
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="remove-btn"
                          aria-label="Remove item"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>Ksh {cartTotal}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery:</span>
                    <span>Ksh {deliveryFee}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>Ksh {totalToPay}</span>
                  </div>
                  <button
                    className="checkout-btn"
                    onClick={() => setCheckout(true)}
                    disabled={cart.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {!checkout ? (
        <>
          {/* Search and Navigation Section */}
          <div className="search-navigation-section">
            {/* Search Bar */}
            <div className="search-container">
              <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="clear-search-btn"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
              {debouncedSearchQuery && (
                <p className="search-results-info">
                  Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}{' '}
                  for "{debouncedSearchQuery}"
                </p>
              )}
            </div>

            {/* Category Navigation */}
            {!debouncedSearchQuery && (
              <nav className="category-navigation">
                <h3 className="nav-title">Shop by Category</h3>
                <div className="category-nav-buttons">
                  {categories.map((category) => {
                    const categoryProducts = products.filter((p) => p.category === category);
                    if (categoryProducts.length === 0) return null;

                    return (
                      <button
                        key={category}
                        onClick={() => scrollToCategory(category)}
                        className={`category-nav-btn ${activeCategory === category ? 'active' : ''}`}
                      >
                        <span className="category-name">{category}</span>
                        <span className="category-count">({categoryProducts.length})</span>
                      </button>
                    );
                  })}
                </div>
              </nav>
            )}
          </div>

          <main className="products-section">
            {debouncedSearchQuery ? (
              // Search Results
              <section className="search-results-section">
                <h2 className="search-results-title">Search Results</h2>
                {filteredProducts.length === 0 ? (
                  <div className="no-results">
                    <p>No products found for "{debouncedSearchQuery}"</p>
                    <button onClick={() => setSearchQuery('')} className="clear-search-btn-large">
                      Clear Search
                    </button>
                  </div>
                ) : (
                  <div className="products-grid">
                    {filteredProducts.map((product) => (
                      <div
                        key={product._id}
                        className={`product-card ${selectedProduct === product._id ? 'selected' : ''} ${
                          isInCart(product._id) ? 'in-cart' : ''
                        }`}
                      >
                        <div className="product-image-container">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="product-image"
                            loading="lazy"
                          />
                          <div className="product-overlay">
                            <button
                              className="quick-add-btn"
                              onClick={() => addToCart(product)}
                            >
                              {isInCart(product._id) ? 'Added' : 'Quick Add'}
                            </button>
                          </div>
                        </div>
                        <div className="product-info">
                          <h3 className="product-name">{product.name}</h3>
                          <p className="product-category">{product.category}</p>
                          <div className="product-footer">
                            <span className="product-price">Ksh {product.price}</span>
                            <button
                              className={`add-to-cart-btn ${isInCart(product._id) ? 'added' : ''}`}
                              onClick={() => addToCart(product)}
                            >
                              {isInCart(product._id) ? 'Added to Cart' : 'Add to Cart'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            ) : (
              // Category Sections
              categories.map((category) => {
                const categoryProducts = groupedProducts[category] || [];
                if (categoryProducts.length === 0) return null;

                return (
                  <section key={category} id={`category-${category}`} className="category-section">
                    <h2 className="category-title">{category}</h2>
                    <div className="products-grid">
                      {categoryProducts.map((product) => (
                        <div
                          key={product._id}
                          className={`product-card ${selectedProduct === product._id ? 'selected' : ''} ${
                            isInCart(product._id) ? 'in-cart' : ''
                          }`}
                        >
                          <div className="product-image-container">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="product-image"
                              loading="lazy"
                            />
                            <div className="product-overlay">
                              <button
                                className="quick-add-btn"
                                onClick={() => addToCart(product)}
                              >
                                {isInCart(product._id) ? 'Added' : 'Quick Add'}
                              </button>
                            </div>
                          </div>
                          <div className="product-info">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-category">{product.category}</p>
                            <div className="product-footer">
                              <span className="product-price">Ksh {product.price}</span>
                              <button
                                className={`add-to-cart-btn ${isInCart(product._id) ? 'added' : ''}`}
                                onClick={() => addToCart(product)}
                              >
                                {isInCart(product._id) ? 'Added to Cart' : 'Add to Cart'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                );
              })
            )}
          </main>
        </>
      ) : (
        <div className="checkout-section">
          <div className="checkout-container">
            <form onSubmit={handleCheckout} className="checkout-form">
              <h2 className="checkout-title">Complete Your Order</h2>

              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="e.g., 0712345678"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Delivery Address *</label>
                <textarea
                  id="location"
                  placeholder="Enter your complete delivery address"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="order-summary">
                <h3>Order Summary</h3>
                {cart.map((item) => (
                  <div key={item._id} className="summary-item">
                    <span>{item.name} x {item.quantity}</span>
                    <span>Ksh {item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="summary-total">
                  <span>Total to Pay:</span>
                  <span>Ksh {totalToPay}</span>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="back-btn" onClick={() => setCheckout(false)}>
                  ← Back to Cart
                </button>
                <button type="submit" className="confirm-order-btn" disabled={loading}>
                  {loading ? 'Processing...' : 'Confirm Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}