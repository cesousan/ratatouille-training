import { combineReducers, configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import registerOrderListeners from '@ratatouille/modules/order/core/store/listeners'
import { orderingReducer } from '@ratatouille/modules/order/core/store/ordering.slice'
import { Dependencies } from '@ratatouille/modules/store/dependencies'

const reducers = combineReducers({
  ordering: orderingReducer,
})

export type AppStore = ReturnType<typeof createStore>
export type AppState = ReturnType<typeof reducers>
export type AppDispatch = AppStore['dispatch']
export type AppGetState = AppStore['getState']

export const createStore = (config: { initialState?: AppState; dependencies: Dependencies }) => {
  const store = configureStore({
    preloadedState: config?.initialState,
    reducer: reducers,
    devTools: true,
    middleware: getDefaultMiddleware => {
      const listener = createListenerMiddleware()
      registerOrderListeners(listener)
      return getDefaultMiddleware({
        thunk: {
          extraArgument: config.dependencies,
        },
      }).prepend(listener.middleware)
    },
  })

  return store
}

export const useAppDispatch = () => useDispatch<AppDispatch>()
