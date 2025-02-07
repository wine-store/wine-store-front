import { CategoryNavigation } from "../CategoryNavigation";
import { Navigation } from "../Navigation";
import styles from "./Footer.module.scss";
export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Navigation classNameNav="footerNavigation" />
      <CategoryNavigation classNameNav='footerNavigation' />
      </footer>
  );
}
