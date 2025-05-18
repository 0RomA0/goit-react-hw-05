import { NavLink } from 'react-router-dom';
import clsx from 'clsx'
import style from "./Navigation.module.css"

export default function Navigation() {

const NavLinkActivClass = ({ isActive }) => {
  return clsx(style.link, isActive && style.active);
};

    return (

        <nav className={style.nav}>
        <NavLink to="/" className={NavLinkActivClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={NavLinkActivClass}>
          Movies
        </NavLink>
        
        </nav>

    )
}