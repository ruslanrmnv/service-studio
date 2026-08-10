/* Three palettes, because a mockup that arrives in my colours is a mockup of
   my studio, not of their barbershop. Which one a lead gets is a judgement
   call made while looking at their Instagram: a shop with warm wood and gold
   lettering gets `brass`, a white-tiled minimal one gets `bone`, a shop that
   posts fades on black gets `ember`.

   None of them is purple, and none of them gets its energy from a gradient —
   see CLAUDE.md. The energy is in the type and the composition. */

export const THEMES = {
  // Warm dark. Wood, brass lettering, the classic barbershop.
  brass: {
    label: "тёплый тёмный — дерево, латунь, классика",
    ink: "#16120E",
    surface: "#1F1A15",
    line: "#332A22",
    paper: "#F3ECE1",
    mutedSolid: "#A29381",
    accent: "#C8913F",
    onAccent: "#16120E",
  },
  // Light editorial. White tile, good light, the shop that looks like a studio.
  bone: {
    label: "светлый — плитка, свет, минимализм",
    ink: "#FAF7F1",
    surface: "#FFFFFF",
    line: "#E2DBD0",
    paper: "#1A1815",
    mutedSolid: "#6B6357",
    accent: "#8C2B22",
    onAccent: "#FAF7F1",
  },
  // Dark with a hot edge. Fades, clippers, the shop whose grid is all black.
  ember: {
    label: "тёмный с горячим акцентом — фейды, уличный стиль",
    ink: "#101011",
    surface: "#18191A",
    line: "#2A2C2E",
    paper: "#F2F1EF",
    mutedSolid: "#8B8D90",
    accent: "#E2472A",
    /* Dark, not pale: pale text on this red measured 3.6:1, under AA for the
       button label. Against the same red, near-black is 5.6:1. */
    onAccent: "#101011",
  },
};

/* `ink` is the page ground and `paper` the text on it, which reads backwards
   for the light theme — there `ink` is the pale one. Naming them by role
   rather than by lightness is what lets one stylesheet serve all three. */
export function themeVars(name) {
  const t = THEMES[name] ?? THEMES.brass;
  return Object.entries(t)
    .filter(([k]) => k !== "label")
    .map(([k, v]) => `    --${k}: ${v};`)
    .join("\n");
}
