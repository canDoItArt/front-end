export default function OptionList({ options, openSubModal }) {
    return (
      <ul className="flex flex-col items-center">
        {options.map(({ label, type, isDanger }, index) => (
          <button
            key={index}
            className={`cursor-pointer font-medium w-full flex justify-center text-xs p-3 border-b-0.1 border-customNavbarStroke ${
              isDanger ? "text-red-500 font-semibold" : "text-black"
            }`}
            onClick={() => openSubModal(type)}
          >
            {label}
          </button>
        ))}
      </ul>
    );
  }