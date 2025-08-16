import { clsx } from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'
type ButtonType = 'button' | 'submit'

export type ButtonProps = {
  text: string
  onClick?: () => void
  variant?: ButtonVariant
  size?: ButtonSize
  type?: ButtonType
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
}) => {
  const baseClass = 'rounded-full font-medium transition cursor-pointer'

  const variantClass = {
    primary: 'bg-primary hover:bg-primary-hover active:bg-primary text-white',
    secondary: 'border border-secondary text-secondary hover:bg-secondary-hover ',
    danger: 'bg-error hover:bg-error active:bg-error text-white ',
  }

  const sizeClass = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseClass, variantClass[variant], sizeClass[size])}
    >
      {text}
    </button>
  )
}
