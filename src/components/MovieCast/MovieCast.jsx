import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./MovieCast.module.css"
import { HashLoader } from "react-spinners"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import {FetchMovieCast} from "../../movie-api"

export default function MovieCast() {

    const [movieCast, setMovieCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { movieId } = useParams();

    

    useEffect(() => {
        async function MoviesDataCast() {
            
            try {
                setError(false);
                setLoading(true);

            const response = await FetchMovieCast(movieId);

                if (!response || response.length === 0) {
                    setError(true);
                    return;
                }
            setMovieCast(response.cast);
        } catch (error) {
                setError(error);
        } finally {
            setLoading(false);
        }
    }
    MoviesDataCast();
    }, [movieId])
    
console.log(movieCast);
    return (

        <div>
            <h1>Actors</h1>
            <ul className={style.castList}>
                {movieCast && movieCast.map((cast) => { 
                    return (
                        <li className={style.castCard} key={cast.id}>
                            <div>
            <img className={style.castImage} src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                    alt={ cast.name } />
                <p className={style.castText}> {cast.name} </p>
                <p className={style.castCharacter}> <span className={style.castCharacterText}> Character: </span> {cast.character} </p>
            </div> 
                        </li>
                    )
                })}
            </ul>
            
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