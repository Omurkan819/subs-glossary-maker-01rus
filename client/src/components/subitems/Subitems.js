import React, { Fragment, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SubitemItem from './SubitemItem';
import Spinner from '../layout/Spinner';
import { useSubitems, getSubitems } from '../../context/subitem/SubitemState';

const Subitems = () => {
  const [subitemState, subitemDispatch] = useSubitems();

  const { subitems, filtered } = subitemState;

  useEffect(() => {
    getSubitems(subitemDispatch);
  }, [subitemDispatch]);

  if (subitems !== null && subitems.length === 0) {
    return <h4>Глоссарий пуст, введите статью!</h4>;
  }

  return (
    <Fragment>
      {subitems !== null ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((subitem) => (
                <CSSTransition
                  key={subitem._id}
                  timeout={500}
                  classNames='item'
                >
                  <SubitemItem subitem={subitem} />
                </CSSTransition>
              ))
            : subitems.map((subitem) => (
                <CSSTransition
                  key={subitem._id}
                  timeout={500}
                  classNames='item'
                >
                  <SubitemItem subitem={subitem} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Subitems;
