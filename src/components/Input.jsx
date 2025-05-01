export default function Input({
    id,
    label,
    type,
    value,
    onChange,
    placeholder,
    required = false,
    children,
    readOnly = false, // <- 이 부분 추가
}) {
    return (
        <div className="mb-10 mt-4">
            <label htmlFor={id} className="block text-sm font-medium text-customTextBlack">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>} {/* 필수 표시 */}
            </label>
            <div className="mt-2 flex items-stretch justify-between gap-2"> {/* 여기 핵심: items-stretch */}
                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    readOnly={readOnly} // <- 이 부분 추가
                    className="p-3 w-full rounded-xl bg-gray-70 focus:outline-none focus:border-customMain
                    text-gray-900 placeholder-customTextGray text-sm transition-colors duration-300 ease-in-out"
                />
                {children}
            </div>
        </div>
    );
}
