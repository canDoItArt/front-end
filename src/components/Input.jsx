export default function Input({ id, label, type, value, onChange, placeholder, required = false }) {
    return (
        <div className="mb-10 mt-4">
            <label htmlFor={id} className="block text-sm font-medium text-customTextBlack">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>} {/* 필수 표시 */}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="mt-4 w-full border-b border-gray-100 focus:outline-none focus:border-customMain 
                text-gray-900 placeholder-customTextGray text-sm transition-colors duration-300 ease-in-out"
            />
        </div>
    );
}
