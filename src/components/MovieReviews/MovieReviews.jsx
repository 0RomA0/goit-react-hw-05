import { useState, useEffect } from "react";
import style from "./MovieReviews.module.css"
import { HashLoader } from "react-spinners"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";


import { FetchMovieReviews } from "../../movie-api";
import { useParams } from "react-router-dom";

export default function MovieReviews() {

    const [movieReviews, setMovieReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { movieId } = useParams();

   

    useEffect(() => {
        async function MoviesDataReviews() {
            
            try {
                setError(false);
                setLoading(true);

            const response = await FetchMovieReviews(movieId);
                if (!response || response.length === 0) {
                    setError(true);
                    return;
                }
                
            setMovieReviews(response.results);
        } catch (error) {
            setError(error);
            } finally {
                setLoading(false);
        }
    }
    MoviesDataReviews();
    }, [movieId])
    
console.log(movieReviews);
    return (

        <div className={style.reviewsContainer}>
            <h1>Reviews</h1>
            {movieReviews.length === 0 ? (
    <p>We don't have any reviews for this movie.</p>
  ) : (<ul>
                {movieReviews.map((reviews) => {
                    return (
                        <li className={style.reviewItem} key={reviews.id}>
                            <h2 className={style.reviewAuthor}> Author: </h2>
                            <p className={style.reviewContent}> {reviews.author} </p>
                            <h2 className={style.reviewContentTitle}> Info: </h2>
                            <p className={style.reviewContent}> {reviews.content} </p>
                           

                    </li>
                )
            })}

            </ul>)}
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