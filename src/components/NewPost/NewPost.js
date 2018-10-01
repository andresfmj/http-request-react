import React, { Component } from 'react';
import axios from 'axios';


import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Andres',
        isSending: false
    }

    postDataHandler () {
        this.setState({isSending: true})

        axios.post('/posts', {
            title: this.state.title, 
            body: this.state.content, 
            author: this.state.author
        })
        .then(response => {
            console.log(response)
            this.setState({
                title: '',
                content: '',
                author: 'Andres',
                isSending: false
            })
        })
    }

    render () {
        return (
            <div className="NewPost">
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Andres">Andres</option>
                    <option value="FernanityNation">FernanityNation</option>
                </select>
                <button onClick={this.postDataHandler.bind(this)}>Add Post</button>
                <p>{this.state.isSending ? 'Posting data...' : null}</p>
            </div>
        );
    }
}

export default NewPost;