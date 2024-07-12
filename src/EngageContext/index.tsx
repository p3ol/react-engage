import type { Poool } from 'poool-engage';
import {
  type ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import { type StateReducer, mockState, mergeDeep } from '@junipero/core';

import type {
  EngageConfigCommons,
  EventCallback,
  EventCallbackObject,
} from '../types';
import { EngageContext as Ctx } from '../contexts';
import { loadScript } from '../utils';

export interface EngageContextProps
  extends EngageConfigCommons, ComponentPropsWithoutRef<any> {
  /**
   * Engage SDK url.
   */
  scriptUrl?: string;
  /**
   * Maximum time for the Engage script to load
   * @default 2000
   */
  scriptLoadTimeout?: number;
}

export interface EngageContextState {
  lib?: Poool.Engage;
  factory?: Poool.Engage;
}

const EngageContext = ({
  appId,
  config,
  variables,
  texts,
  events,
  scriptUrl = 'https://assets.poool.fr/engage.js',
  scriptLoadTimeout = 2000,
  ...rest
}: EngageContextProps) => {
  const [state, dispatch] = useReducer<
    StateReducer<EngageContextState>
  >(mockState, {
    lib: null,
    factory: null,
  });

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (
      !globalThis.Engage ||
      // @ts-expect-error - TODO: remove when @types/poool-engage is updated
      !globalThis.Engage.isPoool ||
      !globalThis.PooolEngage ||
      // @ts-expect-error - TODO: remove when @types/poool-engage is updated
      !globalThis.PooolEngage.isPoool
    ) {
      await loadScript(scriptUrl, 'poool-react-engage-lib', {
        timeout: scriptLoadTimeout,
      });
    }

    const engageRef = globalThis.PooolEngage || globalThis.Engage;
    const lib = engageRef?.noConflict();

    if (!lib) {
      return;
    }

    const factory = createFactory({ config, variables, texts, events }, lib);

    dispatch({ lib, factory });
  };

  const createFactory = (opts?: EngageConfigCommons, lib?: Poool.Engage) => {
    const library = lib || state.lib;

    if (!library) {
      return;
    }

    const factory = library
      .init(appId)
      .config(mergeDeep({}, config, opts.config))
      .variables(mergeDeep({}, variables, opts.variables))
      .texts(mergeDeep({}, texts, opts.texts));

    Object
      .entries(events || {})
      .concat(Object.entries(opts.events || {}))
      .forEach(([
        event,
        callback,
      ]: [
        Poool.EngageEventsList,
        EventCallback<typeof events[keyof typeof events]>,
      ]) => {
        factory.on(
          event,
          (callback as EventCallbackObject<typeof event>)?.callback ||
            (callback as EventCallbackObject<typeof event>),
          // @ts-expect-error TODO: remove when @types/poool-engage is updated
          { once: !!(callback as EventCallbackObject<typeof event>)?.once }
        );
      });

    return factory;
  };

  const commitPageView = () => {
    if (!state.factory) {
      return;
    }

    state.factory.commitPageView();
  };

  const getContext = useCallback(() => ({
    appId,
    config,
    variables,
    texts,
    events,
    scriptUrl,
    lib: state.lib,
    factory: state.factory,
    createFactory,
    commitPageView,
  }), [state.lib, state.factory]);

  return (
    <Ctx.Provider value={getContext()} { ...rest } />
  );
};

EngageContext.displayName = 'EngageContext';

export default EngageContext;
