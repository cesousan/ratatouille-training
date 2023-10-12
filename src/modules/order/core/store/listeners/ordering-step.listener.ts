import { ListenerMiddlewareInstance } from '@reduxjs/toolkit'

import { orderingSlice } from '@ratatouille/modules/order/core/store/ordering.slice'
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'

export const registerOrderingStepListeners = (listener: ListenerMiddlewareInstance) => {
  listener.startListening({
    actionCreator: orderingSlice.actions.chooseGuests,
    effect: (_, api) => {
      api.dispatch(orderingSlice.actions.navigateToStep(OrderingDomainModel.Step.Table))
    },
  })
  listener.startListening({
    actionCreator: orderingSlice.actions.chooseTable,
    effect: (_, api) => {
      api.dispatch(orderingSlice.actions.navigateToStep(OrderingDomainModel.Step.Meal))
    },
  })
}
