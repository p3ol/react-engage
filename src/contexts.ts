import type { Poool } from 'poool-engage';
import { createContext } from 'react';

import type { EngageConfigCommons } from './types';

export interface EngageContextValue extends EngageConfigCommons {
  /**
   * Engage SDK url.
   */
  scriptUrl?: string;
  /**
   * The entire Engage SDK.
   */
  lib?: Poool.Engage;
  /**
   * Current Engage instance.
   */
  factory?: Poool.Engage;
  /**
   * Create a new Engage instance.
   */
  createFactory?: (
    opts?: EngageConfigCommons,
    lib?: Poool.Engage
  ) => Poool.Engage;
}

export const EngageContext = createContext<EngageContextValue>({});
