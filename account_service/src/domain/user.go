package domain

import (
	"context"

	"github.com/nedpals/supabase-go"
)

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type UserUsecase interface {
	Auth(c context.Context, supabaseClient *supabase.Client, user supabase.UserCredentials) (*supabase.AuthenticatedDetails, error)
	Logout(c context.Context, supabaseClient *supabase.Client, token string) error
	Register(c context.Context, supabaseClient *supabase.Client, user User) error
}
