import React, { Component } from "react";
import FadeIn from "react-fade-in";

class NotFound extends Component {
  render() {
    return (
      <FadeIn className="page-content" childClassName="fix-fadein">
        <div className="center-page-content text-center">
          <h1>404</h1>
          <h3>Page Not Found</h3>
        </div>
      </FadeIn>
    );
  }
}

export default NotFound;
