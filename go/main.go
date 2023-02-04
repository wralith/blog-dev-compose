package main

import (
	"log"
	"net/http"
	"os"

	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo/v4"
	_ "github.com/lib/pq"
)

func main() {
	port, ok := os.LookupEnv("PORT")
	if !ok {
		log.Fatal("PORT env variable is missing!")
	}
	dbAddr, ok := os.LookupEnv("DB_ADDR")
	if !ok {
		log.Fatal("DB_ADDR env variable is missing!")
	}
	db, err := sqlx.Connect("postgres", dbAddr)
	if err != nil {
		log.Fatal("Unable to connect database")
	}

	db.MustExec(createPostTable)

	app := echo.New()

	app.GET("/posts", func(c echo.Context) error {
		posts := []Post{}
		db.Select(&posts, "SELECT * FROM post")
		return c.JSON(http.StatusOK, posts)
	})

	app.POST("/posts", func(c echo.Context) error {
		post := Post{}
		c.Bind(&post) // Handle Error

		_, err := db.NamedExec(`INSERT INTO post (title,content) VALUES (:title,:content)`, post)
		if err != nil {
			return echo.NewHTTPError(http.StatusInternalServerError, "Unable to write to DB")
		}

		return c.NoContent(http.StatusCreated)
	})

	app.Start(":" + port)
}
