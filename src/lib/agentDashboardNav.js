import { LayoutDashboard, Home, PlusCircle, Users, Settings } from "lucide-react";
import { FaClover } from "react-icons/fa6";
import { GrSchedule } from "react-icons/gr";
import { MdRealEstateAgent, MdSupportAgent } from "react-icons/md";

export const AGENT_MENU_ITEMS = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/agent/agent-dashboard" },
  { name: "My Properties", icon: <Home size={20} />, path: "/agent/properties" },
  { name: "Leads/Clients", icon: <Users size={20} />, path: "/agent/clients" },
  { name: "Appointments", icon: <GrSchedule size={20} />, path: "/agent/appointments" },
  { name: "Settings", icon: <Settings size={20} />, path: "/agent/settings" },
];
export const MERCHANT_MENU_ITEMS = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/merchant/dashboard" },
  { name: "My Properties", icon: <Home size={20} />, path: "/merchant/properties" },
  { name: "My Agents", icon: <MdRealEstateAgent size={20} />, path: "/merchant/agents" },
  { name: "Appointments", icon: <GrSchedule size={20} />, path: "/merchant/appointments" },
  { name: "Wishlist", icon: <FaClover size={20} />, path: "/merchant/wishlist" },
  { name: "Settings", icon: <Settings size={20} />, path: "/merchant/settings" },
];