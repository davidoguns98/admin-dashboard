"use client";

import { useEffect, useState } from "react";
import { withAuth } from "@/utils/withAuth";
import Navbar from "@/components/Navbar";
import ChartCard from "@/components/ChartCard";

type Entry = {
  id: number;
  label: string;
  value: number;
};

function AdminDashboardPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("dashboardEntries");
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage when entries change
  useEffect(() => {
    localStorage.setItem("dashboardEntries", JSON.stringify(entries));
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(value);
    if (!label || isNaN(val)) return;

    if (editId !== null) {
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === editId ? { ...entry, label, value: val } : entry
        )
      );
      setEditId(null);
    } else {
      setEntries((prev) => [...prev, { id: Date.now(), label, value: val }]);
    }

    setLabel("");
    setValue("");
  };

  const handleEdit = (entry: Entry) => {
    setEditId(entry.id);
    setLabel(entry.label);
    setValue(entry.value.toString());
  };

  const handleDelete = (id: number) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    if (editId === id) {
      setEditId(null);
      setLabel("");
      setValue("");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-8 space-y-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Label (e.g. March)"
            className="w-full px-4 py-2 border rounded shadow"
            required
          />
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Value (e.g. 100)"
            className="w-full px-4 py-2 border rounded shadow"
            required
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded"
          >
            {editId ? "Update Entry" : "Add Entry"}
          </button>
        </form>

        {/* Table */}
        {entries.length > 0 && (
          <div className="overflow-x-auto border rounded shadow">
            <table className="min-w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Label</th>
                  <th className="px-4 py-2">Value</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id} className="border-t">
                    <td className="px-4 py-2">{entry.label}</td>
                    <td className="px-4 py-2">{entry.value}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button
                        onClick={() => handleEdit(entry)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Chart */}
        {entries.length > 0 && <ChartCard data={entries} />}
      </div>
    </div>
  );
}

export default withAuth(AdminDashboardPage, { allowedRoles: ["admin"] });
