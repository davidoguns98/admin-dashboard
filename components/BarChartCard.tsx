"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Article 1", views: 100 },
  { name: "Article 2", views: 300 },
  { name: "Article 3", views: 250 },
  { name: "Article 4", views: 400 },
];

export default function BarChartCard() {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-2">Content Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="views" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
