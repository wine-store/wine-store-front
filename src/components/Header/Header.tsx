import { NavLink } from 'react-router-dom';
export const Header = () => {
  return (
    <nav>
        <ul>
          <li><NavLink to="/catalog">Catalog</NavLink></li>
          <li><NavLink to="/about-us">About Us</NavLink></li>
          <li><NavLink to="/cart">Cart</NavLink></li>
        </ul>
      </nav>
  );
}
