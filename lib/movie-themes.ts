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
    primary: "sans" | "serif" | "mono";
    secondary?: "sans" | "serif" | "mono";
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
    name: "Cinescape Classic",
    description: "The original warm, cinematic experience",
    colors: {
      primary: "0 0% 9%",
      secondary: "0 0% 96.1%",
      accent: "0 0% 96.1%",
      background: "0 0% 100%",
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
      background:
        "bg-gradient-to-br from-white/90 via-amber-50/80 to-orange-50/70",
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
    description: "Deep blues and teals inspired by Barry Jenkins' masterpiece",
    colors: {
      primary: "200 100% 40%",
      secondary: "210 40% 15%",
      accent: "180 100% 70%",
      background: "220 27% 5%",
      foreground: "180 100% 95%",
      muted: "220 27% 12%",
      mutedForeground: "180 50% 70%",
      border: "220 27% 18%",
      input: "220 27% 12%",
      card: "220 27% 8%",
      cardForeground: "180 100% 95%",
      popover: "220 27% 8%",
      popoverForeground: "180 100% 95%",
      destructive: "0 84.2% 60.2%",
      destructiveForeground: "0 0% 98%",
      ring: "200 100% 40%",
    },
    typography: {
      primary: "serif",
    },
    backgroundGradient: {
      from: "slate-900",
      via: "blue-950",
      to: "cyan-950",
      direction: "to-br",
      cssClass: "bg-gradient-to-br from-slate-900 via-blue-950 to-cyan-950",
    },
    chatInput: {
      background:
        "bg-gradient-to-br from-slate-800/90 via-blue-900/80 to-cyan-900/70",
      backdropBlur: true,
      border:
        "border border-cyan-400/30 hover:border-cyan-300/50 focus-within:border-cyan-200/60",
      shadow:
        "shadow-lg shadow-cyan-500/20 md:shadow-2xl md:shadow-cyan-500/30",
      hoverShadow: "hover:shadow-xl hover:shadow-cyan-500/40",
      focusBorder: "focus-within:border-cyan-200/60",
      focusBackground:
        "focus-within:bg-gradient-to-br focus-within:from-slate-800/95 focus-within:via-blue-900/90 focus-within:to-cyan-900/80",
      textColor: "[&_textarea]:text-cyan-100",
      placeholderColor: "[&_textarea]:placeholder:text-cyan-300/70",
    },
    effects: {
      borderBeamColors: {
        from: "#06b6d4",
        to: "#0891b2",
      },
      glowColor: "#06b6d4",
      backgroundGlow: {
        color: "rgba(6,182,212,0.1)",
        from: "rgba(6,182,212,0.2)",
        to: "rgba(8,145,178,0.2)",
        secondary: "rgba(8,145,178,0.2)",
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
