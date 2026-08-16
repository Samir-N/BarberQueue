import React, { useState } from 'react';

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  error,
  disabled = false,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-text-high text-body mb-2 font-ui font-semibold">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        className={`
          w-full
          bg-surface-base
          border-2
          rounded-md
          px-4 py-3
          text-text-high
          placeholder:text-text-disabled
          font-ui text-body
          transition-all duration-250 ease-default
          focus:outline-none
          ${error ? 'border-semantic-error' : isFocused ? 'border-gold-functional drop-shadow-gold' : 'border-surface-l3'}
          ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-semantic-error text-caption mt-2 font-ui">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
