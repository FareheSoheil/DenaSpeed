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
import s from './PageContent.css';

class PageContent extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div id="page-content">
        {this.props.children}
        <div className="row footer-container">
          <div className="col-md-12">
            <div className="copyright">
              <p className="pull-right">
                کلیه حقوق قالب مدیران محفوظ می باشد و کپی برداری از آن به هیچ
                عنوان جایز نیست.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(normalizeCss, s)(PageContent);
