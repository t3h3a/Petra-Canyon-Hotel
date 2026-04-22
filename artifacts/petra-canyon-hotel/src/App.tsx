import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Router as WouterRouter, Switch } from "wouter";

import { AuthProvider } from "@/components/AuthProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { SiteContentProvider } from "@/lib/site-content";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AdminPage from "@/pages/AdminPage";
import AccountPage from "@/pages/AccountPage/index";
import AmenitiesPage from "@/pages/AmenitiesPage";
import AuthPage from "@/pages/AuthPage/index";
import BookingPage from "@/pages/BookingPage/index";
import HomePage from "@/pages/HomePage/index";
import LocationPage from "@/pages/LocationPage";
import NotFound from "@/pages/not-found";
import RestaurantPage from "@/pages/RestaurantPage";
import RoomsPage from "@/pages/RoomsPage/index";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/rooms" component={RoomsPage} />
      <Route path="/amenities" component={AmenitiesPage} />
      <Route path="/restaurant" component={RestaurantPage} />
      <Route path="/location" component={LocationPage} />
      <Route path="/booking-request" component={BookingPage} />
      <Route path="/login">{() => <AuthPage mode="login" />}</Route>
      <Route path="/signup">{() => <AuthPage mode="signup" />}</Route>
      <Route path="/account" component={AccountPage} />
      <Route path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <SiteContentProvider>
            <TooltipProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
              </WouterRouter>
              <Toaster />
            </TooltipProvider>
          </SiteContentProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
