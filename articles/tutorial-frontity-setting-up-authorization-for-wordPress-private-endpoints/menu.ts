import { fetch } from 'frontity';
import { Pattern, Handler } from '@frontity/wp-source/types';
import { ResolvePackages } from '@frontity/types/utils';

import { Packages } from '../components/App/types';

import { store as reduxStore } from '../store';
import * as creators from '../actions/creators';

interface ILink {
  href: string;
}

interface ICuriesLink extends ILink {
  name: string;
  templated: boolean;
}

interface Imenu {
  auto_add: boolean;
  description: string;
  id: number;
  locations: unknown[];
  meta: unknown[];
  name: string;
  slug: string;

  _links: {
    about: ILink[];
    collection: ILink[];
    curies: ICuriesLink[];
    self: ILink[];
    'wp:post_type': ILink[];
  };
}

type TmenusResponse = Imenu[];

interface IMenu {
  attr_title: string;
  classes: string[];
  description: string;
  id: number;
  invalid: boolean;
  menu_order: number;
  menus: number;
  meta: unknown[];
  object: string;
  object_id: number;
  parent: number;
  status: string;
  target: string;
  title: {
    rendered: string;
  };
  type: string;
  type_label: string;
  url: string;
  xfn: string[];

  _links: {
    about: ILink[];
    collection: ILink[];
    curies: ICuriesLink[];
    self: ILink[];
    'wp:term': Array<{
      embeddable: boolean;
      href: string;
      taxonomy: string;
    }>;
  };
}

type TMenuResponse = IMenu[];

export interface IStoreMenu {
  name: string;
  slug: string;
  link: string;
  data: TMenuResponse;
  isMenu: boolean;
}

export const menusHandler: Pattern<Handler> = {
  name: 'menus',
  priority: 10,
  // This pattern is the name you can later use in "actions.source.fetch"
  // to fetch the content or "state.source.get" to get the data.
  pattern: 'menus',
  // This is the function triggered when you use:
  // actions.source.fetch("menus");
  func: async (props) => {
    reduxStore.dispatch(creators.getMenuStart());

    const store = props as unknown as ResolvePackages<Packages>;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const apiUrl = store.state.source.api;

    // prepare storage
    store.state.source.data.menu = {};

    const response = await fetch(`${apiUrl}wp/v2/menus`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${store.state.theme.token}`,
      },
    });

    // Extract data from response object.
    const data = await response.json() as TmenusResponse;

    // get menu
    const menuLinks = data.map(item => {
      return {
        name: item.name,
        slug: item.slug,
        link: item._links['wp:post_type'][0].href,
      };
    });

    menuLinks.map(async (item) => {
      const response = await fetch(item.link, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${store.state.theme.token}`,
        },
      });

      const data = await response.json() as TMenuResponse;

      const payload: IStoreMenu = {
        ...item,
        data,
        isMenu: true,
      };

      reduxStore.dispatch(creators.getMenuSuccess(payload));

      // Assign data to be consumed later.
      // This is the data returned when you use:
      // state.source.get("menu");
      Object.assign(store.state.source.data.menu, {
        [item.slug]: {
          ...item,
          data,
          isMenu: true,
        },
      });
    });
  },
};
