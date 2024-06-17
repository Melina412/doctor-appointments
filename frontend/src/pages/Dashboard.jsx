import { useState, useEffect } from 'react';
import Profile from '../components/Dashboard/Profile';
import MyAppointments from '../components/Dashboard/MyAppointments';
import '../scss/Dashboard.scss';

function Dashboard({ login, getLoginData, fetchDoctors }) {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [editAvatar, setEditAvatar] = useState(false);

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
      <h1>Dashboard</h1>
      {/* {login ? ( */}
      <>
        <h2>Hello {profileData?.name}</h2>

        <section className='picture'>
          <div className='avatar-container'>
            <img src={profileData?.avatar} alt='user avatar' />
          </div>
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
        </section>

        <MyAppointments />
        <h2>Profile</h2>
        {editMode ? (
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
        ) : (
          <button onClick={() => setEditMode(true)}>edit profile</button>
        )}
      </>
      {/* ) : ( */}
      {/* <p>please login to view dashboard</p> */}
      {/* )} */}
    </main>
  );
}

export default Dashboard;
