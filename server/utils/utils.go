package utils

import (
	"net/http"
	"strings"
)

func GetFavicons(url string) string {
	resp, err := http.Get(url)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()
	text := ReadBody(resp.Body)
	var idf int
	idf = strings.Index(text, "property=\"og:image\"")
	if idf == -1 {
		idf = strings.Index(text, "name=\"twitter:image\"")
	}
	if idf == -1 {
		return ""
	}
	idxOfEnd := strings.Index(text[idf:idf+200], ">")
	data := text[idf-6 : idf+idxOfEnd+1]

	finalData := text[idf+strings.Index(data, "content=")+2 : idf+idxOfEnd]

	return strings.Split(finalData, "\"")[1]
}
