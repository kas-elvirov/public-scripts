import { Action } from 'frontity/types';

import { Packages } from '../../modules/_App/components/App/types';

export const closeMobileMenu: Action<Packages> = ({ state }) => {
  state.theme.isMobileMenuOpen = false;
};
