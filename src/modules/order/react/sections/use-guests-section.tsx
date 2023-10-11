import { useRef, useState } from 'react'

import { useDependencies } from '@ratatouille/modules/app/react/DependenciesProvider'
import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form'
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'

export const useGuestsSection = () => {
  function addGuest() {
    setForm(form => guestForm.current.addGuest(form))
  }
  function removeGuest(id: string) {
    setForm(form => guestForm.current.removeGuest(form, id))
  }
  function updateGuest<K extends keyof OrderingDomainModel.GuestValues>(
    guestId: string,
    key: K,
    value: OrderingDomainModel.GuestValues[K],
  ) {
    setForm(form => guestForm.current.updateGuest(form, guestId, key, value))
  }
  function changeOrganizer(id: string) {
    setForm(form => guestForm.current.changeOrganizer(form, id))
  }
  function onNext() {}
  function isSubmittable() {
    return guestForm.current.isSubmittable(form)
  }

  const { idProvider } = useDependencies()
  const guestForm = useRef(new GuestForm(idProvider))
  const [form, setForm] = useState<OrderingDomainModel.Form>({ guests: [], organizerId: null })

  return {
    addGuest,
    removeGuest,
    updateGuest,
    changeOrganizer,
    onNext,
    isSubmittable,
    form,
  }
}
