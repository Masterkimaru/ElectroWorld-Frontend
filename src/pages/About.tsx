//import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <header className="about-header">
        <h2 className="about-title animate-title">About Electro World</h2>
        <p className="about-subtitle animate-subtitle">
          Your trusted destination for electronics repair & quality gadgets.
        </p>
        <div className="header-decoration"></div>
      </header>

      <section className="about-content">
        <div className="about-section fade-in-delayed">
          <div className="section-icon">👥</div>
          <h3>Who We Are</h3>
          <p>
            At <strong>Electro World</strong>, we specialize in repairing a wide
            range of devices including <strong>phones</strong>,{" "}
            <strong>tablets</strong>, <strong>laptops</strong>,{" "}
            <strong>cameras</strong>, Bluetooth speakers, smart watches, and
            even <strong>PlayStation consoles</strong> (PS4 & PS5).
          </p>
          <p>
            Our lead technician, <strong>Engineer Maxwell Babu</strong>, brings
            years of experience and passion to ensure your devices are restored
            to their best performance.
          </p>
        </div>

        <div className="about-section slide-up-delayed">
          <div className="section-icon">🛒</div>
          <h3>What We Sell</h3>
          <ul className="about-list">
            <li className="list-item-animate">Phones & Laptops</li>
            <li className="list-item-animate">Phone Covers & Screen Protectors</li>
            <li className="list-item-animate">Chargers & Charging Cables</li>
            <li className="list-item-animate">Smart Watches & Powerbanks</li>
            <li className="list-item-animate">Car Adapters</li>
            <li className="list-item-animate">Laptop & PC Parts (RAM, HDD, SSD)</li>
            <li className="list-item-animate">Earphones, Ear Pods</li>
            <li className="list-item-animate">PS4 & PS5 Controllers</li>
          </ul>
        </div>

        <div className="about-section fade-in-delayed-2">
          <div className="section-icon">⭐</div>
          <h3>Why Choose Us?</h3>
          <p>
            We pride ourselves on being <strong>one of the best repair shops in
            town</strong>. Our customers leave satisfied, knowing their devices
            have been handled with care, expertise, and precision.
          </p>
          <p>
            Whether it's a technical issue or you need quality accessories,
            Electro World is here for you!
          </p>
          <div className="highlight-badge">
            <span className="badge-text">Trusted by 1000+ Customers</span>
          </div>
        </div>
      </section>
    </div>
  );
}
