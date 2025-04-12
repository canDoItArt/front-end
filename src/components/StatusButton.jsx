export default function StatusButton({ icon, label, onClick, className }) {
  return (
      <button
          className={`py-5 shadow-customShadow rounded-lg flex flex-col items-center text-xs font-medium justify-between ${className}`}
          onClick={onClick}
      >
          <span className="text-xl mb-2">{icon}</span>
          {label}
      </button>
  );
}
