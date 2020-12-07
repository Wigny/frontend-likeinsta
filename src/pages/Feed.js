import React, { Component } from 'react';
import api from '../services/api';

import './Feed.css';
import more from '../assets/more.svg';
import like from '../assets/like.svg';
import comment from '../assets/comment.svg';
import send from '../assets/send.svg';

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

  handleFile = ({ file, mimetype }) => {
    switch (mimetype.split("/")[0]) {
      case 'image':
        return <img src={file} alt={file} />

      case 'video':
        return <video controls> <source src={file} type={mimetype} /> </video>

      case 'audio':
        return <audio controls> <source src={file} type={mimetype} /> </audio>

      default:
        return <a href="file" download>Download</a>
    }
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

              {this.handleFile(post)}

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
