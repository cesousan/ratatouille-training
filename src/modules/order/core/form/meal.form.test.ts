import { MealForm } from '@ratatouille/modules/order/core/form/meal.form'
import { GuestFactory } from '@ratatouille/modules/order/core/model/guest.factory'
import { MealCourseFactory } from '@ratatouille/modules/order/core/model/meal.factory'
import { OrderingDomainModel } from '@ratatouille/modules/order/core/model/ordering.domain-model'

const mealForm = new MealForm()
const adultGuest = GuestFactory.create({ firstName: 'John', lastName: 'Doe', age: 28 })
const childGuest = GuestFactory.create({ firstName: 'Jane', lastName: 'Doe', age: 12 })

const adultEntry = MealCourseFactory.create({
  id: 'adult-entry',
  title: 'Adult Entry',
  type: OrderingDomainModel.MealType.Entry,
  requiredAge: 18,
})
const adultMainCourse = MealCourseFactory.create({
  id: 'adult-main-course',
  title: 'Adult Main Course',
  type: OrderingDomainModel.MealType.MainCourse,
  requiredAge: 18,
})
const adultDessert = MealCourseFactory.create({
  id: 'adult-dessert',
  title: 'Adult Dessert',
  type: OrderingDomainModel.MealType.Dessert,
  requiredAge: 18,
})
const adultDrink = MealCourseFactory.create({
  id: 'adult-drink',
  title: 'Adult Drink',
  type: OrderingDomainModel.MealType.Drink,
  requiredAge: 18,
})

const regularEntry = MealCourseFactory.create({
  id: 'regular-entry',
  title: 'Regular Entry',
  type: OrderingDomainModel.MealType.Entry,
  requiredAge: null,
})
const regularMainCourse = MealCourseFactory.create({
  id: 'regular-main-course',
  title: 'Regular Main Course',
  type: OrderingDomainModel.MealType.MainCourse,
  requiredAge: null,
})
const regularDessert = MealCourseFactory.create({
  id: 'regular-dessert',
  title: 'Regular Dessert',
  type: OrderingDomainModel.MealType.Dessert,
  requiredAge: null,
})
const regularDrink = MealCourseFactory.create({
  id: 'regular-drink',
  title: 'Regular Drink',
  type: OrderingDomainModel.MealType.Drink,
  requiredAge: null,
})

const courses = [
  adultEntry,
  adultMainCourse,
  adultDessert,
  adultDrink,
  regularEntry,
  regularMainCourse,
  regularDessert,
  regularDrink,
]
describe('meal form', () => {
  describe('meal selection', () => {
    describe('selecting entries', () => {
      // get selectable entries
      it('should be empty when there are no courses available', () => {
        const entries = mealForm.getSelectableEntries([], adultGuest)
        expect(entries).toEqual([])
      })
      it('should contain all entries if the guest is an adult', () => {
        const entries = mealForm.getSelectableEntries(courses, adultGuest)
        expect(entries).toEqual([adultEntry, regularEntry])
      })
      it('should contain unrestricted entries only if the guest is a child', () => {
        const entries = mealForm.getSelectableEntries(courses, childGuest)
        expect(entries).toEqual([regularEntry])
      })
    })
    describe('selecting entries', () => {
      // get selectable main courses
      it('should be empty when there are no courses available', () => {
        const mainCourses = mealForm.getSelectableMainCourses([], adultGuest)
        expect(mainCourses).toEqual([])
      })
      it('should contain all main courses if the guest is an adult', () => {
        const mainCourses = mealForm.getSelectableMainCourses(courses, adultGuest)
        expect(mainCourses).toEqual([adultEntry, regularEntry])
      })
      it('should contain unrestricted main courses only if the guest is a child', () => {
        const mainCourses = mealForm.getSelectableMainCourses(courses, childGuest)
        expect(mainCourses).toEqual([regularEntry])
      })
    })
    describe('selecting desserts', () => {
      // get selectable desserts
      it('should be empty when there are no courses available', () => {
        const desserts = mealForm.getSelectableDesserts([], adultGuest)
        expect(desserts).toEqual([])
      })
      it('should contain all desserts if the guest is an adult', () => {
        const desserts = mealForm.getSelectableDesserts(courses, adultGuest)
        expect(desserts).toEqual([adultEntry, regularEntry])
      })
      it('should contain unrestricted desserts only if the guest is a child', () => {
        const desserts = mealForm.getSelectableDesserts(courses, childGuest)
        expect(desserts).toEqual([regularEntry])
      })
    })
    describe('selecting drinks', () => {
      // get selectable drinks
      it('should be empty when there are no courses available', () => {
        const drinks = mealForm.getSelectableDrinks([], adultGuest)
        expect(drinks).toEqual([])
      })
      it('should contain all drinks if the guest is an adult', () => {
        const drinks = mealForm.getSelectableDrinks(courses, adultGuest)
        expect(drinks).toEqual([adultEntry, regularEntry])
      })
      it('should contain unrestricted drinks only if the guest is a child', () => {
        const drinks = mealForm.getSelectableDrinks(courses, childGuest)
        expect(drinks).toEqual([regularEntry])
      })
    })
  })

  // assign entry
  // assign main course
  // assign dessert
  // assign drink

  // is submittable
})
