import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'

export const useMeal = () => {
  function getSelectableEntries(guestId: string): OrderingDomainModel.MealCourse[] {
    return []
  }

  function getSelectableMainCourses(guestId: string): OrderingDomainModel.MealCourse[] {
    return []
  }

  function getSelectableDesserts(guestId: string): OrderingDomainModel.MealCourse[] {
    return []
  }

  function getSelectableDrinks(guestId: string): OrderingDomainModel.MealCourse[] {
    return []
  }

  function assignEntry(guestId: string, mealId: OrderingDomainModel.MealId): void {}

  function assignMainCourse(guestId: string, mealId: OrderingDomainModel.MealId): void {}

  function assignDessert(guestId: string, mealId: OrderingDomainModel.MealId): void {}

  function assignDrink(guestId: string, mealId: OrderingDomainModel.MealId): void {}

  function onNext() {}
  function onPrevious() {}
  function isSubmittable() {
    return false
  }

  const guests: OrderingDomainModel.Guest[] = []

  return {
    getSelectableEntries,
    getSelectableMainCourses,
    getSelectableDesserts,
    getSelectableDrinks,

    assignEntry,
    assignMainCourse,
    assignDessert,
    assignDrink,

    onNext,
    onPrevious,

    isSubmittable,

    guests,
  }
}
