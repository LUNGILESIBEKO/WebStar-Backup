import { useTheme } from "./ThemeContext";

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