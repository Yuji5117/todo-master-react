export type CheckBoxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
}

export const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange, label = '' }) => {
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  )
}
