/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import $ from "jquery";
import { login } from "../../services/auth";

import styles from "./loginmodal.module.scss";

class LoginModal extends Component {
  handleRegisterButton() {
    $("#loginModal").modal("hide");
    $("#registerModal").modal("show");
  }

  handleLoginButton() {
    $("#registerModal").modal("hide");
    $("#loginModal").modal("show");
  }

  login = async e => {
    e.preventDefault();
    login("token");
    this.setState({ isAuthenticated: true });
    window.location.reload();
  };

  render() {
    return (
      <div
        className="modal fade"
        id="loginModal"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className={`${styles.loginModal} modal-body`}>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4
                className="modal-title text-center w-100"
                id="exampleModalCenterTitle"
              >
                <span style={{ color: "#B10003" }}>Red</span>NX
              </h4>
              <div className={`${styles.bar}`}>
                <div className="">
                  <div className={`${styles.button} ${styles.active} float-left`}>
                    <a
                      className={`text-center`}
                      role="button"
                      onClick={this.handleLoginButton}
                    >
                      Login
                    </a>
                    <hr />
                  </div>
                  <div
                    className={`${styles.button} float-left`}
                  >
                    <a
                      className={`text-center`}
                      role="button"
                      onClick={this.handleRegisterButton}
                    >
                      Registrar
                    </a>
                    <hr />
                  </div>
                  <div
                    className={`${styles.button} float-none`}
                  >
                    &nbsp;
                  </div>
                </div>
                <hr />
              </div>
              <form className={styles.form}>
                <div className="form-group">
                  <label>Usuário</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Usuário ou Email"
                  />
                </div>
                <div className="form-group">
                  <label>Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Senha"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    A senha precisa ter no mínimo 8 caracteres
                  </small>
                </div>
                <div className="form-group">
                  <a className="form-check-label" href="#">
                    Esqueceu a sua senha ?
                  </a>
                </div>
                <button type="submit" className="btn btn-primary btn-block" onClick={this.login}>
                  Entrar
                </button>
              </form>
              <hr />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginModal;
