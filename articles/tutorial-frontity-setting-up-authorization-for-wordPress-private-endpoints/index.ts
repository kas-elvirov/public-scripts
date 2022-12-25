import image from '@frontity/html2react/processors/image';
import iframe from '@frontity/html2react/processors/iframe';
import link from '@frontity/html2react/processors/link';

import MarsThemeTypeScript from '../modules/_App/components/App/types';

import { menusHandler } from './menu';
import { beforeSSR } from './actions/beforeSSR';
import { beforeCSR } from './actions/beforeCSR';
import { toggleMobileMenu } from './actions/toggleMobileMenu';
import { closeMobileMenu } from './actions/closeMobileMenu';

import Theme from './components';

const marsThemeTypeScript: MarsThemeTypeScript = {
  name: '@frontity/mars-theme-typescript',
  roots: {
    /**
     * In Frontity, any package can add React components to the site.
     * We use roots for that, scoped to the `theme` namespace.
     */
    theme: Theme,
  },
  state: {
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    theme: {
      token: '',
      autoPrefetch: 'in-view',
      menu: [],
      isMobileMenuOpen: false,
      featured: {
        showOnList: true,
        showOnPost: true,
      },
    },
  },

  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      toggleMobileMenu,
      closeMobileMenu,
      beforeCSR,
      beforeSSR,
    },
  },

  libraries: {
    source: {
      handlers: [menusHandler],
    },

    html2react: {
      /**
       * Add a processor to `html2react` so it processes the `<img>` tags
       * and internal link inside the content HTML.
       * You can add your own processors too.
       */
      processors: [
        image,
        iframe,
        link,
      ],
    },
  },
};

export default marsThemeTypeScript;
