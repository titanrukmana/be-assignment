package delivery

import (
	"net/http"
	"titan/payment_manager/src/domain"
	"titan/payment_manager/src/middleware"

	"github.com/gin-gonic/gin"
	"github.com/nedpals/supabase-go"
)

type userHandler struct {
	UserUsecase    domain.UserUsecase
	SupabaseClient supabase.Client
}

func UserHandler(r *gin.RouterGroup, us domain.UserUsecase, sc *supabase.Client) {
	handler := &userHandler{
		UserUsecase:    us,
		SupabaseClient: *sc,
	}

	r.POST("/auth", handler.Auth)
	r.POST("/logout", middleware.AuthMiddleware(sc), handler.Logout)
	r.POST("/register", handler.Register)
}

func (a *userHandler) Auth(c *gin.Context) {
	var request domain.User

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "internal server error"})
		return
	}

	user, err := a.UserUsecase.Auth(c, &a.SupabaseClient, supabase.UserCredentials{Email: request.Email, Password: request.Password})

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.SetCookie("accessToken", user.AccessToken, 60*60, "/", "localhost", true, true)

	c.JSON(http.StatusOK, gin.H{"message": "login success"})

}

func (a *userHandler) Logout(c *gin.Context) {
	var token string

	token, ok := c.MustGet("token").(string)

	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "unauthorized"})
		return
	}

	if err := a.UserUsecase.Logout(c, &a.SupabaseClient, token); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "unauthorized"})
		return
	}

	c.SetCookie("accessToken", "", -1, "/", "localhost", true, true)
	c.JSON(http.StatusOK, gin.H{"message": "success"})
}

func (a *userHandler) Register(c *gin.Context) {
	var request domain.User

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "internal server error"})
		return
	}

	err := a.UserUsecase.Register(c, &a.SupabaseClient, domain.User{Email: request.Email, Password: request.Password})

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "register success"})
}
