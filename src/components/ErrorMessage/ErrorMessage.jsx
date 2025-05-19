import style from "./ErrorMessage.module.css"
import { NavLink } from "react-router-dom"

export default function ErrorMessage() {
    return (
        <>
            <p className={style.errorMessage}> An error occurred, please reload the site or come back later! </p>
             <NavLink to="/" className={style.link}> Return to home page </NavLink>
        </>
    )
}