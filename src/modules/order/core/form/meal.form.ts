import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'

export class MealForm {
  getSelectableEntries(courses: OrderingDomainModel.MealCourse[], guest: OrderingDomainModel.Guest) {
    return courses.filter(allowedCoursesOnly(OrderingDomainModel.MealType.Entry, guest))
  }
  getSelectableMainCourses(courses: OrderingDomainModel.MealCourse[], guest: OrderingDomainModel.Guest) {
    return courses.filter(allowedCoursesOnly(OrderingDomainModel.MealType.MainCourse, guest))
  }
  getSelectableDesserts(courses: OrderingDomainModel.MealCourse[], guest: OrderingDomainModel.Guest) {
    return courses.filter(allowedCoursesOnly(OrderingDomainModel.MealType.Dessert, guest))
  }
  getSelectableDrinks(courses: OrderingDomainModel.MealCourse[], guest: OrderingDomainModel.Guest) {
    return courses.filter(allowedCoursesOnly(OrderingDomainModel.MealType.Drink, guest))
  }
}

function allowedCoursesOnly(type: OrderingDomainModel.MealType, guest: OrderingDomainModel.Guest) {
  return and(isCourseOfType(OrderingDomainModel.MealType.Entry), isGuestAllowed(guest))
}
function isGuestAllowed(guest: OrderingDomainModel.Guest) {
  return (course: OrderingDomainModel.MealCourse) => course.requiredAge === null || guest.age >= course.requiredAge
}
function isCourseOfType(type: OrderingDomainModel.MealType) {
  return (course: OrderingDomainModel.MealCourse) => course.type === type
}

function and<T>(...predicates: ((val: T) => boolean)[]) {
  return (x: T) => predicates.reduce((acc, pred) => acc && pred(x), true)
}
