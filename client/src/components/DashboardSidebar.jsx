import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

function DashboardSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await axios.post("/api/auth/signout", {
        withCredentials: true,
      });
      console.log(res);
      if (res.status === 200) {
        navigate("/signin");
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log("catch error");
      console.log(error);
    }
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={"User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup onClick={handleSignOut}>
          <Sidebar.Item active icon={HiArrowRight} className="cursor-pointer">
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashboardSidebar;
