package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/nedpals/supabase-go"
)

func AuthMiddleware(sc *supabase.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := c.Cookie("accessToken")

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "unauthorized"})
			c.Abort()
			return
		}

		_, err = sc.Auth.User(c, token)

		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "unauthorized"})
			c.Abort()
			return
		}

		c.Set("token", token)

		c.Next()
	}
}
