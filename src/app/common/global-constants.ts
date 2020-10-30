import { Layout } from './enum';

export class AppConfig {

  // Endpoint
  public static REST_API_SERVER = 'http://localhost:3000';

  //OAuth Client
  public static CLIENT_ID = "group3";
  public static SECRET_KEY = "JwtSecretKey";

  // Product Endpoint
  public static PRODUCT_ENDPOINT = "";

  // User Endpoint
  public static USER_SIGNUP = "https://pm-user-service-v2.herokuapp.com/user/register"

  // Auth Endpoint
  public static SIGN_IN_ENDPOINT = "https://pm-authentication-service.herokuapp.com/oauth/token";

  // Appearance
  public static layout: Layout = Layout.grid;

}

export class Endpoint {

  public static Auth = class {

  };

  public static Payment = class {
    public static ShippingAddress = AppConfig.REST_API_SERVER + '/address';
    public static Card = AppConfig.REST_API_SERVER + '/card';
    public static Order = AppConfig.REST_API_SERVER + '/order';
  };


}


