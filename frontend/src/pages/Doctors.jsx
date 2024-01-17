import DoctorsList from '../components/DoctorsList';

function Doctors() {
  // sample data
  let doctors = [
    {
      name: 'Dr. Cordula Kirschmeier',
      specialty: 'Orthopädie',
      avatar: 'img/avatar.png',
    },
    {
      name: 'Dr. Hans Müller',
      specialty: 'Pneumologie',
      avatar: 'img/avatar.png',
    },
    {
      name: 'Dr. Pikachu',
      specialty: 'Pokemon',
      avatar: 'img/avatar.png',
    },
  ];

  return (
    <main className='doctors'>
      <h1>Doctors</h1>
      <DoctorsList doctors={doctors} />
    </main>
  );
}

export default Doctors;
