package main

import (
	"sharek.server/routes"
	"sharek.server/utils"
)

func main() {

	Router := routes.Router()

	utils.StartServer(Router)
}
