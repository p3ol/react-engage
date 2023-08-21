import { EngageConfigOptions, EngageEvents, Engage } from './types';

/**
 * Can be used to retrieve some properties from the current Engage context, as
 * well as the Engage SDK itself.
 */
export declare function useEngage(): {
  /**
   * Current app ID.
   */
  appId: string;
  /**
   * Current Engage context config.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/configuration
   */
  config: EngageConfigOptions;
  /**
   * Current Engage context variables.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/variables
   */
  variables: {
    [key: string]: any;
  };
  /**
   * Current Engage context texts.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/texts
   */
  texts: { [
    key: string]: string;
  };
  /**
   * Current Engage context events listeners.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/events
   */
  events: EngageEvents;
  /**
   * Engage SDK url.
   */
  scriptUrl: string;
  /**
   * The entire Engage SDK.
   */
  lib: Engage;
  /**
   * Current Engage instance.
   */
  factory: Engage | null;
  /**
   * Create a new Engage instance.
   */
  createFactory: () => Engage;
};
