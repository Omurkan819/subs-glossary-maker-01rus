import React from 'react';
import PropTypes from 'prop-types';
import {
  useSubitems,
  deleteSubitem,
  setCurrent,
  clearCurrent
} from '../../context/subitem/SubitemState';

const SubitemItem = ({ subitem }) => {
  // we just need the subitem dispatch without state.
  const subitemDispatch = useSubitems()[1];

  const { _id, subtitle, translation, comment, type } = subitem;

  const onDelete = () => {
    deleteSubitem(subitemDispatch, _id);
    clearCurrent(subitemDispatch);
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {subtitle}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'пересмотреть' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {translation && (
          <li>
            <i className='far fa-edit' /> {translation}
          </li>
        )}
        {comment && (
          <li>
            <i className='fas fa-comment-alt' /> {comment}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(subitemDispatch, subitem)}
        >
          Изменить
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Удалить
        </button>
      </p>
    </div>
  );
};

SubitemItem.propTypes = {
  subitem: PropTypes.object.isRequired
};

export default SubitemItem;
