import React, { Component } from "react";

import LangSelector from "./LangSelector";
import UploadAvatar from "./UploadAvatar";

class Modals extends Component {
  render() {
    return (
      <div id="modals">
        <LangSelector />
        <UploadAvatar />
      </div>
    );
  }
}

export default Modals;
