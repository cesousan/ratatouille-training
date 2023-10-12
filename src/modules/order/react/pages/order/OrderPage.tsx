'use client'

import React from 'react'
import { useSelector } from 'react-redux'

import { BookingSuccessSection } from '@ratatouille/modules/order/react/sections/booking-success/BookingSuccessSection'
import { GuestsSection } from '@ratatouille/modules/order/react/sections/guests/GuestsSection'
import { MealsSection } from '@ratatouille/modules/order/react/sections/meal/MealsSection'
import { SummarySection } from '@ratatouille/modules/order/react/sections/summary/SummarySection'
import { TableSection } from '@ratatouille/modules/order/react/sections/table/TableSection'
import { AppState } from '@ratatouille/modules/store/store'
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'

export const OrderPage: React.FC = () => {
  const step = useSelector((state: AppState) => state.ordering.step)
  return (
    <main>
      {step === OrderingDomainModel.Step.Guests && <GuestsSection />}
      {step === OrderingDomainModel.Step.Table && <TableSection />}
      {step === OrderingDomainModel.Step.Meal && <MealsSection />}
      {step === OrderingDomainModel.Step.Summary && <SummarySection />}
      {step === OrderingDomainModel.Step.BookingSuccess && <BookingSuccessSection />}
    </main>
  )
}
