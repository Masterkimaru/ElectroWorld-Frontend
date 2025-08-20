import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
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

const AnimationContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  margin: 2.5rem 0;
  height: 220px;
  position: relative;

  @media (max-width: 768px) {
    height: 200px;
    margin: 2rem 0;
  }

  @media (max-width: 480px) {
    height: 160px;
    transform: scale(0.85);
    transform-origin: center;
  }
`;

const EngineerContainer = styled(motion.div)`
  position: relative;
  width: 100px;
  height: 150px;

  @media (max-width: 480px) {
    width: 80px;
    height: 130px;
  }
`;

const Head = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: #ffdbac;
  border-radius: 50%;
  top: 0;
  left: 30px;

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    left: 25px;
  }
`;

const Body = styled(motion.div)`
  position: absolute;
  width: 50px;
  height: 70px;
  background-color: #3498db;
  border-radius: 8px;
  top: 40px;
  left: 25px;

  @media (max-width: 480px) {
    width: 45px;
    height: 60px;
    top: 35px;
    left: 22px;
  }
`;

const Arm = styled(motion.div)`
  position: absolute;
  width: 12px;
  height: 50px;
  background-color: #ffdbac;
  top: 50px;
  border-radius: 8px;

  @media (max-width: 480px) {
    height: 40px;
    width: 10px;
  }
`;

const Tool = styled(motion.div)`
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: #95a5a6;
  border-radius: 50%;
  top: 80px;
  left: 5px;

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    top: 65px;
  }
`;

const Device = styled(motion.div)`
  position: absolute;
  width: 70px;
  height: 90px;
  background-color: #ecf0f1;
  border-radius: 8px;
  top: 60px;
  left: 130px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    width: 60px;
    height: 80px;
    top: 55px;
    left: 110px;
  }
`;

const Screen = styled.div`
  position: absolute;
  width: 60px;
  height: 70px;
  background-color: #2c3e50;
  border-radius: 4px;
  top: 8px;
  left: 5px;

  @media (max-width: 480px) {
    width: 50px;
    height: 60px;
    top: 6px;
  }
`;

const Sparkle = styled(motion.div)`
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: white;
  border-radius: 50%;
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

const RepairStatus = styled(motion.div)`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.9rem;
  color: #e73e37;
  font-weight: bold;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    bottom: -35px;
  }
`;

const StatusProgress = styled(motion.div)`
  height: 4px;
  background: #e73e37;
  border-radius: 2px;
  margin-top: 5px;
`;

export default function Repair() {
  const navigate = useNavigate();
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const [repairProgress, setRepairProgress] = useState(0);
  const [statusText, setStatusText] = useState('Diagnosing issue...');
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client (for SSR safety)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-scroll logic for mobile/tablet carousel
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

  // Repair progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRepairProgress((prev) => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setRepairProgress(0);
            setStatusText('Diagnosing issue...');
          }, 2000);
          return 100;
        }

        if (newProgress > 20 && newProgress < 40) {
          setStatusText('Replacing components...');
        } else if (newProgress > 40 && newProgress < 70) {
          setStatusText('Testing functionality...');
        } else if (newProgress > 70) {
          setStatusText('Final quality check...');
        }

        return newProgress;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

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

      <AnimationContainer>
        <EngineerContainer
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Head />
          <Body />
          <Arm
            style={{ left: 20 }}
            animate={{
              rotate: [0, 15, 0, -15, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Tool
              animate={{
                rotate: [0, 45, 0],
                x: [0, 5, 0],
                y: [0, 5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </Arm>
          <Arm style={{ right: 20 }} />
          <Body
            animate={{
              x: [0, -2, 0, 2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </EngineerContainer>

        <Device
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
        >
          <Screen />
          <AnimatePresence>
            {[1, 2, 3].map((i) => (
              <Sparkle
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5 * i,
                  ease: 'easeInOut',
                }}
                style={{
                  top: `${20 + i * 15}px`,
                  left: `${20 + i * 15}px`,
                }}
              />
            ))}
          </AnimatePresence>
        </Device>

        <RepairStatus>
          {statusText}
          <StatusProgress
            initial={{ width: 0 }}
            animate={{ width: `${repairProgress}%` }}
            transition={{ duration: 0.8 }}
          />
        </RepairStatus>
      </AnimationContainer>

      {/* Updated: Carousel on mobile/tablet */}
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