import React, { Component } from "react";
import i18n from "../../services/i18n";
import { withTranslation } from "react-i18next";
import {
  setLanguage,
  setAutoLanguage,
  getAutoLanguage,
  getLanguage,
} from "../../services/utils";

class LangSelector extends Component {
  constructor(props) {
    super(props);
    if (getAutoLanguage()) {
      this.state = {
        value: "Auto",
      };
    } else {
      switch (getLanguage()) {
        case "en":
          this.state = {
            value: "English",
          };
          break;
        case "pt":
          this.state = {
            value: "Portugues",
          };
          break;
        case "en-US":
          this.state = {
            value: "English",
          };
          break;
        case "pt-BR":
          this.state = {
            value: "Portugues",
          };
          break;
        default:
          this.state = {
            value: "Auto",
          };
          break;
      }
    }
  }

  change = (e) => {
    switch (e.target.value) {
      case "Auto":
        setAutoLanguage(true);
        setLanguage("en");
        i18n.changeLanguage(getLanguage());
        break;
      case "English":
        setAutoLanguage(false);
        setLanguage("en");
        i18n.changeLanguage("en");
        break;
      case "Portugues":
        setAutoLanguage(false);
        setLanguage("pt");
        i18n.changeLanguage("pt");
        break;
      default:
        setAutoLanguage(true);
        this.setState({ value: "Auto" });
        i18n.changeLanguage(getLanguage());
        break;
    }
    this.setState({ value: e.target.value });
  };

  render() {
    const { t } = this.props;
    return (
      <div
        className="modal fade"
        id="languageModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="languageModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="languageModal">
                {t("modals.changeLanguage")}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <select
                className="form-control"
                onChange={this.change}
                value={this.state.value}
              >
                <option>Auto</option>
                <option>English</option>
                <option>Portugues</option>
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                {t("modals.close")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(LangSelector);
