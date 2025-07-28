import { CheckBox } from './CheckBox'

export type TodoCardType = {
  title: string
  memo?: string
  isCompleted: boolean
}

export const TodoCard: React.FC<TodoCardType> = ({ title, memo = '', isCompleted }) => {
  return (
    <div className="m-auto flex w-3/4 justify-between rounded-md bg-white py-3 px-5 shadow-md">
      <div className="">
        <h2 className="text-lg">{title}</h2>
        {memo && <p className="text-[#111827 text-sm font-light">{memo}</p>}
      </div>
      <div className="flex items-center">
        <CheckBox checked={isCompleted} onChange={(value: boolean) => console.log(value)} />
      </div>
    </div>
  )
}
