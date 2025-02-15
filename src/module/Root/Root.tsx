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
import { AccountPage } from '../AccountPage';
import { WineDetailsPage } from '../WineDetailsPage/WineDetailsPage';
import { ObjectDetailsPage } from '../ObjectDetailsPage';
import { CertificateDetailsPage } from '../CertificateDetailsPage';

export const Root = () => (
  <Router basename="/wine-store-front/">
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<CatalogPage category="all" />} />
        <Route path={':itemId'} element={<ObjectDetailsPage />} />
        <Route path="home" element={<Navigate to={'/'} replace />} />
      
          <Route path="wine">
            <Route index element={<CatalogPage category="wine" />} />
            <Route path={':itemId'} element={<WineDetailsPage />} />
          </Route>
          <Route path="object">
            <Route index element={<CatalogPage category="object" />} />
            <Route path={':itemId'} element={<ObjectDetailsPage />} />
          </Route>
       
          <Route path="certificate">
            <Route index element={<CatalogPage category="certificate" />} />
            <Route path={':itemId'} element={<CertificateDetailsPage />} />
          </Route>
      
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="cart" element={<CartPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);
