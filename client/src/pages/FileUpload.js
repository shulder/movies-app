import React from 'react'
import { Box } from 'grommet';
import Message from '../Message.js';
import http from '../http.js';

const sendFile = (file) => {
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

const matchTextFileExtension = (filename) => {  
  const regex = new RegExp(/\.(txt)/g);
  return regex.test(filename); 
};

export default class FileUpload extends React.Component {
  state = {
    file: null,
    status: null,
  };

  handleInputChange = (e) => {
    console.log(e.target.files[0]);
    this.setState({
      file:e.target.files[0]
    });
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();
    const { file } = this.state;
    const isExtensionValid = matchTextFileExtension(file.name);
    if (isExtensionValid) {
      try {
        await sendFile(file);
        this.setState({
          status: {
            type: 'success',
            message: 'Movies were successfully imported. Redirecting in a few seconds...',
          }
        });
        setTimeout(() => {
          this.props.history.push('/movies');
        }, 4000);
      } catch (err) {
        this.setState({
          status: {
            type: 'error',
            message: 'Error while processing the file. Try again in a few seconds...',
          }
        });
        setTimeout(() => {
          this.setState({
            file: null,
            status: null,
          });
        }, 4000);
      }
    } else {
      this.setState({
        status: {
          type: 'error',
          message: 'Wrong file extension. Please provide .txt file. Try again in a few seconds...',
        }
      });
      setTimeout(() => {
        this.setState({
          file: null,
          status: null,
        });
      }, 4000);
    }
  };
  
  render() {
    const { status } = this.state;
    return (
      <div>
        <Box 
          direction="column" 
          justify="between"
          gap="medium" 
          align="center" 
          margin={{ vertical: 'large' }}
          height="150px"
        >
          <h1>File Upload</h1>
            {status ? (
              <Box>
                <Message text={this.state.status.message} type={this.state.status.type} />
              </Box>
            ) : (
              <Box margin={{ vertical: 'xlarge' }}>
                <form onSubmit={this.handleFormSubmit}>
                  <input type="file" onChange={this.handleInputChange} />
                  <button type="submit">Send</button>
                </form>
              </Box>
            )}
        </Box>
      </div>
   );
  }
}


