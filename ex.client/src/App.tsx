import { AnimatePresence, motion, useCycle } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Transitions } from './context';
import './styles/App.css';

import { Account, Home, Loading, Login, Product } from './pages';

import { Nav, NotificationsMenu } from './components';
import { useAuth } from './context/AuthContext';
import { ProductsProvider } from './context/ProductsContext';
import { NewProduct } from './pages';

export default function App() {
  const location = useLocation();
  const { loggedIn } = useAuth();
  const [menu, setMenu] = useCycle(false, true);

  if (loggedIn === 'pending') return <Loading />;
  if (loggedIn === 'error') return <Login />;
  return (
    <div className="font-nunito">
      <ProductsProvider>
        <AnimatePresence>{menu && <NotificationsMenu />}</AnimatePresence>
        <motion.div className="main">
          <Nav toggleMenu={setMenu} menu={menu} />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <Transitions>
                    <Home />
                  </Transitions>
                }
              />
              <Route
                path="/account"
                element={
                  <Transitions>
                    <Account />
                  </Transitions>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <Transitions>
                    <Product />
                  </Transitions>
                }
              />
              <Route
                path="/products/:name"
                element={
                  <Transitions>
                    <NewProduct />
                  </Transitions>
                }
              />
            </Routes>
          </AnimatePresence>
        </motion.div>
      </ProductsProvider>
      <Toaster />
    </div>
  );
}
