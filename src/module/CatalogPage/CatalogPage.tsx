import { NavLink } from "react-router-dom";

export const CatalogPage = () => {
  return (
    <nav>
    <ul>
      <li><NavLink to="/catalog">All</NavLink></li>
      <li><NavLink to="/catalog/wine">Wine</NavLink></li>
      <li><NavLink to="/catalog/product">Products</NavLink></li>
      <li><NavLink to="/catalog/certificate">Certificate</NavLink></li>
    </ul>
  </nav>
  );
}

