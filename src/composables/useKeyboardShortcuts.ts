
export function useKeyboardShortcuts(enterFn: () => void) {
  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      event.preventDefault()
      enterFn()
    }
  };


  return {
    mountKeyboard() {
      window.addEventListener('keydown', handleKeyDown);
    },
    unmountKeyboard() {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }
}
