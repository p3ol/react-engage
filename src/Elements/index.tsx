import type { Poool } from 'poool-engage';
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  type RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import type { EngageConfigCommons } from '../types';
import { useEngage } from '../hooks';

export interface ElementsRef {
  elementsRef: RefObject<Poool.EngageElement[]>;
  destroy: () => Promise<void[]>;
}

export interface ElementsProps
  extends Omit<EngageConfigCommons, 'appId'>, ComponentPropsWithoutRef<any> {
  /**
   * Ref to the elements component
   */
  ref?: RefObject<ElementsRef>;
  /**
   * Whether to use the factory from `<EngageContext />` or not.
   */
  useGlobalFactory?: boolean;
  /**
   * List of filters to apply to the elements.
   */
  filters?: string[];
}

const Elements = ({
  ref,
  filters,
  config,
  variables,
  texts,
  events,
  useGlobalFactory = true,
}: ElementsProps): ReactNode => {
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
};

Elements.displayName = 'Elements';

export default Elements;
