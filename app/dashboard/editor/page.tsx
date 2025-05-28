"use client";

import { withAuth } from "@/utils/withAuth";
import BarChartCard from "@/components/BarChartCard";
import Navbar from "@/components/Navbar";

function EditorDashboardPage() {
  return (
    <div className="p-8 space-y-6">
      <Navbar />
      <h1 className="text-3xl font-bold">Editor Dashboard</h1>
      <p>Welcome, Editor! You have limited access.</p>
      <BarChartCard />
    </div>
  );
}

export default withAuth(EditorDashboardPage, { allowedRoles: ["editor"] });
