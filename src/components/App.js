import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Nav from './nav/Nav';
import { HomePage } from './homePage/HomePage';
import { MoviesPage } from './moviesPage/MoviesPage';
import { MovieDetailsPage } from './movieDetailsPage/MovieDetailsPage';

const PageNotFound = () => {
  return <h2>Page not found ......</h2>;
};
export function App() {
  return (
    <>
      <Nav />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/movies" component={MoviesPage} />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
}
