from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, EqualTo

class RegisterForm(FlaskForm):
    user_id = StringField("Enter your Username:", validators=[InputRequired()])
    password = PasswordField("Enter your Password:", validators=[InputRequired()])
    password2 = PasswordField("Confirm your Password:", validators=[InputRequired(), EqualTo("password")])
    submit = SubmitField("Submit")

class LoginForm(FlaskForm):
    user_id = StringField("Enter your Username:", validators=[InputRequired()])
    password = PasswordField("Enter your Password:", validators=[InputRequired()])
    submit = SubmitField("Submit")