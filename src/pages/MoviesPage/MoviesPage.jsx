import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import {HashLoader} from "react-spinners"
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";


import toast, { Toaster } from 'react-hot-toast';
import style from "./MoviesPage.module.css"

import MovieList from "../../components/MovieList/MovieList";
import {FetchMovie} from "../../movie-api";

export default function MoviesPage() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const inputRef = useRef();
    
    

        async function MoviesData(query) {
        
            try {
                setError(false);
                setLoading(true);
                const response = await FetchMovie(query)
                
                if (!response || response.length === 0) {
                    setError(true);
                    return;
                }

            setMovies(response);
        
      } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
                
             }
            
        }
 

    
    const handleSubmit = (event) => {
        event.preventDefault();
        const textInput = inputRef.current.value;
        // console.log(textInput);
        

        if (textInput.trim() ===  "") {
            toast.error('Field required, enter text!');
            return;
        } 
        
    
        MoviesData(textInput);
  
         
    }

    return (
<>
    <form className={style.form} onSubmit={handleSubmit}>
             
        <input className={style.input}
            ref={inputRef}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies and serials"
        />
        <button className={style.btn} type="submit"><FaSearch /></button>
    </form>
            <Toaster
                position="top-right" />
            
            <MovieList MovieList={movies} />
            
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