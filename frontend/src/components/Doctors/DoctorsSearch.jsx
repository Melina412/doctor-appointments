import { useEffect, useState } from 'react';
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
  //const [filteredEntries, setFilteredEntries] = useState([]);

  //$ Autocomplete ----------------------------------------------------------------------

  useEffect(() => {
    setDoctorAutocomplete(
      doctors?.map((doctor) => `${doctor.first_name} ${doctor.last_name}`)
    );
  }, [doctors]);

  //$ handleOnChange() / filter suggestions
  const handleOnChange = (e) => {
    const inputValue = e.target.value;
    // console.log({ inputValue });
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
    setInput(suggestion);
    const matchedInput =
      doctors?.filter(
        (element) =>
          element.name &&
          element.name.toLowerCase().includes(suggestion.toLowerCase())
      ) || [];
    setFilteredOutput(matchedInput);
    setInput('');
  };

  //$ handleCheckboxes() / match specialties --------------------------------------------

  const handleCheckboxes = (specialty) => {
    setCheckedSpecialties((prev) => {
      const checked = prev.includes(specialty);
      if (checked) {
        return prev.filter((item) => item !== specialty);
      } else {
        return [...prev, specialty];
      }
    });
  };

  //* Hier den filtered Output Updaten
  useEffect(() => {
    setFilteredOutput(() => {
      if (checkedSpecialties.length > 0) {
        return doctors?.filter((entry) =>
          checkedSpecialties.includes(entry.specialty)
        );
      } else {
        return doctors;
      }
    });
  }, [checkedSpecialties, doctors]);

  const handleIconClick = () => {
    setFilter((prev) => !prev);
  };
  //! console logs

  // console.log({ doctorAutocomplete });
  console.log({ filter }, 'klick auf filter icon');
  // console.log({ checkedSpecialties });
  // console.log({ input });
  // console.log('specialties von search:', specialties);
  // console.log('********** filteredOutput von DoctorsSearch:', filteredOutput);

  //? der header ist hier innerhalb der main section der doctors page was inkorrekte html semantik ist -> ändern
  return (
    <>
      <header>
        <div className={`header-flex`}>
          <div className='left'>
            <Link to='/' title='back'>
              <div className='icon-container'>
                <img
                  src='/img/arrow-back-icon.svg'
                  alt='arrow back icon'
                  className='arrow-back'
                />
              </div>
            </Link>
          </div>
          <div className='mid'>
            <p>Doctors</p>
          </div>
          <div className='right'>
            <div className='icon-container' onClick={handleIconClick}>
              <img
                src='/img/filter-icon.svg'
                alt='filter icon'
                className='filter'
              />
            </div>
          </div>
        </div>
      </header>

      <section className='doctors-search'>
        <h1>Search</h1>

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

        <div className='searchbar'>
          <div className='input-flex'>
            <div className='search-icon'>
              <img src='/img/search-icon.svg' alt='search icon' />
            </div>
            <div className='search-input'>
              <input
                type='text'
                name='doctorName'
                value={input}
                placeholder='search for doctors'
                onChange={handleOnChange}
              />
            </div>
            {input.length > 0 && (
              <p>please klick on suggestion to select name</p>
            )}
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
    </>
  );
}

export default DoctorsSearch;
