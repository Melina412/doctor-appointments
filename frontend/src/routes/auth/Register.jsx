import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../scss/LoginRegister.scss';

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
        navigate('/login', { state: { feedback: response.user_feedback } });
        console.log(response.message);
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
    <section className='login-register'>
      <h1>Register</h1>
      <article>
        <div className='text'>
          <p>
            <span>Doctors</span> who want to join the platform can create an
            account here.
          </p>
          <p>
            <span>Patients</span> don't need to sign up, just search for a
            doctor and book your appointment today!
          </p>
        </div>

        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            placeholder='enter your email'
            ref={userRef}
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='choose a password'
            ref={passwordRef}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <button onClick={handleRegister}>Register</button>
        </div>
        <div className='method'>
          <p>
            Already have an account? <Link to={'/login'}>Login</Link>
          </p>
        </div>
      </article>
    </section>
  );
}

export default Register;
