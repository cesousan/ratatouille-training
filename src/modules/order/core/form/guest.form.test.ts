import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form'
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'

class StubIdProvider {
  generate() {
    return '1'
  }
}

const idProvider = new StubIdProvider()
const form = new GuestForm(idProvider)
const emptyInitialState: OrderingDomainModel.Guest[] = []
const stateWithOneUser: OrderingDomainModel.Guest[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    age: 0,
  },
]
const stateWithTwoUsers: OrderingDomainModel.Guest[] = [
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

// add a guest
describe('add a guest', () => {
  it('should add a guest', () => {
    const initialState: OrderingDomainModel.Guest[] = emptyInitialState

    const state = form.addGuest(initialState)

    expect(state).toEqual(stateWithOneUser)
  })

  it('should add a guest when there is already one', () => {
    const initialState: OrderingDomainModel.Guest[] = stateWithOneUser

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
    const initialState: OrderingDomainModel.Guest[] = stateWithTwoUsers

    const state = form.addGuest(initialState)

    expect(state).toEqual([
      ...stateWithTwoUsers,
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
describe('remove a guest', () => {
  it('should do nothing when there is no guests', () => {
    const initialState: OrderingDomainModel.Guest[] = emptyInitialState

    const state = form.removeGuest(initialState, '1')

    expect(state).toEqual(emptyInitialState)
  })
  it('should remove the user with ID one when it is alone in guests', () => {
    const initialState: OrderingDomainModel.Guest[] = stateWithOneUser

    const state = form.removeGuest(initialState, '1')

    expect(state).toEqual(emptyInitialState)
  })
  it('should remove the user with ID one when there is two users', () => {
    const initialState: OrderingDomainModel.Guest[] = stateWithTwoUsers

    const state = form.removeGuest(initialState, '1')

    expect(state).toEqual([
      {
        id: '2',
        firstName: 'John',
        lastName: 'Doe',
        age: 0,
      },
    ])
  })
})
