export declare type EventCallback<Props> =
  (props: Props) => any | { once: boolean, callback: (props: Props) => any };

export declare interface EngageElement {
  /**
   * Destroys the element.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/methods#destroy
   */
  destroy(): Promise<void>;
}

export declare interface EngageConfigOptions {
  /**
   * When debug mode is enabled, Engage.js will log everything it does in the browser console.
   *
   * Default: `false`
   *
   * More infos: https://poool.dev/docs/engage/javascript/configuration#debug
   */
  debug?: boolean;
  /**
   * When autoPageViews is enabled, Engage.js will automatically increment the page views counter on every page load
   * (front-end applications using virtual routing should commit pageviews using `.commitPageView()`).
   *
   * Default: `true`
   *
   * More infos: https://poool.dev/docs/engage/javascript/configuration#autoPageViews
   */
  autoPageViews?: boolean;
  /**
   * Used to enable Stripe credit card form fields inside elements.
   *
   * Default: `null`
   *
   * More infos: https://poool.dev/docs/engage/javascript/configuration#stripePublicKey
   */
  stripePublicKey?: string;
  /**
   * The locale used by default texts inside elements.
   *
   * Default: `en`
   *
   * More infos: https://poool.dev/docs/engage/javascript/configuration#locale
   */
  locale?: string;
}

export interface EngageConfig {
  /**
   * While the default configuration works for most use cases, you might want to configure some of Engage.js behaviors.
   *
   * ℹ️ Your Dashboard configuration will override these configuration values unless they have been set with
   * a read-only mode.
   *
   * @param config - The configuration object
   * @param [readonly=false] - If true, the configuration will be read-only and cannot be overridden by the Dashboard
   *
   * More infos: https://poool.dev/docs/engage/javascript/configuration
   */
  (config: EngageConfigOptions, readonly?: boolean): Engage;
  /**
   * While the default configuration works for most use cases, you might want to configure some of Engage.js behaviors.
   *
   * ℹ️ Your Dashboard configuration will override these configuration values unless they have been set with
   * a read-only mode.
   *
   * @param optionName - The configuration option name
   * @param optionValue - The configuration option value
   * @param [readonly=false] - If true, the configuration will be read-only and cannot be overridden by the Dashboard
   *
   * More infos: https://poool.dev/docs/engage/javascript/configuration
   */
  (optionName: string, optionValue: any, readonly?: boolean): Engage;
}

export interface EngageVariables {
  /**
   * Some texts inside elements benefit from predefined & automatically integrated variables, such as `{app_name}`.
   *
   * The `.variable` function allows you to define custom variables, which can be used in all elements texts.
   *
   * @param keyName - The variable key name
   * @param value - The variable value
   *
   * More infos: https://poool.dev/docs/engage/javascript/variables
   */
  (keyName: string, value: string): Engage;
  /**
   * Some texts inside elements benefit from predefined & automatically integrated variables, such as `{app_name}`.
   *
   * The `.variable` function allows you to define custom variables, which can be used in all elements texts.
   *
   * @param variables - The variables object
   *
   * More infos: https://poool.dev/docs/engage/javascript/variables
   */
  (variables: { [key: string]: string }): Engage;
}

export interface EngageTexts {
  /**
   * You may need to override the default text displayed to your visitors, either to change the wording, or to add
   * a new locale.
   *
   * Each text key modified using the `.texts` function is added to the default `locale` (if no `locale` has been
   * defined in the general configuration options, or passed in the `.texts` function).
   *
   * ℹ️ These configuration values are overridden by your Dashboard configuration.
   *
   * @param keyName - The text key name
   * @param text - The text value
   * @param [readonly=false] - If true, the configuration will be read-only and cannot be overridden by the Dashboard
   * @param [locale] - The locale to use
   *
   * More infos: https://poool.dev/docs/engage/javascript/texts
   */
  (keyName: string, text: string, readonly?: boolean, locale?: string): Engage;
  /**
   * You may need to override the default text displayed to your visitors, either to change the wording, or to add a new locale.
   *
   * Each text key modified using the `.texts` function is added to the default `locale`
   * (if no `locale` has been defined in the general configuration options, or passed in the `.texts` function).
   *
   * ℹ️ These configuration values are overridden by your Dashboard configuration.
   *
   * @param texts - The texts object
   * @param [readonly=false] - If true, the configuration will be read-only and cannot be overridden by the Dashboard
   * @param [locale] - The locale to use
   *
   * More infos: https://poool.dev/docs/engage/javascript/texts
   */
  (texts: { [key: string]: string }, readonly?:
    boolean, locale?: string): Engage;
}

