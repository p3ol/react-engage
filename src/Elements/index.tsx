import type { Poool } from 'poool-engage';
import {
  type ComponentPropsWithoutRef,
  type MutableRefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from 'react';

import { useEngage } from '../hooks';
import { EngageConfigCommons } from '../types';

export interface ElementsProps
  extends Omit<EngageConfigCommons, 'appId'>, ComponentPropsWithoutRef<any> {
  /**
   * Whether to use the factory from `<EngageContext />` or not.
   */
  useGlobalFactory?: boolean;
  /**
   * List of filters to apply to the elements.
   */
  filters?: string[];
}

export interface ElementsRef {
  elementsRef: MutableRefObject<Poool.EngageElement[]>;
  destroy: () => Promise<void[]>;
}

const Elements = forwardRef<ElementsRef, ElementsProps>(({
  useGlobalFactory = true,
  filters,
  config,
  variables,
  texts,
  events,
}, ref) => {
  const elementsRef = useRef<Poool.EngageElement[]>([]);
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

      elementsRef.current = await factory.autoCreate({ filters });

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

  const destroy = async () => {
    return await Promise.all((elementsRef.current || [])
      .map(element => element.destroy()));
  };

  return null;
});

Elements.displayName = 'Elements';

export default Elements;
