

# run_server:
# 	# @cd server && CompileDaemon -command="sharek.server.exe"


up:
	@echo "=============starting api locally============="
	@cd server/docker && docker-compose up $(arg)

run_client:
	@cd client && npm run dev
