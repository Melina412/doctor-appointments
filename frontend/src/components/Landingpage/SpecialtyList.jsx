import SpecialtyItem from './SpecialtyItem';

function SpecialtyList({ specialties }) {
  return (
    <section className='specialty-list'>
      <h2>Specialty 😷</h2>
      <div className='list'>
      {specialties?.map((specialty, index) => (
        <SpecialtyItem key={index} specialty={specialty} />
        ))}
      </div>
    </section>     
  );
}

export default SpecialtyList;
