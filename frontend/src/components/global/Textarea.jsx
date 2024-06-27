import { useState } from 'react';

function Textarea({ name, id, cols, rows, ref, maxChars }) {
  const [text, setText] = useState('');
  const [remainingChars, setRemainingChars] = useState(maxChars);

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
          style={{ width: '100%' }}></textarea>

        <p
          className='chars'
          style={{ textAlign: 'right' }}>{`${remainingChars}/${maxChars}`}</p>
      </div>
    </>
  );
}

export default Textarea;
