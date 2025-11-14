import { useState } from "react";
import Wardrobe from "./pages/Wardrobe";
import Onboarding from "./pages/Onboarding";
import { useLocalStore } from "./hooks/useLocalStore";
import Sidebar, { type Page } from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import Home from "./pages/Home";
import DailyOutfits from "./pages/DailyOutfits";
import Analytics from "./pages/Analytics";
import Buy from "./pages/Buy";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

// Page type re-exported from Sidebar

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [onboarded, setOnboarded] = useLocalStore<boolean>("pf_onboarded", false);

  if (!onboarded) {
    return <Onboarding onComplete={() => setOnboarded(true)} />;
  }

  return (
    <div className="min-h-screen app-bg text-zinc-900">
      <div className="flex">
        <div className="hidden md:block"><Sidebar page={page} onChange={setPage} /></div>
        <main className="flex-1 p-4 sm:p-6 pb-20 md:pb-8">
          {page === "home" && <Home onAddOutfit={() => setPage("daily")} />}
          {page === "wardrobe" && <Wardrobe />}
          {page === "daily" && <DailyOutfits />}
          {page === "analytics" && <Analytics />}
          {page === "buy" && <Buy />}
          {page === "profile" && <Profile />}
          {page === "settings" && <Settings />}
        </main>
      </div>
      {/* Bottom navigation for phones */}
      <MobileNav page={page} onChange={setPage} />
    </div>
  );
}
