import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowRight, HiUser } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";

function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            active={tab === "profile"}
            icon={HiUser}
            label={"User"}
            labelColor="dark"
            onClick={() => handleNavigation("/dashboard?tab=profile")}
            className="cursor-pointer"
          >
            Profile
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            active
            icon={HiArrowRight}
            className="cursor-pointer"
            onClick={() => handleNavigation("/logout")}
          >
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashboardSidebar;
