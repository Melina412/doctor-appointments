import { useState, useEffect } from 'react';
import Profile from '../components/Dashboard/Profile';
import MyAppointments from '../components/Dashboard/MyAppointments';
import '../scss/Dashboard.scss';
import Logout from '../routes/Logout';
import { useNavigate } from 'react-router-dom';

function Dashboard({ login, setLogin, getLoginData, fetchDoctors }) {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [editAvatar, setEditAvatar] = useState(false);

  const navigate = useNavigate();

  // console.log({ profileData });

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

          {!editMode ? (
            <button onClick={() => setEditMode(true)}>edit profile</button>
          ) : (
            <>
              <Profile
                profileData={profileData}
                setEditMode={setEditMode}
                getProfileData={getProfileData}
                getLoginData={getLoginData}
                fetchDoctors={fetchDoctors}
              />
              <button onClick={() => setEditMode(false)}>cancel</button>
            </>
          )}

          <button onClick={() => setEditAvatar(true)}>edit profile pic</button>
          {editAvatar && (
            <>
              <form onSubmit={uploadAvatar}>
                <div>
                  <label htmlFor='avatar'>select profile pic to upload</label>
                  <input type='file' name='avatar' id='avatar' />
                </div>
                <button type='submit'>upload pic</button>
              </form>

              <button onClick={() => setEditAvatar(false)}>cancel</button>
            </>
          )}
          <Logout
            navigate={navigate}
            setLogin={setLogin}
            getLoginData={getLoginData}
          />
        </section>

        <MyAppointments />
      </>
      {/* ) : ( */}
      {/* <p>please login to view dashboard</p> */}
      {/* )} */}
    </main>
  );
}

export default Dashboard;
