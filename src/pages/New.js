import React, { Component } from 'react';
import api from '../services/api';

import './New.css';

class Feed extends Component {
  state = {
    file: null,
    author: '',
    place: '',
    description: '',
    hashtags: '',
  };

  handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();

    for (let key in this.state) {
      data.append(key, this.state[key]);
    }

    await api.post('posts', data);

    this.props.history.push('/');
  }

  handleFileChange = e => {
    this.setState({ file: e.target.files[0] });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <form id="new-post" onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleFileChange} />
        <input
          type="text"
          name="author"
          placeholder="Autor do post"
          onChange={this.handleChange}
          value={this.setState.author}
          accept="audio/*|video/*|image/*"
        />
        <input
          type="text"
          name="place"
          placeholder="Local do post"
          onChange={this.handleChange}
          value={this.setState.place}
        />
        <input
          type="text"
          name="description"
          placeholder="Descrição do post"
          onChange={this.handleChange}
          value={this.setState.description}
        />
        <input
          type="text"
          name="hashtags"
          placeholder="Hashtags do post"
          onChange={this.handleChange}
          value={this.setState.hashtags}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default Feed;
