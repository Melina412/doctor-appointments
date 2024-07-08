import { useLocation, Link } from 'react-router-dom';
import Header from './Header';
import { getHeaderTemplate } from '../../utils/getHeaderTemplate';
import { useState, useEffect } from 'react';

function HeaderTemplate({ loginData, userLogout, login }) {
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState(location.pathname);
  const [prevLocation, setPrevLocation] = useState('/');

  const headerItems = getHeaderTemplate(
    loginData?.id,
    loginData?.username,
    prevLocation,
    login
  );

  // console.log('location-pathname: --', location.pathname);
  // console.log({ headerItems });
  // console.log({ prevLocation });
  // console.log({ currentRoute });
  // console.log({ headerItems });

  useEffect(() => {
    // bei reload der route soll prevLocation nicht aktualisiert werden
    if (currentRoute !== location.pathname) {
      setPrevLocation(currentRoute);
      setCurrentRoute(location.pathname);
    }
  }, [location.pathname]);

  let route;
  if (currentRoute === '/') {
    route = 'Home';
  } else if (currentRoute === '/doctors') {
    route = 'Doctors';
  } else if (currentRoute === '/login') {
    route = 'Login';
  } else if (currentRoute.startsWith('/doctor/details')) {
    route = 'Details';
  } else if (currentRoute.startsWith('/appointment')) {
    route = 'Appointment';
  } else if (currentRoute === '/dashboard') {
    route = 'Dashboard';
  } else if (currentRoute === '/login') {
    route = 'Login';
  } else if (currentRoute === '/register') {
    route = 'Register';
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
      Link={Link}
      prevLocation={prevLocation}
      route={route}
    />
  );
}

export default HeaderTemplate;
