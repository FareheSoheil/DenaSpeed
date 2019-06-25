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
import serialize from 'serialize-javascript';
import config from '../config';

/* eslint-disable react/no-danger */

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        cssText: PropTypes.string.isRequired,
      }).isRequired,
    ),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    app: PropTypes.object, // eslint-disable-line
    children: PropTypes.string.isRequired,
  };

  static defaultProps = {
    styles: [],
    scripts: [],
  };

  render() {
    const { title, description, styles, scripts, app, children } = this.props;
    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {scripts.map(script => (
            <link key={script} rel="preload" href={script} as="script" />
          ))}
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="apple-touch-icon" href="/icon.png" />
          {styles.map(style => (
            <style
              key={style.id}
              id={style.id}
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />
          ))}
          {/* template links */}
          <link
            href="/plugins/bootstrap/dist/css/bootstrap.min.css"
            rel="stylesheet"
          />
          <link
            href="/plugins/bootstrap-rtl/dist/css/bootstrap-rtl.min.css"
            rel="stylesheet"
          />
          <link
            href="/plugins/metisMenu/dist/metisMenu.min.css"
            rel="stylesheet"
          />
          <link
            href="/plugins/simple-line-icons/css/simple-line-icons.min.css"
            rel="stylesheet"
          />
          <link
            href="/plugins/font-awesome/css/font-awesome.min.css"
            rel="stylesheet"
          />
          <link
            href="/plugins/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css"
            rel="stylesheet"
          />
          <link
            href="/plugins/switchery/dist/switchery.min.css"
            rel="stylesheet"
          />
          <link
            href="/plugins/sweetalert2/dist/sweetalert2.min.css"
            rel="stylesheet"
          />
          <link
            href="/plugins/paper-ripple/dist/paper-ripple.min.css"
            rel="stylesheet"
          />
          <link href="/plugins/iCheck/skins/square/_all.css" rel="stylesheet" />
          <link href="/css/style.css" rel="stylesheet" />
          <link href="/css/colors.css" rel="stylesheet" />
        </head>
        <body className="active-ripple theme-orange fix-header sidebar-extra">
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <script
            dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }}
          />
          {scripts.map(script => <script key={script} src={script} />)}
          {/* template scripts */}
          <script src="/js/jquery-1.12.4.min.js" />
          <script src="/plugins/jquery-migrate/jquery-migrate-1.2.1.min.js" />
          <script src="/js/holder.js" />
          <script src="/plugins/bootstrap/dist/js/bootstrap.min.js" />
          <script src="/plugins/metisMenu/dist/metisMenu.min.js" />
          <script src="/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js" />
          <script src="/plugins/paper-ripple/dist/PaperRipple.min.js" />
          <script src="/plugins/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js" />
          <script src="/plugins/sweetalert2/dist/sweetalert2.min.js" />
          <script src="/plugins/screenfull/dist/screenfull.min.js" />
          <script src="/plugins/iCheck/icheck.min.js" />
          <script src="/plugins/switchery/dist/switchery.js" />
          <script src="/js/core.js" />
          {config.analytics.googleTrackingId && (
            <script
              dangerouslySetInnerHTML={{
                __html:
                  'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
                  `ga('create','${
                    config.analytics.googleTrackingId
                  }','auto');ga('send','pageview')`,
              }}
            />
          )}
          {config.analytics.googleTrackingId && (
            <script
              src="https://www.google-analytics.com/analytics.js"
              async
              defer
            />
          )}
        </body>
      </html>
    );
  }
}

export default Html;
