import { Layout } from './enum';

export class AppConfig {

  //OAuth Client
  public static CLIENT_ID = "";
  public static SECRET_KEY = "";

  // Endpoint
  public static REST_API_SERVER = 'http://localhost:3000';

  // Product Endpoint
  public static PRODUCT_ENDPOINT = "";

  // User Endpoint


  // Auth Endpoint
  public static SIGN_IN_ENDPOINT = "https://pm-authentication-service.herokuapp.com/oauth/token";

  // Appearance
  public static layout: Layout = Layout.grid;

}

