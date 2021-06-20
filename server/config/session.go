package config

import (
	"log"
	"net/http"

	"github.com/gorilla/sessions"
)

/*
	you can use session store databases
	there is a plenty mysql, redis, mongo, check the docs
	? https://github.com/gorilla/sessions#store-implementations
	i just used simple cookies
*/
var store = sessions.NewCookieStore([]byte(GetEnv("SESSION_KEY")))

type SessionData map[interface{}]interface{}

func SaveSession(vals SessionData, res http.ResponseWriter, req *http.Request) error {
	store.Options.MaxAge = 60 * 60 * 24 * 10 // 10 days, in sec
	// session name
	// its like a table and data is vals
	// {user: { values: { ... } }}
	session, _ := store.Get(req, "user")
	// set the values
	session.Values["id"] = vals
	// Save it before we write to the response/return from the handler.
	err := session.Save(req, res)

	if err != nil {
		log.Printf("SAVING SESSION ERRORRR: %v", err)
	}
	return err
}

func GetSessionKey(key interface{}, req *http.Request) interface{} {
	session, _ := store.Get(req, "user")
	return session.Values[key]
}

func DeleteSession(key string, res http.ResponseWriter, req *http.Request) error {
	session, _ := store.Get(req, "user")
	// Set some session values.
	session.Values[key] = nil
	// Save it before we write to the response/return from the handler.
	return session.Save(req, res)
}
