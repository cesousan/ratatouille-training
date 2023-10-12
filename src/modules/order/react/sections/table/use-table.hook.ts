import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'
import { TableFactory } from '@ratatouille/modules/order/core/model/table.factory'
import { useState } from 'react'

export const useTable = () => {
  function assignTable(tableId: string) {
    setAssignedTableId(tableId)
  }
  function onNext() {}
  function onPrevious() {}
  function isSubmittable() {
    return false
  }

  const [assignedTableId, setAssignedTableId] = useState<string | null>(null)

  const availableTables: OrderingDomainModel.Table[] = [
    TableFactory.create({ id: '1', title: 'By the door' }),
    TableFactory.create({ id: '2', title: 'Room center' }),
    TableFactory.create({ id: '3', title: 'Romantic by the window' }),
  ]

  return {
    assignTable,
    onNext,
    onPrevious,
    isSubmittable,
    assignedTableId,
    availableTables,
  }
}
