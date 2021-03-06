export class Endpoint {
  // Product Endpoint
  public static API_GATEWAY = {
    URL: 'https://ess-api-gateway.herokuapp.com',
  };

  public static SERVICE = {
    PRODUCT_SERVICE: 'product-servcie',
    USER_SERVICE: 'user-service',
    UPLOAD_SERVICE: 'upload-service'
  };

  // Product Endpoint
  public static PRODUCT_ENDPOINT = {
    GET_ALL_PRODUCT: 'https://thawing-castle-81725.herokuapp.com/products?size=1000',
    GET_PRODUCT_BY_PRODUCT_ID: 'https://thawing-castle-81725.herokuapp.com/products',
    GET_PRODUCT_BY_CATEGORY_ID: 'https://thawing-castle-81725.herokuapp.com/products/searchByCategoryId',
    GET_PRODUCT_BY_NAME: 'https://thawing-castle-81725.herokuapp.com/products/searchByName',
    GET_INACTIVE_PRODUCT: 'https://thawing-castle-81725.herokuapp.com/api/products/inactive',
    APPROVE_PRODUCT: 'https://thawing-castle-81725.herokuapp.com/api/products/approve'
  };

  // Vendor Endpoint
  public static VENDOR_ENDPOINT = {
    // Change server later with api gateway
    SERVICE_URL: 'https://thawing-castle-81725.herokuapp.com/',
    // SERVICE_URL: 'http://localhost:9090/',

    GET_ALL_PRODUCT: 'api/products/',
    ADD_NEW_PRODUCT: 'api/products/',
    EDIT_PRODUCT: 'api/products/',
    DELETE_PRODUCT_BY_ID: 'api/products/'
  };

  // User Endpoint
  public static USER_ENDPOINT = {
    USER_SIGNUP: 'https://pm-user-service-v2.herokuapp.com/users',
    GET_USER_PROFILE_BY_NAME: 'https://pm-user-service-v2.herokuapp.com/api/users/username',
    ADD_CARD_TO_USER_ENDPOINT: 'https://pm-user-service-v2.herokuapp.com/api/user',
    REMOVE_CARD_FROM_USER_ENDPOINT: 'https://pm-user-service-v2.herokuapp.com/api/user',
    ADD_ADDRESS_TO_USER_ENDPOINT: 'https://pm-user-service-v2.herokuapp.com/api/users',
    REMOVE_ADDRESS_FROM_USER_ENDPOINT: 'https://pm-user-service-v2.herokuapp.com/api/users',
    UPDATE_ADDRESS_FOR_USER_ENDPOINT: 'https://pm-user-service-v2.herokuapp.com/api/users',
    ADD_USER_PROFILE: 'https://pm-user-service-v2.herokuapp.com/users',
    UPDATE_USER_PROFILE: 'https://pm-user-service-v2.herokuapp.com/api/users',
    SET_DEFAULT_ADDRESS: 'https://pm-user-service-v2.herokuapp.com/api/users',
    SET_DEFAULT_CREDIT_CARD: 'https://pm-user-service-v2.herokuapp.com/api/user',
    CHECK_DEFAULT_CARD_ADDRESS: 'https://pm-user-service-v2.herokuapp.com/api/users'
  };

  // Auth Endpoint
  public static AUTH_ENDPOINT = {
    SIGN_IN_ENDPOINT: `${Endpoint.API_GATEWAY.URL}/oauth/token`
  };

  // Cart Endpoint
  public static CART_ENDPOINT = {
    GET_CART_ENDPOINT: 'https://shopping-cart-microservice.herokuapp.com:443/api/cart',
    ADD_TO_CART_ENDPOINT: 'https://shopping-cart-microservice.herokuapp.com:443/api/cart',
    REMOVE_FROM_CART_ENDPOINT: 'https://shopping-cart-microservice.herokuapp.com:443/api/cart'
  };

  // Payment Endpoint
  public static PAYMENT_ENDPOINT = {
    CARD_VERIFICATION_ENDPOINT: 'https://pm-payment-gateway.herokuapp.com/api/payment/verify-card'
  };

  // Report Endpoint
  public static REPORT_ENDPOINT = {
    REPORT_PRODUCT: 'http://ec2-3-137-203-14.us-east-2.compute.amazonaws.com:9090/api/generateReportProduct',
    REPORT_DOLLAR_VALUE: 'http://ec2-3-137-203-14.us-east-2.compute.amazonaws.com:9090/api/generateReportDollarValue'
  };

  // Manager User Endpoint
  public static MANAGER_USER_ENDPOINT = {
    ALL_USER_ENDPOINT: 'https://pm-user-service-v2.herokuapp.com/api/users',
    CHANGE_STATUS_USER_ENDPOINT: 'https://pm-user-service-v2.herokuapp.com/api/users'
  };

  // Order Endpoint
  public static ORDER_ENDPOINT = {
    PLACE_ORDER_ENDPOINT: 'https://shopping-cart-microservice.herokuapp.com:443/api/order',
    VIEW_ORDER_HISTORY_ENDPOINT: 'https://shopping-cart-microservice.herokuapp.com:443/api/order'
  };

  // Category Endpoint
  public static CATEGORY_ENDPOINT = {
    GET_ALL_CATEGORY: 'https://thawing-castle-81725.herokuapp.com/categories',
    ADD_NEW_CATEGORY: 'https://thawing-castle-81725.herokuapp.com/api/categories',
    EDIT_CATEGORY: 'https://thawing-castle-81725.herokuapp.com/api/categories',
    DELETE_CATEGORY: 'https://thawing-castle-81725.herokuapp.com/api/categories',
  };

  // Upload Endpoint
  public static UPLOAD_ENDPOINT = {
    // UPLOAD: Endpoint.API_GATEWAY.URL + Endpoint.SERVICE.UPLOAD_SERVICE + '/api/uploadImage'
    UPLOAD: 'https://upload-service-ess.herokuapp.com/api/uploadImage',
  };
}
