import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';


axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN HERE'
axios.defaults.headers.post['Content-Type'] = 'application/json'


//removing interceptors
// var myInterceptor = axios.interceptors.request.use(request => {
//     console.log(request)
// })
// axios.interceptors.request.eject(myInterceptor)


// axios.interceptors.request.use(request => {
//     console.log(request)
//     // aqui se puede agregar configuracion adicional al request
//     return request
// }, error => {
//     console.log(error)
//     Promise.reject(error)
// })


// axios.interceptors.response.use(response => {
//     console.log(response)

//     return response
// }, error => {
//     console.log(error)
//     return Promise.reject(error)
// })


ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
