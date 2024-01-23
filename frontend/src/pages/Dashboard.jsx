import { useState, useEffect } from 'react';
import Profile from '../components/Profile';
import IncomingReservations from '../components/IncomingReservations';

function Dashboard({ login, getLoginData }) {
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState(null);

  console.log({ profileData });

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
    console.log('response getProfileData:', data);

    if (res.ok) {
      setProfileData(data);
    }
  }
  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <main className='dashboard'>
      <h1>Dashboard</h1>
      {login ? (
        <>
          <h2>Hello {profileData?.name}</h2>

          <IncomingReservations />
          {editMode ? (
            <>
              <Profile
                profileData={profileData}
                setEditMode={setEditMode}
                getProfileData={getProfileData}
                getLoginData={getLoginData}
              />
              <button onClick={() => setEditMode(false)}>cancel</button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)}>edit profile</button>
          )}
        </>
      ) : (
        <p>please login to view dashboard</p>
      )}
    </main>
  );
}

export default Dashboard;
