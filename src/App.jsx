import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import MakeOffer from "./pages/MakeOffer";
import Search from "./pages/Search";
import MyOffers from "./pages/MyOffers";
import NotFound from "./pages/NotFound";
import RequireAuth from "./components/RequireAuth";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/properties/:city" element={<Properties />} />
        <Route path="/property/:id" element={
          <ErrorBoundary navbar={<Navbar />}>
            <PropertyDetail />
          </ErrorBoundary>
        } />

        {/* Protected Routes */}
        <Route
          path="/offer/:id"
          element={
            <RequireAuth>
              <MakeOffer />
            </RequireAuth>
          }
        />
        <Route
          path="/profile/offers"
          element={
            <RequireAuth>
              <MyOffers />
            </RequireAuth>
          }
        />

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
