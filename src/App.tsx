import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Repair from './pages/Repair';
import BuyMerchandise from './pages/BuyMerchandise';
import TradeIn from './pages/TradeIn';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import RepairType from './pages/RepairType';
import DeviceType from './pages/DeviceType';
import BrandModel from './pages/BrandModel';
import CostEstimator from './pages/CostEstimator';

type ValidPath =
  | '/'
  | '/repair-type'
  | '/device-type'
  | '/brand-model'
  | '/cost-estimator'
  | '/shop'
  | '/trade-in'
  | '/about'
  | '/contact';

const pageVariants: Record<ValidPath, any> = {
  '/': {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
    transition: { duration: 0.5, ease: 'easeInOut' }
  },
  '/repair-type': {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
    transition: { duration: 0.5 }
  },
  '/device-type': {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
    transition: { duration: 0.5 }
  },
  '/brand-model': {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
    transition: { duration: 0.5 }
  },
  '/cost-estimator': {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.4, ease: 'easeOut' }
  },

  '/shop': {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
    transition: { duration: 0.5, ease: 'easeInOut' }
  },
  '/trade-in': {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: [0.8, 1.1, 1], opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: {
      duration: 0.6,
      times: [0, 0.8, 1],
      ease: 'easeOut',
      type: 'tween'
    }
  },
  '/about': {
    initial: { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
    animate: { clipPath: 'inset(0% 0 0 0)', opacity: 1 },
    exit: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
    transition: { duration: 0.7, ease: 'easeInOut' }
  },
  '/contact': {
    initial: { opacity: 0, backdropFilter: 'blur(8px)' },
    animate: { opacity: 1, backdropFilter: 'blur(0px)' },
    exit: { opacity: 0, backdropFilter: 'blur(8px)' },
    transition: { duration: 0.6 }
  }
};

function App() {
  const location = useLocation();

  const routes: {
    path: ValidPath;
    element:  React.ReactElement;
    motionStyle?: React.CSSProperties;
  }[] = [
    { path: '/', element: <Repair /> },
    { path: '/repair-type', element: <RepairType /> },
    { path: '/device-type', element: <DeviceType /> },
    { path: '/brand-model', element: <BrandModel /> },
    { path: '/cost-estimator', element: <CostEstimator /> },
    
    {
      path: '/shop',
      element: <BuyMerchandise />,
      motionStyle: {
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }
    },
    { path: '/trade-in', element: <TradeIn /> },
    { path: '/about', element: <About /> },
    {
      path: '/contact',
      element: <ContactUs />,
      motionStyle: {
        backdropFilter: 'blur(0px)',
        WebkitBackdropFilter: 'blur(0px)'
      }
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main
        style={{
          padding: '2rem',
          flex: 1,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {routes.map(({ path, element, motionStyle }) => (
              <Route
                key={path}
                path={path}
                element={
                  <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants[path]}
                    style={motionStyle}
                  >
                    {element}
                  </motion.div>
                }
              />
            ))}
          </Routes>
        </AnimatePresence>
      </main>
      <Analytics /> 
    </div>
  );
}

export default App;
