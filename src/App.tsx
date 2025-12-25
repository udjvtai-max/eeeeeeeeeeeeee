import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import StatusPage from "./pages/StatusPage";
import MinecraftPricing from "./pages/MinecraftPricing";
import MinecraftBudget from "./pages/MinecraftBudget";
import MinecraftBDIXBudget from "./pages/MinecraftBDIXBudget";
import MinecraftIndia from "./pages/MinecraftIndia";
import VPSPricing from "./pages/VPSPricing";
import WebHostingPricing from "./pages/WebHostingPricing";
import DomainPricing from "./pages/DomainPricing";
import GameServers from "./pages/GameServers";
import Auth from "./pages/Auth";
import Forum from "./pages/Forum";
import ForumCategory from "./pages/ForumCategory";
import ForumPost from "./pages/ForumPost";
import ForumNewPost from "./pages/ForumNewPost";
import ForumEditPost from "./pages/ForumEditPost";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RolesManagement from "./pages/admin/RolesManagement";
import PermissionsManagement from "./pages/admin/PermissionsManagement";
import UsersManagement from "./pages/admin/UsersManagement";
import CategoriesManagement from "./pages/admin/CategoriesManagement";
import ModerationManagement from "./pages/admin/ModerationManagement";
import AuditLogs from "./pages/admin/AuditLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/games" element={<GameServers />} />
            <Route path="/pricing/minecraft" element={<MinecraftPricing />} />
            <Route path="/pricing/minecraft-budget" element={<MinecraftBudget />} />
            <Route path="/pricing/minecraft-bdix-budget" element={<MinecraftBDIXBudget />} />
            <Route path="/pricing/minecraft-india" element={<MinecraftIndia />} />
            <Route path="/vps-pricing" element={<VPSPricing />} />
            <Route path="/web-hosting-pricing" element={<WebHostingPricing />} />
            <Route path="/domain-pricing" element={<DomainPricing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum/category/:slug" element={<ForumCategory />} />
            <Route path="/forum/post/:id" element={<ForumPost />} />
            <Route path="/forum/new" element={<ForumNewPost />} />
            <Route path="/forum/edit/:id" element={<ForumEditPost />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/roles" element={<RolesManagement />} />
            <Route path="/admin/permissions" element={<PermissionsManagement />} />
            <Route path="/admin/users" element={<UsersManagement />} />
            <Route path="/admin/categories" element={<CategoriesManagement />} />
            <Route path="/admin/moderation" element={<ModerationManagement />} />
            <Route path="/admin/logs" element={<AuditLogs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
