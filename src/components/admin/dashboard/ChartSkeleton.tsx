export function ChartSkeleton({ tall = false }: { tall?: boolean }) {
  return (
    <div
      className={`dash-chart-skeleton${tall ? " dash-chart-skeleton--tall" : ""}`}
      aria-hidden
    />
  );
}
