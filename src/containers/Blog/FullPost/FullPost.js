import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidUpdate() {
        if (this.props.id) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id) ) {
                // esta condicion es para evitar que haga request infinitos al servidor,
                // ya que, el metodo DidUpdate se esta ejecutando indefinidamente
                axios.get('/posts/' + this.props.id)
                    .then(response => {
                        this.setState({loadedPost: response.data})
                    })
            }
        } else {
            if (this.state.loadedPost) {
                this.setState({loadedPost: null})
            }
        }

    }

    // Este metodo a continuacion es para demostrar que con axios
    // tambien es posible ejecutar un delete al servidor cuando se requiera eliminar 
    // registros de una base de datos
    deletePostHandler = () => {
        console.log(this.props.id)
        axios.delete('/posts/' + this.props.id)
            .then(response => {
                console.log(response)
            })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if (this.state.loadedPost && this.props.id) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler.bind(this)}>Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;