import { useTheme } from "./ThemeContext";

// Card-level theme values derived from the global dark/light theme.
// Matches the Figma "Tech Career Explorer" design system: cards are
// always a light/white surface with black text, regardless of the
// screen's dark/light mode — only the border and card opacity change.
export function useCardTheme() {
  const { dark } = useTheme();

  return {
    dark,
    G: dark ? "#ffffff" : "rgba(13,84,81,0.10)",
    border: {
      borderWidth: 1,
      borderColor: dark ? "rgba(255,255,255,0.55)" : "rgba(13,84,81,0.18)",
    },
    // Card-interior text — black everywhere
    text: "#000000",
    subtext: "#000000",
    muted: "#000000",
    accent: "#0d5451",
    accentLight: dark ? "rgba(13,84,81,0.12)" : "rgba(255,255,255,0.15)",
    // Header / outside-card text — black everywhere
    headerText: "#000000",
    headerSub: "#000000",
  };
}

// Shared brand palette, mirrored from the Figma design.
export const palette = {
  teal: "#0d5451",
  tealDark: "#0a3d3b",
  tealDeep: "#042f2e",
  tealMid: "#116b67",
  tealBright: "#1a9e99",
  tealLight: "#4dd4ce",
  lightBg: "#f0fafa",
};

export function useScreenGradient() {
  const { dark } = useTheme();
  return dark
    ? [palette.tealDeep, palette.teal, palette.tealMid, palette.tealDark]
    : [palette.lightBg, palette.lightBg];
}