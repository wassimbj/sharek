package utils

import (
	"encoding/json"
	"io"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"sharek.server/config"
)

func StartServer(Router *mux.Router) {

	handler := cors.New(config.Cors()).Handler(Router)

	srv := &http.Server{
		Handler: handler,
		Addr:    ":1234",
	}

	err := srv.ListenAndServe()
	if err == nil {
		log.Print("Server is running...")
	} else {
		log.Fatalf("Server Error: %s", err)
	}
}

// returns JSON
func ReadBody(body io.ReadCloser) string {
	data, _ := ioutil.ReadAll(body)
	s := string(data)
	return s
}

func Respond(statusCode int, msg interface{}, res http.ResponseWriter) {

	res.Header().Set("Content-Type", "application/json")
	res.WriteHeader(statusCode)
	jsonData, _ := json.Marshal(msg)
	res.Write([]byte(jsonData))
}
