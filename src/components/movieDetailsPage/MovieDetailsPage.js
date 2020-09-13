import React, { useState, useEffect } from 'react';
import {
  Link,
  Switch,
  Route,
  useRouteMatch,
  useLocation,
} from 'react-router-dom';

import { fetchMovieDetails } from '../../services/moviesApi';
import { Cast } from '../cast/Cast';
import { Reviews } from '../reviews/Reviews';
import styles from './movieDetails.module.css';

function MovieDetailsPage(props) {
  const [movie, setMovie] = useState({});
  const [from, setFrom] = useState('');
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const movieId = useRouteMatch().params.movieId;

  useEffect(() => {
    (async () => {
      try {
        const getMovieDetails = await fetchMovieDetails(movieId);
        setMovie(getMovieDetails);
      } catch (error) {
        setError({ error });
      }
    })();
  }, [movieId]);

  useEffect(() => {
    setFrom(location.state && location.state.from ? location.state.from : '/');
    setSearch(
      location.state && location.state.search ? location.state.search : '',
    );
  }, [location.state]);

  return (
    <>
      <button
        type="button"
        onClick={() =>
          props.history.push({
            pathname: from,
            search: search,
          })
        }
        className={styles.btn}
      >
        Go back
      </button>
      {(movie.id && (
        <>
          <div className={styles.movieCard}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                width="300"
                alt={movie.title || movie.name}
              />
            )}
            <div className="descr">
              <h2>{movie.title || movie.name}</h2>
              <p>User score: {movie.vote_average * 10}%</p>
              <h3>Overview</h3>
              <p>{movie.overview || 'This movie has no overview yet.'}</p>
              <h3>Genres</h3>
              <ul className={styles.genreList}>
                {movie.genres.map(el => (
                  <li key={el.id} className={styles.genreListItem}>
                    {el.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.addInf}>
            <p>Additional information</p>
            <ul>
              <li>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}/cast`,
                    state: {
                      search: search,
                      from: from,
                    },
                  }}
                >
                  Cast
                </Link>
              </li>{' '}
              <li>
                <Link
                  to={{
                    pathname: `/movies/${movie.id}/reviews`,
                    state: {
                      search: search,
                      from: from,
                    },
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <Switch>
            <Route path="/movies/:movieId/cast" component={Cast} />
            <Route path="/movies/:movieId/reviews" component={Reviews} />
          </Switch>
        </>
      )) ||
        (error && (
          <p className="descr">
            The resource you requested could not be found.
          </p>
        ))}
    </>
  );
}
export default MovieDetailsPage;
