import { useEffect, useImperativeHandle, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { useEngage } from '../hooks';

const Elements = forwardRef(({
  useGlobalFactory = true,
  filters,
  config,
  variables,
  texts,
  events,
}, ref) => {
  const elementsRef = useRef([]);
  const {
    lib,
    factory: globalFactory,
    createFactory,
  } = useEngage();

  useImperativeHandle(ref, () => ({
    elementsRef,
    destroy,
  }));

  useEffect(() => {
    let mounted = true;

    (async () => {
      const factory = useGlobalFactory ? globalFactory : createFactory?.({
        config,
        variables,
        texts,
        events,
      });

      if (!factory) {
        return;
      }

      elementsRef.current = await factory.autoCreate(filters);

      if (!mounted) {
        // the component has been unmounted before elements were created
        destroy();
      }
    })();

    return () => {
      mounted = false;
      destroy();
    };
  }, [lib, globalFactory, filters, config, variables, texts, events]);

  const destroy = () => elementsRef.current &&
    Promise.all(elementsRef.current.map(element => element.destroy()));

  return null;
});

Elements.displayName = 'Elements';

Elements.propTypes = {
  useGlobalFactory: PropTypes.bool,
  filters: PropTypes.arrayOf(PropTypes.string),
  config: PropTypes.object,
  variables: PropTypes.object,
  texts: PropTypes.object,
  events: PropTypes.object,
};

export default Elements;
