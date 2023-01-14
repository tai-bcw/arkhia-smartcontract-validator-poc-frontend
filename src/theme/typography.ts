import "inter-ui/inter.css";
import "@fontsource/ibm-plex-sans";
import "@fontsource/ibm-plex-mono";

export default function Typography () {
    const localeFontFamily = `IBM Plex Sans`;
    const localeWeightLight = 300;
    const localeWeightMedium = 400;
    const localeWeightRegular = 500;
    const localeWeightBold = 600;
    
    const fonts = [
        localeFontFamily,
        `Helvetica Neue`,
        `Arial`,
        `system-ui`,
        `sans-serif`,
    ];
    
    const fontFamily = fonts.map( font => `"${font}"`).join(`,`);

    const fontVariants = {
        // other font variants
        body2: { fontWeight: 600 }
    };
    
    return {
        fontFamily,
        fontWeightBold: localeWeightBold,
        fontWeightLight: localeWeightLight,
        fontWeightMedium: localeWeightMedium,
        fontWeightRegular: localeWeightRegular,
        fontSize: 16,
        ...fontVariants
    };
}
