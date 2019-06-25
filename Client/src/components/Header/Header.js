/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { toastr } from 'react-redux-toastr';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import history from '../../history';
import { fetchWithTimeOut } from '../../fetchWrapper';
import { SERVER, ERRORS, SUCCESS } from '../../constants/Constants';

class Header extends React.Component {
  toggleMenu = () => {
    const el = document.getElementsByTagName('body')[0];
    if (el.getAttribute('class').indexOf('sidebar-collapse') !== -1)
      el.classList.remove('sidebar-collapse');
    else {
      // window.alert(el.getAttribute('class').indexOf('sidebar-collapse'));
      el.classList.add('sidebar-collapse');
    }
  };
  handleFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  };

  logOut = () => {
    const id = {
      userSecretToken: localStorage.getItem('userSecretToken'),
    };

    const logoutURL = `${SERVER}/state/removeState`;
    const logoutOptions = {
      method: 'POST',
      body: JSON.stringify(id),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetchWithTimeOut(
      logoutURL,
      logoutOptions,
      data => {
        if (data.status === SUCCESS.SUCCESS) {
          // if (localStorage.getItem('userSecretToken'))
          // remove localStorage
          localStorage.removeItem('userSecretToken');
          history.push('/login');
        } else {
          toastr.error(ERRORS.TITLE, data.payload);
        }
      },
      error => {
        toastr.error(ERRORS.TITLE, ERRORS.CONNECTION_FAILED);
        console.error(error);
      },
    );
  };

  render() {
    return (
      <div className="navbar navbar-fixed-top" id="main-navbar">
        <div className={`header-right ${s.logo}`}>
          <a href="/" className="logo-con">
            <span>اپلیکیشن دنا</span>
          </a>
        </div>
        <div className="header-left">
          <div className="top-bar">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a
                  onClick={this.toggleMenu}
                  className="btn"
                  id="toggle-sidebar"
                >
                  <span />
                </a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-left">
              <li className="dropdown">
                <a
                  className="btn"
                  id="toggle-fullscreen"
                  onClick={this.handleFullscreen}
                >
                  <i className="icon-size-fullscreen" />
                </a>
              </li>
              <li className="dropdown">
                <a
                  className="dropdown-toggle btn"
                  data-toggle="dropdown"
                  onClick={this.logOut}
                >
                  <i className="icon-power" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
