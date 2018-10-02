import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';


import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

import './Blog.css';

class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to='/' exact activeClassName='my-active-classita' activeStyle={{color: '#f29e3e', textDecoration: 'underline'}}>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#create',
                                search: '?action=create'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path='/' exact render={() => <h2>Home</h2>} />
                <Route path='/new-post' render={() => <h2>This is the new post page</h2>} /> */}
                <Switch>
                    <Route path='/new-post' component={NewPost} />
                    <Route path='/posts' component={Posts} />
                    <Redirect from='/' to='/posts' />
                </Switch>
                
            </div>
        );
    }
}

export default Blog;