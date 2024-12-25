export default function Input({ id, label, type, value, onChange, placeholder }) {
    return (
        <div className="mb-8">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="mt-4 w-full border-b border-gray-100 focus:outline-none focus:border-customMain text-gray-900 placeholder-gray-200 text-sm transition-colors duration-300 ease-in-out"
            />
        </div>
    );
}