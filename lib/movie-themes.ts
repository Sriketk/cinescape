export interface MovieTheme {
  id: string;
  name: string;
  description: string;
  poster?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    input: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    destructive: string;
    destructiveForeground: string;
    ring: string;
  };
  typography: {
    primary: "sans" | "serif" | "mono" | "figtree";
    secondary?: "sans" | "serif" | "mono" | "figtree";
  };
  backgroundGradient: {
    from: string;
    via?: string;
    to: string;
    direction:
      | "to-br"
      | "to-bl"
      | "to-tr"
      | "to-tl"
      | "to-r"
      | "to-l"
      | "to-b"
      | "to-t";
    cssClass: string;
  };
  chatInput: {
    background: string;
    backdropBlur: boolean;
    border: string;
    shadow: string;
    hoverShadow: string;
    focusBorder: string;
    focusBackground: string;
    textColor: string;
    placeholderColor: string;
  };
  effects?: {
    borderBeamColors?: {
      from: string;
      to: string;
    };
    glowColor?: string;
    backgroundGlow?: {
      color: string;
      from: string;
      to: string;
      secondary: string;
    };
  };
}

export const movieThemes: Record<string, MovieTheme> = {
  default: {
    id: "default",
    name: "Dune",
    description: "Based on the desert",
    colors: {
      primary: "0 0% 9%",
      secondary: "0 0% 96.1%",
      accent: "0 0% 96.1%",
      background: "40 50% 96%",
      foreground: "0 0% 3.9%",
      muted: "0 0% 96.1%",
      mutedForeground: "0 0% 45.1%",
      border: "0 0% 89.8%",
      input: "0 0% 89.8%",
      card: "0 0% 100%",
      cardForeground: "0 0% 3.9%",
      popover: "0 0% 100%",
      popoverForeground: "0 0% 3.9%",
      destructive: "0 84.2% 60.2%",
      destructiveForeground: "0 0% 98%",
      ring: "0 0% 3.9%",
    },
    typography: {
      primary: "sans",
    },
    backgroundGradient: {
      from: "amber-50",
      via: "orange-50",
      to: "yellow-50",
      direction: "to-br",
      cssClass: "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50",
    },
    chatInput: {
      background: "bg-white",
      backdropBlur: true,
      border:
        "border border-amber-200/30 hover:border-amber-300/50 focus-within:border-orange-300/60",
      shadow: "shadow-lg md:shadow-2xl",
      hoverShadow: "hover:shadow-xl md:hover:shadow-3xl",
      focusBorder: "focus-within:border-orange-300/60",
      focusBackground:
        "focus-within:bg-gradient-to-br focus-within:from-white/95 focus-within:via-amber-50/90 focus-within:to-orange-50/80",
      textColor: "[&_textarea]:text-gray-800",
      placeholderColor: "[&_textarea]:placeholder:text-gray-500/70",
    },
    effects: {
      borderBeamColors: {
        from: "#f59e0b",
        to: "#f97316",
      },
      backgroundGlow: {
        color: "rgba(251,191,36,0.1)",
        from: "rgba(251,191,36,0.2)",
        to: "rgba(249,115,22,0.2)",
        secondary: "rgba(253,224,71,0.2)",
      },
    },
  },
  moonlight: {
    id: "moonlight",
    name: "Moonlight",
    description: "Barry Jenkins' masterpiece",
    colors: {
      // Tier 1: Primary Colors (Main brand colors)
      primary: "183 87% 41%", // #0ebbc1 - Bright teal
      secondary: "225 41% 23%", // #222e51 - Deep navy
      accent: "308 58% 71%", // #e187d5 - Soft magenta
      
      // Tier 2: Background & Surface Colors
      background: "225 41% 15%", // Darker navy background
      foreground: "240 100% 100%", // #ffffff - White text
      card: "225 41% 20%", // Slightly lighter navy surface
      cardForeground: "240 100% 100%", // #ffffff - White text
      popover: "225 41% 20%", // Navy popover
      popoverForeground: "240 100% 100%", // #ffffff - White text
      
      // Tier 3: Supporting Colors
      muted: "225 41% 25%", // Medium navy
      mutedForeground: "240 100% 100%", // #ffffff - White text
      border: "183 87% 41%", // Teal borders
      input: "225 41% 20%", // Navy input
      destructive: "0 84.2% 60.2%", // #ef4444 - Red for errors
      destructiveForeground: "240 100% 100%", // #ffffff - White text
      ring: "183 87% 41%", // Teal ring (matches primary)
    },
    typography: {
      primary: "figtree",
    },
    backgroundGradient: {
      from: "#222e51",
      via: "#0ebbc1",
      to: "#e187d5",
      direction: "to-br",
      cssClass: "bg-gradient-to-br from-[#222e51] from-0% via-[#222e51] via-20% via-[#0ebbc1] via-40% via-[#e187d5] via-70% to-[#e187d5] to-100%",
    },
    chatInput: {
      background:
        "bg-gradient-to-br from-white/90 via-[#0ebbc1]/80 to-[#e187d5]/70",
      backdropBlur: true,
      border:
        "border border-[#0ebbc1]/40 hover:border-[#0ebbc1]/60 focus-within:border-[#e187d5]/70",
      shadow:
        "shadow-lg shadow-[#0ebbc1]/30 md:shadow-2xl md:shadow-[#0ebbc1]/40",
      hoverShadow: "hover:shadow-xl hover:shadow-[#0ebbc1]/50",
      focusBorder: "focus-within:border-[#e187d5]/70",
      focusBackground:
        "focus-within:bg-gradient-to-br focus-within:from-white/95 focus-within:via-[#0ebbc1]/90 focus-within:to-[#e187d5]/80",
      textColor: "[&_textarea]:text-black",
      placeholderColor: "[&_textarea]:placeholder:text-black/60",
    },
    effects: {
      borderBeamColors: {
        from: "#0ebbc1",
        to: "#e187d5",
      },
      glowColor: "#0ebbc1",
      backgroundGlow: {
        color: "rgba(14,187,193,0.15)",
        from: "rgba(14,187,193,0.3)",
        to: "rgba(225,135,213,0.25)",
        secondary: "rgba(34,46,81,0.25)",
      },
    },
  },
};

export function getTheme(themeId: string): MovieTheme {
  return movieThemes[themeId] || movieThemes.default;
}

export function getThemeList(): MovieTheme[] {
  return Object.values(movieThemes);
}
