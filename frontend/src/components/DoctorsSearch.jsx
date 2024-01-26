import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function DoctorsSearch({
  doctors,
  specialties,
  filteredOutput,
  setFilteredOutput,
}) {
  const [filter, setFilter] = useState(false);
  const [checkedSpecialties, setCheckedSpecialties] = useState([]);
  const [doctorAutocomplete, setDoctorAutocomplete] = useState('');
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);

  //$ Autocomplete ----------------------------------------------------------------------

  useEffect(() => {
    setDoctorAutocomplete(
      doctors?.map((doctor) => `${doctor.first_name} ${doctor.last_name}`)
    );
  }, []);

  //$ handleOnChange() / filter suggestions
  const handleOnChange = (e) => {
    const inputValue = e.target.value;
    console.log({ inputValue });
    setInput(inputValue);

    const filteredSuggestions = doctorAutocomplete
      .filter((suggestion) =>
        suggestion.toLowerCase().startsWith(inputValue.toLowerCase())
      )
      .concat(
        doctorAutocomplete.filter(
          (suggestion) =>
            suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
            !suggestion.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    setSuggestions(filteredSuggestions);
  };

  //$ handleOnClick() / match input
  const handleOnClick = (e) => {
    const suggestion = e.target.value;
    console.log({ suggestion });
    setInput(suggestion);
    const matchedInput =
      doctors?.filter(
        (element) =>
          element.name &&
          element.name.toLowerCase().includes(suggestion.toLowerCase())
      ) || [];
    console.log({ matchedInput });
    setFilteredOutput(matchedInput);
    setInput('');
  };

  //$ handleCheckboxes() / match specialties --------------------------------------------

  // das hier funktioniert
  const handleCheckboxes = (specialty) => {
    const checked = checkedSpecialties.includes(specialty);

    if (checked) {
      setCheckedSpecialties((prev) =>
        prev.filter((item) => item !== specialty)
      );
    } else {
      setCheckedSpecialties((prev) => [...prev, specialty]);
    }
    console.log('filteredOutput:', filteredOutput);
    console.log('checkedSpecialties:', checkedSpecialties);
  };

  // ab hier gibt es ein problem:
  // ich hatte filteredEntries zuerst nur als const innerhalb des useEffect und hab dann dafür einen state benutzt, hat aber nichts gebracht

  useEffect(() => {
    setFilteredEntries(
      doctors?.filter((entry) => checkedSpecialties.includes(entry.specialty))
    );

    // setFilteredOutput((prev) => {
    //   if (filteredEntries.length > 0) {
    //     return filteredEntries;
    //   } else {
    //     return prev;
    //   }
    // });
    // so funktioniert es auch nicht

    if (filteredEntries.length > 0) {
      setFilteredOutput(filteredEntries);
    } else {
      setFilteredOutput(doctors);
    }

    console.log('checkedSpecialties aus useEffect ------ ', checkedSpecialties);
    console.log('filteredEntries aus useEffect ------ ', filteredEntries);
    console.log('### filteredOutput aus useEffect ------ ', filteredOutput);

    //# der state filteredOutput wird nicht richtig aktualisiert. dieser useEffect müsste eigentlich auch von filteredEntries abhängig sein, aber das führ zu einem infinity loop 😵‍💫
  }, [checkedSpecialties]);

  //! console logs

  //   console.log({ doctorAutocomplete });
  //   console.log({ filter }, 'klick auf filter icon');
  console.log({ checkedSpecialties });
  //   console.log({ input });
  //   console.log('specialties von search:', specialties);
  console.log('********** filteredOutput von DoctorsSearch:', filteredOutput);

  return (
    <section className='doctors-search'>
      <h1>Search</h1>

      <div className='upper-wrapper'>
        <div className='flex'>
          <Link to='/' title='back'>
            <div className='icon-container'>
              <img src='/img/arrow-icon.svg' alt='arrow back icon' />
            </div>
          </Link>

          <div
            className='icon-container'
            onClick={() => setFilter((prev) => !prev)}>
            <img src='/img/settings-icon.svg' alt='settings icon' />
          </div>
        </div>
        {filter === true && (
          <>
            {specialties.map((specialty, index) => (
              <div key={index}>
                <input
                  type='checkbox'
                  name={specialty}
                  checked={checkedSpecialties.includes(specialty)}
                  onChange={() => handleCheckboxes(specialty)}
                />
                <label htmlFor={specialty}>{specialty}</label>
              </div>
            ))}
          </>
        )}
      </div>

      <div className='searchbar'>
        <div className='input-flex'>
          <input
            type='text'
            name='doctorName'
            value={input}
            placeholder='🔎 search for doctors'
            onChange={handleOnChange}
          />
          {input.length > 0 && <p>please klick on suggestion to select name</p>}
        </div>
        {input.length > 0 && (
          <div className='suggestions-list'>
            {suggestions.slice(0, 10).map((suggestion, index) => (
              <option
                className='suggestion'
                key={index}
                value={suggestion}
                onClick={handleOnClick}>
                {suggestion}
              </option>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default DoctorsSearch;
