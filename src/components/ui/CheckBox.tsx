export type CheckBoxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
}

export const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, label = '' }) => {
  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="cursor-pointer checked:bg-success h-7 w-7 appearance-none rounded-full border border-gray-300 transition-colors duration-100 checked:border-transparent"
      />
      <span>{label}</span>
    </label>
  )
}
