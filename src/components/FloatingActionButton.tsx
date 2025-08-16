export type FloatingActionButtonProps = {
  icon?: string
  onClick: () => void
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon = '+',
  onClick,
}) => {
  return (
    <button
      className="bg-primary hover:bg-primary-hover active:bg-primary absolute right-3 bottom-3 h-12 w-12 cursor-pointer rounded-full text-xl text-white shadow-md transition-colors duration-200"
      onClick={onClick}
    >
      {icon}
    </button>
  )
}
