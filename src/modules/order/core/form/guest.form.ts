import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'

export class GuestForm {
  addGuest(guests: OrderingDomainModel.Guest[]) {
    return [
      ...guests,
      {
        id: guests.length === 0 ? '1' : (parseInt(guests[guests.length - 1].id) + 1).toString(),
        firstName: 'John',
        lastName: 'Doe',
        age: 0,
      },
    ]
  }
}
