import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'
import React, { useSyncExternalStore } from 'react'
import localSyncState from '../localSyncState'
import { useLocalSyncState } from './useLocalSyncState'

describe('react hook useLocalSyncState', () => {
  it('is available', () => {
    const Component = () => {
      const state = useLocalSyncState('localSyncState')

      return <div>Test text: {state.get()}</div>
    }

    render(<Component></Component>)

    expect(screen.queryByText('Test text: localSyncState')).not.toBeNull()
  })

  it('useSyncExternalStore returns current state', () => {
    const state = localSyncState(1)

    const Component = () => {
      const stateInReact = useSyncExternalStore(state.onUpdate, state.get, state.get)

      return <div>Test number: {stateInReact}</div>
    }

    render(<Component></Component>)

    expect(screen.queryByText('Test number: 1')).not.toBeNull()
  })

  it('rerender via useSyncExternalStore', () => {
    const state = localSyncState(1)

    const Component = () => {
      const stateInReact = useSyncExternalStore(state.onUpdate, state.get, state.get)

      return <div>Test number: {stateInReact}</div>
    }

    render(<Component></Component>)

    act(() => {
      state.set(2)
    })

    expect(screen.queryByText('Test number: 2')).not.toBeNull()
  })
})
