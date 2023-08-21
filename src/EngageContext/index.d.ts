import { ComponentPropsWithoutRef } from 'react';

import { EngageConfigOptions, EngageEvents } from '../index';

declare interface EngageContextProps extends ComponentPropsWithoutRef<any> {
  /**
   * Your Poool App ID.
   */
  appId: string;
  /**
   * Default elements config.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/configuration
   */
  config?: EngageConfigOptions;
  /**
   * Elements variables used in texts.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/variables
   */
  variables?: {
    [key: string]: any;
  };
  /**
   * Elements custom texts.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/texts
   */
  texts?: {
    [key: string]: string;
  };
  /**
   * Elements events listener.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/events
   */
  events?: EngageEvents;
  /**
   * Default Poool Engage SDK url.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/installation
   */
  scriptUrl?: string;
}

/**
 * The Engage context component.
 *
 * Everything should be wrapped inside this component.
 */
declare function EngageContext(props: EngageContextProps): JSX.Element;

export default EngageContext;
