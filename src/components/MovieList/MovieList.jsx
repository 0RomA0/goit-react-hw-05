import { Link, useLocation } from "react-router-dom";


export default function MovieList({MovieList}) {
    
    const location = useLocation();

    return (
        <>
        <ul>
                {MovieList.map((movies) => { return (
                    <li key={movies.id}>
                <Link to={`/movies/${movies.id}`} state={location}> {movies.original_title}  </Link>
                </li>
                )})}

            </ul>
        </>
        
    )


}