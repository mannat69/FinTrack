import { useState } from "react";

import {
  FiMenu,
  FiBell,
} from "react-icons/fi";

import {
  Outlet,
} from "react-router-dom";

import Sidebar from "./Sidebar";

function Layout() {
  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  return (
    <div className="min-h-screen bg-ink">

      <div className="flex min-h-screen">

        {/* Sidebar */}

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() =>
            setSidebarOpen(false)
          }
        />

        {/* Main area */}

        <div className="flex min-w-0 flex-1 flex-col">

          {/* Mobile / top header */}

          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-hairline bg-ink/95 px-4 backdrop-blur-md lg:hidden">

            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="rounded-xl p-2 text-ink-200 transition hover:bg-surface hover:text-ink-50"
              aria-label="Open menu"
            >
              <FiMenu size={24} />
            </button>

            <h1 className="font-display text-lg font-semibold italic text-gold">
              FinTrack
            </h1>

            <button
              className="rounded-xl p-2 text-ink-200 transition hover:bg-surface hover:text-ink-50"
              aria-label="Notifications"
            >
              <FiBell size={21} />
            </button>

          </header>

          {/* Page content */}

          <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8">

            <Outlet />

          </main>

        </div>

      </div>

    </div>
  );
}

export default Layout;
