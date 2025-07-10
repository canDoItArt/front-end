export default function Input({
    id,
    label,
    type,
    value,
    onChange,
    placeholder,
    required = false,
    children,
    readOnly = false,
    error = "", // error prop 추가
    successMessage = "", // ✅ 성공 메시지 추가
}) {
    return (
        <div className="mb-10 mt-4">
            <label htmlFor={id} className="block text-sm font-medium text-customTextBlack">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="mt-2 flex items-stretch justify-between gap-2">
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    className={`p-3 w-full rounded-xl bg-gray-70 text-gray-900 placeholder-customTextGray text-sm transition-colors duration-300 ease-in-out focus:outline-none
                    ${error ? "border border-red-500" : "focus:border-customMain"}`}
                />
                {children}
            </div>

            {/* 에러 메시지 표시 */}
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

            {/* ✅ 성공 메시지 표시 */}
            {successMessage && (
                <p className="text-xs text-green-500 mt-2">{successMessage}</p>
            )}
        </div>
    );
}
