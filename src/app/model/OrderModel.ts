export interface OrderModel {
    id: number,
    userId: number,
    status: string,
    timestamp: string,
    billingAddress: {
      street1: string,
      street2: string,
      zip: string,
      city: string,
      country: string,
      state: string
    },
    shippingAddress: {
      street1: string,
      street2: string,
      zip: string,
      city: string,
      country: string,
      state: string
    },
    products: [{
        price: number,
        vendorId: number,
        imageURL: string,
        description: string,
        productName: string,
        productId: number,
        quantity: number
      }
    ]
}