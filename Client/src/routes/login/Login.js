import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import crypto from 'crypto';
// import cookie from 'react-cookies';
import { toastr } from 'react-redux-toastr';
import history from '../../history';
import { loginAction } from '../../actions/login_action';
import s from './Login.css';
import { fetchWithTimeOut } from '../../fetchWrapper';
import { COOKIE_EXPIRATION, SERVER, ERRORS } from '../../constants/Constants';

class Login extends React.Component {
  static propTypes = {
    loginProp: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.finalValidation = this.finalValidation.bind(this);
    this.goToForget = this.goToForget.bind(this);
  }

  finalValidation() {
    let err = '';
    if (this.state.username === '' || this.state.password === '')
      err = ERRORS.FIELD_EMPTY;
    else if (this.state.password.length < 8) err = ERRORS.PASSWORD_SHORT;
    return err;
  }
  goToForget = event => {
    event.preventDefault();
    history.replace('/forget');
  };
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const errMsg = this.finalValidation();
    if (errMsg) toastr.error('ERRORS.TITLE', errMsg);
    else {
      const loginURL = `http://localhost:3000/login`;
      const credentials = {
        username: this.state.username,
        password: crypto
          .createHash('sha256')
          .update(this.state.password)
          .digest('base64'),
      };
      const loginOptions = {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const that = this;
      fetchWithTimeOut(
        loginURL,
        loginOptions,
        data => {
          localStorage.setItem('userSecretToken', data.userSecretToken);
          that.props.loginProp(data);
          const setStateURL = `http://localhost:3000/state/setState`;
          const setStateOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          };
          fetchWithTimeOut(
            setStateURL,
            setStateOptions,
            () => {
              window.alert('satate saved');
              history.replace('/');
            },
            () => {},
          );
        },
        error => {
          toastr.error('ERRORS.TITLE', 'ERRORS.REPEATED_USER');
          console.log('login error : ', error);
        },
      );
    }
  };
  // UI
  render() {
    return (
      <div className="fix-header active-ripple theme-blue">
        {<div className="fixed-modal-bg" />}
        <div className={` ${s.fixedModalBg} modal-page shadow`}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="logo-con m-t-10 m-b-10">
                  <img
                    alt="logo"
                    src="/images/logo.png"
                    className={`${s.logo} center-block img-responsive`}
                  />
                </div>
                <h2 className="text-center m-b-20">وارد شوید</h2>
                <hr />
                <form
                  id="form"
                  className="m-t-30 m-b-30"
                  onSubmit={this.handleSubmit}
                >
                  <div className="form-group">
                    <div className="input-group round">
                      <span className="input-group-addon">
                        <i className="icon-user" />
                      </span>
                      <input
                        id="username"
                        className="form-control"
                        type="username"
                        name="username"
                        placeholder="نام کاربری"
                        onChange={this.handleChange}
                        value={this.state.username}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group round">
                      <span className="input-group-addon">
                        <i className="icon-key" />
                      </span>
                      <input
                        id="password"
                        className="form-control"
                        type="password"
                        placeholder="رمز عبور"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <p>
                    <button
                      className="btn btn-info btn-round btn-block"
                      type="submit"
                    >
                      ورود&nbsp;
                      <i className="icon-paper-plane font-lg" />
                    </button>
                  </p>
                </form>
                <hr className="m-b-30" />
                <button
                  onClick={this.goToForget}
                  className="btn btn-default btn-round btn-block m-b-10"
                >
                  رمز عبور خود را فراموش کرده ام &nbsp;
                  <i className="icon-refresh font-lg " />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const mapState = state => ({
//   availableToken: state.runtime.availableLocales,
//   currentLocale: state.intl.locale,
// });

const mapDispatch = dispatch => ({
  loginProp(data) {
    dispatch(loginAction(data));
  },
});

export default connect(null, mapDispatch)(withStyles(s)(Login));
// export default withStyles(s)(Login);
