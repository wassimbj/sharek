package services

import (
	"errors"
	"log"

	"golang.org/x/crypto/bcrypt"
	"sharek.server/database"
)

func UserExists(email string, id uint) (database.User, int64) {
	// by email
	var user database.User
	var affectedRows int64
	if email != "" && id == 0 {
		result := database.Init().Select("id", "password").Where(&database.User{
			Email: email,
		}).First(&user)
		affectedRows = result.RowsAffected
	} else {
		result := database.Init().Select("id").Where(&database.User{
			ID: id,
		}).First(&user)
		affectedRows = result.RowsAffected
	}

	return user, affectedRows
}

func CreateUser(name string, email string, password string) (uint, error) {

	hashedPass, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		log.Fatal(err)
		return 0, err
	}
	newUser := database.User{
		Name:     name,
		Email:    email,
		Password: string(hashedPass),
	}

	result := database.Init().Create(&newUser)

	if result.Error != nil {
		return 0, result.Error
	}

	return newUser.ID, nil
}

func LoginUser(email string, password string) (uint, error) {

	user, affectedRows := UserExists(email, 0)
	if affectedRows == 0 {
		// record not found
		return 0, errors.New("User email not found")
	}
	matchFailed := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if matchFailed != nil {
		return 0, errors.New("Password doesn't match")
	}

	return user.ID, nil
}

func GetLoggedInUser(userId interface{}) database.User {
	var user database.User
	database.Init().Select("id", "name").Where(&database.User{ID: userId.(uint)}).First(&user)
	return user
}
