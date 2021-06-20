package database

import (
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"sharek.server/config"
)

func Init() *gorm.DB {
	// postgres://<USER>:<PASSWORD>@<HOST>:5432/<DB_NAME>
	DSN := fmt.Sprintf("postgres://%s:%s@%s:5432/%s",
		config.GetEnv("DB_USER"),
		config.GetEnv("DB_PASS"),
		config.GetEnv("DB_HOST"),
		config.GetEnv("DB_NAME"))

	var pg = postgres.Open(DSN)
	db, err := gorm.Open(pg, &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true,
	})
	if err != nil {
		recover()
		panic("failed to connect database")
	}

	// migrate database schema
	db.AutoMigrate(&User{})
	db.AutoMigrate(&Link{})

	return db.Debug()
}
