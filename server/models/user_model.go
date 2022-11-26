package models


type UserModel struct {
	Name string `json:"name"`
	Password string `json:"password"`
	Role string `json:"role"`
	Country string `json:"country"`
}