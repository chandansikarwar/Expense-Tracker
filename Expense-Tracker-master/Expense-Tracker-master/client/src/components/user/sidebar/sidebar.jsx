import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { IoLogOut } from "react-icons/io5";
import {
  FaChartLine,
  FaMoneyBillTrendUp,
  FaMoneyBillTransfer,
} from "react-icons/fa6";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "../../ui/separator";
import { Button } from "../../ui/button";
import { logoutUser } from "../../../store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { capitalizeName } from "../../../util/captilize";
const navigationMenuItems = [
  { title: "Dashboard", icon: <FaChartLine />, url: "/dashboard" },
  { title: "Incomes", icon: <FaMoneyBillTrendUp />, url: "/incomes" },
  { title: "Expenses", icon: <FaMoneyBillTransfer />, url: "/expenses" },
];

export function SideBar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function handleOnClick() {
    dispatch(logoutUser()).then(toast.success("Logged Out"));
  }

  return (
    <Sidebar variant="floating" collapsible="icon">
      {/* Header */}
      <SidebarHeader className="flex flex-row items-center gap-2 p-4">
        <Avatar />
        <span className="font-bold">Hello {capitalizeName(user.userName)}</span>
      </SidebarHeader>
      <Separator orientation="horizontal" />

      {/* Navigation Menu */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationMenuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                          isActive ? "bg-gray-200 text-blue-600" : "text-black"
                        }`}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <Separator orientation="horizontal" />

      {/* Footer (Logout) */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button
                onClick={handleOnClick}
                className="flex items-center gap-2 px-3 py-2"
              >
                <IoLogOut />
                <span>Sign Out</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
