import './App.css';
import './fonts/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { About } from './pages/About';
import { Contacts } from './pages/Contacts';
import { Favorite } from './pages/Favorite';
import { Cart } from './pages/Cart';
import { MainLayout } from './layout';
import { APP_ROUTES } from './helpers/RoutesHelper';
import { ProductDetails } from './pages/ProductDetails';
import { Buy } from './pages/Buy';
import { Auth } from './pages/Auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path={APP_ROUTES.HOME} element={<Home />} />
          <Route path={APP_ROUTES.CATALOG} element={<Catalog />} />
          <Route path={APP_ROUTES.ABOUT} element={<About />} />
          <Route path={APP_ROUTES.CONTACTS} element={<Contacts />} />
          <Route path={APP_ROUTES.FAVORITE} element={<Favorite />} />
          <Route path={APP_ROUTES.CART} element={<Cart />} />
          <Route path={APP_ROUTES.PRODUCT_DETAILS} element={<ProductDetails/>}/>
          <Route path={APP_ROUTES.BUY} element={<Buy/>}/>
          <Route path={APP_ROUTES.AUTH} element={<Auth/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
