/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const darkBlue = '#06003D';
const lightBlue = '#B1C9F7';
const lightYellow = '#FFE699'; 
const tan = '#FBE8C5';

export const Colors = {
  light: {
    text: darkBlue,
    background: '#FFFFFF',
    tint: lightBlue,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    button: tan
  },
  dark: {
    text: '#FFFFF6',
    background: '#000000',
    tint: lightBlue,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    button: '#FFFFFF',
  },
};
