import { Link } from 'react-router-dom';

export const templates = (username, prevLocation) => {
  return {
    Home: {
      left: `Welcome, ${username}`,
      mid: <></>,
      right: (
        <div className='home-right'>
          <Link to='/' title=''>
            <div>
              <img key='schedule' src='/img/schedule-icon.png' />
            </div>
          </Link>
          <Link to='/' title=''>
            <div>
              <img key='dots' src='/img/dots-icon.svg' />
            </div>
          </Link>
        </div>
      ),
    },
    // Doctors: {
    //   left: (
    //     <Link to='/' title='back'>
    //       <div>
    //         <img key='arrow' src='/img/arrow-icon.svg' />
    //       </div>
    //     </Link>
    //   ),
    //   mid: 'Doctors',
    //   right: <img key='settings' src='/img/settings-icon.svg' />,
    // },
    Doctors: {
      left: null,
      mid: null,
      right: null,
    },
    Details: {
      left: (
        <Link to={prevLocation} title='back'>
          <div>
            <img key='arrow' src='/img/arrow-icon.svg' />
          </div>
        </Link>
      ),
      mid: <></>,
      right: <img key='dots' src='/img/dots-icon.svg' />,
    },
    Appointment: {
      left: (
        <Link to={prevLocation} title='back'>
          <div>
            <img key='arrow' src='/img/arrow-icon.svg' />
          </div>
        </Link>
      ),
      mid: 'New Appointment',
      right: <></>,
    },
    Dashboard: {
      left: (
        <Link to={prevLocation} title='back'>
          <div>
            <img key='arrow' src='/img/arrow-icon.svg' />
          </div>
        </Link>
      ),
      mid: 'Dashboard',
      right: 'Logout',
    },
  };
};
