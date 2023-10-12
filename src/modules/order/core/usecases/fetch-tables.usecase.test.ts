import { TableFactory } from '@ratatouille/modules/order/core/model/table.factory'
import { fetchTables } from '@ratatouille/modules/order/core/usecases/fetch-tables.usecase'
import { createTestStore } from '@ratatouille/modules/testing/tests-environment'

describe('Fetch tables', () => {
  it('should fetch the tables', async () => {
    const tables = [TableFactory.create({ id: '1' })]
    const store = createTestStore({
      dependencies: {
        tableGateway: {
          getTables: () => Promise.resolve(tables),
        },
      },
    })
    const currentFetchTables = store.dispatch(fetchTables)

    expect(store.getState().ordering.availableTables.status).toEqual('loading')

    await currentFetchTables
    expect(store.getState().ordering.availableTables.data).toEqual(tables)
    expect(store.getState().ordering.availableTables.error).toEqual(null)
    expect(store.getState().ordering.availableTables.status).toEqual('success')
  })
  it('should handle table fetching failure', async () => {
    const store = createTestStore({
      dependencies: {
        tableGateway: {
          getTables: () => Promise.reject('Failed to fetch data'),
        },
      },
    })
    const currentFetchTables = store.dispatch(fetchTables)

    expect(store.getState().ordering.availableTables.status).toEqual('loading')

    await currentFetchTables
    expect(store.getState().ordering.availableTables.data).toEqual([])
    expect(store.getState().ordering.availableTables.status).toEqual('error')
    expect(store.getState().ordering.availableTables.error).toEqual('Failed to fetch data')
  })
})
