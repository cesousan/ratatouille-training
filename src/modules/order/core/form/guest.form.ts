import { IIDProvider } from '@ratatouille/modules/core/id-provider'
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'

export class GuestForm {
  constructor(private idProvider: IIDProvider) {}
  addGuest(state: OrderingDomainModel.Form): OrderingDomainModel.Form {
    return {
      ...state,
      guests: [
        ...state.guests,
        {
          id: this.idProvider.generate(),
          firstName: 'John',
          lastName: 'Doe',
          age: 0,
        },
      ],
    }
  }
  removeGuest(state: OrderingDomainModel.Form, guestId: string): OrderingDomainModel.Form {
    return {
      ...state,
      guests: state.guests.filter(guest => guest.id !== guestId),
      organizerId: guestId === state.organizerId ? null : state.organizerId,
    }
  }
  changeOrganizer(state: OrderingDomainModel.Form, guestId: string): OrderingDomainModel.Form {
    return {
      ...state,
      organizerId: state.guests.some(guest => guest.id === guestId) ? guestId : null,
    }
  }
  isSubmittable(state: OrderingDomainModel.Form): boolean {
    return state.organizerId !== null
  }
  updateGuest<K extends keyof OrderingDomainModel.GuestValues>(
    state: OrderingDomainModel.Form,
    guestId: string,
    key: K,
    value: OrderingDomainModel.GuestValues[K],
  ): OrderingDomainModel.Form {
    return {
      ...state,
      guests: state.guests.map(g => (g.id === guestId ? { ...g, [key]: value } : g)),
    }
  }
}
