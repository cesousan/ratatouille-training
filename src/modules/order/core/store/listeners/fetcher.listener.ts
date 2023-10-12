import { ListenerMiddlewareInstance } from '@reduxjs/toolkit'

import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'
import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice'
import { fetchTables } from '@ratatouille/modules/order/core/usecases/fetch-tables.usecase'

export const registerFetcherListener = (listener: ListenerMiddlewareInstance) =>
  listener.startListening({
    actionCreator: orderingSlice.actions.navigateToStep,
    effect: (action, api) => {
      switch (action.payload) {
        case OrderingDomainModel.Step.Table: {
          api.dispatch(fetchTables as any)
          break
        }
      }
    },
  })
