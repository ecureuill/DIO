import Entities.Booking;
import Entities.BookingDates;
import com.github.javafaker.Faker;
import io.restassured.RestAssured;
import io.restassured.filter.log.ErrorLoggingFilter;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.restassured.http.ContentType;
import io.restassured.specification.RequestSpecification;
import org.junit.jupiter.api.*;

import static io.restassured.RestAssured.given;
import static io.restassured.config.LogConfig.logConfig;
import static io.restassured.module.jsv.JsonSchemaValidator.matchesJsonSchemaInClasspath;
import static org.hamcrest.Matchers.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class BookingTest {

    public static Faker faker;
    public static RequestSpecification request;
    private static Booking booking;
    private static BookingDates bookingDates;
    private static Integer bookingid;
    private static String token;

    @BeforeAll
    public static void Setup() {
        RestAssured.baseURI = "https://restful-booker.herokuapp.com";
        faker = new Faker();
        bookingDates = new BookingDates("2018-01-02", "2018-01-03"); //todo usar faker
        booking = new Booking(faker.name().firstName(), faker.name().lastName(), (float) faker.number().randomDouble(2, 50, 10000), true, bookingDates, "");
        RestAssured.filters(new RequestLoggingFilter(), new ResponseLoggingFilter(), new ErrorLoggingFilter());
    }

    @BeforeEach
    void setRequest(){
        request = given()
                .config(RestAssured.config().logConfig(logConfig().enableLoggingOfRequestAndResponseIfValidationFails()))
                .contentType(ContentType.JSON)
                .auth().basic("admin", "password123"); //todo secrets
    }
    @Test
    @Order(0)
    public void auth_returnOK(){
        String jsonString = "{\n" +
                "    \"username\" : \"admin\",\n" +
                "    \"password\" : \"password123\"\n" +
                "}";

        token =  request
                .given()
                .body(jsonString)
                .when()
                .post("/auth/")
                .then()
                .assertThat()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .extract().response().body().path("token");
    }

    @Test
    @Order(1)
    public void createBooking_WithValidData_returnOK(){
        bookingid =  request
                .given()
                .body(booking)
                .when()
                .post("/booking/")
                .then()
                .body(matchesJsonSchemaInClasspath("createdBookingSchema.json"))
                .and()
                .assertThat()
                .statusCode(200)
                .contentType(ContentType.JSON)
//                    .and()
//                    .time(lessThan(2000L))
                .extract().response().body().path("bookingid");
    }

    @Test
    @Order(2)
    public void getBookingById_returnOK(){
        request.when()
                .get("/booking/"+bookingid)
                .then()
                .assertThat()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .and()
                .body(matchesJsonSchemaInClasspath("bookingRequestSchema.json"));
    }


    @Test
    @Order(3)
    public void updateBooking_returnOK(){
        request
                .given()
                .cookie("token", token)
                .body(booking)
                .header("Content-type", "application/json")
                .when()
                .put("/booking/"+bookingid)
                .then()
                .assertThat()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .and()
                .body(matchesJsonSchemaInClasspath("bookingRequestSchema.json"));
    }
    @Test
    @Order(4)
    public void partialUpdateBooking_returnOK(){
        String jsonString = "{\r\n" +
                "\"firstname\" : \"Camilla\",\r\n" +
                "\"lastname\" : \"Silva\"}";

        request
                .given()
                .body(jsonString)
                .header("Content-type", "application/json")
                .cookie("token", token)
                .when()
                .patch("/booking/"+bookingid)
                .then()
                .assertThat()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .and()
                .body(matchesJsonSchemaInClasspath("bookingRequestSchema.json"));
    }
    @Test
    @Order(6)
    public void deleteBooking_returnOK(){
        request.given()
                .cookie("token", token)
                .when()
                .delete("/booking/"+bookingid)
                .then()
                .assertThat()
                .statusCode(201)
                .contentType(ContentType.TEXT);
    }
    @Test
    @Order(5)
    public void deleteBooking_returnForbbiden(){
        request.when()
                .delete("/booking/"+bookingid)
                .then()
                .assertThat()
                .statusCode(403)
                .contentType(ContentType.TEXT);
    }

    @Test
    @Order(7)
    public void deleteBooking_returnNotAllowed(){
        request.given()
                .cookie("token", token)
                .when()
                .delete("/booking/"+bookingid)
                .then()
                .assertThat()
                .statusCode(405)
                .contentType(ContentType.TEXT);
    }
    @Test
    @Order(8)
    public void getBookingById_returnNotFound(){
        request.when()
                .get("/booking/"+bookingid)
                .then()
                .assertThat()
                .statusCode(404)
                .contentType(ContentType.TEXT);
    }

    @Test
    public void getAllBookingsById_returnOK() {
//        Response response = request.when().get("/booking").then().extract().response();
//        Assertions.assertNotNull(response);
//        Assertions.assertEquals(200, response.statusCode());
        request.when()
                .get("/booking")
                .then()
                .assertThat()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .and()
                .body("results", hasSize(greaterThan(0)));
    }

    @Test
    public void getAllBookingsByUserFirstName_returnOK() {
        request.when()
                .queryParam("firstname", "Camilla")
                .get("/booking/")
                .then()
                .assertThat()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .and()
                .body("results", hasSize(greaterThanOrEqualTo(0)));
    }
}

