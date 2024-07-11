import { useState, useEffect } from 'react';
import EditProfile from '../components/Dashboard/EditProfile';
import MyAppointments from '../components/Dashboard/MyAppointments';
import '../scss/Dashboard.scss';
import Logout from './auth/Logout';
import { useNavigate } from 'react-router-dom';
import ImageUpload from '../components/Dashboard/ImageUpload';
import authFetch from '../utils/authFetch.js';
import getApiUrl from '../utils/getApiUrl.js';

function Dashboard({ setLogin, getLoginData, fetchDoctors }) {
  const API_URL = getApiUrl();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [editAvatar, setEditAvatar] = useState(false);
  const [gridStyle, setGridStyle] = useState('closed');
  const navigate = useNavigate();

  //$ getProfileData() ----------------------------------------------------

  async function getProfileData() {
    const res = await authFetch(`${API_URL}/api/user/profile`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
    });
    const data = await res.json();
    // console.log('response getProfileData:', data);

    if (res.ok) {
      setProfileData(data);
    }
    return data;
  }

  useEffect(() => {
    getProfileData();
  }, []);

  //? das war wegen dem falsch angezeigten username auf der landingpage nach register, aber hab noch keine lösung gefunden
  // const [newUser, setNewUser] = useState(profileData?.name ? false : true);
  // console.log({ newUser });

  // useEffect(() => {
  //   if (newUser) {
  //     setEditMode(true);
  //     setEditAvatar(true);
  //     setGridStyle('open');
  //   }
  // }, [profileData]);
  //! wenn ich das mache geht gar nix mehr. react rastet aus wegen den nicht existierenden visiting hours und man kann die auch nicht mal mehr bearbeiten wtaf

  const handleAvatarBtn = () => {
    editAvatar ? setEditAvatar(false) : setEditAvatar(true);
    gridStyle === 'open' ? setGridStyle('closed') : setGridStyle('open');
  };

  const handleEditBtn = () => {
    editMode ? setEditMode(false) : setEditMode(true);
    gridStyle === 'open' ? setGridStyle('closed') : setGridStyle('open');
  };

  // console.log({ profileData });
  // console.log({ gridStyle });

  return (
    <main className='dashboard'>
      <>
        <section className='profile'>
          {/* <h2>Hello {newUser ? profileData?.email : profileData?.name}</h2> */}
          <h2>Hello {profileData?.name}</h2>
          <div className='avatar-container'>
            <div
              className='blur-bg'
              style={{ backgroundImage: `url(${profileData?.avatar})` }}></div>

            <img width={100} src={profileData?.avatar} alt='user avatar' />
          </div>

          <section className={`dashboard-actions ${gridStyle}`}>
            {/* //$ logout btn ------  */}
            {gridStyle === 'closed' && (
              <Logout
                navigate={navigate}
                setLogin={setLogin}
                getLoginData={getLoginData}
              />
            )}

            {/* //$ edit profile btn ------  */}
            {!editMode ? (
              <button
                className={editAvatar ? 'hide' : ''}
                onClick={handleEditBtn}>
                Edit Profile
              </button>
            ) : (
              <>
                <EditProfile
                  profileData={profileData}
                  setEditMode={setEditMode}
                  getProfileData={getProfileData}
                  getLoginData={getLoginData}
                  fetchDoctors={fetchDoctors}
                  setGridStyle={setGridStyle}
                  handleEditBtn={handleEditBtn}
                />
              </>
            )}

            {/* //$ edit avatar btn ------  */}
            {!editAvatar ? (
              <button
                className={editMode ? 'hide' : ''}
                onClick={handleAvatarBtn}>
                Edit Avatar
              </button>
            ) : (
              <>
                <section className='edit-avatar'>
                  <ImageUpload
                    handleAvatarBtn={handleAvatarBtn}
                    setEditAvatar={setEditAvatar}
                    getProfileData={getProfileData}
                  />
                </section>
              </>
            )}
          </section>
        </section>
        <MyAppointments />
      </>
    </main>
  );
}

export default Dashboard;
