import { withAuth } from "@/utils/withAuth";
import ChartCard from "@/components/ChartCard";
import Navbar from "@/components/Navbar";

function AdminDashboardPage() {
  return (
    <div>
      <Navbar />
      <div className="p-8 space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p>Welcome, Admin! You have full access.</p>
        <ChartCard />
      </div>
    </div>
  );
}

export default withAuth(AdminDashboardPage, { allowedRoles: ["admin"] });
