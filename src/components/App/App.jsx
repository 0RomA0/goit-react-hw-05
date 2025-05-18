import { Route, Routes, NavLink } from 'react-router-dom'
import { useState } from 'react'
import style from './App.module.css'
import { lazy, Suspense } from 'react'
import {HashLoader} from "react-spinners"

// import Homepage from '../../pages/HomePage/HomePage'
// import MoviesPage from '../../pages/MoviesPage/MoviesPage'
// import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage'
// import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage'
// import Navigation from '../Navigation/Navigation'
// import MovieCast from '../MovieCast/MovieCast'
// import MovieReviews from '../MovieReviews/MovieReviews'

const Homepage  = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage  = lazy(() => import('../../pages/MoviesPage/MoviesPage'));
const MovieDetailsPage  = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage  = lazy(() => import('../../pages/NotFoundPage/NotFoundPage'));
const Navigation  = lazy(() => import('../Navigation/Navigation'));
const MovieCast  = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews  = lazy(() => import('../MovieReviews/MovieReviews'));


function App() {

  
  
  const loader = <HashLoader
    color={"#861e1a"}
    size={100}
    aria-label="Loading Spinner"
    data-testid="loader"
    min-height="100vh"
  />;
  
 
  
  return (
    <div className={style.divContainer}>
      
      <Navigation />
    <Suspense fallback={loader}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path='/movies/:movieId' element={<MovieDetailsPage />}>
          <Route path='cast' element={<MovieCast />} />
          <Route path='reviews' element={<MovieReviews /> } />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
