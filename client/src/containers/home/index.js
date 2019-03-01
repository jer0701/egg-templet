import React, { Component } from 'react';
import { connect } from "react-redux";
import { actions as authActions } from '../../redux/modules/auth';
import { Button } from 'antd';


class Home extends Component {

    render() {
        return <Button onClick={() => {
            this.props.logout();
        }}>logout</Button>
    }
}


const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch(authActions.logout())
    };
};
  
export default connect(
    null,
    mapDispatchToProps
)(Home)