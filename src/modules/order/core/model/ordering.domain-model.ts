export namespace OrderingDomainModel {
  export type GuestValues = {
    firstName: string
    lastName: string
    age: number
  }

  export type Guest = GuestValues & {
    id: string
  }
}
