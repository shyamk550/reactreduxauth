import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AUTH_USER } from './actions/types'
import Header from './containers/header'
import Welcome from './components/welcome'

import Signin from './containers/auth/signin'
import Signout from './components/auth/signout'
import Signup from './containers/auth/signup'
import { PrivateRoute } from './containers/auth/require_auth'
import Feature from './containers/feature'
import reducers from './reducers'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap with material-ui
//injectTapEventPlugin()

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)
const token = localStorage.getItem('token')
const theme = createMuiTheme();

if (token) {
  store.dispatch({type: AUTH_USER})
}


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <div>
          <Header/>
          <Route path="/" exact={true} component={Welcome}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/signout" component={Signout}/>
          <Route path="/signup" component={Signup}/>
          <PrivateRoute path="/feature" component={Feature}/>
        </div>
      </MuiThemeProvider>
    </Router>
  </Provider>
  , document.getElementById('root'))
