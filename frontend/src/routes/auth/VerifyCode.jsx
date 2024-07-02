import { useParams, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';

function VerifyCode() {
  const params = useParams();
  let path = params.id;
  console.log({ path });

  const codeRef = useRef(null);
  let codeInput = '';

  const navigate = useNavigate();

  const [invalid, setInvalid] = useState(false);

  async function verifyCode() {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/auth/verify-code`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ codeInput, path }),
        }
      );
      const response = await res.json();
      if (res.ok) {
        console.log(response.message);
        navigate(`/review/${path}`);
      } else {
        console.error(response.message);
        setInvalid(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    codeInput = codeRef.current.value;
    console.log({ codeInput });
    codeRef.current.value = '';

    verifyCode();
  };

  return (
    <section>
      <h2>enter verification code:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='code'
          id='code'
          minLength={6}
          maxLength={6}
          ref={codeRef}
        />
        <button type='submit'>submit</button>
      </form>
      {invalid && <p>invalid code!</p>}
    </section>
  );
}

export default VerifyCode;
