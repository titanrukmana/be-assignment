package main

import (
	"log"
	"os"
	"titan/payment_manager/src/delivery"
	"titan/payment_manager/src/usecase"

	"github.com/gin-gonic/contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/nedpals/supabase-go"
)

func main() {
	r := gin.Default()
	r.Use(cors.Default())

	if err := godotenv.Load(); err != nil {
		log.Fatal("error loading environment file")
	}

	client := supabase.CreateClient(os.Getenv("SUPABASE_URL"), os.Getenv("SUPABASE_ANON_KEY"))

	api := r.Group("/account")

	userUsecase := usecase.NewUserUsecase()

	delivery.UserHandler(api, userUsecase, client)

	r.Run()
}
