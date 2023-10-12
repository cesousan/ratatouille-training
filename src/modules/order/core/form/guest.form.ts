import { produce } from 'immer'

import { IIDProvider } from '@ratatouille/modules/core/id-provider'
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'

export class GuestForm {
  constructor(private idProvider: IIDProvider) {}
  addGuest(state: OrderingDomainModel.Form): OrderingDomainModel.Form {
    return produce(state, draft => {
      draft.guests.push({
        id: this.idProvider.generate(),
        firstName: 'John',
        lastName: 'Doe',
        age: 18,
      })
    })
  }
  removeGuest(state: OrderingDomainModel.Form, guestId: string): OrderingDomainModel.Form {
    return produce(state, draft => {
      const index = draft.guests.findIndex(guest => guest.id === guestId)

      draft.guests.splice(index, 1)

      if (draft.organizerId === guestId) {
        draft.organizerId = null
      }
    })
  }
  changeOrganizer(state: OrderingDomainModel.Form, guestId: string): OrderingDomainModel.Form {
    return produce(state, draft => {
      const id = draft.guests.findIndex(guest => guest.id === guestId)
      draft.organizerId = id > -1 ? guestId : null
    })
  }
  isSubmittable(state: OrderingDomainModel.Form): boolean {
    return state.organizerId !== null && state.guests.every(isValidGuest)
  }
  updateGuest<K extends keyof OrderingDomainModel.GuestValues>(
    state: OrderingDomainModel.Form,
    guestId: string,
    key: K,
    value: OrderingDomainModel.GuestValues[K],
  ): OrderingDomainModel.Form {
    return produce(state, draft => {
      const guest = draft.guests.find(g => g.id === guestId)
      if (guest) {
        guest[key] = value as OrderingDomainModel.Guest[K]
      }
    })
  }
}

function isValidGuest(guest: OrderingDomainModel.Guest): boolean {
  return guest.firstName !== '' && guest.lastName !== '' && guest.age >= 18
}
