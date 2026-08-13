import { render, waitFor } from '@testing-library/react';
import { useRef, useEffect } from 'react';
import { vi } from 'vitest';

import { withEngage } from '~/tests/utils';

import Element, { type ElementRef } from './index';

describe('<Element />', () => {
  it('should create element at start', () => {
    const createElement = vi.fn();

    render(withEngage(
      <Element slug="test" />,
      { factory: { createElement } }
    ));
    expect(createElement).toHaveBeenCalled();
  });

  it('should create element at start without global factory', () => {
    const createElement = vi.fn();
    const createFactory = vi.fn().mockReturnValue({ createElement });

    render(withEngage(
      <Element slug="test" useGlobalFactory={false} />,
      { createFactory }
    ));

    expect(createFactory).toHaveBeenCalled();
    expect(createElement).toHaveBeenCalled();
  });

  it('should override configuration', () => {
    const createFactory = vi.fn();
    const config = { debug: true };
    const variables = { test: 'test' };
    const texts = { test: 'test' };
    const events = { ready: () => {} };

    render(withEngage(
      <Element
        slug="test"
        useGlobalFactory={false}
        config={config}
        variables={variables}
        texts={texts}
        events={events}
      />,
      { createFactory }
    ));

    expect(createFactory)
      .toHaveBeenCalledWith({ config, variables, texts, events });
  });

  it('should destroy element', async () => {
    const destroy = vi.fn().mockReturnValue(Promise.resolve());
    const createElement =
      vi.fn().mockReturnValue(Promise.resolve({ destroy }));

    const Comp = () => {
      const ref = useRef<ElementRef>(undefined);

      useEffect(() => {
        const timer = setTimeout(() => {
          ref.current.destroy();
        }, 100);

        return () => clearTimeout(timer);
      }, []);

      return withEngage(
        <Element slug="test" ref={ref} />,
        { factory: { createElement } }
      );
    };

    render(<Comp />);

    await waitFor(() => expect(createElement).toHaveBeenCalled());
    await waitFor(() => expect(destroy).toHaveBeenCalled());
  });

  it('should destroy element when component is unmounted', async () => {
    const destroy = vi.fn().mockReturnValue(Promise.resolve());
    const createElement = vi.fn().mockReturnValue(
      new Promise(resolve => setTimeout(() => resolve({ destroy }), 100))
    );

    const { unmount } = render(withEngage(
      <Element slug="test" />,
      { factory: { createElement } }
    ));

    unmount();

    await waitFor(() => expect(createElement).toHaveBeenCalled());
    await waitFor(() => expect(destroy).toHaveBeenCalledTimes(1));
  });
});
