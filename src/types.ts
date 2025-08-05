import type { Poool } from 'poool-engage';

export declare type EventCallbackFunction<Props> = (props: Props) => any;
export declare interface EventCallbackObject<Props> {
  once: true;
  callback: EventCallbackFunction<Props>;
};

export declare type EventCallback<Props> =
  | EventCallbackFunction<Props>
  | EventCallbackObject<Props>;

export declare type BaseEvents = Partial<Record<Poool.EngageEventsList, any>>;

export declare interface EngageReadyEvent {
  element: Record<string, any>;
}

export declare interface EngageSeenEvent {
  element: Record<string, any>;
}

export declare interface EngageClickEvent {
  originalEvent: MouseEvent;
  id: string;
  type: string;
  url: string;
  name: string;
  element: Record<string, any>;
}

export declare interface EngageFormSubmitEvent {
  fields: Record<string, any>;
  valid: Record<string, boolean>;
  element: Record<string, any>;
}

export declare interface EngageEvents extends BaseEvents {
  /**
   * Triggered when the element is fully loaded and displayed inside the page.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/events#ready
   */
  ready: EventCallback<EngageReadyEvent>;
  /**
   * Triggered when the element has been seen by the user (when it has
   * entered the browser's viewport).
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/events#seen
   */
  seen: EventCallback<EngageSeenEvent>;
  /**
   * Triggered when a user has clicked a button/link inside the element.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/events#click
   */
  click: EventCallback<EngageClickEvent>;
  /**
   * Triggered when a user submits a form inside an element.
   *
   * For example, thanks to this event, you'll be able to save a user's
   * provided informations using tools such as a DMP.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/events#formSubmit
   */
  formSubmit: EventCallback<EngageFormSubmitEvent>;
}

export declare interface EngageConfigCommons {
  /**
   * Current app ID.
   */
  appId?: string;
  /**
   * Current Engage context config.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/configuration
   */
  config?: Poool.EngageConfigOptions;
  /**
   * Current Engage context variables.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/variables
   */
  variables?: Record<string, any>;
  /**
   * Current Engage context texts.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/texts
   */
  texts?: Record<string, string>;
  /**
   * Current Engage context events listeners.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/events
   */
  events?: { [key in Poool.EngageEventsList]?: EngageEvents[key] };
}
