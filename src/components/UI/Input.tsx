import React from 'react';

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = '',
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-fog-gray">
          {label}
          {required && <span className="text-blood-red ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-charcoal border rounded-lg text-white placeholder-fog-gray/50 focus:outline-none focus:ring-2 transition-colors ${
          error
            ? 'border-blood-red focus:ring-blood-red/20'
            : 'border-fog-gray/30 focus:border-ecto-green focus:ring-ecto-green/20'
        }`}
      />
      {error && <p className="text-sm text-blood-red">{error}</p>}
    </div>
  );
};