"use client";

import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AdminDashboardData, CategoryStat, PipelineSlice, TimelinePoint } from "@/lib/admin-dashboard";
import { ClientOnly } from "@/components/admin/dashboard/ClientOnly";
import { ChartSkeleton } from "@/components/admin/dashboard/ChartSkeleton";

const CHART_TOOLTIP_STYLE = {
  background: "rgba(26, 26, 26, 0.92)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  color: "#fff",
  fontSize: 12,
  padding: "10px 14px",
  boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
};

const PIPELINE_COLORS = ["#1a3896", "#c9a227", "#6b6b6b", "#2D6A4F"];

function ChartEmpty({ message }: { message: string }) {
  return <p className="dash-chart-empty">{message}</p>;
}

function ChartFrame({
  children,
  tall = false,
}: {
  children: ReactNode;
  tall?: boolean;
}) {
  return (
    <ClientOnly fallback={<ChartSkeleton tall={tall} />}>{children}</ClientOnly>
  );
}

function PublishingTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; dataKey: string; color: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div style={CHART_TOOLTIP_STYLE}>
      <p style={{ margin: "0 0 6px", opacity: 0.7, fontSize: 11 }}>{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ margin: 0, color: entry.color }}>
          {entry.dataKey === "articles" ? "Articles" : "Comments"}: <strong>{entry.value}</strong>
        </p>
      ))}
    </div>
  );
}

function CategoryTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: CategoryStat }[];
}) {
  if (!active || !payload?.[0]) return null;
  const row = payload[0].payload;
  return (
    <div style={CHART_TOOLTIP_STYLE}>
      <p style={{ margin: "0 0 4px", fontWeight: 600 }}>{row.name}</p>
      <p style={{ margin: 0, fontSize: 11, opacity: 0.85 }}>
        {row.count} articles · {row.views.toLocaleString()} views
      </p>
    </div>
  );
}

export function PublishingChart({ timeline }: { timeline: TimelinePoint[] }) {
  return (
    <div className="dash-chart-card dash-chart-card--wide">
      <div className="dash-chart-header">
        <div>
          <p className="dash-chart-eyebrow">Editorial output</p>
          <h3 className="dash-chart-title">Publishing velocity</h3>
        </div>
        <div className="dash-chart-legend">
          <span className="dash-legend-item">
            <i style={{ background: "#1a3896" }} /> Articles
          </span>
          <span className="dash-legend-item">
            <i style={{ background: "#c9a227" }} /> Comments
          </span>
        </div>
      </div>
      <div className="dash-chart-body dash-chart-body--tall">
        {timeline.length === 0 ? (
          <ChartEmpty message="No publishing activity in the last 14 days." />
        ) : (
          <ChartFrame tall>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeline} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradArticles" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1a3896" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#1a3896" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradComments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c9a227" stopOpacity={0.22} />
                    <stop offset="100%" stopColor="#c9a227" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11, fill: "#6b6b6b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 11, fill: "#6b6b6b" }} axisLine={false} tickLine={false} />
                <Tooltip content={<PublishingTooltip />} />
                <Area
                  type="monotone"
                  dataKey="articles"
                  stroke="#1a3896"
                  strokeWidth={2.5}
                  fill="url(#gradArticles)"
                />
                <Area
                  type="monotone"
                  dataKey="comments"
                  stroke="#c9a227"
                  strokeWidth={2}
                  fill="url(#gradComments)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartFrame>
        )}
      </div>
    </div>
  );
}

