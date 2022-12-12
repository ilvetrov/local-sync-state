import { useMemo } from 'react'
import localSyncState, { LocalSyncState } from '../localSyncState'

export function useLocalSyncState<T = undefined>(): LocalSyncState<T | undefined>

export function useLocalSyncState<T>(initialState: T): LocalSyncState<T>

export function useLocalSyncState<T>(initialState?: T) {
  const localSyncStateInstance = useMemo(() => localSyncState<T | undefined>(initialState), [])

  return localSyncStateInstance
}
