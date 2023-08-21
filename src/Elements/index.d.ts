import { ComponentPropsWithRef } from 'react';

import { EngageConfigOptions, EngageEvents } from '../types';

declare interface ElementsProps extends ComponentPropsWithRef<any> {
  /**
   * Whether to use the factory from `<EngageCOntext />` or not.
   */
  useGlobalFactory?: boolean;
  /**
   * List of filters to apply to the elements.
   */
  customFilters?: string[];
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
 * The Elements component.
 *
 * Place the `<Elements />` component anywhere inside <EngageContext />.
*/
declare function Element(props: ElementsProps): JSX.Element

export default Element;
