import { clsx } from 'clsx'

export type ButtonProps = {
  text: string
  onClick: () => void
  variant: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, variant, size = 'md' }) => {
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
      type="button"
      onClick={onClick}
      className={clsx(baseClass, variantClass[variant], sizeClass[size])}
    >
      {text}
    </button>
  )
}
