import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from './nav/Nav';

const HomePage = lazy(() => import('./homePage/HomePage'));
const MoviesPage = lazy(() => import('./moviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('./movieDetailsPage/MovieDetailsPage'),
);
const PageNotFound = lazy(() => {
  return <h2>Page not found ......</h2>;
});

export function App() {
  return (
    <>
      <Nav />
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/movies" component={MoviesPage} />
          <Route path="/movies/:movieId" component={MovieDetailsPage} />
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    </>
  );
}
