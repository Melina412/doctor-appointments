import { useState, useEffect } from 'react';
import EditProfile from '../components/Dashboard/EditProfile';
import MyAppointments from '../components/Dashboard/MyAppointments';
import '../scss/Dashboard.scss';
import Logout from '../routes/Logout';
import { useNavigate } from 'react-router-dom';

function Dashboard({ login, setLogin, getLoginData, fetchDoctors }) {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [editAvatar, setEditAvatar] = useState(false);
  const [gridStyle, setGridStyle] = useState('closed');

  const navigate = useNavigate();

  // console.log({ profileData });
  console.log({ gridStyle });

  //$ getProfileData() ----------------------------------------------------

  async function getProfileData() {
    const res = await fetch(
      `${import.meta.env.VITE_BACKENDURL}/api/user/profile`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
      }
    );
    const data = await res.json();
    // console.log('response getProfileData:', data);

    if (res.ok) {
      setProfileData(data);
    }
  }

  useEffect(() => {
    getProfileData();
  }, []);

  //$ uploadAvatar() --------------------------------------------------------

  async function uploadAvatar(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/user/image`,
        {
          method: 'PUT',
          body: form,
          credentials: 'include',
        }
      );

      if (res.ok) {
        setEditAvatar(false);
        getProfileData();
      } else if (res.status === 404) {
        console.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAvatarBtn = () => {
    editAvatar ? setEditAvatar(false) : setEditAvatar(true);
    gridStyle === 'open' ? setGridStyle('closed') : setGridStyle('open');
  };

  const handleEditBtn = () => {
    editMode ? setEditMode(false) : setEditMode(true);
    gridStyle === 'open' ? setGridStyle('closed') : setGridStyle('open');
  };

  return (
    <main className='dashboard'>
      {/* {login ? ( */}
      <>
        <section className='profile'>
          <h2>Hello {profileData?.name}</h2>
          <div className='avatar-container'>
            <div
              className='blur-bg'
              style={{ backgroundImage: `url(${profileData?.avatar})` }}></div>

            <img width={100} src={profileData?.avatar} alt='user avatar' />
          </div>

          <section className={`dashboard-actions ${gridStyle}`}>
            {/* //$ logout btn ------  */}
            <Logout
              navigate={navigate}
              setLogin={setLogin}
              getLoginData={getLoginData}
            />

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
                {/* <button onClick={handleEditBtn}>cancel</button> */}
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
                  <form onSubmit={uploadAvatar}>
                    <div className='avatar-input'>
                      <label htmlFor='avatar' id='avatar-label'>
                        Select image to use as avatar.
                      </label>
                      <input type='file' name='avatar' id='avatar' />
                    </div>
                    <div className='buttons'>
                      <button type='submit' className='submit'>
                        Upload
                      </button>
                      <button
                        type='button'
                        className='cancel'
                        onClick={handleAvatarBtn}>
                        Cancel
                      </button>
                    </div>
                  </form>
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
