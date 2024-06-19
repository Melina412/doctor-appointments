import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Review() {
  const [rating, setRating] = useState(0);
  const [submit, setSubmit] = useState(false);
  const commentRef = useRef();
  const navigate = useNavigate();

  async function addReview() {
    const res = await fetch(
      `${import.meta.env.VITE_BACKENDURL}/api/review/add`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, comment: commentRef.current.value }),
      }
    );
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    addReview();
  };
  return (
    <main>
      <h1>Review</h1>

      {!submit ? (
        <section>
          <form onSubmit={handleSubmit}>
            <div>
              You can rate your experience with the doctor on a scale of 1 to 5
              and leave a comment.
            </div>
            <div>
              <h2>Rating</h2>
              <div>
                <label htmlFor='r-1'>1</label>
                <input
                  type='radio'
                  name='rating'
                  id='r-1'
                  value={1}
                  onChange={handleRating}
                  required
                />
              </div>
              <div>
                <label htmlFor='r-2'>2</label>
                <input
                  type='radio'
                  name='rating'
                  id='r-2'
                  value={2}
                  onChange={handleRating}
                  required
                />
              </div>
              <div>
                <label htmlFor='r-3'>3</label>
                <input
                  type='radio'
                  name='rating'
                  id='r-3'
                  value={3}
                  onChange={handleRating}
                  required
                />
              </div>
              <div>
                <label htmlFor='r-4'>4</label>
                <input
                  type='radio'
                  name='rating'
                  id='r-4'
                  value={4}
                  onChange={handleRating}
                  required
                />
              </div>
              <div>
                <label htmlFor='r-5'>5</label>
                <input
                  type='radio'
                  name='rating'
                  id='r-5'
                  value={5}
                  onChange={handleRating}
                  required
                />
              </div>
            </div>

            <div>
              <h2>Review comment</h2>
              <p>(optional)</p>
              <div>
                <textarea
                  name='comment'
                  id='comment'
                  cols='30'
                  rows='10'
                  ref={commentRef}></textarea>
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
