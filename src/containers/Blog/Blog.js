import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        isLoadingPost: true,
        postSelected: null,
        error: false,
        errorDetalle: null
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                if (response.status === 200) {
                    const posts = response.data.slice(0, 4)
                    const updatedPostsList = posts.map(p => {
                        return {
                            ...p,
                            author: 'Andres'
                        }
                    })
                    this.setState({posts: updatedPostsList, isLoadingPost: false})
                } 
            })
            .catch(error => {
                this.setState({
                    error: true,
                    errorDetalle: error.message,
                    isLoadingPost: false
                })
            })
    }

    postSelectedHandler = (id) => {
        this.setState({postSelected: id})
    }


    postDeletedHandler = () => {
        const id = this.state.postSelected
        const posts = this.state.posts
        const postIdToRemove = posts.findIndex(v => v.id === id)
        
        posts.splice(postIdToRemove, 1)
        this.setState({
            posts: posts,
            postSelected: null
        })
    }


    render () {
        let postsList = this.state.error ? 
            <h3 style={{textAlign: 'center'}}>Something went wrong <p>{this.state.errorDetalle}</p></h3> : 
            this.state.posts.map(p => {
                return <Post 
                            key={p.id} 
                            title={p.title} author={p.author} clicked={() => this.postSelectedHandler(p.id)} />
            })
        
        

        return (
            <div>
                <section className="Posts">
                    {this.state.isLoadingPost
                        ? <p>Cargando articulos...</p>
                        : postsList
                    }
                </section>
                <section>
                    <FullPost id={this.state.postSelected} removed={this.postDeletedHandler.bind(this)} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;