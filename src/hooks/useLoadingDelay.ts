import { useEffect, useState } from 'react'

// -------------- INTERFACES
interface IState {
  isLoading: boolean
}

/**
 * @description Custom hook to simulate a loading delay
 * @param {number} delay - The delay in milliseconds (default: 2000ms)
 * @returns {boolean} isLoading - Whether the loading state is active
 */
const useLoadingDelay = (delay: number = 2000): boolean => {
  // -------------- STATE
  const [state, setState] = useState<IState>({
    isLoading: true
  })

  // -------------- EFFECT
  useEffect(() => {
    // Simulate a Timeout for loading state
    const timer = setTimeout(() => {
      setState((prevState) => ({
        ...prevState,
        isLoading: false
      }))
    }, 2000) // 2 seconds delay

    // Cleanup the timer
    return () => clearTimeout(timer)
  }, [delay])

  return state.isLoading
}

export default useLoadingDelay
