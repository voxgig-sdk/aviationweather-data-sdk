package core

type AviationweatherDataError struct {
	IsAviationweatherDataError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewAviationweatherDataError(code string, msg string, ctx *Context) *AviationweatherDataError {
	return &AviationweatherDataError{
		IsAviationweatherDataError: true,
		Sdk:              "AviationweatherData",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *AviationweatherDataError) Error() string {
	return e.Msg
}
