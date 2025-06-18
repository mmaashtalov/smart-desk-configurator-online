import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Index from "./pages/Index";
import CategoryPage from "./pages/CategoryPage";
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
import { PageEditorFixed } from './pages/PageEditorFixed';
import { ErrorBoundary } from "./components/ErrorBoundary";
import ProductDetail from "./pages/ProductDetail";
import CheckoutPage from "./pages/CheckoutPage";
import AdminPanel from "./pages/AdminPanel";
import ProductManagement from "./components/admin/ProductManagement";
import UserManagement from "./components/admin/UserManagement";
import ContentManagement from "./components/admin/ContentManagement";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import UserAgreement from "./pages/UserAgreement";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import Visualization from "./pages/Visualization";
import OfficeConfiguratorPage from "./pages/OfficeConfiguratorPage";
import RentLanding from "./pages/RentLanding";
import { PageView } from "./pages/PageView";
import MarketplacePage from "./pages/MarketplacePage";
import GalleryPage from "./pages/GalleryPage";
import Layout from "./components/Layout";

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
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/catalog" element={<Navigate to="/catalog/executive-desks" replace />} />
                  <Route path="/catalog/:categoryId" element={<CategoryPage />} />
                  <Route path="/catalog/:categoryId/:productId" element={<ProductDetail />} />
                  <Route path="/configurator" element={<Configurator />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetailPage />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/visualization" element={<Visualization />} />
                  <Route path="/office-configurator" element={<OfficeConfiguratorPage />} />
                  <Route path="/rent" element={<RentLanding />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/user-agreement" element={<UserAgreement />} />
                  <Route path="/marketplace" element={<MarketplacePage />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/:slug" element={<PageView />} />
                </Route>

                <Route path="/login" element={<LoginPage />} />
                <Route element={<NewProtectedRoute adminOnly />}>
                  <Route path="/admin" element={<Navigate to="/admin/panel" replace />} />
                  <Route path="/admin/panel" element={<AdminPanel />} />
                  <Route path="/admin/panel/products" element={<ProductManagement />} />
                  <Route path="/admin/panel/users" element={<UserManagement />} />
                  <Route path="/admin/panel/content" element={<ContentManagement />} />
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
                  <Route path="/admin/pages/new" element={<PageEditorFixed />} />
                  <Route path="/admin/pages/edit/:id" element={<PageEditorFixed />} />
                </Route>

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