"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const gold = "#c9a24b";
const goldLight = "#e4c777";

const tooltipStyle = {
  backgroundColor: "#1c1c20",
  border: "1px solid rgba(201,162,75,0.3)",
  borderRadius: 8,
  color: "#f8f7f4",
  fontSize: 12,
};

export function VisitsChart({ data }: { data: { day: string; total: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <CartesianGrid stroke="rgba(201,162,75,0.1)" vertical={false} />
        <XAxis dataKey="day" tick={{ fill: "#a3a3a8", fontSize: 11 }} interval={4} />
        <YAxis tick={{ fill: "#a3a3a8", fontSize: 11 }} allowDecimals={false} width={28} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="total" stroke={gold} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function InquiriesChart({ data }: { data: { day: string; total: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <CartesianGrid stroke="rgba(201,162,75,0.1)" vertical={false} />
        <XAxis dataKey="day" tick={{ fill: "#a3a3a8", fontSize: 11 }} interval={4} />
        <YAxis tick={{ fill: "#a3a3a8", fontSize: 11 }} allowDecimals={false} width={28} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="total" stroke={goldLight} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function InquiriesByProjectChart({
  data,
}: {
  data: { name: string; total: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid stroke="rgba(201,162,75,0.1)" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: "#a3a3a8", fontSize: 11 }} />
        <YAxis tick={{ fill: "#a3a3a8", fontSize: 11 }} allowDecimals={false} width={28} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="total" fill={gold} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TopPropertiesChart({
  data,
}: {
  data: { reference: string; total: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid stroke="rgba(201,162,75,0.1)" horizontal={false} />
        <XAxis type="number" tick={{ fill: "#a3a3a8", fontSize: 11 }} allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="reference"
          tick={{ fill: "#a3a3a8", fontSize: 11 }}
          width={80}
        />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="total" fill={goldLight} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
