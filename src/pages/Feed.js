import React, { Component } from 'react';
import api from '../services/api';

import './Feed.css';
import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

import { Buffer } from 'buffer';

class Feed extends Component {
  state = {
    feed: [],
  };

  async componentDidMount() {
    const response = await api.get('posts');

    this.setState({ feed: response.data });
  }

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  }

  handleDelete = id => {
    api.delete(`/posts/${id}`);
  }

  getImage = image => {
    const base64 = new Buffer(image).toString("base64");
    return `data:image/jpeg;base64,${base64}`;
  }

  render() {
    return (
      <section id="post-list">
        {this.state.feed.map(
          post => (
            <article key={post._id}>
              <header>
                <div className="user-info">
                  <span>{post.author}</span>
                  <span className="place">{post.place}</span>
                </div>

                <button type="button" onClick={() => this.handleDelete(post._id)}>
                  <img src={more} alt="Mais" />
                </button>
              </header>

              <img src={this.getImage(post.image)} alt="" />

              <footer>
                <div className="actions">
                  <button type="button" onClick={() => this.handleLike(post._id)}>
                    <img src={like} alt="" />
                  </button>
                  <img src={comment} alt="" />
                  <img src={send} alt="" />
                </div>

                <strong>{post.likes} curtidas</strong>
                <p>
                  {post.description}
                  <span>{post.hashtags}</span>
                </p>
              </footer>
            </article>
          )
        )}
      </section>
    );
  }
}

export default Feed;