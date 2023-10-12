import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'
import { chooseTable } from '@ratatouille/modules/order/core/usecases/choose-table.usecase'
import { createTestStore } from '@ratatouille/modules/testing/tests-environment'

describe('Choose Table', () => {
  it('should choose a table', () => {
    const store = createTestStore()
    store.dispatch(chooseTable('1'))
    expect(store.getState().ordering.form.assignedTableId).toEqual('1')
    expect(store.getState().ordering.step).toEqual(OrderingDomainModel.Step.Meal)
  })
})
