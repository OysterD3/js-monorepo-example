package main

import (
	"html/template"
	"io"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// Template struct
type Template struct {
	templates *template.Template
}

// Render Template
func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func main() {

	port := os.Args[1]

	e := echo.New()
	e.Use(middleware.Recover())

	// Adding template
	e.Renderer = &Template{
		templates: template.Must(template.ParseGlob("dist/*.html")),
	}

	e.Static("/assets", "dist/assets")
	e.Static("/fonts", "dist/fonts")
	e.Static("/images", "dist/images")

	e.GET("/*", func(c echo.Context) (err error) {
		return c.File("dist/index.html")
	})

	e.Logger.Fatal(e.Start(":"+port))
}
