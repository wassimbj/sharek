package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"sharek.server/config"
	"sharek.server/database"
	"sharek.server/services"
	"sharek.server/utils"
)

func Create(res http.ResponseWriter, req *http.Request) {
	// log.Print()
	userId := config.GetSessionKey("id", req)
	if userId != nil {
		res.WriteHeader(http.StatusUnauthorized)
		res.Write([]byte("Unauthorized"))
		log.Print("You are already logged in")
		return
	}

	var userData database.User
	body := utils.ReadBody(req.Body)
	json.Unmarshal([]byte(body), &userData)

	// log.Printf("EMAIL: %s, PASS: %s", userData.Email, userData.Password)

	userId, createFailed := services.CreateUser(userData.Name, userData.Email, userData.Password)

	if createFailed != nil {
		res.WriteHeader(http.StatusInternalServerError)
		res.Write([]byte("Something went wrong..."))
		log.Printf("Login failed: %v", createFailed)
		return
	}

	config.SaveSession(config.SessionData{
		"id": userId,
	}, res, req)
	// config.SaveSession(map[interface{}]interface{}{
	// 	"id": userId,
	// }, req, res)
	log.Print(config.GetSessionKey("id", req))

	res.WriteHeader(http.StatusOK)
	res.Write([]byte("Success, your account has been created !!!!"))

}

func Login(res http.ResponseWriter, req *http.Request) {
	userId := config.GetSessionKey("id", req)
	// log.Print(userId)
	if userId != nil {
		utils.Respond(http.StatusUnauthorized, "Unauthorized", res)
		log.Print("You are already logged in")
		return
	}
	var userData database.User
	body := utils.ReadBody(req.Body)
	json.Unmarshal([]byte(body), &userData)

	log.Printf("EMAIL: %s, PASS: %s", userData.Email, userData.Password)

	id, loginFailed := services.LoginUser(userData.Email, userData.Password)

	if loginFailed != nil {
		utils.Respond(http.StatusUnauthorized, "We don't have an account with this email or password", res)
		log.Printf("Login failed: %v", loginFailed)
		return
	}

	config.SaveSession(config.SessionData{
		"id": id,
	}, res, req)

	log.Print("You logged in !!")
	utils.Respond(http.StatusOK, "Success", res)
}

func LoggedInUser(res http.ResponseWriter, req *http.Request) {
	userId := config.GetSessionKey("id", req)

	if userId == nil {
		utils.Respond(200, nil, res)
		return
	}
	user, isLoggedIn := services.GetLoggedInUser(userId)

	if isLoggedIn {
		utils.Respond(200, user, res)
		return
	}
	utils.Respond(200, nil, res)
}
