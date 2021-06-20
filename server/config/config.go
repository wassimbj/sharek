package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func Cors() cors.Options {
	return cors.Options{
		AllowedOrigins: []string{
			"http://localhost:3000",
		},
		AllowCredentials: true,
	}
}

func GetEnv(key string) string {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}
