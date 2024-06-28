import { Link } from 'react-router-dom';

function DoctorItem({ doctor }) {
  // console.log(doctor._id)
  return (
    <div className='doctor-item'>
      <Link to={`/doctor/details/${doctor._id}`}>
        <div className='flex'>
          <div className='avatar-container'>
            <img src={doctor.avatar} alt='avatar image' />
          </div>
          <p className='name'>
            {doctor.title} {doctor?.last_name} {doctor.first_name?.slice(0, 1)}{' '}
          </p>
          <p className='specialty'>{doctor.specialty}</p>
          <p className='rating'>
            ⭐️ <span className='rate'># rating</span> (# reviews)
          </p>
        </div>
      </Link>
    </div>
  );
}

export default DoctorItem;
