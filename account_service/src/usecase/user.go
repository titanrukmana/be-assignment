package usecase

import (
	"context"
	"titan/payment_manager/src/domain"

	"github.com/nedpals/supabase-go"
)

// userUsecase represents the implementation of UserUsecase interface.
type userUsecase struct{}

// NewUserUsecase creates a new instance of userUsecase.
func NewUserUsecase() userUsecase {
	return userUsecase{}
}

func (uc userUsecase) Auth(c context.Context, supabaseClient *supabase.Client, user supabase.UserCredentials) (*supabase.AuthenticatedDetails, error) {
	usr, err := supabaseClient.Auth.SignIn(c, supabase.UserCredentials{Email: user.Email, Password: user.Password})

	if err != nil {
		return nil, err
	}

	return usr, nil
}

func (uc userUsecase) Logout(c context.Context, supabaseClient *supabase.Client, token string) error {
	if err := supabaseClient.Auth.SignOut(c, token); err != nil {
		return err
	}

	return nil
}

func (uc userUsecase) Register(c context.Context, supabaseClient *supabase.Client, user domain.User) error {
	_, err := supabaseClient.Auth.SignUp(c, supabase.UserCredentials{Email: user.Email, Password: user.Password})

	return err
}
