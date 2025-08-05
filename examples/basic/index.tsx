import { useReducer } from 'react';
import { createRoot } from 'react-dom/client';
import { mockState } from '@junipero/core';
import { EngageContext, Element, Elements } from '@poool/react-engage';

export interface AppState {
  mode: 'auto' | 'slug';
}

const App = () => {
  if (!document.referrer) {
    location.reload();
  }

  const [state, dispatch] = useReducer(mockState<AppState>, {
    mode: 'auto',
  });

  const Modes = () => (
    <>
      <p>Current mode : { state.mode }</p>
      <button
        style={{ marginBottom: '20px' }}
        onClick={
          () => dispatch({ mode: state.mode === 'auto' ? 'slug' : 'auto' })
        }
        id="SwitchMode"
      >
        Switch to { state.mode === 'auto' ? 'slug' : 'auto' } mode
      </button>
    </>
  );

  return (
    <EngageContext
      appId="155PF-L7Q6Q-EB2GG-04TF8"
      config={{ debug: true }}
    >
      <Modes />
      { state.mode === 'auto' ? <Elements /> : <Element slug="react-engage" /> }
    </EngageContext>
  );
};

createRoot(document.getElementById('app')).render(<App />);
