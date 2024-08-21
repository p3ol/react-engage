'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { EngageContext } from '@poool/react-engage';

const Providers = ({ children }: ComponentPropsWithoutRef<any>) => {
  return (
    <EngageContext
      appId="155PF-L7Q6Q-EB2GG-04TF8"
      config={{ debug: true }}
    >
      { children }
    </EngageContext>
  );
};

Providers.displayName = 'Providers';

export default Providers;
