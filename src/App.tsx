import { useState } from "react";
import Navbar from "./components/Navbar";
import Wardrobe from "./pages/Wardrobe";
import Capture from "./pages/Capture";
import Match from "./pages/Match";

type Tab = "wardrobe" | "capture" | "match";

export default function App() {
  const [tab, setTab] = useState<Tab>("wardrobe");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar tab={tab} onChange={setTab} />
      <main className="container mx-auto max-w-4xl flex-1 w-full p-4 sm:p-6">
        {tab === "wardrobe" && <Wardrobe />}
        {tab === "capture" && <Capture onDone={() => setTab("wardrobe")} />}
        {tab === "match" && <Match />}
      </main>
      <footer className="py-4 text-center text-sm text-zinc-500">PersonFi ©</footer>
    </div>
  );
}
