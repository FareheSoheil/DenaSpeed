import React from 'react';
import PropTypes from 'prop-types';

class ContainerBox extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
  };
  render() {
    const headerStyle = {
      color: '#d2a73a',
      // fontWeight: 'bold',
    };
    const boxContainer = {
      paddingBottom: '70px',
    };
    return (
      <div className="col-md-12">
        <div className="portlet box border shadow curve">
          <div className="portlet-heading">
            <div className="portlet-title">
              <h2 className=" title" style={headerStyle}>
                <i className="icon-star" />
                &nbsp;
                {this.props.title}
              </h2>
            </div>
          </div>
          <div className="portlet-body" style={boxContainer}>
            {this.props.children}{' '}
          </div>
        </div>
      </div>
    );
  }
}

export default ContainerBox;
