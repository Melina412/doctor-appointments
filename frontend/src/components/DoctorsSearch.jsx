import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function DoctorsSearch({ doctors, specialties, setFilteredOutput }) {
  const doctorRef = useRef();

  const [filter, setFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [doctorAutocomplete, setDoctorAutocomplete] = useState('');
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setDoctorAutocomplete(
      doctors?.map((doctor) => `${doctor.first_name} ${doctor.last_name}`)
    );
    setFilterOptions(specialties);
  }, []);

  console.log({ doctorAutocomplete });

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

          <div className='icon-container' onClick={() => setFilter(true)}>
            <img src='/img/settings-icon.svg' alt='settings icon' />
          </div>
        </div>
        {filterOptions && (
          <>
            <input type='checkbox' />
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
