import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from 'react-router-dom';
import { getLoggedUser } from "../../redux/modules/auth";

class AuthRouter extends Component {

  render() {
    const { user, ...rest} = this.props;
    if (user.username) {
        if (window.location.pathname.startsWith('/signin') || window.location.pathname.startsWith('/signup')) {
            return <Redirect to={{ pathname: "/", state: { from: this.props.location }}} />
        }
    } 
    return (
        <Route {...rest} />
    )
  }
}

const mapStateToProps = (state) => {
    return {
      user: getLoggedUser(state)
    };
};

  
export default connect(
    mapStateToProps,
    null
)(AuthRouter);
