import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import {HashLoader} from "react-spinners"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";


import toast, { Toaster } from 'react-hot-toast';
import style from "./MoviesPage.module.css"

import MovieList from "../../components/MovieList/MovieList";
import {FetchMovie} from "../../movie-api";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") ?? "";
    const [queryInput, setQueryInput] = useState(query);


    const changeSearchQuery = (queryInput) => {
        const nextSearchParams = new URLSearchParams(searchParams);
        
        if (queryInput !== "") {
            nextSearchParams.set("query", queryInput)
        } else {
            nextSearchParams.delete("query");
        }

        setSearchParams(nextSearchParams)
    }

    const handleInputChange = (event) => {
        const text = event.target.value;
        setQueryInput(text);

    // Якщо інпут порожній, очищаємо query
    if (text.trim() === "") {
        changeSearchQuery("");
    }
};

    useEffect(() => {
        async function MoviesData(query) {
            if (!query) {
                setMovies([]);
                setError(false);
            return;
        }
        
            try {
                setError(false);
                setLoading(true);
                const response = await FetchMovie(query)
                
                if (!response || response.length === 0) {
                    setError(true);
                    setMovies([]);
                    return;
                }

            setMovies(response);
        
      } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
                
             }
            
        }
        MoviesData(query)
    },[query])

        
 

    
    const handleSubmit = (event) => {
        event.preventDefault();
        

        if (queryInput.trim() ===  "") {
            toast.error('Field required, enter text!');
            return;
        } 
        
    
        changeSearchQuery(queryInput);
      
    }

    return (
<>
    <form className={style.form} onSubmit={handleSubmit}>
             
        <input className={style.input}
            value={queryInput} 
            onChange={handleInputChange} 
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies and serials"
        />
        <button className={style.btn} type="submit"><FaSearch /></button>
    </form>
            <Toaster
                position="top-right" />
            
            <MovieList movies={movies} />
            
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
    );
}
