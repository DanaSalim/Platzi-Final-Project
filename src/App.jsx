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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="about" element={<About />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
