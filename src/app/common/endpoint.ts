export class Endpoint {
  // Product Endpoint
  public static PRODUCT_ENDPOINT = {
    GET_ALL_PRODUCT: 'https://thawing-castle-81725.herokuapp.com/products/',
    GET_PRODUCT_BY_PRODUCT_ID: "",
    GET_PRODUCT_BY_CATEGORY_ID: ""
  };

  // User Endpoint
  public static USER_ENDPOINT = {
    USER_SIGNUP: "https://pm-user-service-v2.herokuapp.com/user/register"
  } 

  // Auth Endpoint
  public static AUTH_ENDPOINT = {
    SIGN_IN_ENDPOINT: "https://pm-authentication-service.herokuapp.com/oauth/token"
  }

  // Cart Endpoint
  public static CART_ENDPOINT = {
    GET_CART_ENDPOINT: "https://shopping-cart-microservice.herokuapp.com:443/api/cart/",
    ADD_TO_CART_ENDPOINT: "https://shopping-cart-microservice.herokuapp.com:443/api/cart/",
    REMOVE_FROM_CART_ENDPOINT: ""
  }

  // Payment Endpoint
  public static PAYMENT_ENDPOINT = {
    CARD_VERIFICATION_ENDPOINT: "https://pm-payment-gateway.herokuapp.com/api/payment/verify-card"
  }

  public static ORDER_ENDPOINT = {
    ADDRESS_ENDPOINT: '/address',
    CARD_ENDPOINT: '/card',
    PLACE_ORDER_ENDPOINT: '/order'
  }
}