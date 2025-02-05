import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { App } from '../App';
import { AboutUsPage } from '../AboutUsPage';
import { CatalogPage } from '../CatalogPage';
import { CartPage } from '../CartPage';
import { NotFoundPage } from '../NotFoundPage';
import { WineCatalogPage } from '../WineCatalogPage';
import { ProductCatalogPage } from '../ProductCatalogPage';
import { CertificateCatalogPage } from '../CertificateCatalogPage';

export const Root = () => (
  <Router  basename="/wine-store-front">
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<CatalogPage />} />
        <Route path="home" element={<Navigate to={'/'} replace />} />
        <Route path="catalog" element={<CatalogPage />}>
          <Route path="wine" element={<WineCatalogPage />} />
          <Route path="product" element={<ProductCatalogPage />} />
          <Route path="certificate" element={<CertificateCatalogPage />} />
        </Route>
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="cart" element={<CartPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);
