export default function Select({ value, onChange, name, options = [], placeholder = "Select...", error, className = "", ...rest }) {
  return (
    <div className="mb-4">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${error ? "border-red-500" : "border-gray-300"} ${className}`}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
