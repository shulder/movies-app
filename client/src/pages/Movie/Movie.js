import {
  Box,
  Heading,
  Button,
} from 'grommet';
import React from 'react';
import MovieProperty from './MovieProperty';
import http from '../../http.js';

export default class Movie extends React.Component {
  state = {
    movieInfo: null,
  };

  componentDidMount = async () => {
    const { id } = this.props.match.params;
    try {
      const { data } = await http.get(`/movies/${id}`);
      this.setState({
        movieInfo: data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  handleDeleteBtnClick = async (e) => {
    const { id } = this.props.match.params;
    try {
      // data contains "OK" or "ERROR" MovieProperty
      await http.delete(`/movies/${id}`);
      this.props.history.push('/movies');
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div>
        {this.state.movieInfo ? (
          <div>
            <Box
              direction="row"
              justify="between"
              align="center"
              gap="small"
            >
              <Heading>
                {this.state.movieInfo.title}
              </Heading>
              <Button
                color="red"
                label="Delete"
                onClick={this.handleDeleteBtnClick}
              />
            </Box>
            <Box gap="medium" margin={{ bottom: 'large' }} >
              <MovieProperty
                name="Release year"
                value={this.state.movieInfo.releaseYear}
              />
              <MovieProperty
                name="Format"
                value={this.state.movieInfo.format.type}
              />
              <MovieProperty
                name="Stars"
                value={this.state.movieInfo.stars}
              />
            </Box>
          </div>
          ) : (<Box margin="medium" pad="large" background="light-1" />)
        }
      </div>
    );
  }
}

