import { ComponentPropsWithRef, ReactElement } from 'react';

import { EngageConfigOptions, EngageEvents } from '../types';

declare interface ElementProps extends ComponentPropsWithRef<any> {
  /**
   * Element container tag.
   */
  tag?: string | ReactElement;
  /**
   * Whether to use the factory from `<EngageContext />` or not.
   */
  useGlobalFactory?: boolean;
  /**
   * Element slug.
   */
  slug: string;
  /**
   * Element config, overrides `<EngageContext />`'s one.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/configuration
   */
  config?: EngageConfigOptions;
  /**
   * Element variables used in texts, overrides `<EngageContext />`'s ones.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/variables
   */
  variables?: {
    [key: string]: any;
  };
  /**
   * Element custom texts, overrides `<EngageContext />`'s ones.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/texts
   */
  texts?: {
    [key: string]: string;
  };
  /**
   * Element events listeners, overrides `<EngageContext />`'s ones.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/events
   */
  events?: EngageEvents;
}

/**
 * The Element component.
 *
 * Place the `<Element />` component where you want it to be displayed
 * inside <EngageContext />.
*/
declare function Element(props: ElementProps): JSX.Element

export default Element;
