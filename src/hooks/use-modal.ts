import { useCallback, useState } from 'react'

type UseModalReturnType = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const useModal = (initialState: boolean = false): UseModalReturnType => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState)

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    openModal,
    closeModal,
  }
}
