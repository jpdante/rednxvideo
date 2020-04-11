import React, { Component } from "react";
import { Link } from 'react-router-dom'

import { isAuthenticated } from "../../services/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./sidebar.module.scss";

class SideBar extends Component {
  state = {
    isAuthenticated: isAuthenticated()
  };

  render() {
    return (
      <div className={`${styles.sideBar}`}>
        <div id="main-nav">
          <nav className={`${styles.navVertical} nav flex-column`}>
            <li className={`${styles.navTable}`}>
              <a className={`${styles.navLink} nav-link disabled`} href="/">
                <FontAwesomeIcon icon="fire" className={styles.icon} /> Em Alta
              </a>
            </li>
            <li className={`${styles.navTable}`}>
              <a className={`${styles.navLink} nav-link disabled`} href="/">
                <FontAwesomeIcon icon="thumbs-up" className={styles.icon} />{" "}
                Recomendados
              </a>
            </li>
            <li className={`${styles.navTable}`}>
              <a className={`${styles.navLink} nav-link disabled`} href="/">
                <FontAwesomeIcon
                  icon="satellite-dish"
                  className={styles.icon}
                />{" "}
                Ao Vivo
              </a>
            </li>
            <li className={`${styles.navTable}`}>
              <a className={`${styles.navLink} nav-link disabled`} href="/" alt="Desativado">
                <FontAwesomeIcon icon="heart" className={styles.icon} />{" "}
                Seguindo
              </a>
            </li>
            <li className={`${styles.navTable}`}>
              <a className={`${styles.navLink} nav-link disabled`} href="/">
                <FontAwesomeIcon icon="history" className={styles.icon} />{" "}
                Historico
              </a>
            </li>
          </nav>
        </div>
        <div
          id="following-nav"
          className={this.state.isAuthenticated ? "show" : "noAuthentication"}
        >
          <hr />
          <nav className={`${styles.navVertical} nav flex-column`}>
            <p>Seguindo</p>
            <li className={`${styles.navTable}`}>
              <a className={`${styles.navLink} nav-link`} href="/">
                <div className="float-left">
                  <img
                    src="https://yt3.ggpht.com/a/AATXAJyVzvS5VwifcSWwYzMSjz0SjtKCNuQ3cjcQ7Q=s288-c-k-c0xffffffff-no-rj-mo"
                    width="21"
                    height="21"
                    className="rounded-circle mx-auto d-inline-block align-top"
                    alt="Profile"
                  />
                  PentagramaSG
                </div>
                <div className="float-right">
                  <span className="badge badge-primary">3</span>
                </div>
              </a>
            </li>
            <li className={`${styles.navTable}`}>
              <a className={`${styles.navLink} nav-link`} href="/">
                <div className="float-left">
                  <img
                    src="https://yt3.ggpht.com/a/AATXAJxyFPzS26mEMneX4cFmE11hm2sbc9s7GOyM5g=s288-c-k-c0xffffffff-no-rj-mo"
                    width="21"
                    height="21"
                    className="rounded-circle mx-auto d-inline-block align-top"
                    alt="Profile"
                  />
                  MikaGamer
                </div>
                <div className="float-right">
                  <span className="badge badge-primary">5</span>
                </div>
              </a>
            </li>
            <li className={`${styles.navTable}`}>
              <a className={`${styles.navLink} nav-link`} href="/">
                <div className="float-left">
                  <img
                    src="https://yt3.ggpht.com/-sNHMsBMptyM/AAAAAAAAAAI/AAAAAAAAAAA/vsaEYt0DpQI/s108-c-k-c0x00ffffff-no-rj-mo/photo.jpg"
                    width="21"
                    height="21"
                    className="rounded-circle mx-auto d-inline-block align-top"
                    alt="Profile"
                  />
                  Ellisiumx
                </div>
              </a>
            </li>
            <li className={`${styles.navTable}`}>
              <a className={`${styles.navLink} nav-link`} href="/">
                <div className="float-left">
                  <img
                    src="https://yt3.ggpht.com/a/AATXAJxGOgmcqR8CvdWpCMMABdif-wvgZeeE5xIeqw=s288-c-k-c0xffffffff-no-rj-mo"
                    width="21"
                    height="21"
                    className="rounded-circle mx-auto d-inline-block align-top"
                    alt="Profile"
                  />
                  Caverinha
                </div>
                <div className="float-right">
                  <span className="badge badge-primary">7</span>
                </div>
              </a>
            </li>
          </nav>
        </div>
        <hr />
        <nav className={`${styles.navVertical} nav flex-column`}>
          <p>Categorias</p>
          <li className={`${styles.navTable}`}>
            <Link className={`${styles.navLink} nav-link`} to="/category?c=science">
              <FontAwesomeIcon icon="vial" className={styles.icon} />
              Ciência e Tecnologia
            </Link>
          </li>
          <li className={`${styles.navTable}`}>
            <Link className={`${styles.navLink} nav-link`} to="/category?c=comedy">
              <FontAwesomeIcon icon="theater-masks" className={styles.icon} />
              Comédia
            </Link>
          </li>
          <li className={`${styles.navTable}`}>
            <Link className={`${styles.navLink} nav-link`} to="/category?c=games">
              <FontAwesomeIcon icon="gamepad" className={styles.icon} />
              Jogos
            </Link>
          </li>
          <li className={`${styles.navTable}`}>
            <Link className={`${styles.navLink} nav-link`} to="/category?c=vlog">
              <FontAwesomeIcon icon="camera" className={styles.icon} />
              Vlogs
            </Link>
          </li>
          <li className={`${styles.navTable}`}>
            <Link className={`${styles.navLink} nav-link`} to="/category?c=sports">
              <FontAwesomeIcon icon="futbol" className={styles.icon} />
              Esportes
            </Link>
          </li>
          <li className={`${styles.navTable}`}>
            <Link className={`${styles.navLink} nav-link`} to="/category?c=education">
              <FontAwesomeIcon icon="graduation-cap" className={styles.icon} />
              Educação
            </Link>
          </li>
        </nav>
      </div>
    );
  }
}

export default SideBar;
