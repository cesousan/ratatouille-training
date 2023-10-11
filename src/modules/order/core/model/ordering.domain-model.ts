export namespace OrderingDomainModel {
  export type Form = {
    guests: Guest[]
    organizerId: string | null
  }

  export type GuestValues = {
    firstName: string
    lastName: string
    age: number
  }

  export type Guest = GuestValues & {
    id: string
  }
}
