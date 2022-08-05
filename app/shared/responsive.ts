export type ResponsiveProps<T = unknown> = {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

const screens = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1200,
};

type ScreenKeys = keyof typeof screens;

const mediaQueries = Object.keys(screens).reduce((memo, key) => {
  const value = screens[key as ScreenKeys];
  memo[key as ScreenKeys] = `screen and (min-width: ${value}px)`;
  return memo;
}, {} as Record<ScreenKeys, string>);

const getScreenPriority = (
  prevScreen: keyof typeof screens,
  screen: keyof typeof screens
) => {
  return screens[prevScreen] - screens[screen];
};

function getValueForScreen<T>(props: ResponsiveProps): T {
  return Object.keys(props).sort(getScreenPriority);
  // .reduce<T>((memo, key) => {
  //   const queryString = mediaQueries[key];
  //   const value = props[key];

  //   if (window.matchMedia(queryString).matches) {
  //     memo = value;
  //   }

  //   return memo;
  // }, null);
}

export function responsive<T>(props: ResponsiveProps<T>): T {
  const value = getValueForScreen<T>(props);
  return value;
}
