'use client';

import { useState } from 'react';
import { Elements, Element } from '@poool/react-engage';
import Link from 'next/link';

const Home = () => {
  const [mode, setMode] = useState('auto');

  return (
    <div id="app">
      <p>Current mode : { mode }</p>
      <button
        style={{ marginBottom: '20px' }}
        onClick={() => setMode(m => m === 'auto' ? 'slug' : 'auto')}
        id="SwitchMode"
      >
        Switch to { mode === 'auto' ? 'slug' : 'auto' } mode
      </button>
      { mode === 'auto' ? <Elements /> : <Element slug="react-engage" /> }
      <p><Link href="/foo">Go to another page</Link></p>
    </div>
  );
};

export default Home;
