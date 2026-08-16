import React from 'react';

const Card = ({
  children,
  elevation = 'l1',
  className = '',
  interactive = false,
  onClick,
  ...props
}) => {
  const elevationStyles = {
    l1: 'bg-surface-l1 drop-shadow-card',
    l2: 'bg-surface-l2 drop-shadow-surface-l2',
    l3: 'bg-surface-l3 drop-shadow-surface-l2',
  };

  const interactiveStyles = interactive
    ? `cursor-pointer transition-all duration-250 ease-default hover:drop-shadow-card-hover hover:-translate-y-1`
    : '';

  return (
    <div
      className={`
        rounded-lg
        border border-surface-l3 border-opacity-50
        p-5
        ${elevationStyles[elevation]}
        ${interactiveStyles}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
