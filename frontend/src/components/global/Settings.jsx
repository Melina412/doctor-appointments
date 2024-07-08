import '../../scss/Settings.scss';
import { useState } from 'react';
import { dateOptions as options } from '../../utils/options.js';
import { useGlobalState } from '../../utils/useGlobalState.js';

function Settings() {
  const dateUS = new Date().toLocaleString('en-US', options);
  const dateDE = new Date().toLocaleString('de-DE', options);

  const [locale, setLocale] = useGlobalState(
    'locale',
    localStorage.getItem('locale') || 'de-DE'
  );

  const handleLocaleChange = (e) => {
    setLocale(e.target.value);
    localStorage.setItem('locale', e.target.value);
  };
  console.log({ locale });

  return (
    <>
      <div className='settings'>
        <h2>Settings</h2>
        <div className='mode'>
          <p>dark mode</p>
          <label className='switch'>
            <input type='checkbox' />
            <span className='slider round'></span>
          </label>
        </div>
        <div className='locale'>
          <div className='radios'>
            <p>preferred date & time format</p>
            <div className='radio-input'>
              <input
                onChange={handleLocaleChange}
                type='radio'
                name='locale'
                id='DE'
                value='de-DE'
                checked={locale === 'de-DE'}
              />
              <label
                className={locale === 'de-DE' ? 'selected' : ''}
                htmlFor='DE'>
                DE ({dateDE})
              </label>
            </div>
            <div className='radio-input'>
              <input
                onChange={handleLocaleChange}
                type='radio'
                name='locale'
                id='US'
                value='en-US'
                checked={locale === 'en-US'}
              />
              <label
                className={locale === 'en-US' ? 'selected' : ''}
                htmlFor='US'>
                US ({dateUS})
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
