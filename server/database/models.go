package database

import (
	"time"
)

type User struct {
	// gorm.Model
	ID        uint      `gorm:"primaryKey" json:"id"`
	Name      string    `gorm:"size:50" json:"name"`
	Email     string    `gorm:"size:200" json:"email"`
	Password  string    `gorm:"size:100" json:"password"`
	Links     []Link    `json:"links"`
	CreatedAt time.Time `json:"created_at"`
}

type Link struct {
	// gorm.Model
	ID        uint      `gorm:"primaryKey" json:"id"`
	Title     string    `gorm:"size:100" json:"title"`
	Url       string    `gorm:"size:1000" json:"url"`
	Category  string    `gorm:"size:50" json:"category"`
	Image     string    `gorm:"size:500" json:"image"`
	UserID    uint      `json:"user_id"`
	User      User      `json:"user"`
	CreatedAt time.Time `json:"created_at"`
}
