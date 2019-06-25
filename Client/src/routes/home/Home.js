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
// import Select from 'react-select';
import s from './Home.css';
import ContainerBox from '../../components/ContainerBox';
import DataTable from '../../components/DataTable';
import { setRuntimeVariable } from '../../actions/runtime';

class Home extends React.Component {
  static propTypes = {
    news: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        content: PropTypes.string,
      }),
    ).isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: '',
    };
  }
  // componentDidMount() {
  //   // window.alert('mounted');
  //   this.props.context.store.dispatch(
  //     setRuntimeVariable({
  //       name: 'initialThen',
  //       value: 'sssssssssssssss',
  //     }),
  //   );
  // }
  render() {
    const options = [
      { value: 'op1', label: 'option1' },
      { value: 'op2', label: 'option1' },
      { value: 'op3', label: 'option1' },
      { value: 'op4', label: 'option1' },
    ];
    return (
      <div className="row">
        {' '}
        <ContainerBox title="پنل اصلی">
          <h1>لیست جریمه ها</h1>
          {/* <Select
            value={this.state.selectedValue}
            onChange={this.handleChange}
            options={options}
          /> */}
          <DataTable />
        </ContainerBox>
      </div>
    );
  }
}

export default withStyles(s)(Home);
