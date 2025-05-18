import style from "./ErrorMessage.module.css"

export default function ErrorMessage() {
    return (
        <>
            <p className={style.errorMessage}> An error occurred, please reload the site or come back later! </p>
             <NavLink to="/" className={style.link}> Return to home page </NavLink>
        </>
    )
}