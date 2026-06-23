"use client";

import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { ClientOnly } from "@/components/admin/dashboard/ClientOnly";
import { ChartSkeleton } from "@/components/admin/dashboard/ChartSkeleton";

interface DashboardKpiCardProps {
  label: string;
  value: number;
  trend: number;
  sparkline: number[];
  format?: "number" | "compact";
  accent?: string;
}

function formatValue(value: number, format: "number" | "compact") {
  if (format === "compact") {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  }
  return value.toLocaleString("en-US");
}

export function DashboardKpiCard({
  label,
  value,
  trend,
  sparkline,
  format = "number",
  accent = "#c9a227",
}: DashboardKpiCardProps) {
  const chartData = sparkline.map((v, i) => ({ i, v }));
  const TrendIcon = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
  const trendClass =
    trend > 0 ? "dash-kpi-trend--up" : trend < 0 ? "dash-kpi-trend--down" : "dash-kpi-trend--flat";

  return (
    <article className="dash-kpi-card">
      <div className="dash-kpi-card-glow" style={{ background: accent }} aria-hidden />
      <div className="dash-kpi-card-top">
        <p className="dash-kpi-label">{label}</p>
        <span className={`dash-kpi-trend ${trendClass}`}>
          <TrendIcon className="w-3.5 h-3.5" aria-hidden />
          {trend > 0 ? "+" : ""}
          {trend}%
        </span>
      </div>
      <p className="dash-kpi-value">{formatValue(value, format)}</p>
      <div className="dash-kpi-spark" aria-hidden>
        <ClientOnly fallback={<ChartSkeleton />}>
          <ResponsiveContainer width="100%" height={48}>
          <AreaChart data={chartData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`spark-${label.replace(/\s/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accent} stopOpacity={0.35} />
                <stop offset="100%" stopColor={accent} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={accent}
              strokeWidth={2}
              fill={`url(#spark-${label.replace(/\s/g, "")})`}
              dot={false}
              isAnimationActive
            />
          </AreaChart>
          </ResponsiveContainer>
        </ClientOnly>
      </div>
    </article>
  );
}
