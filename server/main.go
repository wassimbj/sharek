package main

import (
	"sharek.server/routes"
	"sharek.server/utils"
)

// "sharek.server/database"

func main() {

	/*
		! when sending the req from the terminal session is empty
		! BUT when sending from the browser everything works fine
		?--------------------------------------------------------------
		! TODO NEXT: build the Client side
		! dont forget the {credentials: "include"} in the POST request on the client
	*/

	Router := routes.Router()

	// Router.Use(utils.GetReqRes())
	utils.StartServer(Router)
}
