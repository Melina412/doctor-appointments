import React from 'react';

export const getHeaderTemplate = (username, prevLocation, login, Link) => {
  return {
    Home: {
      left: login ? `Welcome, ${username}` : null,
      mid: null,
      right: React.createElement(
        'div',
        { className: 'home-right' },
        React.createElement(
          Link,
          { to: '/', title: '' },
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
          Link,
          { to: '/', title: '' },
          React.createElement(
            'div',
            { className: 'icon-container' },
            null,
            React.createElement('img', {
              key: 'dots',
              src: '/img/dots-icon.svg',
              className: 'dots',
            })
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
        { to: prevLocation, title: 'back' },
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
            src: '/img/arrow-icon.svg',
          })
        )
      ),
      mid: 'New Appointment',
      right: null,
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
            src: '/img/arrow-icon.svg',
          })
        )
      ),
      mid: 'Dashboard',
      right: 'Logout',
    },
  };
};
