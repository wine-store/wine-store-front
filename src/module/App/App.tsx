import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div className="App">
      <Header />
      <main className="App__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
