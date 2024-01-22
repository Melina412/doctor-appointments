import DoctorItem from './DoctorItem';

function DoctorsList({ doctors }) {
  return (
    <section className='doctors-list'>
      <h1>DoctorsList</h1>
      {doctors?.map((doctor, index) => (
        <DoctorItem key={index} doctor={doctor} />
      ))}
    </section>
  );
}

export default DoctorsList;
