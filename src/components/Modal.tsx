export type ModalProps = {
  onClose: () => void
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative z-50 w-xl rounded-md bg-white px-12 py-4"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-6 cursor-pointer text-2xl font-bold text-gray-400 transition-colors duration-200 hover:text-gray-600"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  )
}
