import './Theme.css';
import './Theme_color_gpnDefault.css';
import './Theme_color_gpnDark.css';
import './Theme_control_gpnDefault.css';
import './Theme_font_gpnDefault.css';
import './Theme_size_gpnDefault.css';
import './Theme_space_gpnDefault.css';
import './Theme_shadow_gpnDefault.css';
import './Theme_color_gpnDark.css';

import { ThemePreset } from '@consta/uikit/Theme';

export const myDefaultPreset: ThemePreset = {
  color: {
    primary: 'myDefault',
    accent: 'myDark',
    invert: 'myDark',
  },
  control: 'myDefault',
  font: 'myDefault',
  size: 'myDefault',
  space: 'myDefault',
  shadow: 'myDefault',
};
