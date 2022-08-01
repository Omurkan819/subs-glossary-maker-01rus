import React, { useState, useEffect } from 'react';
import {
  addSubitem,
  useSubitems,
  updateSubitem,
  clearCurrent
} from '../../context/subitem/SubitemState';

const initialSubitem = {
  subtitle: '',
  translation: '',
  comment: '',
  type: 'ok'
};

const SubitemForm = () => {
  const [subitemState, subitemDispatch] = useSubitems();

  const { current } = subitemState;

  const [subitem, setSubitem] = useState(initialSubitem);

  useEffect(() => {
    if (current !== null) {
      setSubitem(current);
    } else {
      setSubitem(initialSubitem);
    }
  }, [current]);

  const { subtitle, translation, comment, type } = subitem;

  const onChange = (e) =>
    setSubitem({ ...subitem, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addSubitem(subitemDispatch, subitem).then(() =>
        setSubitem(initialSubitem)
      );
    } else {
      updateSubitem(subitemDispatch, subitem);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent(subitemDispatch);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Редактировать статью' : 'Новая статья'}
      </h2>
      <input
        type='text'
        placeholder='Субтитр'
        name='subtitle'
        value={subtitle}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Перевод'
        name='translation'
        value={translation}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Примечание'
        name='comment'
        value={comment}
        onChange={onChange}
      />
      <h5>Subitem Type</h5>
      <input
        type='radio'
        name='type'
        value='ok'
        checked={type === 'ok'}
        onChange={onChange}
      />{' '}
      OK{' '}
      <input
        type='radio'
        name='type'
        value='пересмотреть'
        checked={type === 'пересмотреть'}
        onChange={onChange}
      />{' '}
      Пересмотреть
      <div>
        <input
          type='submit'
          value={current ? 'Добавить' : 'Добавить статью'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Очистить
          </button>
        </div>
      )}
    </form>
  );
};

export default SubitemForm;
