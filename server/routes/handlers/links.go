package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"gorm.io/gorm"
	"sharek.server/database"
	"sharek.server/utils"
)

func CreateLink(res http.ResponseWriter, req *http.Request) {
	var link database.Link
	body := utils.ReadBody(req.Body)
	json.Unmarshal([]byte(body), &link)

	result := database.Init().Create(&link)

	if result.Error != nil {
		utils.Respond(http.StatusInternalServerError, "Something went wrong", res)
		return
	}

	utils.Respond(http.StatusOK, "Success !", res)
}

func Links(res http.ResponseWriter, req *http.Request) {
	var links []database.Link
	database.Init().Model(&database.Link{}).Preload("User", func(db *gorm.DB) *gorm.DB {
		return db.Select("users.id, users.name")
	}).Find(&links)

	utils.Respond(200, links, res)
}

func UserLinks(res http.ResponseWriter, req *http.Request) {

	var links []database.Link
	v := mux.Vars(req)
	userId, _ := strconv.Atoi(v["id"])
	database.Init().Model(&database.Link{}).Where(&database.Link{UserID: uint(userId)}).Find(&links)

	utils.Respond(200, links, res)
}
