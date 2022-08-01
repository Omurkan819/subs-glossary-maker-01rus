import React from 'react';
import Subitems from '../subitems/Subitems';
import SubitemForm from '../subitems/SubitemForm';
import SubitemFilter from '../subitems/SubitemFilter';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <SubitemForm />
      </div>
      <div>
        <SubitemFilter />
        <Subitems />
      </div>
    </div>
  );
};

export default Home;
