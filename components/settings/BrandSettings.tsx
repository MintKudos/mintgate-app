import React from 'react';
import convertHexToHSL from 'hooks/hex2hsl';
import convertHSLToHex from 'hooks/hsl2hex';
import { prebuildThemes } from 'components/utility/themes';
import { fonts } from 'components/utility/fonts';
import Radio from 'mintflow/Radio';
import Select from 'mintflow/Select';
import Option from 'mintflow/Select/SelectOption';

export default function BrandSettings({
  theme,
  usertheme,
  setTheme,
  setUserTheme,
  themes,
  fontWeights,
}: any) {
  const setPrebuildTheme = (e) => {
    let theme = { ...prebuildThemes['default'], ...prebuildThemes[e] }; // apply defaults
    // console.log(e, 'theme', theme);
    // deep clone
    setTheme(e);
    setUserTheme(JSON.parse(JSON.stringify(theme)));
  };

  const colorChangeHandler = (e) => {
    setUserTheme({
      ...usertheme,
      [e.target.name]: convertHexToHSL(e.target.value),
    });
    setTheme('custom');
  };

  return (
    <div>
      <div className="w-full space-y-6 pb-6">
        <Select
          label="Prebuild Themes"
          name="theme"
          id="theme"
          className="w-full"
          onChange={(e) => setPrebuildTheme(e)}
        >
          {themes.map((x, i) => (
            <Option selectedValue={theme} value={x ? x : theme} key={x}>
              {x}
            </Option>
          ))}
        </Select>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <Select
            name="headerFont"
            label="Header Font"
            onChange={(e) => setUserTheme({ ...usertheme, headerFont: e })}
            className="w-full"
          >
            {fonts.map((fonts, index) => (
              <Option
                key={index}
                selected={usertheme.headerFont === fonts.name}
                value={fonts.name}
              >
                {fonts.name}
              </Option>
            ))}
          </Select>
          <Select
            name="bodyFont"
            label="Body Font"
            onChange={(e) => setUserTheme({ ...usertheme, bodyFont: e })}
            className="w-full"
          >
            {fonts.map((fonts, index) => (
              <Option
                key={index}
                selected={usertheme.headerFont === fonts.name}
                value={fonts.name}
              >
                {fonts.name}
              </Option>
            ))}
          </Select>
        </div>
        <div>
          <label className="label">
            <span className="label-text base1">
              Customize the border radius of your theme
            </span>
          </label>
          <div className="mt-1 grid grid-cols-2 gap-4">
            <div className="form-control bg-base-100 border-2 border-base-300 rounded-none font-medium text-xs px-4 py-1">
              <label className="cursor-pointer label">
                <span className="label-text pr-2">Sharp</span>
                <Radio
                  color="primary"
                  name="borderRadius"
                  value="0px"
                  defaultChecked={usertheme.borderRadius === '0px'}
                  onChange={(e) =>
                    setUserTheme({ ...usertheme, borderRadius: '0px' })
                  }
                />
              </label>
            </div>
            <div className="form-control bg-base-100 border-2 border-base-300 rounded-lg font-medium text-xs px-4 py-1">
              <label className="cursor-pointer label">
                <span className="label-text pr-2">Round</span>
                <Radio
                  color="primary"
                  name="borderRadius"
                  value="0.5rem"
                  defaultChecked={usertheme.borderRadius === '0.5rem'}
                  onChange={(e) =>
                    setUserTheme({ ...usertheme, borderRadius: '0.5rem' })
                  }
                />
              </label>
            </div>
            <div className="form-control bg-base-100 border-2 border-base-300 rounded-xl font-medium text-xs px-4 py-1">
              <label className="cursor-pointer label">
                <span className="label-text pr-2">Rounder</span>
                <Radio
                  color="primary"
                  name="borderRadius"
                  value="0.75rem"
                  defaultChecked={usertheme.borderRadius === '0.75rem'}
                  onChange={(e) =>
                    setUserTheme({ ...usertheme, borderRadius: '0.75rem' })
                  }
                />
              </label>
            </div>
            <div className="form-control bg-base-100 border-2 border-base-300 rounded-3xl font-medium text-xs px-4 py-1">
              <label className="label">
                <span className="label-text pr-2">Fully rounded</span>
                <Radio
                  color="primary"
                  name="borderRadius"
                  value="1.5rem"
                  defaultChecked={usertheme.borderRadius === '1.5rem'}
                  onChange={(e) =>
                    setUserTheme({ ...usertheme, borderRadius: '1.5rem' })
                  }
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2">
        <label className="label">
          <span className="label-text base1">Customize the colors</span>
        </label>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <div className="color-swatch w-full">
            <input
              className="w-full h-4 rounded-box"
              type="color"
              name="primaryColor"
              id="primaryColor"
              value={convertHSLToHex(usertheme?.primaryColor)}
              onChange={colorChangeHandler}
            />
            <div className="color-swatch-info">
              <h1 className="text-sm text-base-content">Brand Color</h1>
              <h2 className="text-xs text-base-content opacity-80">
                {convertHSLToHex(usertheme?.primaryColor)}
              </h2>
            </div>
          </div>
          <div className="color-swatch w-full">
            <input
              className="w-full h-4 rounded-box"
              type="color"
              name="primaryColor"
              id="primaryColor"
              value={convertHSLToHex(usertheme?.secondaryColor)}
              onChange={colorChangeHandler}
            />
            <div className="color-swatch-info">
              <h1 className="text-sm text-base-content">Brand 2 Color</h1>
              <h2 className="text-xs text-base-content opacity-80">
                {convertHSLToHex(usertheme?.secondaryColor)}
              </h2>
            </div>
          </div>
          <div className="color-swatch">
            <input
              className="h-4"
              type="color"
              name="brandContentColor"
              id="brandContentColor"
              value={convertHSLToHex(usertheme?.brandContentColor)}
              onChange={colorChangeHandler}
            />
            <div className="color-swatch-info">
              <h1 className="text-sm text-base-content">Brand Content</h1>
              <h2 className="text-xs text-base-content opacity-80">
                {convertHSLToHex(usertheme?.brandContentColor)}
              </h2>
            </div>
          </div>
          <div className="color-swatch">
            <input
              className="h-4"
              type="color"
              name="neutralColor"
              id="neutralColor"
              value={convertHSLToHex(usertheme?.neutralColor)}
              onChange={colorChangeHandler}
            />
            <div className="color-swatch-info">
              <h1 className="text-sm text-base-content">Card & Shadow</h1>
              <h2 className="text-xs text-base-content opacity-80">
                {convertHSLToHex(usertheme?.neutralColor)}
              </h2>
            </div>
          </div>
          <div className="color-swatch">
            <input
              className="h-4"
              type="color"
              name="neutralContentColor"
              id="neutralContentColor"
              value={convertHSLToHex(usertheme?.neutralContentColor)}
              onChange={colorChangeHandler}
            />
            <div className="color-swatch-info">
              <h1 className="text-sm text-base-content">Card Content</h1>
              <h2 className="text-xs text-base-content opacity-80">
                {convertHSLToHex(usertheme?.neutralContentColor)}
              </h2>
            </div>
          </div>
          <div className="color-swatch">
            <input
              className="h-4"
              type="color"
              name="baseContentColor"
              id="baseContentColor"
              value={convertHSLToHex(usertheme?.baseContentColor)}
              onChange={colorChangeHandler}
            />
            <div className="color-swatch-info">
              <h1 className="text-sm text-base-content">Main Content</h1>
              <h2 className="text-xs text-base-content opacity-80">
                {convertHSLToHex(usertheme?.baseContentColor)}
              </h2>
            </div>
          </div>
          <div className="color-swatch">
            <input
              className="h-4"
              type="color"
              name="base100Color"
              id="base100Color"
              value={convertHSLToHex(usertheme?.base100Color)}
              onChange={colorChangeHandler}
            />
            <div className="color-swatch-info">
              <h1 className="text-sm text-base-content">Background</h1>
              <h2 className=" text-xs text-base-content opacity-80">
                {convertHSLToHex(usertheme?.base100Color)}
              </h2>
            </div>
          </div>
          <div className="color-swatch">
            <input
              className="h-4"
              type="color"
              name="base200Color"
              id="base200Color"
              value={convertHSLToHex(usertheme?.base200Color)}
              onChange={colorChangeHandler}
            />
            <div className="color-swatch-info">
              <h1 className="text-sm text-base-content">Background 2</h1>
              <h2 className="text-xs text-base-content opacity-80">
                {convertHSLToHex(usertheme?.base200Color)}
              </h2>
            </div>
          </div>
          <div className="color-swatch">
            <input
              className="h-4"
              type="color"
              name="base300Color"
              id="base300Color"
              value={convertHSLToHex(usertheme?.base300Color)}
              onChange={colorChangeHandler}
            />
            <div className="color-swatch-info">
              <h1 className="text-sm text-base-content">Border Color</h1>
              <h2 className="text-xs text-base-content opacity-80">
                {convertHSLToHex(usertheme?.base300Color)}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
