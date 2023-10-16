import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'

export class MealMenuFactory {
  static create(data?: Partial<OrderingDomainModel.MealMenu>): OrderingDomainModel.MealMenu {
    return {
      entry: 'entry-ID',
      mainCourse: 'mainCourse-ID',
      dessert: 'dessert-ID',
      drink: 'drink-ID',
      ...data,
    }
  }
}

export class MealCourseFactory {
  static create(data?: Partial<OrderingDomainModel.MealCourse>): OrderingDomainModel.MealCourse {
    return {
      id: '',
      title: '',
      type: OrderingDomainModel.MealType.Entry,
      requiredAge: null,
      ...data,
    }
  }
}
