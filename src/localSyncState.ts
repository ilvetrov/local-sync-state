export type Getter<T> = () => T
export type Setter<T> = (newValue: T | ((prevState: T) => T)) => void

export type UpdateCallback<T> = (state: T, prevState: T) => void
export type DestroyCallback = () => void
export type OnUpdate<T> = (callback: UpdateCallback<T>) => DestroyCallback

export type Update = () => void

export type LocalSyncState<T> = {
  get: Getter<T>
  set: Setter<T>
  onUpdate: OnUpdate<T>
  update: Update
  destroy: DestroyCallback
}

function localSyncState<T = undefined>(): LocalSyncState<T | undefined>
function localSyncState<T>(initialState: T): LocalSyncState<T>

function localSyncState<T>(initialState?: T): LocalSyncState<T | undefined> {
  let state: T | undefined = initialState

  let prevState: T | undefined = initialState

  let destroyed = false

  const updaters = new Set<UpdateCallback<T | undefined>>([])

  const get: Getter<T | undefined> = () => state

  const update: Update = () => {
    if (destroyed) {
      return
    }

    updaters.forEach((callback) => {
      callback(state, prevState)
    })
  }

  const set: Setter<T | undefined> = (newValue) => {
    prevState = state

    state = typeof newValue === 'function' ? (newValue as any)(prevState) : newValue

    update()
  }

  const onUpdate: OnUpdate<T | undefined> = (callback) => {
    if (destroyed) {
      return () => {}
    }

    updaters.add(callback)

    return () => {
      updaters.delete(callback)
    }
  }

  const destroy: DestroyCallback = () => {
    destroyed = true
    updaters.clear()
  }

  return { get, set, onUpdate, update, destroy }
}

export default localSyncState
