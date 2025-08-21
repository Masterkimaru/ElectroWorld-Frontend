import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  overflow-x: hidden;

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Header = styled(motion.h2)`
  text-align: center;
  color: #2c3e50;
  font-size: 2.2rem;
  margin-bottom: 1.2rem;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: #e73e37;
    margin: 0.5rem auto;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Description = styled(motion.p)`
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 1.8rem;
  color: #555;

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const Button = styled(motion.button)`
  display: block;
  margin: 2rem auto;
  padding: 10px 20px;
  max-width: 280px;
  width: 90%;
  background-color: white;
  color: #e73e37;
  border: 2px solid #e73e37;
  border-radius: 30px;
  font-size: 1.05rem;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 9px 16px;
    max-width: 240px;
  }
`;

// New Process Gallery Components
const ProcessGallery = styled(motion.div)`
  margin: 2.5rem 0;
  position: relative;

  @media (max-width: 768px) {
    margin: 2rem 0;
  }

  @media (max-width: 480px) {
    margin: 1.5rem 0;
  }
`;

const ProcessTitle = styled.h3`
  text-align: center;
  color: #2c3e50;
  font-size: 1.4rem;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const ProcessContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 1rem;
  padding: 1rem 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #e73e37 #f1f1f1;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #e73e37;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #c73529;
  }
`;

const ProcessItem = styled(motion.div)`
  flex: 0 0 auto;
  width: 280px;
  scroll-snap-align: start;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 480px) {
    width: 250px;
  }
`;

const ProcessMedia = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;

  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img,
  &:hover video {
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    height: 180px;
  }
`;

const ProcessStep = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(231, 62, 55, 0.9);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const ProcessInfo = styled.div`
  padding: 1rem;
`;

const ProcessStepTitle = styled.h4`
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
`;

const ProcessDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
`;

const ScrollIndicator = styled.div`
  text-align: center;
  margin-top: 0.5rem;
  color: #999;
  font-size: 0.8rem;
`;

// Updated ServicesGrid: grid on desktop, carousel on mobile/tablet
const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin: 3rem 0;

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding: 10px 0;
    gap: 1rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (max-width: 480px) {
    gap: 1rem;
    padding: 0 10px;
  }
`;

// Updated ServiceCard: fixed width for carousel
const ServiceCard = styled(motion.div)`
  background: white;
  border-radius: 10px;
  padding: 1.2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  flex: 0 0 auto;
  width: 260px;
  scroll-snap-align: start;

  @media (max-width: 768px) {
    min-width: 260px;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 8px;
  }

  @media (max-width: 480px) {
    padding: 0.9rem;
    border-radius: 6px;
    width: 240px;
    min-width: 240px;
  }
`;

const ServiceTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.8rem;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ServiceDescription = styled.p`
  color: #666;
  line-height: 1.5;
  font-size: 0.95rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.45;
  }
