import { useState } from 'react';

function Textarea({ name, id, cols, rows, ref, maxChars, defaultValue }) {
  const [text, setText] = useState(defaultValue || '');
  const [remainingChars, setRemainingChars] = useState(
    defaultValue && defaultValue.length > 1
      ? maxChars - defaultValue.length
      : maxChars
  );

  const handleChange = (e) => {
    const inputText = e.target.value;
    if (inputText.length <= maxChars) {
      setText(inputText);
      setRemainingChars(maxChars - inputText.length);
    }
  };
  return (
    <>
      <div className='textarea'>
        <textarea
          value={text}
          name={name}
          id={id}
          cols={cols}
          rows={rows}
          ref={ref}
          maxLength={maxChars}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: 0 }}></textarea>
        <p
          className='chars'
          style={{
            textAlign: 'right',
            marginBottom: '2rem',
          }}>{`${remainingChars}/${maxChars}`}</p>
      </div>
    </>
  );
}

export default Textarea;
