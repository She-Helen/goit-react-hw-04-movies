import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { fetchMovieCast } from '../../services/moviesApi';

export function Cast() {
  const [cast, setCast] = useState([]);
  const movieId = useRouteMatch().params.movieId;

  useEffect(() => {
    (async () => {
      const getMovieCast = await fetchMovieCast(movieId);
      setCast(getMovieCast);
    })();
  }, [movieId]);

  return (
    <>
      {(cast.length && (
        <ul>
          {cast.map(actor => (
            <li key={actor.id}>
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                  width="200"
                  alt={actor.name}
                />
              )}
              <h3>{actor.name}</h3>
              <p>Character: {actor.character}</p>
            </li>
          ))}
        </ul>
      )) || (
        <p className="descr">The resource you requested could not be found.</p>
      )}
    </>
  );
}
// {
//   "cast_id": 12,
//     "character": "Hua Mulan",
//       "credit_id": "5a1f27efc3a3680b930821c6",
//         "gender": 1,
//           "id": 122503,
//             "name": "Liu Yifei",
//               "order": 0,
//                 "profile_path": "/cL6JccAYqiZQEAIEFObEUC9LTt7.jpg"
// }
