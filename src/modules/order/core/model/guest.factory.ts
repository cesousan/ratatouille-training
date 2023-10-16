import { MealMenuFactory } from '@ratatouille/modules/order/core/model/meal.factory'
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'

export class GuestFactory {
  static create(data?: Partial<OrderingDomainModel.Guest>): OrderingDomainModel.Guest {
    return {
      id: '',
      firstName: '',
      lastName: '',
      age: 18,
      meal: {
        dessert: null,
        drink: null,
        entry: null,
        mainCourse: null,
      },
      ...data,
    }
  }
}
