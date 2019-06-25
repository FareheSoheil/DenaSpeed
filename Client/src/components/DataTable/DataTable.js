/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
// import Select from 'react-dropdown-select';
// import { toastr } from 'react-redux-toastr';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './DataTable.css';
// import history from '../../history';
// import { fetchWithTimeOut } from '../../fetchWrapper';
// import { SERVER, ERRORS, SUCCESS } from '../../constants/Constants';

class DataTable extends React.Component {
  // TODO
  // props :
  //   1-array of headings
  //   2-array of rowws
  //   3-functions for handling edit and paginations
  render() {


    return (
      <div className="table-responsive">
        
        <table
          className={`table table-bordered table-striped table-hover ${
            s.table_stripe_custom
          }`}
        >
          <thead>
            <tr>
              <th>
                <i className="icon-energy" />
              </th>
              <th>نام</th>
              <th>نام خانوادگی</th>
              <th>نام کاربری</th>
              <th>نام کاربری</th>
              <th>نام کاربری</th>
              <th>نام کاربری</th>
              <th>نام کاربری</th>
              <th>نام کاربری</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>حمید</td>
              <td>آفرینش xxxxxxxxxxxxxxxxxxxxفر</td>
              <td>آفرینش xxxxxxxxxxxxxxxxxxxxفر</td>
              <td>آفرینش xxxxxxxxxxxxxxxxxxxxفر</td>
              <td>آفرینش xxxxxxxxxxxxxxxxxxxxفر</td>
              <td>آفرینش xxxxxxxxxxxxxxxxxxxxفر</td>
              <td>hamid.afarinesh</td>
            </tr>
            <tr>
              <td>2</td>
              <td>محمد</td>
              <td>دلاوری</td>
              <td>mohammad.delavari</td>
            </tr>
            <tr>
              <td>3</td>
              <td>ایمان</td>
              <td>صالحی</td>
              <td>iman.salehi</td>
            </tr>
            <tr>
              <td>4</td>
              <td>مهدی</td>
              <td>فهندژ</td>
              <td>mahdi.fahandezh</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default withStyles(s)(DataTable);
