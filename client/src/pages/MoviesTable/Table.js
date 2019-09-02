import {
  Box, 
  Grid, 
  Heading,
  InfiniteScroll,
  Button,
  TextInput,
} from 'grommet';
import {
  History,
  Search,
  FormAdd,
  FormUpload,
  Sort,
} from 'grommet-icons';
import React from 'react';
import Message from '../../Message.js'
import PageIndicator from './PageIndicator';
import TableCell from './TableCell';
import http from '../../http.js';

const fetchMoviesFromServer = async (page, limit, searchQuery) => {
 const url = searchQuery
    ? `/movies/search?page=${page}&limit=${limit}&input=${searchQuery}`
    : `/movies?page=${page}&limit=${limit}`;
  try {
    const { data } = await http.get(url);
    return data;
  } catch (err) {
    return null;
  }
};

const sortArrayByProperty = (arr, prop) => [].concat(arr).sort((a, b) => a[prop] > b[prop]);

export default class Table extends React.Component {
  state = {
    movies: [],
    searchQuery: '',
    currentPage: 1,
    totalPages: 1,
    sortedBy: 'releaseYear',
    limit: 6,
    status: '',
  };

  handleSortBtnClick = async (e) => {
    const prop = this.state.sortedBy === 'releaseYear' ? 'title' : 'releaseYear';
    const { movies } = this.state;
    // apply sorting only if there are movies to sort
    if (movies.length) {
      const sortedMovies = sortArrayByProperty(movies, prop);
      this.setState({
        movies: sortedMovies,
        sortedBy: prop,
      });
    }
  };

  handleSubmitSearchBtnClick = async (e) => {
    const { limit, searchQuery } = this.state;
    // reset page number to first on every search
    const data = await fetchMoviesFromServer(1, limit, searchQuery);
    this.saveMovies(data);
    this.setState({
      currentPage: 1,
    });
  };

  handlePageChange = async (e) => {
    const nextPage = e.target.value;
    const { limit, searchQuery } = this.state;
    const data = await fetchMoviesFromServer(nextPage, limit, searchQuery);
    this.saveMovies(data);
    this.setState({
      currentPage: nextPage
    });
  };

  handleSearchChange = (e) => {
    this.setState({
      searchQuery: e.target.value,
    })
  };

  saveMovies = (data) => {
    if (data && data.movies.length > 0) {
      const sortedMovies = sortArrayByProperty(data.movies, this.state.sortedBy);
      this.setState({
        movies: sortedMovies,
        totalPages: data.totalPages,
        status: '',
      });
    } else {
      this.setState({
        movies: null,
        totalPages: 1,
        status: data ? 'No movies found' : 'Request failed, check Internet connection or try later',
      });
    }
  };

  componentDidMount = async () => {
    const { currentPage, limit } = this.state;
    const data = await fetchMoviesFromServer(currentPage, limit);
    this.saveMovies(data);
  };

  render() {
    const { history } = this.props;
    const { 
      movies,
      searchQuery, 
      sortedBy,
      status, 
      currentPage, 
      totalPages 
    } = this.state;

    return (
      <Box>
        <Box direction="row" justify="between" align="center">
          <Heading>Movies</Heading>
          <Box 
            direction="row" 
            gap="medium" 
            justify="between" 
            align="center"
            >
            <Button 
              icon={<FormAdd />} 
              label="New" 
              onClick={e => history.push('/movies/new')}
            />
            <Button 
              icon={<FormUpload />} 
              label="Upload"
              onClick={e => history.push('/movies/upload')} 
            />
          </Box>
        </Box>
        <Box direction="row" justify="between" align="center">
          <TextInput
            placeholder="type movie title or star name"
            value={searchQuery}
            onChange={this.handleSearchChange}
          />
          <Button
            icon={<Search size="large" />} 
            onClick={this.handleSubmitSearchBtnClick}
          />
          <Button
            icon={
              sortedBy === 'title' ? <History size="large" /> : <Sort size="large" /> 
            } 
            onClick={this.handleSortBtnClick}
          />
        </Box>
        <Box height="150px" margin={{ vertical: 'medium' }}>
          {movies ? (
            <Grid columns="small" gap="small">
              <InfiniteScroll items={movies}>
                {movie => (
                  <TableCell
                    history={history}
                    id={movie.id}
                    title={movie.title}
                    releaseYear={movie.releaseYear}
                    key={movie.id}
                  />
                )}
              </InfiniteScroll>
            </Grid>
          ) : (
            <Message text={status} type="error" />
          )}
        </Box>
        <PageIndicator 
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={this.handlePageChange}
        />
      </Box>
    );
  }
}
