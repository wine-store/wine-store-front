import { CategoryNavigation } from '../CategoryNavigation';
import { Navigation } from '../Navigation';
import styles from './Footer.module.scss';

const SUPPORT_TAB: string[] = [
  'Gear in touch',
  'FAQ',
  'Terms of use',
  'Privacy policy',
  'Terms & Conditions',
];

interface NavigationSectionProps {
  title: string;
  content: React.ReactNode;
}

const NavigationSection: React.FC<NavigationSectionProps> = ({
  title,
  content,
}) => (
  <div className={styles.navigation}>
    <div className={styles.title}>{title}</div>
    <div className={styles.navigation__content}>{content}</div>
  </div>
);

export const Footer = () => {
  const handleClick = () => {
    confirm('This feature is under development!');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__link}>
        <NavigationSection
          title="Navigation"
          content={<Navigation classNameNav="footerNavigation" />}
        />
        <NavigationSection
          title="Catalog"
          content={<CategoryNavigation classNameNav="footerNavigation" />}
        />
        <NavigationSection
          title="Follow"
          content={
            <>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </>
          }
        />
        <NavigationSection
          title="Support"
          content={
            <>
              {SUPPORT_TAB.map((item, index) => (
                <span
                  onClick={handleClick}
                  key={index}
                >
                  {item}
                </span>
              ))}
            </>
          }
        />
      </div>
      <span className={styles.footer__divider}></span>
      <div className={styles.footer__copyright}>
        <p className={styles.footer__text}>
          Cellar & Vine - Curated wines, unforgettable moments. Savor every sip,
          celebrate every occasion
        </p>
        <p className={styles.footer__text}>
          Liquor Licence: 57703968. Please enjoy our products responsibly.
        </p>
        <p className={styles.footer__text}>© 2025 All rights reserved.</p>
      </div>
    </footer>
  );
};
