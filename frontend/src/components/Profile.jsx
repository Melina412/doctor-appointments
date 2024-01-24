import { useState, useRef, useEffect } from 'react';

// beim ersten einloggen nach der registrierung soll geprüft werden ob ein profil existiert
// und falls nicht soll das eingabefolrmular angezeigt werden, ansonsten das komplette dashboard
// eigentlich wäre es noch besser erst eine mail mit cide zur auth des users zu schicken und dann kann das profil erstellt werden

function Profile({ profileData, setEditMode, getProfileData, getLoginData }) {
  const [selectedDays, setSelectedDays] = useState({
    Monday: {
      checked: profileData?.visiting_hours?.Mon ? true : false,
      id: 'Mon',
      open: profileData?.visiting_hours?.Mon?.open || '',
      close: profileData?.visiting_hours?.Mon?.close || '',
    },
    Tuesday: {
      checked: profileData?.visiting_hours?.Tue ? true : false,
      id: 'Tue',
      open: profileData?.visiting_hours?.Tue?.open || '',
      close: profileData?.visiting_hours?.Tue?.close || '',
    },
    Wednesday: {
      checked: profileData?.visiting_hours?.Wed ? true : false,
      id: 'Wed',
      open: profileData?.visiting_hours?.Wed?.open || '',
      close: profileData?.visiting_hours?.Wed?.close || '',
    },
    Thursday: {
      checked: profileData?.visiting_hours?.Thu ? true : false,
      id: 'Thu',
      open: profileData?.visiting_hours?.Thu?.open || '',
      close: profileData?.visiting_hours?.Thu?.close || '',
    },
    Friday: {
      checked: profileData?.visiting_hours?.Fri ? true : false,
      id: 'Fri',
      open: profileData?.visiting_hours?.Fri?.open || '',
      close: profileData?.visiting_hours?.Fri?.close || '',
    },
    Saturday: {
      checked: profileData?.visiting_hours?.Sat ? true : false,
      id: 'Sat',
      open: profileData?.visiting_hours?.Sat?.open || '',
      close: profileData?.visiting_hours?.Sat?.close || '',
    },
    Sunday: {
      checked: profileData?.visiting_hours?.Sun ? true : false,
      id: 'Sun',
      open: profileData?.visiting_hours?.Sun?.open || '',
      close: profileData?.visiting_hours?.Sun?.close || '',
    },
  });

  //   console.log({ selectedDays });

  // visiting hours default values
  const [defaultHours, setDefaultHours] = useState({
    visiting_hours: profileData?.visiting_hours,
  });
  //   console.log({ defaultHours });

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
      console.log({ updatedDays });
    };
    updateDefaultHours();
  }, []);

  async function editProfile(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    console.log({ form });
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/user/edit`,
        {
          method: 'PUT',
          body: form,
          credentials: 'include',
        }
      );

      if (res.ok) {
        console.log('edit Profile hat was gemacht');
        setEditMode(false);
        await getProfileData();
        getLoginData();
      } else if (res.status === 400) {
        console.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section>
      <h1>Profile</h1>

      <form onSubmit={editProfile}>
        <div>
          <label htmlFor='title'>
            title
            <select name='title' id='title' defaultValue={profileData?.title}>
              <option value={null}>none</option>
              <option value='Dr.'>Dr.</option>
              <option value='Prof.'>Prof.</option>
            </select>
          </label>
        </div>

        <div>
          <label htmlFor='firstName'>
            first name
            <input
              type='text'
              name='firstName'
              id='firstName'
              autoComplete='given-name'
              defaultValue={profileData?.first_name}
            />
          </label>
        </div>

        <div>
          <label htmlFor='lastName'>
            last name
            <input
              type='text'
              name='lastName'
              id='lastName'
              autoComplete='family-name'
              defaultValue={profileData?.last_name}
            />
          </label>
        </div>

        <div>
          <label htmlFor='specialty'>specialty</label>
          <input
            type='text'
            name='specialty'
            id='specialty'
            defaultValue={profileData?.specialty}
          />
        </div>

        {/* <div>
          <label htmlFor='avatar'>profile pic</label>
          <input type='file' name='avatar' id='avatar' />
        </div> */}

        <div>
          <label htmlFor='about'>about</label>
          <textarea
            name='about'
            id='about'
            cols='30'
            rows='10'
            defaultValue={profileData?.about}></textarea>
        </div>

        <article>
          <p>visiting hours</p>
          <div>
            {Object.entries(selectedDays).map(
              ([day, { checked, id, open, close }]) => (
                <div key={day}>
                  <label htmlFor={id}>
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
                    {day}
                  </label>
                  {checked && (
                    <div>
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
        <button type='submit'>submit</button>
      </form>
    </section>
  );
}

export default Profile;
