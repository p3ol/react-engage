import { useEffect, useImperativeHandle, useReducer, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { mockState } from '@junipero/core';

import { useEngage } from '../hooks';

const Elements = forwardRef(({
  useGlobalFactory = true,
  filters,
  config,
  variables,
  texts,
  events,
}, ref) => {
  const [state, dispatch] = useReducer(mockState, {
    elements: [],
  });
  const {
    lib,
    factory: globalFactory,
    createFactory,
  } = useEngage();

  useImperativeHandle(ref, () => ({
    elementsRef: state.elements,
    destroy,
  }));

  useEffect(() => {
    create();

    return () => {
      destroy();
    };
  }, [lib, globalFactory, filters, config, variables, texts, events]);

  const create = async () => {
    const factory = useGlobalFactory ? globalFactory : createFactory?.({
      config,
      variables,
      texts,
      events,
    });

    if (!factory) {
      return;
    }

    state.elements = await factory.autoCreate(filters);
    dispatch({ elements: state.elements });
  };

  const destroy = async () => {
    await Promise.all(state.elements.map(element => element.destroy()));
    state.elements = [];
  };

  return null;
});

Elements.displayName = 'Elements';

Elements.propTypes = {
  useGlobalFactory: PropTypes.bool,
  filters: PropTypes.object,
  config: PropTypes.object,
  variables: PropTypes.object,
  texts: PropTypes.object,
  events: PropTypes.object,
};

export default Elements;
