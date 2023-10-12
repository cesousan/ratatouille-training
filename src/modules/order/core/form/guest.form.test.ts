import { GuestForm } from '@ratatouille/modules/order/core/form/guest.form'
import { GuestFactory } from '@ratatouille/modules/order/core/model/guest.factory'
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'

class StubIdProvider {
  generate() {
    return '1'
  }
}

const idProvider = new StubIdProvider()
const form = new GuestForm(idProvider)
const emptyInitialState: OrderingDomainModel.Form = { guests: [], organizerId: null }
const johnDoe = GuestFactory.create({ id: '1', firstName: 'John', lastName: 'Doe' })
const janeDoe = GuestFactory.create({ id: '2', firstName: 'Jane', lastName: 'Doe' })

const stateWithOneUser: OrderingDomainModel.Form = {
  guests: [johnDoe],
  organizerId: null,
}
const stateWithTwoUsers: OrderingDomainModel.Form = {
  guests: [johnDoe, janeDoe],
  organizerId: null,
}

// add a guest
describe('add a guest', () => {
  it('should add a guest', () => {
    const initialState: OrderingDomainModel.Form = emptyInitialState

    const state = form.addGuest(initialState)

    expect(state).toEqual(stateWithOneUser)
  })

  it('should add a guest when there is already one', () => {
    const initialState: OrderingDomainModel.Form = stateWithOneUser

    const state = form.addGuest(initialState)

    expect(state).toEqual({
      guests: [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          age: 18,
        },
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          age: 18,
        },
      ],
      organizerId: null,
    })
  })
  it('should add a guest when there is already two', () => {
    const initialState: OrderingDomainModel.Form = stateWithTwoUsers

    const state = form.addGuest(initialState)

    expect(state).toEqual({
      ...stateWithTwoUsers,
      guests: [
        ...stateWithTwoUsers.guests,
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          age: 18,
        },
      ],
    })
  })
})

// remove a guest
describe('remove a guest', () => {
  it('should do nothing when there is no guests', () => {
    const initialState: OrderingDomainModel.Form = emptyInitialState

    const state = form.removeGuest(initialState, '1')

    expect(state).toEqual(emptyInitialState)
  })
  it('should remove the user with ID one when it is alone in guests', () => {
    const initialState: OrderingDomainModel.Form = stateWithOneUser

    const state = form.removeGuest(initialState, '1')

    expect(state).toEqual(emptyInitialState)
  })
  it('should remove the user with ID one when there is two users', () => {
    const initialState: OrderingDomainModel.Form = stateWithTwoUsers

    const state = form.removeGuest(initialState, '1')

    expect(state).toEqual({
      guests: [
        {
          id: '2',
          firstName: 'Jane',
          lastName: 'Doe',
          age: 18,
        },
      ],
      organizerId: null,
    })
  })
})

describe('set an organizer', () => {
  it('should set organizerId when there is no guests', () => {
    const state = form.changeOrganizer(emptyInitialState, '1')
    expect(state.organizerId).toEqual(null)
  })
  it('should set organizer when the user exists', () => {
    const state = form.changeOrganizer(stateWithOneUser, '1')
    expect(state.organizerId).toEqual('1')
  })
  it('should remove the organizer when the user with organizer status is removed', () => {
    const stateWithTwoUsersAndOrganizer = { ...stateWithTwoUsers, organizerId: '1' }
    const state = form.removeGuest(stateWithTwoUsersAndOrganizer, '1')
    expect(state.organizerId).toEqual(null)
  })
})

describe('form submittable', () => {
  it('should not be submittable when there is no guests', () => {
    const isSubmittable = form.isSubmittable(emptyInitialState)
    expect(isSubmittable).toEqual(false)
  })
  it('should not be submittable when there is no organizer', () => {
    const isSubmittable = form.isSubmittable(emptyInitialState)
    expect(isSubmittable).toEqual(false)
  })
  it('should be submittable when there is an organizer', () => {
    const stateWithOneUserOrganizer = { ...stateWithOneUser, organizerId: '1' }
    const isSubmittable = form.isSubmittable(stateWithOneUserOrganizer)
    expect(isSubmittable).toEqual(true)
  })

  it.each<{ key: keyof OrderingDomainModel.GuestValues; value: any; msg: string }>([
    {
      key: 'firstName',
      value: '',
      msg: 'empty',
    },
    { key: 'lastName', value: '', msg: 'empty' },
    { key: 'age', value: 0, msg: 'below or equal to 0' },
  ])(`should not allow the $key of guests to be $msg`, ({ key, value }) => {
    const stateWithTwoUsersAndOrganizer = { ...stateWithTwoUsers, organizerId: '1' }
    const state = form.updateGuest(stateWithTwoUsersAndOrganizer, '2', key, value)
    const isSubmittable = form.isSubmittable(state)
    expect(isSubmittable).toEqual(false)
  })
})

describe('update a guest', () => {
  it.each<{ key: keyof OrderingDomainModel.GuestValues; value: any }>([
    { key: 'firstName', value: 'Jane' },
    { key: 'lastName', value: 'Wick' },
    { key: 'age', value: 42 },
  ])(`should change the %s of a guest`, ({ key, value }) => {
    const state = form.updateGuest(stateWithOneUser, '1', key, value)
    expect(state.guests[0][key]).toEqual(value)
  })
  it('should do nothing when the guest does not exist', () => {
    const state = form.updateGuest(stateWithOneUser, '2', 'firstName', 'Jane')
    expect(state).toEqual(stateWithOneUser)
  })
})
