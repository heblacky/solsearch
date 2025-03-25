import { heroui } from "@heroui/theme";

// Export the theme configuration directly
export const darkTheme = {
  type: "dark",
  theme: {
    colors: {
      background: {
        DEFAULT: "#0A0A0A",
        foreground: "#FFFFFF",
      },
      primary: {
        DEFAULT: "#8B5CF6",
        foreground: "#FFFFFF",
      },
      secondary: {
        DEFAULT: "#1A1A1A",
        foreground: "#FFFFFF",
      },
      focus: "#8B5CF6",
      divider: "#1A1A1A",
      overlay: "#000000",
      default: {
        50: "#18181B",
        100: "#27272A",
        200: "#3F3F46",
        300: "#52525B",
        400: "#71717A",
        500: "#A1A1AA",
        600: "#D4D4D8",
        700: "#E4E4E7",
        800: "#F4F4F5",
        900: "#FAFAFA",
      },
    },
    layout: {
      borderWidth: {
        small: "1px",
        medium: "2px",
        large: "4px",
      },
      radius: {
        small: "4px",
        medium: "8px",
        large: "12px",
      },
    },
  },
}; 