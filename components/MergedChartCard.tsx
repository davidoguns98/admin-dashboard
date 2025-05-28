"use client";

import { useEffect, useState } from "react";

type Entry = {
  id: number;
  label: string;
  value: number;
};

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function MergedChartCard() {
  const [data, setData] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch API Data
    const fetchPosts = async () => {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=5"
      );
      const posts = await res.json();

      const transformedAPIData: Entry[] = posts.map((post: Post) => ({
        id: post.id,
        label: post.title.slice(0, 15) + "...", // shorten for chart label
        value: post.body.length, // simulate a "value" based on content length
      }));

      // Get LocalStorage Data
      const local = localStorage.getItem("dashboardEntries");
      const localEntries: Entry[] = local ? JSON.parse(local) : [];

      // Merge both
      const merged = [...localEntries, ...transformedAPIData];
      setData(merged);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading data...</p>;

  return (
    <div className="space-y-6 mb-5">
      <h2 className="text-2xl font-semibold">Merged Data Chart</h2>

      {/* Table */}
      <div className="overflow-x-auto border rounded shadow">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Label</th>
              <th className="px-4 py-2">Value</th>
              <th className="px-4 py-2">Source</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry) => (
              <tr key={entry.id} className="border-t">
                <td className="px-4 py-2">{entry.label}</td>
                <td className="px-4 py-2">{entry.value}</td>
                <td className="px-4 py-2">
                  {entry.id <= 100 ? "API" : "Local"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Simple Bar Chart */}
      <div className="bg-white p-4 border rounded shadow mb-5">
        <p className="font-medium mb-2">Combined Chart</p>
        <div className="grid grid-cols-6 gap-2 items-end h-40">
          {data.map((entry) => (
            <div key={entry.id} className="text-center overflow-hidden">
              <div
                className="bg-purple-600 w-full rounded-t"
                style={{ height: `${entry.value}px` }}
              ></div>
              <span className="text-sm block truncate">{entry.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
