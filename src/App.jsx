import './App.css';
import './fonts/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { About } from './pages/About';
import { Contacts } from './pages/Contacts';
import { Favorites } from './pages/Favorites';
import { Cart } from './pages/Cart';
import { MainLayout } from './layout';
import { APP_ROUTES } from './helpers/RoutesHelper';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path={APP_ROUTES.HOME} element={<Home />} />
          <Route path={APP_ROUTES.CATALOG} element={<Catalog />} />
          <Route path={APP_ROUTES.ABOUT} element={<About />} />
          <Route path={APP_ROUTES.CONTACTS} element={<Contacts />} />
          <Route path={APP_ROUTES.FAVORITES} element={<Favorites />} />
          <Route path={APP_ROUTES.CART} element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
