"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const chartStroke = "#2563eb";

export function RevenueChurnChart({
  data
}: {
  data: { month: string; revenue: number; churn: number }[];
}) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip
            contentStyle={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              color: "#0f172a"
            }}
          />
          <Line type="monotone" dataKey="revenue" stroke={chartStroke} strokeWidth={3} />
          <Line type="monotone" dataKey="churn" stroke="#f97316" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SentimentChart({ data }: { data: { month: string; score: number }[] }) {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip
            contentStyle={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              color: "#0f172a"
            }}
          />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.12}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MarketShareChart({ share, label }: { share: number; label?: string }) {
  const data = [
    { name: label ?? "Empresa", value: share },
    { name: "Resto mercado", value: 100 - share }
  ];

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={12} />
          <Tooltip
            contentStyle={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              color: "#0f172a"
            }}
          />
          <Bar dataKey="value" fill="#3b82f6" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
