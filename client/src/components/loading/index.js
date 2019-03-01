import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Spin } from 'antd';
import "./style.css";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);
  }

  render() {
    return ReactDOM.createPortal(
      <Spin className="loading" size="large" />,
      this.container
    );
  }
}

export default Loading;
