import { render, waitFor } from '@testing-library/react';
import { useRef, useEffect } from 'react';

import { withEngage } from '~/tests/utils';
import Element, { type ElementRef } from './index';

describe('<Element />', () => {
  it('should create element at start', () => {
    const createElement = jest.fn();

    render(withEngage(
      <Element slug="test" />,
      { factory: { createElement } }
    ));
    expect(createElement).toHaveBeenCalled();
  });

  it('should create element at start without global factory', () => {
    const createElement = jest.fn();
    const createFactory = jest.fn().mockReturnValue({ createElement });

    render(withEngage(
      <Element slug="test" useGlobalFactory={false} />,
      { createFactory }
    ));

    expect(createFactory).toHaveBeenCalled();
    expect(createElement).toHaveBeenCalled();
  });

  it('should override configuration', () => {
    const createFactory = jest.fn();
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
    const destroy = jest.fn().mockReturnValue(Promise.resolve());
    const createElement =
      jest.fn().mockReturnValue(Promise.resolve({ destroy }));

    const Comp = () => {
      const ref = useRef<ElementRef>();

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
    const destroy = jest.fn().mockReturnValue(Promise.resolve());
    const createElement = jest.fn().mockReturnValue(
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
