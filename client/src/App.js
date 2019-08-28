import { 
  BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch 
} from 'react-router-dom';
import {
  Grommet, 
  Box, 
  Grid, 
  ResponsiveContext, 
  grommet,
} from 'grommet';
import React from 'react';
import Header from './Header';
import AddForm from './pages/AddForm';
import FileUpload from './pages/FileUpload';
import Movie from './pages/Movie/Movie';
import Table from './pages/MoviesTable/Table';

const Content = () => (
  <ResponsiveContext.Consumer>
    {responsive => (
      <Grid
        fill
        columns={responsive !== 'small'
          ? ['flex', 'large', 'flex']
          : ['flex']}
        rows={['flex']}
        areas={responsive !== 'small'
          ? [{ name: 'main', start: [1, 0], end: [1, 0] }]
          : [{ name: 'main', start: [0, 0], end: [0, 0] }]}
      >
        <Box gridArea="main">
          <Box pad={responsive === 'small' ? { horizontal: 'large' } : undefined}>
            <Route path="/" component={Header} />
            <Switch>
              <Redirect from="/" to="/movies" exact />
              <Route exact path="/movies" component={Table} />
              <Route exact path="/movies/new" component={AddForm} />
              <Route exact path="/movies/upload" component={FileUpload} />
              <Route exact path="/movies/:id" component={Movie} />
            </Switch>
          </Box>
        </Box>
      </Grid>
    )}
  </ResponsiveContext.Consumer>
);

export default () => (
  <Router>
    <Grommet theme={grommet}>
      <Content />
    </Grommet>
  </Router>
);
