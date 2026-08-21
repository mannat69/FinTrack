import {
  User,
  Palette,
  Bell,
  Database,
} from "lucide-react";

import { useSettings } from "../context/SettingsContext";

import SettingsSection from "../components/settings/SettingsSection";
import SettingRow from "../components/settings/SettingRow";
import DataManagement from "../components/settings/DataManagement";

function Settings() {
  const {
    settings,
    updateSetting,
  } = useSettings();

  return (
    <div className="pb-12">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-ink-50">
          Settings
        </h1>

        <p className="mt-2 text-ink-400">
          Customize your FinTrack experience.
        </p>
      </div>

      {/* Profile */}

      <div className="mt-8">

        <SettingsSection
          title="Profile"
          description="Manage your personal information."
        >

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold">
              <User size={30} />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-ink-50">
                {settings.name}
              </h3>

              <p className="text-sm text-ink-400">
                {settings.email}
              </p>
            </div>

          </div>

          <SettingRow
            label="Name"
            description="Your display name."
          >
            <input
              type="text"
              value={settings.name}
              onChange={(e) =>
                updateSetting(
                  "name",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-hairline bg-surface-2 px-4 py-3 text-ink-50 outline-none transition focus:border-gold"
            />
          </SettingRow>

          <SettingRow
            label="Email"
            description="Your account email."
          >
            <input
              type="email"
              value={settings.email}
              onChange={(e) =>
                updateSetting(
                  "email",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-hairline bg-surface-2 px-4 py-3 text-ink-50 outline-none transition focus:border-gold"
            />
          </SettingRow>

        </SettingsSection>

      </div>

      {/* Preferences */}

      <div className="mt-6">

        <SettingsSection
          title="Preferences"
          description="Control how FinTrack behaves."
        >

          <SettingRow
            label="Currency"
            description="Choose the currency used throughout the application."
          >
            <select
              value={settings.currency}
              onChange={(e) =>
                updateSetting(
                  "currency",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-hairline bg-surface-2 px-4 py-3 text-ink-50 outline-none focus:border-gold"
            >
              <option value="INR">
                ₹ INR — Indian Rupee
              </option>

              <option value="USD">
                $ USD — US Dollar
              </option>

              <option value="EUR">
                € EUR — Euro
              </option>

              <option value="GBP">
                £ GBP — British Pound
              </option>
            </select>
          </SettingRow>

          <SettingRow
            label="Theme"
            description="Choose your preferred appearance."
          >
            <select
              value={settings.theme}
              onChange={(e) =>
                updateSetting(
                  "theme",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-hairline bg-surface-2 px-4 py-3 text-ink-50 outline-none focus:border-gold"
            >
              <option value="dark">
                Dark
              </option>

              <option value="light">
                Light
              </option>

              <option value="system">
                System
              </option>
            </select>
          </SettingRow>

          <SettingRow
            label="Notifications"
            description="Receive financial reminders and alerts."
          >
            <button
              onClick={() =>
                updateSetting(
                  "notifications",
                  !settings.notifications
                )
              }
              className={`relative h-7 w-12 rounded-full transition ${
                settings.notifications
                  ? "bg-gold"
                  : "bg-surface-3"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                  settings.notifications
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>
          </SettingRow>

        </SettingsSection>

      </div>

      {/* Data */}

      <div className="mt-6">

        <SettingsSection
          title="Data Management"
          description="Backup, restore, or remove your financial data."
        >
          <DataManagement />
        </SettingsSection>

      </div>

      {/* About */}

      <div className="mt-6">

        <div className="rounded-2xl border border-hairline bg-surface p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-plum/10 p-3 text-plum">
              <Palette size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-ink-50">
                FinTrack
              </h2>

              <p className="text-sm text-ink-400">
                Personal Finance Dashboard
              </p>
            </div>

          </div>

          <div className="mt-5 flex items-center justify-between border-t border-hairline pt-5">

            <span className="text-sm text-ink-400">
              Version
            </span>

            <span className="rounded-lg bg-surface-2 px-3 py-1 text-sm font-medium text-ink-50">
              v0.4.0
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;