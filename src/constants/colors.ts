export const colorPairs = {
  green: {
    light: "#dce0d9",
    dark: "#75836a",
    darkest: "#434b3c"
  },
  parchment: {
    light: "#ded3c8",
    dark: "#68533f",
    darkest: "#19140f"
  },
  blue: {
    light: "#c4d8e2",
    dark: "#5a7b8c",
    darkest: "#263640"
  },
  rose: {
    light: "#f2d7db",
    dark: "#814d57",
    darkest: "#311e21"
  },
  lavender: {
    light: "#e6d9f2",
    dark: "#8a6da3",
    darkest: "#291f32"
  },
  panda: {
    light: "#efefef",
    dark: "#000",
    darkest: "#606060"
  }
}

export const colorPairsList = Object.entries(colorPairs).map(([name, { light, dark, darkest }]) => ({
  name,
  light,
  dark,
  darkest
}));