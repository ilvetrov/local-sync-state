import localSyncState from './localSyncState'

describe('localSyncState', () => {
  it('is available', () => {
    expect(typeof localSyncState).toBe('function')
  })

  it('void initial is undefined', () => {
    const state = localSyncState()

    expect(state.get()).toBe(undefined)
  })

  it('number initial is number', () => {
    const state = localSyncState(1)

    expect(state.get()).toBe(1)
  })

  it('can set in state with initial void', () => {
    const state = localSyncState<number>()

    state.set(1)

    expect(state.get()).toBe(1)
  })

  it('setter is work', () => {
    const state = localSyncState(1)

    state.set(2)

    expect(state.get()).toBe(2)
  })

  it('onUpdate is work', () => {
    const state = localSyncState(1)

    let didUpdate = false

    state.onUpdate(() => (didUpdate = true))

    state.set(2)

    expect(didUpdate).toBe(true)
  })

  it('manual update is work', () => {
    const state = localSyncState()

    let didUpdate = false

    state.onUpdate(() => (didUpdate = true))

    state.update()

    expect(didUpdate).toBe(true)
  })

  it('destroy destroys old callbacks', () => {
    const state = localSyncState()

    let didUpdate = false

    state.onUpdate(() => (didUpdate = true))

    state.destroy()

    state.update()

    expect(didUpdate).toBe(false)
  })

  it('destroy does not allow new callbacks to be added', () => {
    const state = localSyncState()

    let didUpdate = false

    state.destroy()

    state.onUpdate(() => (didUpdate = true))

    state.update()

    expect(didUpdate).toBe(false)
  })

  it('targeted destroyer is work', () => {
    const state = localSyncState()

    let didUpdate = false

    const destroyer = state.onUpdate(() => (didUpdate = true))

    destroyer()

    state.update()

    expect(didUpdate).toBe(false)
  })

  it('updating is synchronous', () => {
    const state = localSyncState(1)

    const log: ('onUpdate' | 'syncCode')[] = []

    state.onUpdate(() => log.push('onUpdate'))

    state.set(2)

    log.push('syncCode')

    expect(log).toEqual<typeof log>(['onUpdate', 'syncCode'])
  })

  it('updating is immutable', () => {
    const state = localSyncState({
      number: 1,
    })

    const oldState = state.get()

    state.set((prevState) => ({
      ...prevState,
      number: prevState.number + 1,
    }))

    expect(oldState === state.get()).toBe(false)
  })
})
