function SettingRow({
  label,
  description,
  children,
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-dashed border-hairline pb-5 last:border-b-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">

      <div>
        <h3 className="font-medium text-ink-50">
          {label}
        </h3>

        {description && (
          <p className="mt-1 text-sm text-ink-400">
            {description}
          </p>
        )}
      </div>

      <div className="sm:min-w-52">
        {children}
      </div>

    </div>
  );
}

export default SettingRow;