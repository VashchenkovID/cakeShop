import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

interface IComponentProps {
  children: React.ReactNode;
}

const TransitionWrapper: React.FC<IComponentProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 100);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <>
      <CSSTransition
        in={isOpen}
        classNames={"my-node"}
        timeout={300}
        unmountOnExit
      >
        {children}
      </CSSTransition>
    </>
  );
};

export default TransitionWrapper;
