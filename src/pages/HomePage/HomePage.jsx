import { useState, useEffect } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import {HashLoader} from "react-spinners"

import { FetchTrendingMovie } from "../../movie-api"
import MovieList from "../../components/MovieList/MovieList";


export default function Homepage({ }) {
    
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        async function fetchData() {
        
            try {
                setError(false);
                setLoading(true);
            const response = await FetchTrendingMovie();
            if (!response || response.length === 0) {
                    setError(true);
                    return;
            }
            
            setTrendingMovies(response);

      } catch (error) {
            setError(error);
            } finally { setLoading(false); }
            
    }
        fetchData();
    },[])

    

    return (
        <>

            <h1> Trending today </h1>
            <MovieList movies={ trendingMovies } />
            
            <HashLoader
                color={"#861e1a"}
                size={100}
                loading={loading}
                aria-label="Loading Spinner"
                data-testid="loader"
                min-height="100vh"
            />
           {error && <ErrorMessage /> }
        </>
    )
}

