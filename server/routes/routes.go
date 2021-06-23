package routes

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"sharek.server/config"
	"sharek.server/routes/handlers"
	"sharek.server/utils"
)

func Router() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/login", handlers.Login).Methods("POST")
	router.HandleFunc("/create", handlers.Create).Methods("POST")
	router.HandleFunc("/links", handlers.Links).Methods("GET")
	router.HandleFunc("/user/{id}/links", handlers.UserLinks).Methods("GET")
	router.HandleFunc("/user/{id}", handlers.UserProfile).Methods("GET")
	router.HandleFunc("/isauth", handlers.LoggedInUser).Methods("GET")
	router.HandleFunc("/link/create", handlers.CreateLink).Methods("POST")
	router.HandleFunc("/logout", func(res http.ResponseWriter, req *http.Request) {
		config.DeleteSession("id", res, req)
		log.Printf("LOGGED OUT")
		utils.Respond(200, "LOGGED OUT !", res)

		return
	}).Methods("POST")

	router.HandleFunc("/", func(res http.ResponseWriter, req *http.Request) {
		savedUserId := config.GetSessionKey("id", req)
		log.Printf("Saved Session: %v", savedUserId)
		s, _ := json.Marshal(savedUserId)
		fmt.Fprintf(res, string(s))
	}).Methods("GET")

	return router

}
