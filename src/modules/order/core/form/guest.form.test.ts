import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form'
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'

class StubIdProvider {
  generate() {
    return '1'
  }
}

const idProvider = new StubIdProvider()

// add a guest
describe('add a guest', () => {
  it('should add a guest', () => {
    const form = new GuestForm(idProvider)
    const initialState: OrderingDomainModel.Guest[] = []

    const state = form.addGuest(initialState)

    expect(state).toEqual([
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        age: 0,
      },
    ])
  })

  it('should add a guest when there is already one', () => {
    const form = new GuestForm(idProvider)
    const initialState: OrderingDomainModel.Guest[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        age: 0,
      },
    ]

    const state = form.addGuest(initialState)

    expect(state).toEqual([
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        age: 0,
      },
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        age: 0,
      },
    ])
  })
  it('should add a guest when there is already two', () => {
    const form = new GuestForm(idProvider)
    const initialState: OrderingDomainModel.Guest[] = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        age: 0,
      },
      {
        id: '2',
        firstName: 'John',
        lastName: 'Doe',
        age: 0,
      },
    ]

    const state = form.addGuest(initialState)

    expect(state).toEqual([
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        age: 0,
      },
      {
        id: '2',
        firstName: 'John',
        lastName: 'Doe',
        age: 0,
      },
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        age: 0,
      },
    ])
  })
})

// remove a guest