`;

const LocationInfo = styled(motion.div)`
  text-align: center;
  margin-top: 2.5rem;
  padding: 1.3rem;
  background-color: #f8f9fa;
  border-radius: 10px;

  p {
    margin: 0.5rem 0;
    color: #555;
    font-size: 0.95rem;

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  strong {
    color: #2c3e50;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    margin-top: 2rem;
  }
`;

export default function Repair() {
  const navigate = useNavigate();
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const processGalleryRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // Repair process data - Replace these paths with your actual image/video paths
  const repairProcess = [
    {
      id: 1,
      type: 'image',
      src: 'backglass_break.jfif', // Replace with your actual image paths
      title: 'Initial Diagnosis: Back glass replacement',
      description: 'Our technician examines the device to identify the problem. It is an iPhone 8 Plus'
    },
    
    {
      id: 2,
      type: 'video',
      src: 'video1.mp4', // Replace with your actual video paths
      title: 'Component Removal',
      description: 'Removing damaged parts with precision'
    },
    {
      id: 3,
      type: 'image',
      src: 'cleaningImage.jpg',
      title: 'Thorough Cleaning',
      description: 'Cleaning internal components and connections'
    },
    {
      id: 4,
      type: 'video',
      src: 'video2.mp4',
      title: 'Quality Parts Installation',
      description: 'Installing genuine replacement components'
    },
    {
      id: 5,
      type: 'image',
      src: 're-assemblyImage.jpg',
      title: 'Precise Reassembly',
      description: 'Carefully putting everything back together'
    },
    {
      id: 7,
      type: 'image',
      src: 'Final-Image.jpg',
      title: 'Final Quality Check',
      description: 'Testing all features to ensure proper operation before returning to customer'
    },

  ];

  // Ensure we're on the client (for SSR safety)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-scroll logic for mobile/tablet carousel (services)
  useEffect(() => {
    if (!isClient || !servicesGridRef.current) return;

    const grid = servicesGridRef.current;
    const cardWidth = 270; // Approx width + gap
    let scrollInterval: number;

    const startAutoScroll = () => {
      scrollInterval = window.setInterval(() => {
        if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 10) {
          grid.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          grid.scrollTo({
            left: grid.scrollLeft + cardWidth,
            behavior: 'smooth',
          });
        }
      }, 3000);
    };

    const stopAutoScroll = () => {
      clearInterval(scrollInterval);
    };

    startAutoScroll();

    // Optional: Pause auto-scroll on hover (desktop)
    grid.addEventListener('pointerenter', stopAutoScroll);
    grid.addEventListener('pointerleave', startAutoScroll);

    return () => {
      clearInterval(scrollInterval);
      grid.removeEventListener('pointerenter', stopAutoScroll);
      grid.removeEventListener('pointerleave', startAutoScroll);
    };
  }, [isClient]);

  return (
    <Container>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Professional Repair Services
      </Header>

      <Description
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Fast, reliable, and affordable solutions for all your devices
      </Description>

      {/* New Process Gallery Section */}
      <ProcessGallery
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <ProcessTitle>Our Repair Process</ProcessTitle>
        <ProcessContainer ref={processGalleryRef}>
          {repairProcess.map((item, index) => (
            <ProcessItem
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
            >
              <ProcessMedia>
                <ProcessStep>Step {item.id}</ProcessStep>
                {item.type === 'image' ? (
                  <img 
                    src={item.src} 
                    alt={item.title}
                    loading="lazy"
                  />
                ) : (
                  <video 
                    src={item.src}
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                )}
              </ProcessMedia>
              <ProcessInfo>
                <ProcessStepTitle>{item.title}</ProcessStepTitle>
                <ProcessDescription>{item.description}</ProcessDescription>
              </ProcessInfo>
            </ProcessItem>
          ))}
        </ProcessContainer>
        <ScrollIndicator>← Scroll to see the complete repair process →</ScrollIndicator>
      </ProcessGallery>

      {/* Services Grid - Carousel on mobile/tablet */}
      <ServicesGrid
        ref={servicesGridRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <ServiceCard
          whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          transition={{ duration: 0.3 }}
        >
          <ServiceTitle>Smartphone Repairs</ServiceTitle>
          <ServiceDescription>
            Screen replacements, battery swaps, charging port fixes, water damage recovery,
            and software issues for all major smartphone brands.
          </ServiceDescription>
        </ServiceCard>

        <ServiceCard
          whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          transition={{ duration: 0.3 }}
        >
          <ServiceTitle>Laptop & Computer Repairs</ServiceTitle>
          <ServiceDescription>
            Hardware diagnostics, screen replacements, keyboard fixes, motherboard repairs,
            virus removal, and performance upgrades.
          </ServiceDescription>
        </ServiceCard>

        <ServiceCard
          whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          transition={{ duration: 0.3 }}
        >
          <ServiceTitle>Tablet Repairs</ServiceTitle>
          <ServiceDescription>
            Cracked screen repairs, digitizer replacements, battery issues, charging problems,
            and software troubleshooting for all tablet models.
          </ServiceDescription>
        </ServiceCard>

        <ServiceCard
          whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          transition={{ duration: 0.3 }}
        >
          <ServiceTitle>Data Recovery</ServiceTitle>
          <ServiceDescription>
            Retrieve lost files, photos, and documents from damaged devices, corrupted drives,
            and water-damaged storage media.
          </ServiceDescription>
        </ServiceCard>

        <ServiceCard
          whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          transition={{ duration: 0.3 }}
        >
          <ServiceTitle>Preventive Maintenance</ServiceTitle>
          <ServiceDescription>
            Regular check-ups, cleaning, thermal paste replacement, and optimization
            to extend your device's lifespan.
          </ServiceDescription>
        </ServiceCard>

        <ServiceCard
          whileHover={{ y: -10, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          transition={{ duration: 0.3 }}
        >
          <ServiceTitle>Accessory Installation</ServiceTitle>
          <ServiceDescription>
            Professional installation of screen protectors, cases, memory upgrades,
            and other accessories with precision.
          </ServiceDescription>
        </ServiceCard>
      </ServicesGrid>

      <Button
        onClick={() => navigate('/repair-type')}
        whileHover={{
          backgroundColor: '#e73e37',
          color: 'white',
          scale: 1.05,
          boxShadow: '0 5px 15px rgba(231, 62, 55, 0.4)',
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Start Repair Process
      </Button>

      <LocationInfo
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <p>
          <strong>Visit our shop for personalized service:</strong>
        </p>
        <p>ElectroWorld - Imenti House, Shop A10</p>
        <p>Nairobi, Kenya</p>
        <p>Open Monday-Saturday: 8:30 AM - 7:00 PM</p>
      </LocationInfo>
    </Container>
  );
}
