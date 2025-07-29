export type ModalProps = {
  toggle: (value: boolean) => void
}

export const Modal: React.FC<ModalProps> = ({ toggle }) => {
  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center bg-black/80"
      onClick={() => toggle(false)}
    >
      <div
        className="relative z-50 w-xl rounded-md bg-white px-12 py-4"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => toggle(false)}
          className="absolute top-3 right-6 text-2xl font-bold text-gray-400 transition-colors duration-200 hover:text-gray-600"
        >
          ×
        </button>
        <h2 className="mb-8 text-center text-2xl font-semibold">Create New Todo</h2>
        <form action="" className="flex flex-col space-y-8 mb-4">
          <input
            type="text"
            placeholder="Enter your todo"
            className="focus:ring-opacity-50 w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <textarea
            rows={4}
            placeholder="Add a memo"
            className="focus:ring-opacity-50 w-full resize-y rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          ></textarea>
          <button className="bg-primary hover:bg-primary-hover active:bg-primary rounded-full py-2 text-lg text-white shadow-md transition-colors duration-200">
            Add Todo
          </button>
        </form>
      </div>
    </div>
  )
}
