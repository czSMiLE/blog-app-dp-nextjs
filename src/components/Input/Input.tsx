import { FC } from 'react';

import { InputProps } from '@/components';

import { cn } from '@/utils';

export const Input: FC<InputProps> = ({
  label,
  type,
  name,
  register,
  className,
  required,
  placeholder,
}) => {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        className={cn(
          'rounded border border-solid border-borderGrey',
          className
        )}
        type={type}
        placeholder={placeholder}
        aria-required={required ? true : undefined}
        {...register(name, { required })}
      />
    </div>
  );
};
