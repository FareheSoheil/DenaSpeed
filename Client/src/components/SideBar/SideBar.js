import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './SideBar.css';

const titles = [
  { title: 'خانه', icon: 'fas fa-home', url: '/', isDropDown: false },
  {
    title: 'ماشین ها',
    icon: 'fas fa-car',
    isDropDown: true,
    children: [
      { title: 'لیست ماشین ها', icon: 'fas fa-list-ol', url: '/cars' },
      { title: 'افزودن ماشین ', icon: 'fas fa-plus', url: '/createCar' },
    ],
  },
  {
    title: 'جریمه ها',
    icon: 'fas fa-calendar-minus',
    isDropDown: true,
    children: [
      {
        title: 'لیست جریمه ها',
        icon: 'fas fa-list-ol',
        url: '/violations',
      },
      {
        title: 'افزودن جریمه',
        icon: 'fas fa-plus',
        url: '/createViolation',
      },
    ],
  },
  {
    title: 'تغییر رمز عبور',
    icon: 'fas fa-key',
    url: '/changepass',
    isDropDown: false,
  },
  {
    title: '  ثبت کاربر سامانه ',
    icon: 'fas fa-user-plus',
    url: '/register',
    isDropDown: false,
  },
  {
    title: 'گزارش گیری',
    icon: 'fas fa-chart-bar',
    url: '/reports',
    isDropDown: false,
  },
  {
    title: 'آپلود و دانلود فایل',
    icon: 'fas fa-home',
    url: '/importExport',
    isDropDown: false,
  },
];
class SideBar extends React.Component {
  static propTypes = {
    role: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  };

  // Handle ripple effect
  handleRipple(id) {
    const el = document.getElementById(id);
    if (
      el.getAttribute('class') &&
      el.getAttribute('class').indexOf('active') !== -1
    ) {
      el.classList.remove('active');
      el.childNodes.forEach(child => {
        child.classList.remove('in');
      });
    } else {
      el.classList.add('active');
      el.childNodes.forEach(child => {
        child.classList.add('in');
      });
    }
  }

  render() {
    return (
      <div id="sidebar">
        <div className="sidebar-top">
          <div className="user-box">
            <div className={`containter-fluid ${s.userDetail} user-details`}>
              <div className="row">
                <div className="col-sm-12">
                  <span>
                    <h4>{`نام کاربر\xa0 : \xa0 ${this.props.name} ${
                      this.props.lastName
                    }`}</h4>
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-1" />
                <div className="col-sm-11 ">
                  {' '}
                  دسترسی &nbsp;: &nbsp;{this.props.role}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="side-menu-container">
          <ul className=" metismenu" id="side-menu">
            {titles.map(
              (t, i) =>
                t.isDropDown ? (
                  <li
                    id={`id${i}`}
                    key={i}
                    onClick={e => {
                      this.handleRipple(`id${i}`);
                    }}
                  >
                    <a data-toggle="dropdown">
                      <span>
                        <i className={`${s.titleIcons} ${t.icon}`} />
                        <span>
                          {t.title}{' '}
                          <i className={`${s.dropDownIcon} fas fa-sort-down`} />
                        </span>
                      </span>
                    </a>
                    <ul className="collapse">
                      {t.children.map((child, j) => (
                        <li key={j}>
                          <a href={`${child.url}`}>
                            <span>
                              <i className={`${s.titleIcons} ${child.icon}`} />
                              <span>{child.title}</span>
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={i} id={`id${i}`}>
                    <a href={`${t.url}`}>
                      <span>
                        <i className={`${s.titleIcons} ${t.icon}`} />
                        <span>{t.title}</span>
                      </span>
                    </a>
                  </li>
                ),
            )}
          </ul>
        </div>
      </div>
    );
  }
}
export default withStyles(s)(SideBar);
