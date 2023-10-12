export namespace OrderingDomainModel {
  export enum Step {
    Guests,
    Table,
    Meal,
    Summary,
    BookingSuccess,
  }

  export type Form = {
    guests: Guest[]
    organizerId: string | null
    assignedTableId: string | null
  }

  export type GuestValues = {
    firstName: string
    lastName: string
    age: number
  }

  export type MealId = string

  export enum MealType {
    Entry = 'entry',
    MainCourse = 'main_course',
    Dessert = 'dessert',
    Drink = 'drink',
  }

  export type MealCourse = {
    id: MealId
    title: string
    type: MealType
    requiredAge: number | null
  }

  export type MealMenu = {
    entry: MealId | null
    mainCourse: MealId | null
    dessert: MealId | null
    drink: MealId | null
  }

  export type Guest = GuestValues & {
    id: string
    meal: MealMenu
  }

  export type Table = {
    id: string
    title: string
    capacity: number
  }
}
