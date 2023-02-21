import clsx from 'clsx';

type InputProps = {
  label: string;
  type: string;
  name: string;
  register: any;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

const Input = ({
  label,
  type,
  name,
  register,
  className,
  required,
  placeholder,
}: InputProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        className={clsx(
          'rounded border border-solid border-borderGrey',
          className
        )}
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
      />
    </div>
  );
};

Input.displayName = 'Input';
export default Input;
