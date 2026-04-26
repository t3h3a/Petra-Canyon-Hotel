import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Router as WouterRouter, Switch } from "wouter";

import { LanguageProvider } from "@/components/LanguageProvider";
import { SiteContentProvider } from "@/lib/site-content";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AmenitiesPage from "@/pages/AmenitiesPage";
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
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <SiteContentProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </SiteContentProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
