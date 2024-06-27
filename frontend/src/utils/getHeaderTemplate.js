import React from 'react';

export const getHeaderTemplate = (
  username,
  prevLocation,
  login,
  Link,
  logout
) => {
  return {
    Home: {
      left: login ? `Welcome, ${username}` : null,
      mid: null,
      right: React.createElement(
        'div',
        { className: 'home-right' },
        React.createElement(
          Link,
          { to: '/dashboard', title: 'dashboard' },
          React.createElement(
            'div',
            { className: 'icon-container' },
            null,
            React.createElement('img', {
              key: 'schedule',
              src: '/img/schedule-icon.svg',
              className: 'schedule',
            })
          )
        ),
        React.createElement(
          'details',
          null,
          React.createElement(
            'summary',
            null,
            React.createElement(
              'div',
              { className: 'icon-container', title: 'login' },
              null,
              React.createElement('img', {
                key: 'dots',
                src: '/img/dots-icon.svg',
                className: 'dots',
              })
            )
          ),
          React.createElement(
            'div',
            { className: 'links' },
            null,
            React.createElement(
              Link,
              {
                to: '/login',
                title: 'login',
              },
              'Login'
            ),
            React.createElement(
              Link,
              { to: '/register', title: 'register' },
              'Register'
            )
          )
        )
      ),
    },
    // Doctors header is in DoctorsSearch.jsx for search/filter function
    Doctors: {
      left: null,
      mid: null,
      right: null,
    },
    Details: {
      left: React.createElement(
        Link,
        { to: '/doctors', title: 'back' },
        React.createElement(
          'div',
          { className: 'icon-container' },
          null,
          React.createElement('img', {
            key: 'arrow',
            src: '/img/arrow-back-icon.svg',
            className: 'arrow-back',
          })
        )
      ),
      mid: null,
      right: React.createElement(
        'div',
        { className: 'icon-container' },
        React.createElement('img', {
          key: 'dots',
          src: '/img/dots-icon.svg',
          className: 'dots',
        })
      ),
    },
    Appointment: {
      left: React.createElement(
        Link,
        { to: prevLocation, title: 'back' },
        React.createElement(
          'div',
          null,
          React.createElement('img', {
            key: 'arrow',
            src: '/img/arrow-back-icon.svg',
          })
        )
      ),
      mid: 'New Appointment',
      right: React.createElement('div', {
        className: 'empty',
      }),
    },
    Dashboard: {
      left: React.createElement(
        Link,
        { to: prevLocation, title: 'back' },
        React.createElement(
          'div',
          null,
          React.createElement('img', {
            key: 'arrow',
            src: '/img/arrow-back-icon.svg',
          })
        )
      ),
      mid: 'Dashboard',
      right: React.createElement('div', {
        className: 'empty',
      }),
    },
    Login: {
      left: React.createElement(
        Link,
        { to: '/', title: 'home' },
        React.createElement(
          'div',
          null,
          React.createElement('img', {
            key: 'arrow',
            src: '/img/arrow-back-icon.svg',
          })
        )
      ),
      mid: 'Login',
      right: React.createElement('div', {
        className: 'empty',
      }),
    },
    Register: {
      left: React.createElement(
        Link,
        { to: '/', title: 'home' },
        React.createElement(
          'div',
          null,
          React.createElement('img', {
            key: 'arrow',
            src: '/img/arrow-back-icon.svg',
          })
        )
      ),
      mid: 'Register',
      right: React.createElement('div', {
        className: 'empty',
      }),
    },
  };
};
