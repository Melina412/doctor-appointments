import { useState } from 'react';
import Profile from '../components/Profile';
import IncomingReservations from '../components/IncomingReservations';

function Dashboard({ login }) {
  const [editMode, setEditMode] = useState(false);
  return (
    <main className='dashboard'>
      <h1>Dashboard</h1>
      {login ? (
        <>
          <h2>Hello Dr. .......</h2>

          <IncomingReservations />
          {editMode ? (
            <>
              <Profile />
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
