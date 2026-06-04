import { ClerkAppearanceTheme } from "@clerk/nextjs/types";
// Exact hex values derived from your Mist theme oklch tokens
// dark background  #090b0c   dark card       #161b1d
// dark primary     #e3e7e8   dark primary-fg #161b1d
// dark secondary   #22292b   dark muted-fg   #9ca8ab
// dark foreground  #f9fbfb
//
// light background #ffffff   light primary   #161b1d
// light primary-fg #f9fbfb   light secondary #f1f3f3
// light muted-fg   #67787c   light border    #e3e7e8
// light foreground #090b0c

// ─── DARK ────────────────────────────────────────────────────────────────────
export const clerkAppearanceDark: ClerkAppearanceTheme = {
  layout: {
    socialButtonsVariant: "blockButton",
    logoPlacement: "inside",
  },
  variables: {
    colorBackground:              "#161b1d",   // --card (Clerk uses this as card bg)
    colorText:                    "#f9fbfb",   // --foreground
    colorTextSecondary:           "#9ca8ab",   // --muted-foreground
    colorInputText:               "#f9fbfb",
    colorInputBackground:         "#090b0c",   // --background (darker than card)

    colorPrimary:                 "#e3e7e8",   // --primary (near-white)
    colorTextOnPrimaryBackground: "#161b1d",   // --primary-foreground

    colorNeutral:                 "#9ca8ab",   // --muted-foreground
    colorDanger:                  "#f87171",   // red-400, readable on dark

    borderRadius:      "0.625rem",
    fontFamily:        "var(--font-sans), system-ui, sans-serif",
    fontFamilyButtons: "var(--font-sans), system-ui, sans-serif",
    fontSize:          "0.875rem",
    spacingUnit:       "1rem",
  },
  elements: {
    card: {
      backgroundColor: "#161b1d",
      border:          "1px solid rgba(255,255,255,0.08)",
      boxShadow:       "0 8px 32px rgba(0,0,0,0.5)",
      borderRadius:    "0.875rem",
    },
    cardBox: {
      boxShadow: "none",
    },

    headerTitle: {
      color:         "#f9fbfb",
      fontWeight:    "600",
      fontSize:      "1.125rem",
      letterSpacing: "-0.01em",
    },
    headerSubtitle: {
      color: "#9ca8ab",
    },

    // Social (Google etc.)
    socialButtonsBlockButton: {
      backgroundColor: "#22292b",   // --secondary
      border:          "1px solid rgba(255,255,255,0.08)",
      color:           "#f9fbfb",
      borderRadius:    "0.5rem",
      fontWeight:      "500",
    },
    socialButtonsBlockButtonText: {
      color:      "#f9fbfb",
      fontWeight: "500",
    },

    // Divider
    dividerLine: { backgroundColor: "rgba(255,255,255,0.08)" },
    dividerText: { color: "#9ca8ab", fontSize: "0.75rem" },

    // Form
    formFieldLabel: {
      color:      "#f9fbfb",
      fontWeight: "500",
      fontSize:   "0.875rem",
    },
    formFieldInput: {
      backgroundColor: "#090b0c",
      border:          "1px solid rgba(255,255,255,0.12)",
      borderRadius:    "0.5rem",
      color:           "#f9fbfb",
      fontSize:        "0.875rem",
    },
    formFieldHintText:  { color: "#9ca8ab" },
    formFieldErrorText: { color: "#f87171" },

    // Primary button (Continue)
    formButtonPrimary: {
      backgroundColor: "#e3e7e8",   // --primary
      color:           "#161b1d",   // --primary-foreground
      border:          "none",
      borderRadius:    "0.5rem",
      fontWeight:      "500",
      fontSize:        "0.875rem",
    },

    formButtonReset: { color: "#9ca8ab" },

    // Footer
    footer:           { backgroundColor: "transparent"  },
    footerAction:     { backgroundColor: "transparent"},
    footerActionText: { color: "#9ca8ab" },
    footerActionLink: {
      color:               "#e3e7e8",
      fontWeight:          "600",
      textDecoration:      "underline",
      textUnderlineOffset: "2px",
    },

    // "Last used" badge
    badge: {
      backgroundColor: "#22292b",
      color:           "#f9fbfb",
      border:          "1px solid rgba(255,255,255,0.08)",
      borderRadius:    "0.375rem",
    },
    

    identityPreviewText:        { color: "#f9fbfb" },
    identityPreviewEditButton:  { color: "#9ca8ab" },
    alertText:                  { color: "#f9fbfb" },

  },
};

// ─── LIGHT ───────────────────────────────────────────────────────────────────
export const clerkAppearanceLight: ClerkAppearanceTheme = {
  layout: {
    socialButtonsVariant: "blockButton",
    logoPlacement: "inside",
  },
  variables: {
    colorBackground:              "#ffffff",
    colorText:                    "#090b0c",   // --foreground
    colorTextSecondary:           "#67787c",   // --muted-foreground
    colorInputText:               "#090b0c",
    colorInputBackground:         "#ffffff",

    colorPrimary:                 "#161b1d",   // --primary
    colorTextOnPrimaryBackground: "#f9fbfb",   // --primary-foreground

    colorNeutral:                 "#67787c",
    colorDanger:                  "#dc2626",

    borderRadius:      "0.625rem",
    fontFamily:        "var(--font-sans), system-ui, sans-serif",
    fontFamilyButtons: "var(--font-sans), system-ui, sans-serif",
    fontSize:          "0.875rem",
    spacingUnit:       "1rem",
  },
  elements: {
    card: {
      backgroundColor: "#ffffff",
      border:          "1px solid #e3e7e8",
      boxShadow:       "0 2px 12px rgba(9,11,12,0.08)",
      borderRadius:    "0.875rem",
    },

    headerTitle: {
      color:      "#090b0c",
      fontWeight: "600",
      fontSize:   "1.125rem",
    },
    headerSubtitle: { color: "#67787c" },

    socialButtonsBlockButton: {
      backgroundColor: "#f1f3f3",   // --secondary
      border:          "1px solid #e3e7e8",
      color:           "#090b0c",
      borderRadius:    "0.5rem",
      fontWeight:      "500",
    },
    socialButtonsBlockButtonText: {
      color:      "#090b0c",
      fontWeight: "500",
    },

    dividerLine: { backgroundColor: "#e3e7e8" },
    dividerText: { color: "#67787c", fontSize: "0.75rem" },

    formFieldLabel: {
      color:      "#090b0c",
      fontWeight: "500",
      fontSize:   "0.875rem",
    },
    formFieldInput: {
      backgroundColor: "#ffffff",
      border:          "1px solid #e3e7e8",
      borderRadius:    "0.5rem",
      color:           "#090b0c",
      fontSize:        "0.875rem",
    },
    formFieldHintText:  { color: "#67787c" },
    formFieldErrorText: { color: "#dc2626" },

    formButtonPrimary: {
      backgroundColor: "#161b1d",   // --primary
      color:           "#f9fbfb",   // --primary-foreground
      border:          "none",
      borderRadius:    "0.5rem",
      fontWeight:      "500",
      fontSize:        "0.875rem",
    },

    footerActionText: { color: "#67787c" },
    footerActionLink: {
      color:      "#161b1d",
      fontWeight: "600",
    },

    badge: {
      backgroundColor: "#f1f3f3",
      color:           "#161b1d",
      border:          "1px solid #e3e7e8",
      borderRadius:    "0.375rem",
    },
    
  },
};

