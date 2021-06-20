package handlers

import (
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"sharek.server/database"
	"sharek.server/utils"
)

func UserProfile(res http.ResponseWriter, req *http.Request) {

	var user database.User
	v := mux.Vars(req)
	userId, _ := strconv.Atoi(v["id"])
	database.Init().Model(&database.User{}).Select([]string{"name", "id", "created_at"}).Where(&database.User{ID: uint(userId)}).Find(&user)

	utils.Respond(200, user, res)
}
