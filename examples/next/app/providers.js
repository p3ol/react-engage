'use client';

import { EngageContext } from '@poool/react-engage';
import PropTypes from 'prop-types';

const Providers = ({ children }) => {
  return (
    <EngageContext
      appId="155PF-L7Q6Q-EB2GG-04TF8"
      config={{ debug: true }}
    >
      { children }
    </EngageContext>
  );
};

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;
