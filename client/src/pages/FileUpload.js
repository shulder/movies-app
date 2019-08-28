import React from 'react'
import { Box } from 'grommet';
import http from '../http.js';

export default class FileUpload extends React.Component {
  state = {
    file: null,
  };

  handleFormSubmit = async (e) => {
    e.preventDefault() 
    await this.fileUpload(this.state.file);
    this.props.history.push('/movies');
  };

  handleInputChange = (e) => {
    this.setState({file:e.target.files[0]})
  };
  
  fileUpload = (file) => {
    const formData = new FormData();    
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    console.log(file);
    formData.append('file', file);
    return http.post('/movies/import', formData, config);
  };

  render() {
    return (
      <Box 
        direction="column" 
        justify="center"
        gap="medium" 
        align="center" 
        margin={{ vertical: 'large' }}
        height="200px"
      >
        <h1>File Upload</h1>
        <Box margin={{ vertical: 'large' }}>
          <form onSubmit={this.handleFormSubmit}>
            <input type="file" onChange={this.handleInputChange} />
            <button type="submit">Send</button>
          </form>
        </Box>
      </Box>
   );
  }
}


