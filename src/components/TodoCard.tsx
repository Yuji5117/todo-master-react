export type TodoCardType = {
  title: string
  memo?: string
  isCompleted: boolean
}

export const TodoCard: React.FC<TodoCardType> = ({ title, memo = '', isCompleted }) => {
  return (
    <div className="m-auto flex w-3/4 justify-between rounded-md bg-white p-3 shadow-md">
      <div className="">
        <h2 className="text-lg">{title}</h2>
        {memo && <p className="text-[#111827 text-sm font-light">{memo}</p>}
      </div>
      <input type="checkbox" checked={isCompleted} />
    </div>
  )
}
