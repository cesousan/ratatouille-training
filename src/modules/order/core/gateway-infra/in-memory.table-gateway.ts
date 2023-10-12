import { ITableGateway } from '@ratatouille/modules/order/core/gateway/table.gateway'
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'
import { TableFactory } from '@ratatouille/modules/order/core/model/table.factory'

export class InMemoryTableGateway implements ITableGateway {
  async getTables(): Promise<OrderingDomainModel.Table[]> {
    return [
      TableFactory.create({ id: '1', title: 'By the window', capacity: 4 }),
      TableFactory.create({ id: '2', title: 'By the door', capacity: 2 }),
      TableFactory.create({ id: '3', title: 'In the center', capacity: 6 }),
      TableFactory.create({ id: '4', title: 'By the bar', capacity: 2 }),
      TableFactory.create({ id: '5', title: 'In the corner', capacity: 3 }),
    ]
  }
}
