import "./navbar.scss";
import logo from "/logo.svg";
import logoText from "/logo-text.svg";
import { NavLink } from "react-router-dom";
import { NavLinks } from "../../constants";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__logo">
        <NavLink to={"/"}>
          <img src={logo} alt="Logo" />
          <img src={logoText} alt="Logo Text" />
        </NavLink>
      </div>
      <nav className="navbar__menu">
        <ul>
          <li>
            {NavLinks.map((link) => (
              <NavLink to={link.route} key={link.route}>
                {link.label}
              </NavLink>
            ))}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
