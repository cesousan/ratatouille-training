import { useRef, useState } from 'react'

import { useDependencies } from '@ratatouille/modules/app/react/DependenciesProvider'
import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form'
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'

export const useGuestsSection = () => {
  function addGuest() {
    setGuests(guests => guestForm.current.addGuest(guests))
  }
  function removeGuest(id: string) {
    setGuests(guests => guestForm.current.removeGuest(guests, id))
  }
  function updateGuest(id: string, key: keyof OrderingDomainModel.GuestValues, value: string | number) {}
  function changeOrganizer() {}
  function onNext() {}
  function isSubmittable() {}

  const { idProvider } = useDependencies()
  const guestForm = useRef(new GuestForm(idProvider))
  const [guests, setGuests] = useState<OrderingDomainModel.Guest[]>([])

  return {
    addGuest,
    removeGuest,
    updateGuest,
    changeOrganizer,
    onNext,
    isSubmittable,
    guests,
  }
}
