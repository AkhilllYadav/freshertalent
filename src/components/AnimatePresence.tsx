
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import React from 'react';

export const AnimatePresence: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  
  return (
    <TransitionGroup className="relative w-full">
      <CSSTransition
        key={location.key}
        timeout={400}
        classNames="page"
        unmountOnExit
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};
