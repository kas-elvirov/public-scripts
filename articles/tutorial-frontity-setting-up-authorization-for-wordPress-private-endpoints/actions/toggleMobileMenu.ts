import { Action } from 'frontity/types';
import { Packages } from '../../modules/_App/components/App/types';

export const toggleMobileMenu: Action<Packages> = ({ state }) => {
  state.theme.isMobileMenuOpen = !state.theme.isMobileMenuOpen;
};
