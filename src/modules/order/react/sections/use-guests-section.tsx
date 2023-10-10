import { useRef, useState } from 'react'

import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'
import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form'

export const useGuestsSection = () => {
  function addGuest() {
    setGuests(guests => guestForm.current.addGuest(guests))
  }
  function removeGuest(id: string) {
    setGuests(guests => guests.filter(guest => guest.id !== id))
  }
  function updateGuest(id: string, key: keyof OrderingDomainModel.GuestValues, value: string | number) {}
  function changeOrganizer() {}
  function onNext() {}
  function isSubmittable() {}

  const guestForm = useRef(new GuestForm())
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
