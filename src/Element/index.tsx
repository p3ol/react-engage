import type { Poool } from 'poool-engage';
import {
  useRef,
  useMemo,
  useEffect,
  useImperativeHandle,
  forwardRef,
  ComponentPropsWithoutRef,
  ElementType,
} from 'react';

import { useEngage } from '../hooks';
import { generateId } from '../utils';
import { EngageConfigCommons } from '../types';

export interface ElementProps
  extends EngageConfigCommons, ComponentPropsWithoutRef<any> {
  /**
   * Custom wrapper component ID
   */
  id?: string;
  /**
   * Element container tag.
   */
  tag?: string | ElementType;
  /**
   * Whether to use the factory from `<EngageContext />` or not.
   */
  useGlobalFactory?: boolean;
  /**
   * Element slug.
   */
  slug: string;
}

export interface ElementRef {
  containerRef: React.MutableRefObject<HTMLElement>;
  elementRef: React.MutableRefObject<Poool.EngageElement>;
  destroy: () => void;
}

const Element = forwardRef<ElementRef, ElementProps>(({
  id,
  slug,
  config,
  variables,
  texts,
  events,
  tag: Tag = 'div',
  useGlobalFactory = true,
  ...rest
}, ref) => {
  const elementRef = useRef<Poool.EngageElement>();
  const containerRef = useRef<HTMLElement>();
  const customId = useMemo(() => generateId(), []);
  const { lib, factory: globalFactory, createFactory } = useEngage();

  useImperativeHandle(ref, () => ({
    containerRef,
    elementRef,
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

      elementRef.current = await factory
        .createElement(slug, containerRef.current);

      if (!mounted) {
        // the component has been unmounted before the element was created
        destroy();
      }
    })();

    return () => {
      mounted = false;
      destroy();
    };
  }, [lib, globalFactory, slug, config, variables, texts, events]);

  const destroy = () => elementRef.current?.destroy();

  return (
    <Tag ref={containerRef} id={id || customId} { ...rest } />
  );
});

Element.displayName = 'Element';

export default Element;
