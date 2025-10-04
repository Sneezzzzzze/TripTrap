export default function PaymentMethodSection({ title, helpUrl, children }) {
  return (
    <div>
      <div className="flex items-center mb-2">
        <h2 className="text-base font-semibold text-gray-700 mr-1">{title}</h2>
        {helpUrl && (
          <a href={helpUrl} className="text-gray-400">
            {/* Optional icon or text */}
          </a>
        )}
      </div>
      <div className="bg-white rounded-xl shadow-sm p-4">{children}</div>
    </div>
  );
}
