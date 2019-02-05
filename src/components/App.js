import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from "./Post/Post"
import Axios from 'axios';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    Axios.get(`https://practiceapi.devmountain.com/api/posts`).then(resp=>{
      console.log("test",resp)
      this.setState({
        posts:resp.data
      })
    })
  }

  updatePost(id,text) {
    // console.log(text)
    Axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`,{text:text}).then(resp=>{
      // console.log(resp)
      this.setState({
        posts:resp.data
      })
    })
  }

  deletePost(id) {
    Axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then(resp=>{
      // console.log(resp)
      this.setState({
        posts:resp.data
      })
    })

  }

  createPost(text) {
    Axios.post(`https://practiceapi.devmountain.com/api/posts`,{text}).then(resp=>{
      console.log("CreatePost:", resp)
      this.setState({
        posts:resp.data
      })
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          {posts.map(post => 
          <Post key={post.id} 
          text={post.text} 
          date={post.date} 
          updatePostFn={this.updatePost} 
          id={post.id}
          deletePostFn={this.deletePost}/>)}
          
        </section>
      </div>
    );
  }
}

export default App;
