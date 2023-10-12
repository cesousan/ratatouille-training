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

  export type Guest = GuestValues & {
    id: string
  }

  export type Table = {
    id: string
    title: string
    capacity: number
  }
}
