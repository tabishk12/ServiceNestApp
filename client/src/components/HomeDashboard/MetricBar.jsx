const MetricBar = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="rounded-xl border border-purple-100 bg-white px-4 py-3 shadow-sm"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {metric.label}
          </p>
          <p className="mt-1 text-2xl font-bold text-purple-700">
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MetricBar;