export function CategoryChart({ categories }: { categories: CategoryStat[] }) {
  return (
    <div className="dash-chart-card">
      <div className="dash-chart-header">
        <div>
          <p className="dash-chart-eyebrow">Coverage</p>
          <h3 className="dash-chart-title">By category</h3>
        </div>
      </div>
      <div className="dash-chart-body">
        {categories.length === 0 ? (
          <ChartEmpty message="No published articles by category yet." />
        ) : (
          <ChartFrame>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categories} layout="vertical" margin={{ top: 0, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="rgba(0,0,0,0.05)" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={88}
                  tick={{ fontSize: 11, fill: "#3d3d3d" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CategoryTooltip />} cursor={{ fill: "rgba(26,56,150,0.06)" }} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={14}>
                  {categories.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
        )}
      </div>
    </div>
  );
}

export function PipelineChart({ pipeline }: { pipeline: PipelineSlice[] }) {
  const total = pipeline.reduce((sum, p) => sum + p.count, 0);

  return (
    <div className="dash-chart-card">
      <div className="dash-chart-header">
        <div>
          <p className="dash-chart-eyebrow">Workflow</p>
          <h3 className="dash-chart-title">Content pipeline</h3>
        </div>
      </div>
      <div className="dash-chart-body dash-chart-body--donut">
        {pipeline.length === 0 ? (
          <ChartEmpty message="No articles in the editorial pipeline." />
        ) : (
          <ChartFrame>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pipeline}
                  dataKey="count"
                  nameKey="label"
                  cx="50%"
                  cy="50%"
                  innerRadius="58%"
                  outerRadius="82%"
                  paddingAngle={3}
                  stroke="none"
                >
                  {pipeline.map((_, i) => (
                    <Cell key={i} fill={PIPELINE_COLORS[i % PIPELINE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  formatter={(value, name) => {
                    const n = typeof value === "number" ? value : 0;
                    const pct = total > 0 ? Math.round((n / total) * 100) : 0;
                    return [`${n} (${pct}%)`, String(name ?? "")];
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartFrame>
        )}
        {total > 0 && (
          <div className="dash-donut-center">
            <strong>{total}</strong>
            <span>Total</span>
          </div>
        )}
      </div>
      <ul className="dash-pipeline-legend">
        {pipeline.map((slice, i) => (
          <li key={slice.status}>
            <i style={{ background: PIPELINE_COLORS[i % PIPELINE_COLORS.length] }} />
            <span>{slice.label}</span>
            <strong>{slice.count}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SubscriberChart({ timeline }: { timeline: TimelinePoint[] }) {
  return (
    <div className="dash-chart-card">
      <div className="dash-chart-header">
        <div>
          <p className="dash-chart-eyebrow">Audience</p>
          <h3 className="dash-chart-title">Newsletter sign-ups</h3>
        </div>
      </div>
      <div className="dash-chart-body">
        {timeline.length === 0 ? (
          <ChartEmpty message="No newsletter sign-ups in the last 14 days." />
        ) : (
          <ChartFrame>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeline} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradSubs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2D6A4F" stopOpacity={1} />
                    <stop offset="100%" stopColor="#2D6A4F" stopOpacity={0.55} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 10, fill: "#6b6b6b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 10, fill: "#6b6b6b" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={CHART_TOOLTIP_STYLE} />
                <Bar dataKey="subscribers" fill="url(#gradSubs)" radius={[6, 6, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
        )}
      </div>
    </div>
  );
}

export function TopArticlesChart({
  articles,
}: {
  articles: AdminDashboardData["topArticles"];
}) {
  const data = articles.map((a) => ({
    ...a,
    shortTitle: a.title.length > 42 ? `${a.title.slice(0, 42)}…` : a.title,
  }));

  return (
    <div className="dash-chart-card dash-chart-card--wide">
      <div className="dash-chart-header">
        <div>
          <p className="dash-chart-eyebrow">Performance</p>
          <h3 className="dash-chart-title">Top stories by readership</h3>
        </div>
      </div>
      <div className="dash-chart-body">
        {data.length === 0 ? (
          <ChartEmpty message="No published articles with view data yet." />
        ) : (
          <ChartFrame>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 48 }}>
                <CartesianGrid stroke="rgba(0,0,0,0.05)" vertical={false} />
                <XAxis
                  dataKey="shortTitle"
                  tick={{ fontSize: 10, fill: "#6b6b6b" }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  angle={-28}
                  textAnchor="end"
                  height={70}
                />
                <YAxis tick={{ fontSize: 11, fill: "#6b6b6b" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  formatter={(value) => {
                    const n = typeof value === "number" ? value : 0;
                    return [n.toLocaleString(), "Views"];
                  }}
                  labelFormatter={(_, payload) =>
                    (payload?.[0]?.payload as { title?: string })?.title ?? ""
                  }
                />
                <Bar dataKey="views" fill="#1a3896" radius={[6, 6, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </ChartFrame>
        )}
      </div>
    </div>
  );
}
