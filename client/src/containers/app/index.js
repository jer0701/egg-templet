import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../home';
import Signin from '../auth/signin.js';
import Signup from '../auth/signup.js';
import Loading from '../../components/loading';
import AuthRouter from '../../components/auth-router';
import { actions as appActions, getRequestQuantity } from '../../redux/modules/app';
import { actions as authActions } from '../../redux/modules/auth';

class App extends Component {
  
  componentDidMount() {
    this.props.auth();
  }

  render() {
    const { requestQuantity } = this.props;
    return (
        <div>
            {requestQuantity > 0 && <Loading />}
            <Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/home' component={Home} />
                    <AuthRouter path='/signin' component={Signin} />
                    <AuthRouter path='/signup' component={Signup} />
                </Switch>
            </Router>
        </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    requestQuantity: getRequestQuantity(state)
  };    
};
  
const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(appActions, dispatch),
    auth: () => dispatch(authActions.getAuth())
  };    
};
  
export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(App)
