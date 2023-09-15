import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux' ; 
import { createStore, applyMiddleware, compose } from 'redux';
import { reducers } from './reducers';
import thunk from 'redux-thunk' ; 
import { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';



const store = createStore(reducers , compose(applyMiddleware(thunk))) ; 

ReactDOM.render(

  <Provider store={store}>
    <App />
     <Toaster />  
  </Provider>,
  document.getElementById('root')
);

