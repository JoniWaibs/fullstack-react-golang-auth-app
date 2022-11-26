package main

import (
    "fmt"
    "context"
    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/cors"
    "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
    "github.com/JoniWaibs/fullstack-react-golang-auth-app/models"
)

func main() {
    app := fiber.New()

    /*
    * Middlewares
    */
    app.Use(cors.New())

    app.Get("/healthcheck", func(c *fiber.Ctx) error {
        return c.SendString("It is healthy 👋!")
    })

    /*
    * Declare MONGODB_URI
    */
    uri := "mongodb://localhost:27017/gomongo"

    /*
    * Mongo driver returns conection (client) or error
    */
    client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))

    /*
    * If error, stop the program and show error data
    */
    if err != nil {
		panic(err)
	}

    /*
    * Link Mongo DDBB and colection with app
    */
    coll := client.Database("gomongo").Collection("users")

    /*
    * Routing
    */
    app.Post("/api/users/create", func(c *fiber.Ctx) error {
        var user models.UserModel

        /*
        * Parse request body
        */
        c.BodyParser(&user)


        result, err := coll.InsertOne(
            context.TODO(),
            bson.D{
                { Key: "name", Value: user.Name },
                { Key: "password", Value: user.Password },
                { Key: "role", Value: user.Role },
                { Key: "country", Value: user.Country },
            },
        )

        if err != nil {
            return fiber.NewError(fiber.StatusBadRequest, err.Error())
        }

        return c.Status(fiber.StatusCreated).JSON(&fiber.Map{
            "data": result,
        })
    })

    app.Get("/api/users", func(c *fiber.Ctx) error {
        var users []models.UserModel

        /*
        * Return data in bson format
        */
        results, err := coll.Find(context.TODO(), bson.M{});

        if err != nil {
            return fiber.NewError(fiber.StatusBadRequest, err.Error())
        }

        /*
        * Return data in bson format
        */
        for results.Next(context.TODO()) {
            var user models.UserModel
            results.Decode(&user)
            users = append(users, user)
        }

        return c.Status(fiber.StatusOK).JSON(&fiber.Map{
            "data": users,
        })
    })

    app.Listen(":3000")
    fmt.Println("server listening on port 3000!")
}