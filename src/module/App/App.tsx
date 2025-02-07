import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Outlet } from 'react-router-dom';
import styles from './App.module.scss';
export const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.content}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
