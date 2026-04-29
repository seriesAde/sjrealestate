import { LayoutDashboard, Home, PlusCircle, Users, Settings } from "lucide-react";

export const AGENT_MENU_ITEMS = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/agent/dashboard" },
  { name: "My Properties", icon: <Home size={20} />, path: "/agent/properties" },
  { name: "Add Property", icon: <PlusCircle size={20} />, path: "/agent/add-property" },
  { name: "Leads/Clients", icon: <Users size={20} />, path: "/agent/leads" },
  { name: "Settings", icon: <Settings size={20} />, path: "/agent/settings" },
];