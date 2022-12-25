import { AsyncAction } from 'frontity/types';

import { menusHandler } from '../../modules/_App/api/menu';
import { Packages } from '../../modules/_App/components/App/types';

export const beforeCSR: AsyncAction<Packages> = async (props) => {
  const {
    libraries,
    actions,
  } = props;

  libraries.source.handlers.push(menusHandler);

  // This will wait until the menus data is fetched.
  await actions.source.fetch('menus');
};
