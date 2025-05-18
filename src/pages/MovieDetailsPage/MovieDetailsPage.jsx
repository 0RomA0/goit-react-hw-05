import { useState, useEffect, useRef } from "react";
import { Link, useParams, useLocation, useSearchParams, NavLink, Outlet } from "react-router-dom";
import clsx from "clsx";
import style from "./MovieDetailsPage.module.css"
import {HashLoader} from "react-spinners"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";


import { FetchMovieDetails } from "../../movie-api";

export default function MovieDetailsPage({ }) {
    
    const [MovieDetails, setMovieDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { movieId } = useParams();
    const location = useLocation();
    const backLink = useRef(location.state); 

    const NavLinkActivClass = ({ isActive }) => {
  return clsx(style.navLink, isActive && style.active);
    };
    
    
    
    useEffect(() => {
        async function MoviesData() {
        if (!movieId) return;

            
            try {
                setError(false);
                setLoading(true);

                const response = await FetchMovieDetails(movieId);
                if (!response || response.length === 0) {
                    setError(true);
                    return;
                }

            setMovieDetails(response);
        
      } catch (error) {
        setError(error);
            } finally {
                setLoading(false);
                
             }
            
        }
        MoviesData();
    },[movieId])


    return (

    <div className={style.movieContainer}> 
        <Link to={backLink.current}> Go back </Link>
        <h1>Movie Info</h1>
        <div>
                
            <div className={style.movieInfo}  key={MovieDetails.id}>
                <img className={style.movieImg} src={`https://image.tmdb.org/t/p/w500/${MovieDetails.poster_path}`}
                    alt={MovieDetails.title} />
                <div className={style.movieDetails } >
                    <h2 className={style.movieTitle} > {MovieDetails.title} </h2>
                    <p className={style.userScore} > <span className={style} > Users rating: </span> {MovieDetails.vote_average} </p>
                    <h3 className={style.movieText} > Overview </h3>
                    <p className={style.movieOverview } > {MovieDetails.overview} </p>
                    <h3 className={style.movieText} > Genres </h3>
                    <p className={style.movieGenres} > {MovieDetails.genres && MovieDetails.genres.map((genre) => genre.name).join(', ')} </p>
                </div>
            </div>
               
                 <nav className={style.nav}>
                <NavLink to="cast" className={NavLinkActivClass}>
                    Cast
                </NavLink>
                <NavLink to="reviews" className={NavLinkActivClass}>
                    Reviews
                    </NavLink>
                </nav>
                <Outlet />

                
            </div>
            <HashLoader
                color={"#861e1a"}
                size={100}
                loading={loading}
                aria-label="Loading Spinner"
                data-testid="loader"
                min-height="100vh"
            />
            {error && <ErrorMessage /> }
    </div>

        
    )

}

