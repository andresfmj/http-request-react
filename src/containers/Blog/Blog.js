import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';


import Posts from '../Blog/Posts/Posts';
import NewPost from '../Blog/NewPost/NewPost';

import './Blog.css';

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to={{
                                pathname: '/new-post',
                                hash: '#create',
                                search: '?action=create'
                            }}>New Post</Link></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path='/' exact render={() => <h2>Home</h2>} />
                <Route path='/new-post' render={() => <h2>This is the new post page</h2>} /> */}
                <Route path='/' exact component={Posts} />
                <Route path='/new-post' exact component={NewPost} />
            </div>
        );
    }
}

export default Blog;