import { isBoolean } from 'util';

export class Endpoint {
    // Product Endpoint
  public static PRODUCT_ENDPOINT = {

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
    GET_CART_ENDPOINT: "https://shopping-cart-microservice.herokuapp.com:443/api/cart/"
  }

  // Payment Endpoint
  public static PAYMENT_ENDPOINT = {
    CARD_VERIFICATION_ENDPOINT: "https://pm-payment-gateway.herokuapp.com/api/payment/process-transaction/1?amount=1"
  }

  public static ORDER_ENDPOINT = {
    ADDRESS_ENDPOINT: '/address',
    CARD_ENDPOINT: '/card',
    PLACE_ORDER_ENDPOINT: '/order'
  }
}