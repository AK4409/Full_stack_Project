import React from 'react';

interface InputProps {
  label?: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

function Input({
  label,
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
}: InputProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-xl border-2 text-gray-800 text-sm
          outline-none transition-all duration-200
          ${error
            ? 'border-red-400 bg-red-50 focus:border-red-500'
            : 'border-gray-200 bg-white focus:border-indigo-500 hover:border-indigo-300'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          placeholder:text-gray-400
        `}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}

export default Input;