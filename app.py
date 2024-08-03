from flask import Flask, request, render_template, url_for, redirect, session, g
from flask_session import Session
from database import get_db, close_db
from forms import RegisterForm, LoginForm
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

app = Flask(__name__)
app.config["SECRET_KEY"] = ""
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.teardown_appcontext(close_db)
Session(app)


@app.before_request
def logged_in_user():
    g.user = session.get("user_id", None)

def login_required(view):
    """add at start of routes where users need to be logged in to access"""
    @wraps(view)
    def wrapped_view(*args, **kwargs):
        if g.user is None:
            return redirect(url_for("login", next=request.url))
        return view(*args, **kwargs)
    return wrapped_view

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/play")
@login_required
def play():
    return render_template("escape_the_tunnels.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    """register a user in the database"""
    form = RegisterForm()
    if form.validate_on_submit():
        #collect user data
        user_id = form.user_id.data
        password = form.password.data
        password2 = form.password2.data
        db = get_db()

        #if user already exists
        clashing_user = db.execute("""SELECT * FROM users
                                      WHERE user_id = ?;""", (user_id,)).fetchone()
        if clashing_user is not None:
            form.user_id.errors.append("Username already exists")
        else:
            db.execute("""INSERT INTO users (user_id, password)
                          VALUES (?, ?);""", (user_id, generate_password_hash(password)))
            db.commit()
            return redirect(url_for("login"))
    return render_template("register.html", form=form)

@app.route("/login", methods=["GET", "POST"])
def login():
    """log in a user that is already registered in database"""
    form = LoginForm()
    if form.validate_on_submit():
        user_id = form.user_id.data
        password = form.password.data
        db = get_db()

        #check if user exists
        user_check = db.execute("""SELECT * FROM users
                                    WHERE user_id = ?;""", (user_id,)).fetchone()
        if user_check is None:
            form.user_id.errors.append("Username does not exist")

        #check if encrypted password doesn't match entered password associated with username
        elif not check_password_hash(user_check["password"], password):
            form.password.errors.append("Incorrect Password.")
        else:
            session.clear()
            session["user_id"] = user_id

            #return to previous page if there was one
            next_page = request.args.get("next")

            #otherwise return to homepage
            if not next_page:
                next_page = url_for("index")
            return redirect(next_page)
    return render_template("login.html", form=form)
            
@app.route("/logout")
def logout():
    """log a user out of their account and clear their session"""
    session.clear()
    return redirect(url_for("index"))

@app.route("/add_to_leaderboard", methods=["POST"])
def add_to_leaderboard():
    score = int(request.form["score"])
    db = get_db()
    db.execute("""INSERT INTO leaderboard (user_id, score)
                  VALUES (?, ?);""", (session["user_id"], score))
    db.commit()
    return redirect(url_for("leaderboard"))

@app.route("/leaderboard")
def leaderboard():
    db = get_db()
    leaders = db.execute("""SELECT * FROM leaderboard
                            WHERE score <= 100
                            ORDER BY score DESC;
                            """)

    return render_template("leaderboard.html", leaders=leaders)

@app.route("/how_to_play")
def how_to_play():
    return render_template("how_to_play.html")
