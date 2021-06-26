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

	link.Image = utils.GetFavicons(link.Url)

	result := database.DB().Create(&link)

	if result.Error != nil {
		utils.Respond(http.StatusInternalServerError, "Something went wrong", res)
		return
	}

	utils.Respond(http.StatusOK, "Success !", res)
}

func Links(res http.ResponseWriter, req *http.Request) {
	var links []database.Link
	// v := mux.Vars(req)
	query := req.URL.Query()
	page, _ := strconv.Atoi(query.Get("page"))

	const LIMIT = 5
	// time.Sleep(time.Second * 3)

	database.DB().Model(&database.Link{}).Preload("User", func(db *gorm.DB) *gorm.DB {
		return db.Select("users.id, users.name")
	}).Offset(page).Limit(LIMIT).Order("links.created_at DESC").Find(&links)

	utils.Respond(200, links, res)
}

func UserLinks(res http.ResponseWriter, req *http.Request) {

	var links []database.Link
	v := mux.Vars(req)
	userId, _ := strconv.Atoi(v["id"])
	// log.Print(userId)
	database.DB().Model(&database.Link{}).Where(&database.Link{UserID: uint(userId)}).Find(&links)

	utils.Respond(200, links, res)
}
