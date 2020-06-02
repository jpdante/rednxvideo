import React, { Component } from "react";
import i18n from "../../../services/i18n";
import { withTranslation } from "react-i18next";

import AvatarEditor from "react-avatar-editor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../../library/api";
import { setProfilePicture } from "../../../services/profile";

import styles from "./uploadavatar.module.scss";

class UploadAvatar extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
    this.state = {
      file: null,
      fileName: null,
      scale: 1.0,
      borderRadius: 0.0,
      rotate: 0.0,
      uploading: false,
      success: false,
    };
  }

  setEditorRef = (editor) => (this.editor = editor);

  changeFile = (e) => {
    if (this.fileInput.current.files.length > 0) {
      this.setState({
        success: false,
        file: this.fileInput.current.files[0],
        fileName: this.fileInput.current.files[0].name,
      });
    }
  };

  savePicture = async () => {
    if (this.editor) {
      this.setState({ error: null, success: false });
      if (this.state.file == null) {
        this.setState({ error: "errors.noImageSelected" });
        return;
      }
      try {
        this.setState({ uploading: true });
        const canvas = this.editor.getImage().toDataURL("image/png");
        const response = await api.uploadNewPicture(canvas);
        if (response.data.success) {
          this.setState({ uploading: false, success: true });
          setProfilePicture(response.data.guid);
          window.location.reload();
        } else {
          this.setState({
            uploading: false,
            error: response.data.message,
            errorData: response.data,
          });
        }
      } catch (err) {
        this.setState({ uploading: false, error: err });
      }
    } else {
      console.error("No editor found!");
      alert("No editor found!");
    }
  };

  rotateAdd90 = (e) => {
    var rotation = this.state.rotate;
    rotation = rotation + 90;
    if (rotation > 360) {
      rotation = 90;
    }
    this.setState({
      rotate: rotation,
    });
  };

  rotateRemove90 = (e) => {
    var rotation = this.state.rotate;
    rotation = rotation - 90;
    if (rotation < 0) {
      rotation = 270;
    }
    this.setState({
      rotate: rotation,
    });
  };

  render() {
    const { t } = this.props;
    return (
      <div
        className="modal fade"
        id="uploadAvatarModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="uploadAvatarModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{t("modals.uploadAvatar")}</h5>
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
              {this.state.error && (
                <div className="alert alert-danger" role="alert">
                  {t(this.state.error, this.state.errorData)}
                </div>
              )}
              <AvatarEditor
                ref={this.setEditorRef}
                image={this.state.file}
                width={150}
                height={150}
                border={10}
                color={[0, 0, 0, 0.6]}
                scale={this.state.scale}
                borderRadius={this.state.borderRadius}
                rotate={this.state.rotate}
                className={styles.canvas}
              />
              <br />
              <div className="custom-file mb-3">
                <input
                  type="file"
                  className="custom-file-input"
                  id="validatedCustomFile"
                  required
                  onChange={this.changeFile}
                  ref={this.fileInput}
                  accept="image/x-png,image/gif,image/jpeg"
                />
                <label
                  className="custom-file-label"
                  htmlFor="validatedCustomFile"
                >
                  {this.state.fileName == null
                    ? t("modals.chooseFile")
                    : this.state.fileName}
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="formControlRange">Zoom</label>
                <input
                  type="range"
                  className="form-control-range"
                  min="1"
                  max="2"
                  step="0.01"
                  id="formControlRange"
                  onChange={(e) => {
                    this.setState({
                      scale: parseFloat(e.target.value),
                    });
                  }}
                  value={this.state.scale}
                />
              </div>
              <div className="form-group">
                <label htmlFor="formControlRange">Border Radius</label>
                <input
                  type="range"
                  className="form-control-range"
                  min="0"
                  max="100"
                  step="1"
                  id="formControlRange"
                  onChange={(e) => {
                    this.setState({
                      borderRadius: parseFloat(e.target.value),
                    });
                  }}
                  value={this.state.borderRadius}
                />
              </div>
              <div className="form-group text-center">
                <label htmlFor="formControlRange">Rotation</label>
                <br />
                <button
                  type="button"
                  className="btn btn-primary mx-1"
                  onClick={this.rotateRemove90}
                >
                  <FontAwesomeIcon icon="undo" />
                </button>
                <button
                  type="button"
                  className="btn btn-primary mx-1"
                  onClick={this.rotateAdd90}
                >
                  <FontAwesomeIcon icon="redo" />
                </button>
                <input
                  type="range"
                  className="form-control-range mt-1"
                  min="0"
                  max="360"
                  step="1"
                  id="formControlRange"
                  onChange={(e) => {
                    this.setState({
                      rotate: parseFloat(e.target.value),
                    });
                  }}
                  value={this.state.rotate}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                {t("modals.close")}
              </button>
              <button
                type="button"
                className={`btn ${
                  this.state.success ? "btn-success" : "btn-primary"
                }`}
                onClick={this.savePicture}
              >
                {this.state.uploading ? (
                  <div className="spinner-border" role="status">
                    <span className="sr-only">{t("modals.saving")}</span>
                  </div>
                ) : this.state.success ? (
                  t("modals.saved")
                ) : this.state.file == null ? (
                  t("modals.removePicture")
                ) : (
                  t("modals.save")
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(UploadAvatar);
