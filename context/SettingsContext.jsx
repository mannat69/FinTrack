import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const SettingsContext = createContext(null);

const DEFAULT_SETTINGS = {
  name: "FinTrack User",
  email: "user@fintrack.app",
  currency: "INR",
  theme: "dark",
  notifications: true,
};

function getInitialSettings() {
  try {
    const saved = localStorage.getItem(
      "fintrack-settings"
    );

    if (!saved) {
      return DEFAULT_SETTINGS;
    }

    return {
      ...DEFAULT_SETTINGS,
      ...JSON.parse(saved),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] =
    useState(getInitialSettings);

  useEffect(() => {
    localStorage.setItem(
      "fintrack-settings",
      JSON.stringify(settings)
    );
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement;

    if (settings.theme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
      return;
    }

    if (settings.theme === "dark") {
      root.classList.remove("light");
      root.classList.add("dark");
      return;
    }

    const prefersDark =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

    root.classList.toggle(
      "dark",
      prefersDark
    );

    root.classList.toggle(
      "light",
      !prefersDark
    );
  }, [settings.theme]);

  const updateSetting = (
    key,
    value
  ) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context =
    useContext(SettingsContext);

  if (!context) {
    throw new Error(
      "useSettings must be used inside SettingsProvider"
    );
  }

  return context;
}