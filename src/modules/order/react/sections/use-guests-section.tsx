import { useState } from "react"

import {OrderingDomainModel} from '@ratatouille/modules/order/core/model/ordering.domain-model'


export const useGuestsSection = () => {
    function addGuest() {
        setGuests((guests) => [
            ...guests,
            {
                id: Math.random().toString(),
                firstName: "",
                lastName: "",
                age: 0,
            }
        ])
    }
    function removeGuest(id: string) {
        setGuests((guests) => guests.filter(guest => guest.id !== id))
    }
    function updateGuest(id: string, key: keyof OrderingDomainModel.GuestValues, value: string | number) {}
    function changeOrganizer() {}
    function onNext() {}
    function isSubmittable(){}

    const [guests, setGuests] = useState<OrderingDomainModel.Guest[]>([])

    return {
        addGuest,
        removeGuest,
        updateGuest,
        changeOrganizer,
        onNext,
        isSubmittable,
        guests,
    }
}
