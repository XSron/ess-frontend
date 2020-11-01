export interface UserModel {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    addresses: [
        {
            addressId: number,
            houseNumber: number,
            street: string,
            city: string,
            state: string,
            zipcode: string,
            country: string,
            defaultAddress: boolean
        }
    ],
    roles: [
        {
            id: number,
            roleName: string
        }
    ],
    cards: [
        {
            cardNumber: string,
            name: string,
            expiredDate: string,
            cvv: string,
            default: true
        }
    ]
}