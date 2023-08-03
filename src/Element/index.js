import {
  useRef,
  useMemo,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import PropTypes from 'prop-types';

import { useEngage } from '../hooks';
import { generateId } from '../utils';

const Element = forwardRef(({
  tag: Tag = 'div',
  useGlobalFactory = true,
  slug,
  config,
  variables,
  texts,
  events,
  ...rest
}, ref) => {
  const elementRef = useRef();
  const containerRef = useRef();
  const id = useMemo(() => generateId(), []);
  const { lib, factory: globalFactory, createFactory } = useEngage();

  useImperativeHandle(ref, () => ({
    containerRef,
    elementRef,
    destroy,
  }));

  useEffect(() => {
    create();

    return () => {
      destroy();
    };
  }, [lib, globalFactory, slug, config, variables, texts, events]);

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

    elementRef.current =
      await factory.createElement(slug, containerRef.current);
  };

  const destroy = () => elementRef.current?.destroy();

  return <Tag ref={containerRef} id={id} {...rest} />;
});

Element.displayName = 'Element';

Element.propTypes = {
  tag: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.elementType,
  ]),
  useGlobalFactory: PropTypes.bool,
  slug: PropTypes.string.isRequired,
  config: PropTypes.object,
  variables: PropTypes.object,
  texts: PropTypes.object,
  events: PropTypes.object,
};

export default Element;
