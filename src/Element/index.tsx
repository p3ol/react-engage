import type { Poool } from 'poool-engage';
import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type RefObject,
  useRef,
  useMemo,
  useEffect,
  useImperativeHandle,
} from 'react';

import type { EngageConfigCommons } from '../types';
import { useEngage } from '../hooks';
import { generateId } from '../utils';

export interface ElementRef {
  containerRef: RefObject<HTMLElement>;
  elementRef: RefObject<Poool.EngageElement>;
  destroy: () => void;
}

export interface ElementProps
  extends EngageConfigCommons, ComponentPropsWithoutRef<any> {
  /**
   * Ref to the element itself
   */
  ref?: RefObject<ElementRef>;
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

const Element = ({
  ref,
  id,
  slug,
  config,
  variables,
  texts,
  events,
  tag: Tag = 'div',
  useGlobalFactory = true,
  ...rest
}: ElementProps) => {
  const elementRef = useRef<Poool.EngageElement>(undefined);
  const containerRef = useRef<HTMLElement>(undefined);
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
};

Element.displayName = 'Element';

export default Element;
