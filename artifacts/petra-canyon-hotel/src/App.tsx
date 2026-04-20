import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/components/LanguageProvider";
import { AuthProvider } from "@/components/AuthProvider";
import Home from "@/pages/Home";
import RoomsPage from "@/pages/RoomsPage";
import AmenitiesPage from "@/pages/AmenitiesPage";
import RestaurantPage from "@/pages/RestaurantPage";
import LocationPage from "@/pages/LocationPage";
import BookingRequestPage from "@/pages/BookingRequestPage";
import AuthPage from "@/pages/AuthPage";
import AccountPage from "@/pages/AccountPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/rooms" component={RoomsPage} />
      <Route path="/amenities" component={AmenitiesPage} />
      <Route path="/restaurant" component={RestaurantPage} />
      <Route path="/location" component={LocationPage} />
      <Route path="/booking-request" component={BookingRequestPage} />
      <Route path="/login">{() => <AuthPage mode="login" />}</Route>
      <Route path="/signup">{() => <AuthPage mode="signup" />}</Route>
      <Route path="/account" component={AccountPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
