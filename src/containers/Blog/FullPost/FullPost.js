import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loadedPost: null
        }

        this.cancelToken = axios.CancelToken
        this.sourceReq = this.cancelToken.source()
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            if ( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.id) ) {
                // esta condicion es para evitar que haga request infinitos al servidor,
                // ya que, el metodo DidUpdate se esta ejecutando indefinidamente
                axios.get('/posts/' + this.props.match.params.id, {cancelToken: this.sourceReq.token})
                    .then(response => {
                        this.setState({loadedPost: response.data})
                    })
                    .catch(error => {
                        if (axios.isCancel(error)) {
                            console.log('Request in [FullPost] Component is canceled', error.message)
                        } else {
                            console.log('[FullPost] ', error.message)
                        }
                    })
            }
        } else {
            if (this.state.loadedPost) {
                this.setState({loadedPost: null})
            }
        }

    }

    componentWillUnmount() {
        //console.log('[FullPost] WillUnmount')
        this.sourceReq.cancel('[FullPost] Operation canceled by the user.')
    }

    // Este metodo a continuacion es para demostrar que con axios
    // tambien es posible ejecutar un delete al servidor cuando se requiera eliminar 
    // registros de una base de datos
    deletePostHandler = () => {
        console.log(this.props.match.params.id)
        axios.delete('/posts/' + this.props.match.params.id)
            .then(response => {
                console.log(response)
            })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.match.params.id) {
            post = <p style={{textAlign: 'center'}} className='loader'>Loading...</p>;
        }
        if (this.state.loadedPost && this.props.match.params.id) {
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