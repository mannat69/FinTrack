import {
  FiHome,
  FiCreditCard,
  FiPieChart,
  FiTarget,
  FiSettings,
  FiX,
} from "react-icons/fi";

import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  const navItems = [
    {
      to: "/",
      label: "Dashboard",
      icon: FiHome,
    },
    {
      to: "/transactions",
      label: "Transactions",
      icon: FiCreditCard,
    },
    {
      to: "/analytics",
      label: "Analytics",
      icon: FiPieChart,
    },
    {
      to: "/budgets",
      label: "Budgets",
      icon: FiTarget,
    },
    {
      to: "/goals",
      label: "Goals",
      icon: FiTarget,
    },
    {
      to: "/settings",
      label: "Settings",
      icon: FiSettings,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}

      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-64 flex-col
          border-r border-hairline
          bg-ink p-6
          transition-transform duration-300
          lg:static lg:z-auto
          lg:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>
            <h1 className="font-display text-2xl font-semibold italic text-gold">
              FinTrack
            </h1>

            <p className="stamp-label mt-1 text-ink-500">
              Personal Ledger
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-ink-400 transition hover:bg-surface hover:text-ink-50 lg:hidden"
            aria-label="Close menu"
          >
            <FiX size={22} />
          </button>

        </div>

        {/* Navigation */}

        <nav className="mt-10">

          <ul className="space-y-1">

            {navItems.map(
              ({
                to,
                label,
                icon: Icon,
              }) => (
                <li key={to}>

                  <NavLink
                    to={to}
                    end={to === "/"}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `
                      group relative flex items-center gap-3
                      rounded-lg py-2.5 pl-4 pr-3
                      text-sm transition
                      ${
                        isActive
                          ? "bg-surface text-gold"
                          : "text-ink-400 hover:bg-surface/60 hover:text-ink-50"
                      }
                      `
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={`absolute inset-y-1 left-0 w-[3px] rounded-full transition ${
                            isActive ? "bg-gold" : "bg-transparent"
                          }`}
                        />

                        <Icon size={18} />

                        <span className={isActive ? "font-semibold" : ""}>
                          {label}
                        </span>
                      </>
                    )}
                  </NavLink>

                </li>
              )
            )}

          </ul>

        </nav>

        {/* Footer */}

        <div className="mt-auto border-t border-dashed border-hairline pt-5">

          <p className="stamp-label text-center text-ink-500">
            FinTrack &middot; v1.0.0
          </p>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;
