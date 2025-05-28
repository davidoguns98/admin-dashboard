"use client";

import { useEffect, useState } from "react";

type Entry = {
  id: number;
  label: string;
  value: number;
};

export default function BarChartCard() {
  const [data, setData] = useState<Entry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("dashboardEntries");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Analytics Overview</h2>

      {/* Table (view only) */}
      <div className="overflow-x-auto border rounded shadow">
        <table className="min-w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Label</th>
              <th className="px-4 py-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.id} className="border-t">
                <td className="px-4 py-2">{entry.label}</td>
                <td className="px-4 py-2">{entry.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Simple chart display */}
      <div className="bg-white p-4 border rounded shadow">
        <p className="font-medium mb-2">Bar Chart Preview</p>
        <div className="grid grid-cols-6 gap-2 items-end h-40">
          {data.map((entry) => (
            <div key={entry.id} className="text-center">
              <div
                className="bg-blue-600 w-full rounded-t"
                style={{ height: `${entry.value}px` }}
              ></div>
              <span className="text-sm">{entry.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
