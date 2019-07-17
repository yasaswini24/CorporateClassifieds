import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from "./Reducers/RootReducer";
import Authentication from './Authentication/Authentication';
import Register from './Authentication/Register';


const store = createStore(RootReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}>
    {/* <App /> */}
    {/* <Authentication /> */}
    <Register />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();