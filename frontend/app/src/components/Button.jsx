import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = `
    font-ui inline-flex items-center justify-center
    rounded-md font-semibold
    transition-all duration-250 ease-default
    focus:outline-none focus:ring-2 focus:ring-gold-functional focus:ring-offset-2 focus:ring-offset-surface-base
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-gradient-to-br from-gold-functional to-gold-decorative
      text-surface-base
      hover:scale-102 hover:drop-shadow-gold
      active:scale-95
    `,
    secondary: `
      bg-transparent
      border-2 border-gold-functional
      text-gold-functional
      hover:bg-gold-functional hover:bg-opacity-10
      active:border-gold-decorative active:text-gold-decorative
    `,
    tertiary: `
      bg-transparent
      text-text-medium hover:text-text-high
      hover:bg-surface-l2
      active:bg-surface-l3
    `,
    danger: `
      bg-semantic-error
      text-white
      hover:opacity-90
      active:scale-95
    `,
    success: `
      bg-semantic-success
      text-white
      hover:opacity-90
      active:scale-95
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-body',
    md: 'px-6 py-3 text-body-lg',
    lg: 'px-8 py-4 text-body-lg',
  };

  const buttonStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={buttonStyles}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
