export type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search todos...',
}) => {
  return (
    <div className="flex w-full">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 p-2 shadow-md"
      />
    </div>
  )
}
