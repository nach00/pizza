import { shorthands } from "@tamagui/shorthands";
import { createTokens, createTamagui, setupDev } from "tamagui";

import { animations } from "./utils/animations";
import { bodyFont, headingFont } from "./utils/fonts";
import { media, mediaQueryDefaultActive } from "./utils/media";
import * as themesIn from "./utils/theme-generated";
import { color } from "./utils/token-colors";
import { radius } from "./utils/token-radius";
import { size } from "./utils/token-size";
import { space } from "./utils/token-space";
import { zIndex } from "./utils/token-z-index";

// Hold down Option for a second to see some helpful visuals
setupDev({
  visualizer: true,
});

/**
 * This avoids shipping themes as JS. Instead, Tamagui will hydrate them from CSS.
 */

const themes =
  process.env.TAMAGUI_TARGET !== "web" ||
  process.env.TAMAGUI_IS_SERVER ||
  process.env.STORYBOOK
    ? themesIn
    : ({} as typeof themesIn);

export const config = createTamagui({
  themes,
  defaultFont: "body",
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  mediaQueryDefaultActive,
  selectionStyles: (theme) => ({
    backgroundColor: theme.color5,
    color: theme.color11,
  }),
  onlyAllowShorthands: false,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  tokens: createTokens({
    color,
    radius,
    zIndex,
    space,
    size,
  }),
  media,
  settings: {
    allowedStyleValues: "somewhat-strict",
    autocompleteSpecificTokens: "except-special",
    fastSchemeChange: true,
  },
});

export default config;
