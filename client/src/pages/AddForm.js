import {
  Box, 
  Button, 
  Form,
  FormField, 
  Heading, 
  Select, 
  TextInput,
} from 'grommet';
import { UserAdd } from 'grommet-icons';
import React from 'react';
import Message from '../Message.js';
import http from '../http.js';

const validateYear = (value) => {
  const num = Number(value);
  return (num && num > 1850 && num < 2020)
};

const validateNames = (array) => {
  const regex = /\d/;
  //if at least one name or surname contains numbers array is not valid
  const isWrongNamePresent = array.find(({name, surname}) => regex.test(name) || regex.test(surname));
  return isWrongNamePresent ? false : true;
};

export default class AddForm extends React.Component {
  state = {
    errors: {},
    releaseYear: '',
    title: '',
    format: '',
    currentName: '',
    currentSurname: '',
    stars: [],
    status: null,
  };

  validateForm = () => {
    const { title, releaseYear, format, stars } = this.state;
    if (title && releaseYear && format && stars.length) {
      const isYearValid = validateYear(releaseYear);
      const isNamesArrValid = validateNames(stars);
      if (!isYearValid || !isNamesArrValid) {
        this.setState({
          errors: {
            releaseYear: isYearValid ? '' : 'specify a number between 1850 and 2020',
            name: isNamesArrValid ? '' : 'specify some stars',
            surname: isNamesArrValid ? '' : 'no numbers allowed'
          },
          stars: [],
        });
        return false;
      } else {
        return true;
      }
    } else {
      this.setState({
        errors: {
          title: title ? '' : 'specify a title',
          releaseYear: releaseYear ? '' : 'specify a number between 1850 and 2020',
          format: format ? '' : 'specify a format',
          name: stars.length ? '' : 'specify some stars',
          surname: stars.length ? '' : 'no numbers allowed'
        }
      });
      return false;
    }
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSelectChange = (e) => {
    this.setState({
      format: e.option
    });
  };

  handleAddStarBtnClick = (e) => {
    const { currentName, currentSurname, stars } = this.state;
    if (currentName && currentSurname) {
      this.setState({
        currentName: '',
        currentSurname: '',
        stars: stars.concat({
          name: currentName,
          surname: currentSurname,
        }),
      });
    }
  };

  handleCancelBtnClick = () => {
    this.props.history.push('/');
  };

  handleSubmitBtnClick = async (e) => {
    e.preventDefault();
    const { title, releaseYear, format, stars } = this.state;
    const isFormValid = this.validateForm();

    if (isFormValid) {
      try {
        await http.post('/movies', {
          "title": title,
          "releaseYear": releaseYear,
          "format": {
            "type": format,
          },
          "stars": stars,
        });
        this.setState({
          status: {
            type: 'success',
            message: 'Movie was successfully added. Redirecting in a few seconds...'
          }
        });
        setTimeout(() => {
          this.props.history.push('/movies');
        }, 3000);
      } catch (err) {
        this.setState({
          status: {
            type: 'error',
            message: 'Request error. Try again in a few seconds...',
          }
        });
        setTimeout(() => {
          this.props.history.push('/movies/new');
        }, 3000);
      }
    }
  };

  render() {
    const { 
      title, 
      releaseYear, 
      format, 
      stars, 
      currentName,
      currentSurname,
      errors
    } = this.state;

    return (
      <Box align="center">
        <Heading> New movie </Heading>
        {this.state.status ? (
          <Message type={this.state.status.type} text={this.state.status.message} />
          ): (
          <Form onSubmit={this.handleSubmitBtnClick}>
            <Box width="300px" align="center">
              <FormField 
                label="Title" 
                error={errors.title}
              >
                <TextInput
                  name="title"
                  value={title}
                  onChange={this.handleInputChange}
                />
              </FormField>
              <FormField 
                label="Release year" 
                name="releaseYear" 
                error={errors.releaseYear}
              >
                <TextInput
                  name="releaseYear"
                  value={releaseYear}
                  onChange={this.handleInputChange}
                />
              </FormField>
              <FormField label="Format" error={errors.format}>
                <Select
                  options={['VHS', 'DVD', 'BLU-RAY']}
                  value={format}
                  onChange={this.handleSelectChange}
                />
              </FormField>
              <Box direction="row" justify="between" align="center">
                <FormField label="Name" error={errors.name}>
                  <TextInput
                    name="currentName"
                    value={currentName}
                    onChange={this.handleInputChange}
                  />
                </FormField>
                <FormField label="Surname" error={errors.surname}>
                  <TextInput
                    name="currentSurname"
                    value={currentSurname}
                    onChange={this.handleInputChange}
                  />
                </FormField>
                <Button 
                  plain
                  label={stars.length}  
                  icon={<UserAdd size="large" />} 
                  onClick={this.handleAddStarBtnClick} 
                />
              </Box>
              <Box 
                  margin={{ vertical: 'medium' }} 
                  direction="row-responsive" 
                  justify="between"
                  align="center"
                  gap="medium"
                >
                  <Button 
                    label="Submit" 
                    type="submit" 
                    primary  
                  />
                  <Button 
                    label="Cancel" 
                    onClick={this.handleCancelBtnClick} 
                  />
                </Box>
            </Box>
          </Form>
        )}
      </Box>
    );
  }
}
