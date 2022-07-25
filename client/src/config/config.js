/***
 * @author : Dhairya Analbhai Doctor
 * @bannerID : B00864868
 * @email : dh973257@dal.ca
 * @description: Defining backend url and stripe payment key.
 ***/
export const BACKEND_URL = window.location.origin.includes("theblinglist")
  ? "https://theblinglist-backend.herokuapp.com/"
  : "http://localhost:8080/";

export const stripePaymentPublishKey =
  "pk_test_51LIC1bE41Y5D29LDkn4hgw22GJw4eGPLzo84CiDYF5OrOz5QW002wOshFET7qu5czIrGCo5EE9H4GtJpEBuQqGad00UJn17gQ5";
