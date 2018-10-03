import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* Por defecto BrowserRouter recibe su basename como /, por ende no es necesario
          setear dicho prop si la app esta hosteada en la raiz del dominio
         */}
        {/* <BrowserRouter basename="/my-app-here"> */}
        <BrowserRouter>
          <Blog />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
