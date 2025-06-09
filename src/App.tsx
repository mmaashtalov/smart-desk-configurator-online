import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import Configurator from "./pages/Configurator";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import { SEOSettings } from "@/components/SEOSettings";
import { AdminDashboard } from "@/components/AdminDashboard";
import { NewProtectedRoute } from "@/components/NewProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { ThemeProvider } from './contexts/ThemeContext';
import Settings from "./pages/Settings";
import { ChatWidget } from './components/chat/ChatWidget';
import { ChatWindow } from './components/chat/ChatWindow';

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/configurator" element={<Configurator />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<NewProtectedRoute adminOnly />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/seo" element={<SEOSettings />} />
                <Route path="/admin/settings" element={<Settings />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <ChatWidget />
          <ChatWindow />
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
