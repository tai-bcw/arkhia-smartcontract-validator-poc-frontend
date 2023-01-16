import {
    applyTheme,
    argbFromHex,
    themeFromSourceColor,
} from '@material/material-color-utilities';
import { alpha, PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
    interface ColorRange {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    }
}

declare module '@mui/material/styles/createTypography' {
    interface TypographyOptions {
        fontWeightSemiBold?: number;
        fontWeightExtraBold?: number;
        fontFamilyCode?: string;
    }

    interface Typography {
        fontWeightSemiBold: number;
        fontWeightExtraBold: number;
        fontFamilyCode: string;
    }
}

export const primaryBlueDark = {
    50: `#fefbff`,
    100: `#eff0ff`,
    200: `#dce1ff`,
    300: `#b5c4ff`,
    400: `#748de0`,
    500: `#405aa9`,
    600: `#264190`,
    700: `#264190`,
    800: `#042978`,
    900: `#00164d`,
    main: `#00164d`,
};

export const primaryOrange = {
    50: `#fffbff`,
    100: `#ffede6`,
    200: `#ffdbcc`,
    300: `#ffb695`,
    400: `#ff8c55`, // vs primaryBlueDark 900: WCAG 7.47 AAA Best for all text
    500: `#ca5100`, // vs white: WCAG 4.36 AAA Ok for large text
    600: `#a23f00`, // vs white: WCAG 6.29 AAA Best for large text
    700: `#7b2e00`, // vs white: WCAG 8.16 AAA Best for all text
    800: `#571f00`, // vs white: WCAG 3.08 AAA Best for all text
    900: `#571f00`, // vs white: WCAG 3.08 AAA Best for all text
    main: `#f46300`, // vs white: WCAG 3.08 AAA Ok for large text | vs primaryBlueDark 900: WCAG 5.42 AAA Best for large text
};

export const secondaryBlue = {
    50: `#fefbff`,
    100: `#eff0ff`,
    200: `#dce1ff`,
    300: `#b6c4ff`,
    400: `#768ce0`,
    500: `#5c72c4`,
    600: `#4359a9`,
    700: `#294190`,
    800: `#0b2978`,
    900: `#001551`,
    main: `#001551`,
};

const grey = {
    50: `#f0f0fa`,
    100: `#e2e1ec`,
    200: `#c6c6d0`, // vs primaryBlueDark 900: WCAG 10.13 AAA
    300: `#aaaab4`, // vs primaryBlueDark 900: WCAG 7.46 AAA
    400: `#8f909a`, // vs primaryBlueDark 900: WCAG 5.42 AAA Only for large text
    500: `#767680`, // vs primaryBlueDark 900: WCAG 3.82 AAA Ok for large text
    600: `#5d5e67`, // vs white: WCAG 6.43 AAA Only for large text
    700: `#45464f`, // vs white: WCAG 9.36 AAA
    800: `#2e3038`, // vs white: WCAG 10.13 AAA
    900: `#1a1b23`, // vs white: WCAG 10.13 AAA
};

const red = {
    50: `#ffedea`,
    100: `#ffdad6`,
    200: `#ffb4ab`,
    300: `#ff897d`,
    400: `#ff5449`,
    500: `#de3730`,
    600: `#ba1a1a`,
    700: `#93000a`,
    800: `#690005`,
    900: `#410002`,
    main: `#ba1a1a`,
};

// context on the Advanced Perceptual Contrast Algorithm (APCA) used above here: https://github.com/w3c/wcag/issues/695
// contrast checker: https://webaim.org/resources/contrastchecker/
// utility found here: https://github.com/material-foundation/material-color-utilities
// more resources about generating color palettes based on Material Design: https://material.io/blog/science-of-color-design

export default function Palette (mode: `light` | `dark`): PaletteOptions {

    const themeColors = themeFromSourceColor(argbFromHex(primaryBlueDark.main), [
        {
            name: `accent-1`,
            value: argbFromHex(primaryOrange.main),
            blend: true,
        }
    ]);

    // Print out the theme as JSON
    // console.log(JSON.stringify(themeColors, null, 2));
    applyTheme(themeColors, {
        target: document.getElementById(`root`) ?? document.body, dark: mode === `dark` ?? false
    });

    return {
        mode,
        primary: {
            ...primaryBlueDark,
            ...(mode === `dark` && { main: primaryBlueDark.main, }),
        },
        secondary: {
            ...primaryOrange,
            ...(mode === `dark` && { main: primaryOrange.main }),
        },
        divider: mode === `dark` ? alpha(primaryBlueDark[100], 0.08) : grey[100],
        ...(mode === `dark` && {
            background: {
                default: primaryBlueDark[800],
                paper: primaryBlueDark[900],
            },
        }),
        common: { black: `#1D1D1D`, },
        ...(mode === `light` && {
            text: {
                primary: grey[900],
                secondary: grey[700],
            },
        }),
        ...(mode === `dark` && {
            text: {
                primary: `#fff`,
                secondary: grey[400],
            },
        }),
        grey,
        error: red,
        success: {
            50: `#E9FBF0`,
            100: `#C6F6D9`,
            200: `#9AEFBC`,
            300: `#6AE79C`,
            400: `#3EE07F`,
            500: `#21CC66`,
            600: `#1DB45A`,
            ...(mode === `dark` && { main: `#1DB45A` }), // contrast 6.17:1 (primaryblueDark.800)
            ...(mode === `light` && { main: `#1AA251` }), // contrast 3.31:1
            700: `#1AA251`,
            800: `#178D46`,
            900: `#0F5C2E`,
        },
        warning: primaryOrange
    };
}
