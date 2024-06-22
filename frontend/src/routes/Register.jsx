import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const userRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [register, setRegister] = useState(false);

  async function userRegister() {
    const newUser = {
      email: userRef.current.value,
      password: passwordRef.current.value,
    };

    // console.log({ newUser });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/auth/register`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(newUser),
        }
      );

      const response = await res.json();
      // console.log(response);

      if (res.ok) {
        userRef.current.value = '';
        passwordRef.current.value = '';
        setRegister(true);
        navigate('/login');
        // console.log(response.message);
      } else if (res.status === 400) {
        console.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleRegister = () => {
    userRegister();
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleRegister();
    }
  };

  return (
    <section className='register'>
      <h1>Register</h1>

      <p>Doctors who want to join the platform can create an account here.</p>
      <p>
        Patients don't need to sign up, just search for a doctor and book your
        appointment today!
      </p>

      <div>
        <label htmlFor='email'>User</label>
        <input
          type='email'
          name='email'
          placeholder='your email'
          ref={userRef}
        />
      </div>

      <div>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          placeholder='password'
          ref={passwordRef}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account? <Link href='/login'>Login</Link>
      </p>
    </section>
  );
}

export default Register;
