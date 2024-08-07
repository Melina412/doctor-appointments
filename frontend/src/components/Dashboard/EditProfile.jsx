import { useState, useRef, useEffect } from 'react';
import getSelectedDays from '../../utils/getSelectedDays';
import Textarea from '../global/Textarea';
import authFetch from '../../utils/authFetch.js';
import getApiUrl from '../../utils/getApiUrl.js';

// beim ersten einloggen nach der registrierung soll man direkt zum profile formular navigiert werden (nicht fertig)

function EditProfile({
  profileData,
  setEditMode,
  getProfileData,
  getLoginData,
  fetchDoctors,
  setGridStyle,
  handleEditBtn,
}) {
  const API_URL = getApiUrl();
  const [selectedDays, setSelectedDays] = useState(
    profileData ? getSelectedDays(profileData) : null
  );

  // visiting hours default values
  const [defaultHours, setDefaultHours] = useState({
    visiting_hours: profileData?.visiting_hours,
  });

  useEffect(() => {
    const updateDefaultHours = () => {
      const updatedDays = { ...selectedDays };

      Object.entries(defaultHours?.visiting_hours || {}).forEach(
        ([day, { open, close }]) => {
          if (updatedDays[day]) {
            updatedDays[day] = {
              ...updatedDays[day],
              checked: true,
              open,
              close,
            };
          }
        }
      );
      setSelectedDays(updatedDays);
      // console.log({ updatedDays });
    };
    updateDefaultHours();
  }, []);

  //$ editProfile() --------------------------------------------------------

  async function editProfile(e) {
    e.preventDefault();
    handleEditBtn();
    const form = new FormData(e.target);
    try {
      const res = await authFetch(`${API_URL}/api/user/edit`, {
        method: 'PUT',
        body: form,
      });

      const response = await res.json();

      if (res.ok) {
        // console.log(response.message);
        setEditMode(false);
        await getProfileData();
        getLoginData();
        fetchDoctors();
      } else if (res.status === 400) {
        console.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // console.log({ selectedDays });
  //   console.log({ defaultHours });

  return (
    <section className='edit-profile'>
      <h3>Edit Profile Data</h3>

      <form onSubmit={editProfile}>
        <label htmlFor='title'>Title</label>
        <div className='select-focus'>
          <select name='title' id='title' defaultValue={profileData?.title}>
            <option value={null}>none</option>
            <option value='Dr.'>Dr.</option>
            <option value='Prof.'>Prof.</option>
          </select>
        </div>

        <label htmlFor='firstName'>First name</label>
        <input
          type='text'
          name='firstName'
          id='firstName'
          autoComplete='given-name'
          defaultValue={profileData?.first_name}
        />

        <label htmlFor='lastName'>Last name</label>
        <input
          type='text'
          name='lastName'
          id='lastName'
          autoComplete='family-name'
          defaultValue={profileData?.last_name}
        />

        <label htmlFor='specialty'>Specialty</label>
        <input
          type='text'
          name='specialty'
          id='specialty'
          defaultValue={profileData?.specialty}
        />

        <label htmlFor='about'>About</label>
        <Textarea
          name='about'
          id='about'
          cols='30'
          rows='10'
          defaultValue={profileData?.about}
          ref={null}
          maxChars={500}
        />

        <article className='hours'>
          <h4>Visiting Hours</h4>
          <div className='wrapper'>
            {Object.entries(selectedDays).map(
              ([day, { checked, id, open, close }]) => (
                <div key={day} className='day'>
                  <div className='check-day'>
                    <input
                      type='checkbox'
                      name={id}
                      id={id}
                      checked={checked}
                      onChange={() =>
                        setSelectedDays((prevDays) => ({
                          ...prevDays,
                          [day]: {
                            ...prevDays[day],
                            checked: !prevDays[day].checked,
                          },
                        }))
                      }
                    />
                    <label htmlFor={id}>{day}</label>
                  </div>
                  {checked && (
                    <div className='times'>
                      <label htmlFor={`${id}_open`}>
                        open
                        <input
                          type='time'
                          name={`${id}_open`}
                          id={`${id}_open`}
                          defaultValue={open}
                        />
                      </label>
                      <label htmlFor={`${id}_close`}>
                        close
                        <input
                          type='time'
                          name={`${id}_close`}
                          id={`${id}_close`}
                          defaultValue={close}
                        />
                      </label>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </article>
        <div className='buttons'>
          <button type='button' className='cancel' onClick={handleEditBtn}>
            Cancel
          </button>
          <button type='submit' className='submit'>
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditProfile;
