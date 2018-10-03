import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';


import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

import './Blog.css';

class Blog extends Component {
    state = {
        auth: false
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to='/posts' activeClassName='my-active-classita' activeStyle={{color: '#f29e3e', textDecoration: 'underline'}}>Home</NavLink></li>
                            <li>
                                {this.state.auth
                                    ? <NavLink to={{
                                            pathname: '/new-post',
                                            hash: '#create',
                                            search: '?action=create'}}>New Post</NavLink>
                                    : <p style={{margin: 0, padding: 0}}>New post (not authorized)</p>
                                }
                            </li>
                            <li>
                                <NavLink to='/another-route-here'>Another route??</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path='/' exact render={() => <h2>Home</h2>} />
                <Route path='/new-post' render={() => <h2>This is the new post page</h2>} /> */}
                <Switch>
                    {this.state.auth ? <Route path='/new-post' component={NewPost} /> : null}
                    {/* esto crea un guard que impide el acceso a dicha ruta a ciertos usuarios */}
                    <Route path='/posts' component={Posts} />
                    <Redirect exact from='/' to='/posts' /> 
                    {/* la ruta 404 debe estar de ultimo y el redirect se le pasa exact
                      para que puedan coexistir el redirect y el route siguiente dentro del switch
                      */}
                    <Route render={() => <h2>404 Page not found</h2>} />
                </Switch>
                
            </div>
        );
    }
}

export default Blog;