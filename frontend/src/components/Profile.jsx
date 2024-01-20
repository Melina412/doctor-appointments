import { useState } from 'react';

function Profile() {
  const [selectedDays, setSelectedDays] = useState({
    Monday: { checked: false, id: 'mon' },
    Tuesday: { checked: false, id: 'tue' },
    Wednesday: { checked: false, id: 'wed' },
    Thursday: { checked: false, id: 'thu' },
    Friday: { checked: false, id: 'fri' },
    Saturday: { checked: false, id: 'sat' },
    Sunday: { checked: false, id: 'sun' },
  });
  //   console.log({ selectedDays });

  return (
    <section>
      <h1>Profile</h1>

      <form>
        <div>
          <label htmlFor='title'>
            title
            <select name='title' id='title'>
              <option value={null}>none</option>
              <option value='dr'>Dr.</option>
              <option value='prof'>Prof.</option>
            </select>
          </label>
        </div>

        <div>
          <label htmlFor='first-name'>
            first name
            <input
              type='text'
              name='first-name'
              id='first-name'
              autoComplete='given-name'
            />
          </label>
        </div>

        <div>
          <label htmlFor='last-name'>
            family name
            <input
              type='text'
              name='last-name'
              id='last-name'
              autoComplete='family-name'
            />
          </label>
        </div>

        <div>
          <label htmlFor='specialty'>specialty</label>
          <input type='text' name='specialty' id='specialty' />
        </div>

        <div>
          <label htmlFor='avatar'>profile pic</label>
          <input type='file' name='avatar' id='avatar' />
        </div>

        <div>
          <label htmlFor='about'>about</label>
          <textarea name='about' id='about' cols='30' rows='10'></textarea>
        </div>

        <article>
          <p>visiting hours</p>
          <div>
            {Object.entries(selectedDays).map(([day, { checked, id }]) => (
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
                    <label htmlFor={`${id}-open`}>
                      open
                      <input
                        type='time'
                        name={`${id}-open`}
                        id={`${id}-open`}
                      />
                    </label>
                    <label htmlFor={`${id}-close`}>
                      close
                      <input
                        type='time'
                        name={`${id}-close`}
                        id={`${id}-close`}
                      />
                    </label>
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>
        <button type='submit'>submit</button>
      </form>
    </section>
  );
}

export default Profile;
