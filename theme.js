import { useTheme } from "./ThemeContext";

// Card-level theme values derived from the global dark/light theme.
// Import this from any screen that needs the "glass card" colors
// (background, border, text, subtext) instead of hardcoding them.
export function useCardTheme() {
  const { dark } = useTheme();

  return {
    G: dark ? "rgba(30,41,59,0.62)" : "rgba(255,255,255,0.62)",
    border: {
      borderWidth: 1,
      borderColor: dark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.55)",
    },
    text: dark ? "#e2e8f0" : "#1e293b",
    subtext: dark ? "#94a3b8" : "#64748b",
  };
}