export declare interface EngageEvents {
  /**
   * Triggered when the element is fully loaded and displayed inside the page.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/events#ready
   */
  ready?: EventCallback<{
    element: {
      [fieldKey: string]: any;
    };
  }>;
  /**
   * Triggered when the element has been seen by the user (when it has entered the browser's viewport).
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/events#seen
   */
  seen?: EventCallback<{
    element: {
      [fieldKey: string]: any;
    };
  }>;
  /**
   * Triggered when a user has clicked a button/link inside the element.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/events#click
   */
  click?: EventCallback<{
    id: string;
    type: string;
    originalEvent: MouseEvent;
    url: string;
    name: string;
    element: {
      [fieldKey: string]: any;
    };
  }>;
  /**
   * Triggered when a user submits a form inside an element.
   *
   * For example, thanks to this event, you'll be able to save a user's provided informations using tools
   * such as a DMP.
   *
   * More infos: https://www.poool.dev/docs/engage/javascript/events#formSubmit
   */
  formSubmit?: EventCallback<{
    fields: {
      [fieldKey: string]: any;
    };
    valid: {
      [fieldKey: string]: boolean;
    };
    element: {
      [fieldKey: string]: any;
    };
  }>;
}

export declare interface Engage {
  /**
   * Initializes the Engage instance.
   *
   * @param key - Your Poool App ID
   * @returns The Engage instance
   *
   *  More infos: https://poool.dev/docs/engage/javascript/methods#init
   */
  init(key: string): Engage;
  /**
   * If an `Engage` object already exists in the global object of the current page, the `Engage.js` library will be
   * renamed to `PooolEngage` and the original `Engage` object will be restored.
   *
   * @returns The Engage instance
   *
   * More infos: https://poool.dev/docs/engage/javascript/methods#noConflict
   */
  noConflict(): Engage;
  /**
   * Creates a new Element instance.
   *
   * @param slug - The element slug
   * @param target - The DOM element in which the element should be inserted
   * @returns The EngageElement instance
   *
   * More infos: https://poool.dev/docs/engage/javascript/methods#createElement
   */
  createElement(slug: string, target: string | Node): Promise<EngageElement>;
  /**
   * Creates all elements matching multiple conditions like device, country, custom filters, etc.
   *
   * @param opts - The options object
   * @returns The EngageElement instances
   *
   * More infos: https://poool.dev/docs/engage/javascript/methods#autoCreate
   */
  autoCreate(opts?: { filters?: string[]; }): Promise<EngageElement[]>;
  /**
   * Increment the page view counter in the browser's localStorage for elements with a page view count limit.
   *
   * More infos: https://poool.dev/docs/engage/javascript/methods#commitPageView
   */
  commitPageView(): Engage;
  /**
   * Allows to set a callback to be called when a specific event is triggered.
   *
   * @param name - The event name
   * @param callback - The callback function
   * @returns The Engage instance
   *
   * More infos: https://poool.dev/docs/engage/javascript/methods#on
   */
  on: (name: string, callback: EventCallback<any>) => Engage;
  /**
   * Allows to remove an event callback previously set with `.on()`.
   *
   * @param name - The event name
   * @param callback - The callback function
   * @returns The Engage instance
   *
   * More infos: https://poool.dev/docs/engage/javascript/methods#off
   */
  off: (name: string, callback: EventCallback<any>) => Engage;
  config: EngageConfig;
  variables: EngageVariables;
  texts: EngageTexts;
}
