import { useLocation } from 'react-router-dom';
import Header from './Header';
import { templates } from './header.templates.jsx';
import { useState, useEffect } from 'react';
import { createBrowserHistory } from 'history';

function HeaderTemplate({ loginData, userLogout, login }) {
  const location = useLocation();
  const headerItems = templates(loginData?.username);
  const [prevLocation, setPrevLocation] = useState(null);

  console.log(location);
  console.log(headerItems);

  const history = createBrowserHistory();
  console.log({ history });

  // useEffect(() => {
  //   return history.listen(({ location, action }) => {
  //     if (action === 'PUSH' || action === 'POP') {
  //       setPrevLocation(location.pathname);
  //     }
  //   });
  // }, []);

  let route;
  if (location.pathname === '/') {
    route = 'Home';
  } else if (location.pathname === '/doctors') {
    route = 'Doctors';
  } else if (location.pathname === '/login') {
    route = 'Login';
  } else if (location.pathname.startsWith('/doctor/details')) {
    route = 'Details';
  } else if (location.pathname.startsWith('/appointment')) {
    route = 'Appointment';
  } else if (location.pathname === '/dashboard') {
    route = 'Dashboard';
  } else {
    route = 'Default';
  }

  const { left, mid, right } = headerItems[route] || {};

  return (
    <Header
      left={left}
      mid={mid}
      right={right}
      loginData={loginData}
      userLogout={userLogout}
      login={login}
    />
  );
}

export default HeaderTemplate;
