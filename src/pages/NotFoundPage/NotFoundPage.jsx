import { NavLink } from "react-router-dom";
import style from "./NotFoundPage.module.css"

export default function NotFoundPage() {
  return (
    <div className={style.div}>
      <h1 className={style.title}>404 Page not found</h1>
      <p className={style.text}> Unfortunately, such a page does not exist. </p>
      <NavLink to="/" className={style.link}> Return to home page </NavLink>
    </div>
  );
}
