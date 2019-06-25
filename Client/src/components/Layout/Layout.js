/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Layout.css';
import Header from '../Header';
import SideBar from '../SideBar';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    console.log('logggggin:', this.props.context);
    let show = true;
    if (this.props.context.path === '/login') show = false;
    return show ? (
      <div>
        {/* {content} */}
        <Header />
        <div id="wrapper">
          <SideBar />
          {this.props.children}
        </div>
      </div>
    ) : (
      <div>{this.props.children}</div>
    );
  }
}

export default withStyles(normalizeCss, s)(Layout);
