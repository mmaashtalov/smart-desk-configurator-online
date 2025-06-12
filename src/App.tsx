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
import { AnalyticsPage } from './pages/AnalyticsPage';
import { TrackingScriptsEditor } from './components/analytics/TrackingScriptsEditor';
import { ChatWidget } from './components/chat/ChatWidget';
import { ChatWindow } from './components/chat/ChatWindow';
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import { BlogAdminPage } from "./pages/BlogAdminPage";
import { BlogPostEditor } from "./pages/BlogPostEditor";
import { BlogPage } from "./pages/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage";
import { PageManager } from "./pages/PageManager";
import { PageEditor } from './pages/PageEditor';
import { ErrorBoundary } from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
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
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route element={<NewProtectedRoute adminOnly />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/seo" element={<SEOSettings />} />
                  <Route path="/admin/analytics" element={
                    <AnalyticsPage>
                      <AnalyticsDashboard />
                    </AnalyticsPage>
                  } />
                  <Route path="/admin/analytics/integrations" element={
                    <AnalyticsPage>
                      <TrackingScriptsEditor />
                    </AnalyticsPage>
                  } />
                  <Route path="/admin/settings" element={<Settings />} />
                  <Route path="/admin/blog" element={<BlogAdminPage />} />
                  <Route path="/admin/blog/new" element={<BlogPostEditor />} />
                  <Route path="/admin/blog/edit/:id" element={<BlogPostEditor />} />
                  <Route path="/admin/pages" element={<PageManager />} />
                  <Route path="/admin/pages/new" element={<PageEditor />} />
                  <Route path="/admin/pages/edit/:id" element={<PageEditor />} />
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
  </ErrorBoundary>
);

export default App;
