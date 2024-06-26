import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import DashProfile from "../components/DashProfile";

function Dashboard() {
  const location = useLocation();
  console.log(location);
  const [tab, setTab] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <DashboardSidebar />
      </div>
      {/* sidebat */}
      {/* profile right side */}
      {tab === "profile" && <DashProfile />}
    </div>
  );
}

export default Dashboard;
