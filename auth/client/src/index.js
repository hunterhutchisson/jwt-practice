import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Welcome from './components/Welcome';
import Feature from './components/Feature'; //protect
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import BaseLayout from './components/layout/BaseLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import  './assets/styles.scss';
import {createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk'
import {Provider} from 'react-redux';
import reducer from './reducers/reducer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { checkToken } from './actions';
import RequireAuth from './components/RequireAuth';




// initializing redux store
// requires a reducer. Second argument is for redux dev-tools extension.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(reducer, {},
  composeEnhancers(applyMiddleware(reduxThunk)));

store.dispatch(checkToken());

//provider hooks react to redux.  
//Must pass redux instance to provider via "store" prop.

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router>
      <BaseLayout>
          <Routes>
            <Route path='/' element={<App />}/>
            <Route path='/welcome' element={<Welcome />}/>
            <Route path='/signup' element={<Signup />}/>
            <Route path='/feature' element={<RequireAuth><Feature /></RequireAuth>}/>
            <Route path='/signout' element={<Signout />}/>
            <Route path='/signin' element={<Signin />}/>
          </Routes>
      </BaseLayout>
      </Router>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
