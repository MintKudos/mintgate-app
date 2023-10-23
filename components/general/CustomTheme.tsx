import _CustomProperties from 'react-custom-properties';
import { prebuildThemes } from 'components/utility/themes';
import convertHSLToHex from 'hooks/hsl2hex';

const CustomProperties = _CustomProperties as any; // hack for React 18

export default function CustomTheme({
  children,
  theme,
  globalstate,
}: {
  children: any;
  theme?: any;
  globalstate?: boolean;
}) {
  const base = { ...prebuildThemes['default'], ...prebuildThemes[theme] };
  const settingstheme = { ...base, ...theme };

  return (
    <CustomProperties
      global={globalstate === false ? false : true}
      properties={
        {
          '--font-family-heading': settingstheme.headerFont,
          '--font-weight-heading': settingstheme.headerFontWeight,
          '--font-family-body': settingstheme.bodyFont,
          '--font-weight-body': settingstheme.bodyFontWeight,
          '--p': settingstheme.primaryColor,
          '--pc': settingstheme.brandContentColor,
          '--s': settingstheme.secondaryColor,
          '--sc': settingstheme.brandContentColor,
          '--a': settingstheme.accentColor,
          '--ac': settingstheme.brandContentColor,
          '--b1': settingstheme.base100Color,
          '--b2': settingstheme.base200Color,
          '--b3': settingstheme.base300Color,
          '--bc': settingstheme.baseContentColor,
          '--n': settingstheme.neutralColor,
          '--nc': settingstheme.neutralContentColor,
          '--nav': settingstheme.navigationColor,
          '--rounded-box': settingstheme.borderRadius,
          '--rounded-btn': settingstheme.borderRadius,
          '--rounded-badge': settingstheme.borderRadius,
          '--onboard-connect-sidebar-background': convertHSLToHex(
            settingstheme.base200Color
          ),
          '--onboard-connect-sidebar-color': convertHSLToHex(
            settingstheme.brandContentColor
          ),
          '--onboard-connect-sidebar-progress-background': convertHSLToHex(
            settingstheme.brandContentColor
          ),
          '--onboard-connect-sidebar-progress-color': convertHSLToHex(
            settingstheme.brandContentColor
          ),
          '--onboard-connect-header-background': convertHSLToHex(
            settingstheme.base100Color
          ),
          '--onboard-connect-header-color': convertHSLToHex(
            settingstheme.baseContentColor
          ),
          '--onboard-link-color': convertHSLToHex(
            settingstheme.baseContentColor
          ),
          '--onboard-close-button-background': convertHSLToHex(
            settingstheme.base100Color
          ),
          // "--onboard-close-button-color": convertHSLToHex(),
          // "--onboard-checkbox-background": convertHSLToHex(),
          // "--onboard-checkbox-color": convertHSLToHex(),
          '--onboard-wallet-button-background': convertHSLToHex(
            settingstheme.base200Color
          ),
          '--onboard-wallet-button-background-hover': convertHSLToHex(
            settingstheme.primaryColor
          ),
          '--onboard-wallet-button-color': convertHSLToHex(
            settingstheme.baseContentColor
          ),
          '--onboard-wallet-button-border-color': convertHSLToHex(
            settingstheme.base100Color
          ),
          '--onboard-wallet-app-icon-border-color': convertHSLToHex(
            settingstheme.base100Color
          ),
          '--onboard-white': convertHSLToHex(settingstheme.base100Color),
          '--onboard-main-scroll-container-background': convertHSLToHex(
            settingstheme.base100Color
          ),
          '--onboard-modal-border-radius': settingstheme.borderRadius,
          '--onboard-wallet-button-border-radius': settingstheme.borderRadius,
          '--onboard-font-family-normal': settingstheme.headerFont,
          '--onboard-font-family-semibold': settingstheme.headerFont,
          '--onboard-font-family-light': settingstheme.bodyFont,
          '--onboard-connect-content-height': 'auto',
          '--onboard-wallet-columns': 1,
          '--onboard-shadow-1':
            'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(28, 15, 125, 0.1) 0px 36px 48px 0px',
          '--onboard-modal-z-index': 20,
          '--swiper-navigation-size': '2rem',
        } as any
      }
    >
      {children}
    </CustomProperties>
  );
}
