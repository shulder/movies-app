import {
  Box, 
  Button, 
  FormField, 
  Heading, 
  Select, 
  TextInput,
} from 'grommet';
import { UserAdd } from 'grommet-icons';
import React from 'react';
import http from '../http.js';

export default class AddForm extends React.Component {
  state = {
    releaseYear: null,
    title: '',
    format: '',
    stars: [],
    currentName: '',
    currentSurname: '',
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

  handleCreateBtnClick = () => {
    const { title, releaseYear, format, stars } = this.state;
    if (title && releaseYear && format && stars.length > 0) {
      const json = {
        "title": title,
        "releaseYear": releaseYear,
        "format": {
          "type": format,
        },
        "stars": stars,
      }
      // history.push/replace doesn't work in async function for some reason((
      http.post('/movies', json);
      this.props.history.replace('/');
    }
  };

  handleCancelBtnClick = () => {
    this.props.history.push('/');
  };

  render() {
    const { 
      title, 
      releaseYear, 
      format, 
      stars, 
      currentName,
      currentSurname, 
    } = this.state;

    return (
      <Box align="center">
        <Heading>
          New movie
        </Heading>
        <Box width="300px" align="center">
        <FormField label="Title">
          <TextInput
            name="title"
            value={title || ""}
            onChange={this.handleInputChange}
          />
        </FormField>
        <FormField label="Release year">
          <TextInput
            name="releaseYear"
            value={releaseYear || ""}
            onChange={this.handleInputChange}
          />
        </FormField>
        <FormField label="Format">
          <Select
            options={['VHS', 'DVD', 'BLU-RAY']}
            value={format || ""}
            onChange={this.handleSelectChange}
          />
        </FormField>

        <Box direction="row" justify="between" align="center">
          <FormField label="Name">
            <TextInput
              name="currentName"
              value={currentName || ""}
              onChange={this.handleInputChange}
            />
          </FormField>
          <FormField label="Surname">
            <TextInput
              name="currentSurname"
              value={currentSurname || ""}
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
          margin={{ vertical: 'large' }}
          direction="row-responsive"
          justify="between"
          align="center"
          gap="medium"
        >
          <Button
            label="Add"
            primary
            onClick={this.handleCreateBtnClick}
          />
          <Button
            label="Cancel"
            onClick={this.handleCancelBtnClick}
          />
        </Box>
      </Box>
      </Box>
    );
  }
}
