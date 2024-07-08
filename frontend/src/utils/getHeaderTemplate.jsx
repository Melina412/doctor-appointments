import React from 'react';
import { Link } from 'react-router-dom';
import Settings from '../components/global/Settings';

export const getHeaderTemplate = (user, username, prevLocation, login) => {
  return {
    Home: {
      left: <p>{login ? `Welcome, ${username}` : null}</p>,
      mid: null,
      right: (
        <div className='home-right'>
          <Link to='/dashboard' title='dashboard'>
            <div className='icon-container'>
              <img
                key='schedule'
                src='/img/schedule-icon.svg'
                className='schedule'
              />
            </div>
          </Link>
          <details>
            <summary>
              <div className='icon-container' title='login'>
                <img key='dots' src='/img/dots-icon.svg' className='dots' />
              </div>
            </summary>
            <div className='links'>
              <Link to='/login' title='login'>
                Login
              </Link>
              <Link to='/register' title='register'>
                Register
              </Link>
            </div>
          </details>
        </div>
      ),
    },
    // Doctors header is in DoctorsSearch.jsx for search/filter function
    Doctors: {
      left: null,
      mid: null,
      right: null,
    },
    Details: {
      left: (
        <Link to='/doctors' title='back'>
          <div className='icon-container'>
            <img
              key='arrow'
              src='/img/arrow-back-icon.svg'
              className='arrow-back'
            />
          </div>
        </Link>
      ),
      mid: null,
      right: (
        <div className='icon-container'>
          <img key='dots' src='/img/dots-icon.svg' className='dots' />
        </div>
      ),
    },
    Appointment: {
      left: (
        <Link to={prevLocation} title='back'>
          <div>
            <img key='arrow' src='/img/arrow-back-icon.svg' />
          </div>
        </Link>
      ),
      mid: 'New Appointment',
      right: <div className='empty' />,
    },
    Dashboard: {
      left: (
        <Link to='/' title='back'>
          <div>
            <img key='arrow' src='/img/arrow-back-icon.svg' />
          </div>
        </Link>
      ),
      mid: 'Dashboard',
      right: (
        <>
          <div
            className='icon-container'
            title='settings'
            onClick={() =>
              document.getElementById(`settings-user-${user}`).showModal()
            }>
            <img key='dots' src='/img/dots-icon.svg' className='dots' />
          </div>
          <dialog id={`settings-user-${user}`} className='modal'>
            <div className='modal-box'>
              <Settings />
              <div className='modal-action'>
                <form method='dialog'>
                  {/* if there is a button in form, it will close the modal */}
                  <button>Save</button>
                </form>
              </div>
            </div>
          </dialog>
        </>
      ),
    },
    Login: {
      left: (
        <Link to='/' title='home'>
          <div>
            <img key='arrow' src='/img/arrow-back-icon.svg' />
          </div>
        </Link>
      ),
      mid: 'Login',
      right: <div className='empty' />,
    },
    Register: {
      left: (
        <Link to='/' title='home'>
          <div>
            <img key='arrow' src='/img/arrow-back-icon.svg' />
          </div>
        </Link>
      ),
      mid: 'Register',
      right: <div className='empty' />,
    },
  };
};
