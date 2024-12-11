import { render, waitFor } from '@testing-library/react';
import { useRef, useEffect } from 'react';

import { withEngage } from '~/tests/utils';
import Elements, { type ElementsRef } from './index';

describe('<Elements />', () => {
  it('should create elements at start', () => {
    const autoCreate = jest.fn();

    render(withEngage(<Elements />, { factory: { autoCreate } }));
    expect(autoCreate).toHaveBeenCalled();
  });

  it('should create elements at start without global factory', () => {
    const autoCreate = jest.fn();
    const createFactory = jest.fn().mockReturnValue({ autoCreate });

    render(withEngage(
      <Elements useGlobalFactory={false} />,
      { createFactory }
    ));

    expect(createFactory).toHaveBeenCalled();
    expect(autoCreate).toHaveBeenCalled();
  });

  it('should create elements with custom filters', () => {
    const opts = { filters: ['test'] };
    const autoCreate = jest.fn();

    render(withEngage(
      <Elements filters={opts.filters} />,
      { factory: { autoCreate } }
    ));
    expect(autoCreate).toHaveBeenCalledWith(opts);
  });

  it('should override configuration', () => {
    const createFactory = jest.fn();
    const config = { debug: true };
    const variables = { test: 'test' };
    const texts = { test: 'test' };
    const events = { ready: () => {} };

    render(withEngage(
      <Elements
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

  it('should destroy elements', async () => {
    const destroy = jest.fn().mockReturnValue(Promise.resolve());
    const autoCreate =
      jest.fn().mockReturnValue(Promise.resolve([{ destroy }]));

    const Comp = () => {
      const ref = useRef<ElementsRef>(undefined);

      useEffect(() => {
        const timer = setTimeout(() => {
          ref.current.destroy();
        }, 100);

        return () => clearTimeout(timer);
      }, []);

      return withEngage(<Elements ref={ref} />, { factory: { autoCreate } });
    };

    render(<Comp />);

    await waitFor(() => expect(autoCreate).toHaveBeenCalled());
    await waitFor(() => expect(destroy).toHaveBeenCalled());
  });

  it('should destroy elements when component is unmounted', async () => {
    const destroy = jest.fn().mockReturnValue(Promise.resolve());
    const autoCreate = jest.fn().mockReturnValue(
      new Promise(resolve => setTimeout(() => resolve([{ destroy }]), 100))
    );

    const { unmount } = render(withEngage(
      <Elements />,
      { factory: { autoCreate } }
    ));

    unmount();

    await waitFor(() => expect(autoCreate).toHaveBeenCalled());
    await waitFor(() => expect(destroy).toHaveBeenCalledTimes(1));
  });
});
