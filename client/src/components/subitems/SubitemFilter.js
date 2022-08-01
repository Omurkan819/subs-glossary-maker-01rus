import React from 'react';
import {
  useSubitems,
  filterSubitems,
  clearFilter
} from '../../context/subitem/SubitemState';

const SubitemFilter = () => {
  // we just need the conact dispatch without state.
  const subitemDispatch = useSubitems()[1];

  const onChange = (e) => {
    if (e.target.value !== '') {
      filterSubitems(subitemDispatch, e.target.value);
    } else {
      clearFilter(subitemDispatch);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input type='text' placeholder='Поиск по субтитрам или переводу' onChange={onChange} />
    </form>
  );
};

export default SubitemFilter;
