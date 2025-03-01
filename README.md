![CI](https://github.com/p3ol/react-engage/workflows/CI/badge.svg)

# Poool Engage - React SDK

> The easiest way to add Poool Engage to your React app ✨

## Installation

```bash
yarn add @poool/react-engage
```

## Usage

```jsx
import { useRef } from 'react';
import { EngageContext, Element } from '@poool/react-engage';

export default = () => {
  // Wrap everything with our EngageContext component
  return (
    <EngageContext appId="insert_your_app_id">
      { /*
        Place your element where you want it to be displayed
      */ }
      <Element slug="element_slug" />
    </EngageContext>
  );
};
```

## Usage with auto create
```jsx
import { useRef } from 'react';
import { EngageContext, Elements } from '@poool/react-engage';

export default = () => {
  // Wrap everything with our EngageContext component
  return (
    <EngageContext appId="insert_your_app_id">
      { /*
        Place the component anywhere inside the EngageContext
      */ }
      <Elements />
    </EngageContext>
  );
};
```

## Documentation

### `<EngageContext />`

#### Props

- `appId` {`String`} Your Poool App ID
- `config` {`Object`} (optional) Default elements config (see the [configuration](https://poool.dev/docs/engage/javascript/configuration) documentation)
- `variables` {`Object`} (optional) Elements variables used in texts (see the [variables](https://poool.dev/docs/engage/javascript/variables) documentation)
- `texts` {`Object`} (optional) Elements custom texts (see the [texts](https://poool.dev/docs/engage/javascript/texts) documentation)
- `events` {`Object`} (optional) Elements events listeners (see the [events](https://poool.dev/docs/engage/javascript/events) documentation)
- `scriptUrl` {`String`} (optional, default: `'https://assets.poool.fr/engage.js'`) Default Poool Engage SDK url
- `scriptLoadTimeout` {`Number`} (optional, default: `2000`) Timeout for the script to load

### `<Element />`

#### Props

- `slug` {`String`} Element slug.
- `tag` {`String | React.ReactElement`} (optional, default: `'div'`) Element container tag
- `useGlobalFactory` {`Boolean`} (optional, default: `true`) Whether to use the factory from `<EngageContext />` or not
- `config` {`Object`} (optional) Element config, overrides `<EngageContext />`'s one (see the [configuration](https://poool.dev/docs/engage/javascript/configuration) documentation)
- `variables` {`Object`} (optional) Element variables used in texts, overrides `<EngageContext />`'s ones (see the [variables](https://poool.dev/docs/engage/javascript/variables) documentation)
- `texts` {`Object`} (optional) Element custom texts, overrides `<EngageContext />`'s ones (see the [texts](https://poool.dev/docs/engage/javascript/texts) documentation)
- `events` {`Object`} (optional) Element events listeners, overrides `<EngageContext />`'s ones (see the [events](https://poool.dev/docs/engage/javascript/events) documentation)

### `<Elements />`


#### Props

- `useGlobalFactory` {`Boolean`} (optional, default: `true`) Whether to use the factory from `<EngageContext />` or not
- `filters` {`Array<String>`} (optional) List of filters to apply to the elements
- `config` {`Object`} (optional) Element config, overrides `<EngageContext />`'s ones (see the [configuration](https://poool.dev/docs/engage/javascript/configuration) documentation)
- `variables` {`Object`} (optional) Element variables used in texts, overrides `<EngageContext />`'s ones (see the [variables](https://poool.dev/docs/engage/javascript/variables) documentation)
- `texts` {`Object`} (optional) Element custom texts, overrides `<EngageContext />`'s ones (see the [texts](https://poool.dev/docs/engage/javascript/texts) documentation)
- `events` {`Object`} (optional) Element events listeners, overrides `<EngageContext />`'s ones (see the [events](https://poool.dev/docs/engage/javascript/events) documentation)


### `useEngage()`

Can be used to retrieve some properties from the current Engage context, as well as the Engage SDK itself.

#### Returns

- `appId` {`String`} Current app ID
- `config` {`Object`} Current Engage context config
- `variables` {`Object`} Current Engage context variables
- `texts` {`Object`} Current Engage context texts
- `events` {`Object`} Current Engage context events listeners
- `scriptUrl` {`Object`} Engage SDK url
- `lib` {`Function`} The entire Engage SDK
- `factory` {`Function`} Current Engage factory
- `createFactory` {`Function`} Creates a new factory
- `commitPageView` {`Function`} Commits a page view (see the [commitPageView](https://poool.dev/docs/engage/javascript/methods#commitpageview) documentation)

#### Example

```js
const { appId, lib: engage } = useEngage();
```

## Contributing

[![](https://contrib.rocks/image?repo=p3ol/react-engage)](https://github.com/p3ol/react-engage/graphs/contributors)

Please check the [CONTRIBUTING.md](https://github.com/p3ol/react-engage/blob/main/CONTRIBUTING.md) doc for contribution guidelines.

## Development

Install dependencies:

```bash
yarn install
```

Run examples at http://localhost:63001/ with webpack dev server:

```bash
yarn serve
```

And test your code:

```bash
yarn test
```

## License

This software is licensed under [MIT](https://github.com/p3ol/react-engage/blob/main/LICENSE).

## v1 -> v2 Migration

**There shouldn't be any migration needed for this version.**

v4 only drops support for Node 16 & yarn < 3.

The project was also migrated to TypeScript, but it shouldn't affect the way you use the library.

