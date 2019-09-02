import {
  Box,
  Heading,
  Button,
} from 'grommet';
import React from 'react';
import MovieProperty from './MovieProperty';
import Message from '../../Message.js'
import http from '../../http.js';

export default class Movie extends React.Component {
  state = {
    movieInfo: null,
    status: {
      text: '',
      type: '',
    },
  };

  componentDidMount = async () => {
    const { id } = this.props.match.params;
    try {
      const { data } = await http.get(`/movies/${id}`);
      this.setState({
        movieInfo: data,
      });
    } catch (err) {
      this.setState({
        movieInfo: null,
        status: {
          message: 'Request failed, check Internet connection or try later',
          type: 'error',
        }
      });
    }
  };

  handleDeleteBtnClick = async (e) => {
    const { id } = this.props.match.params;
    try {
      await http.delete(`/movies/${id}`);
      this.setState({
        movieInfo: null,
        status: {
          message: 'Movie was deleted succesfully. Redirecting in a few seconds...',
          type: 'success',
        }
      });
      setTimeout(() => {
        this.props.history.push('/movies');
      }, 3000);
    } catch (err) {
      this.setState({
        movieInfo: null,
        status: {
          message: 'Request failed, check Internet connection or try later. Redirecting in a few seconds...',
          type: 'error',
        }
      });
      setTimeout(() => {
        this.props.history.push('/movies');
      }, 3000);
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
          ) : (
            <Message text={this.state.status.message} type={this.state.status.type} />
          )}
      </div>
    );
  }
}

