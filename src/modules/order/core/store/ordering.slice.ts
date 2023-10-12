import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type OrderingState = {
  step: OrderingDomainModel.Step
  form: OrderingDomainModel.Form
  availableTables: {
    status: 'idle' | 'loading' | 'success' | 'error'
    error: null | string
    data: OrderingDomainModel.Table[]
  }
}

export const initialState: OrderingState = {
  step: OrderingDomainModel.Step.Guests,
  form: {
    guests: [],
    organizerId: null,
    assignedTableId: null,
  },
  availableTables: {
    status: 'idle',
    data: [],
    error: null,
  },
}

export const orderingSlice = createSlice({
  name: 'ordering',
  initialState,
  reducers: {
    chooseGuests: (state, action: PayloadAction<OrderingDomainModel.Form>) => {
      state.form = action.payload
    },
    navigateToStep: (state, action: PayloadAction<OrderingDomainModel.Step>) => {
      state.step = action.payload
    },
    fetchAvailableTables: state => {
      state.availableTables.status = 'loading'
      state.availableTables.error = null
    },
    storeAvailableTables: (state, action: PayloadAction<OrderingDomainModel.Table[]>) => {
      state.availableTables.data = action.payload
      state.availableTables.status = 'success'
      state.availableTables.error = null
    },
    handleFetchAvailableTablesError(state, action: PayloadAction<string>) {
      state.availableTables.data = []
      state.availableTables.status = 'error'
      state.availableTables.error = action.payload
    },
    chooseTable: (state, action: PayloadAction<string>) => {
      state.form.assignedTableId = action.payload
    },
  },
})

export const orderingReducer = orderingSlice.reducer
export const orderingActions = orderingSlice.actions
