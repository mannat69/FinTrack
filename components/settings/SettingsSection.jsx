function SettingsSection({
  title,
  description,
  children,
}) {
  return (
    <section className="rounded-2xl border border-hairline bg-surface p-6 shadow-lg">

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-ink-50">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-ink-400">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-5">
        {children}
      </div>

    </section>
  );
}

export default SettingsSection;