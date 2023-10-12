import { ListenerMiddlewareInstance } from '@reduxjs/toolkit'

import { registerFetcherListener } from '@ratatouille/modules/order/core/store/listeners/fetcher.listener'
import { registerOrderingStepListeners } from '@ratatouille/modules/order/core/store/listeners/ordering-step.listener'

const listeners = [registerOrderingStepListeners, registerFetcherListener]

export default (listener: ListenerMiddlewareInstance) => {
  listeners.forEach(registerListener => registerListener(listener))
}
