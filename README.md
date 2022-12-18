# LocalSyncState

LocalSyncState is a synchronous state in one object.

- [Why?](#why)
- [Usage](#usage)
- [React](#react)
- [Browser](#browser)

## Why?

### :blue_heart: TypeScript + Defensive Types

You remove the default state — now it is: `type | undefined` (like [React's useState](https://www.npmjs.com/package/@types/react)).

<img src="https://raw.githubusercontent.com/ilvetrov/local-sync-state/main/docs/defensive-state-with-default.png" />

<img src="https://raw.githubusercontent.com/ilvetrov/local-sync-state/main/docs/defensive-state-without-default.png" />

### :cyclone: Synchronous

Your subscribers (via onUpdate) get the new state **really** instantly. [See example.](#synchronous-example)

Excellent for high-load operations.

### :gift: All-in-one object

You can send it to any depth and always get up-to-date state.

Excellent for integration.

### :fire: Immutability

...always up-to-date state and in full control.

```ts
import localSyncState from 'local-sync-state'

const appleInfo = localSyncState({ worms: 0 })

const oldAppleInfo = appleInfo.get() // { worms: 0 } forever

appleInfo.set({ worms: 1 })

const newAppleInfo = appleInfo.get() // { worms: 1 } forever

console.log(oldAppleInfo === newAppleInfo) // false
```

### :zap: Fully Tested

Feel free to use new versions. Nothing will fall.

### :high_brightness: Any value in state

Not only an object. Number, string — any value! See Usage.

_Types will be taken automatically._

## Usage

### get

```ts
import localSyncState from 'local-sync-state'

const numberState = localSyncState(0)

const currentNumber = numberState.get() // 0
```

Without default value:

```ts
import localSyncState from 'local-sync-state'

const numberState = localSyncState<number>()

const currentNumber = numberState.get() // undefined
```

### set

```ts
import localSyncState from 'local-sync-state'

const numberState = localSyncState(0)

numberState.set(1)
// OR
numberState.set((oldNumber) => oldNumber + 1)
```

### onUpdate

Add your subscriber.

```ts
import localSyncState from 'local-sync-state'

const numberState = localSyncState(0)

numberState.onUpdate((state, prevState) => {
  // Your subscriber
})
```

### update

Run all subscribers now without `set`.

```ts
import localSyncState from 'local-sync-state'

const numberState = localSyncState(0)

numberState.update()
```

## Synchronous Example

No Promises.

```ts
import localSyncState from 'local-sync-state'

const state = localSyncState('wolf')

state.onUpdate(() => console.log(1))

state.set('fox')

console.log(2)

// Console output:
// 1
// 2
```

## React

### Hook for new state

```ts
import { useLocalSyncState } from 'local-sync-state/react'

export default function AppleFarm() {
  const numberOfApples = useLocalSyncState(0)
  numberOfApples.get() // 0
}
```

### Usage of external state

Just use `useSyncExternalStore` of React 18.

```ts
import appleState from './appleState'

export default function AppleFarm() {
  const apple = useSyncExternalStore(appleState.onUpdate, appleState.get)
}
```

### Usage of external state with Selector

Just modify the second argument in `useSyncExternalStore` of React 18.

```ts
import appleState from './appleState'

export default function AppleFarm() {
  const appleFarmId = useSyncExternalStore(appleState.onUpdate, () => appleState.get().farmId)

  // Component will rerender only if you change the farmId
}
```

## Browser

Or move the file to your libs directory.

```html
<script src="/node_modules/local-sync-state/dist/browser/local-sync-state.browser.min.js"></script>
<script>
  // localSyncState is available globally now
  var appleName = localSyncState('Bob')
</script>
```

## My Links

- [GitHub](https://github.com/ilvetrov)
- [Telegram](https://t.me/ilvetrov)
- [contact@ilve.site](mailto:contact@ilve.site)
