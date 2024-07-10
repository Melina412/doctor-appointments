import { useState, useRef, forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import getApiUrl from '../utils/getApiUrl';
import '../scss/Review.scss';
import Textarea from '../components/global/Textarea';

function Review() {
  const API_URL = getApiUrl();
  const [rating, setRating] = useState(0);
  const [submit, setSubmit] = useState(false);
  const commentRef = useRef();
  const navigate = useNavigate();

  async function addReview() {
    const res = await fetch(`${API_URL}/api/review/add`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating, comment: commentRef.current.value }),
    });
    const response = await res.json();
    if (res.ok) {
      console.log(response.message);
      setTimeout(() => {
        console.log('redirecting to home...');
        navigate('/');
      }, 5000);
    }
  }

  const handleRating = (e) => {
    console.log(e.target.value);
    setRating(Number(e.target.value));
  };
  console.log({ rating });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    addReview();
  };
  return (
    <main>
      {!submit ? (
        <section className='review'>
          <h1>Review</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <p>
                You can rate your experience with the doctor on a scale of 1 to
                5 and leave a comment.
              </p>
            </div>
            <div className='rating-input'>
              <h2>Rating</h2>
              <div className='radio-container'>
                {[1, 2, 3, 4, 5].map((value) => (
                  <label
                    key={value}
                    htmlFor={`r-${value}`}
                    className={rating === value ? 'selected' : ''}>
                    <input
                      type='radio'
                      name='rating'
                      id={`r-${value}`}
                      value={value}
                      onChange={handleRating}
                      required
                    />
                    {value}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h2>Review comment</h2>
              <p>(optional)</p>
              <div>
                <Textarea
                  name='comment'
                  id='comment'
                  cols='30'
                  rows='10'
                  ref={commentRef}
                  maxChars={500}
                />
              </div>
            </div>
            <button type='submit' onSubmit={() => console.log('submit ok')}>
              Submit
            </button>
          </form>
        </section>
      ) : (
        <h2>Thank you for your feedback!</h2>
      )}
    </main>
  );
}

export default Review;
