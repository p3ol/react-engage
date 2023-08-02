import { useCallback, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { mockState, mergeDeep } from '@junipero/core';

import { EngageContext as Ctx } from '../contexts';
import { loadScript } from '../utils';

const EngageContext = ({
  appId,
  config,
  variables,
  texts,
  events,
  scriptUrl = 'https://assets.poool.fr/engage.min.js',
  ...rest
}) => {
  const [state, dispatch] = useReducer(mockState, {
    lib: null,
    factory: null,
  });

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    if (
      !globalThis.Engage ||
      !globalThis.Engage.isPoool ||
      !globalThis.PooolEngage ||
      !globalThis.PooolEngage.isPoool
    ) {
      await loadScript(scriptUrl, 'poool-react-engage-lib');
    }

    const engageRef = globalThis.PooolEngage || globalThis.Engage;
    const lib = engageRef?.noConflict();

    if (!lib) {
      return;
    }

    const factory = createFactory({ config, variables, texts, events }, lib);

    dispatch({ lib, factory });
  };

  const createFactory = (opts = {}, lib = null) => {
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
      .forEach(([event, callback]) => {
        factory.on(event, callback, { once: !!callback?.once });
      });

    return factory;
  };

  const destroyFactory = () => {
    if (!state.factory) {
      return;
    }

    dispatch({ factory: null });
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
    destroyFactory,
    commitPageView,
  }), [state.lib, state.factory]);

  return (
    <Ctx.Provider value={getContext()} { ...rest } />
  );
};

EngageContext.displayName = 'EngageContext';

EngageContext.propTypes = {
  appId: PropTypes.string.isRequired,
  config: PropTypes.object,
  variables: PropTypes.object,
  texts: PropTypes.object,
  events: PropTypes.object,
  scriptUrl: PropTypes.string,
};

export default EngageContext;
