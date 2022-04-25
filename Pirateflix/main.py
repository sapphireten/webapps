import psycopg2.extras
from flask import Flask, request, render_template, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
import util
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123456789@localhost/movieslist'
db = SQLAlchemy(app)


class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True)
    image = db.Column(db.String(80), unique=True)
    desc = db.Column(db.String(200))
    rating = db.Column(db.String(80))
    genre = db.Column(db.String(120))
    year = db.Column(db.String(80))

    def __init__(self, name, image, desc, rating, genre, year):
        self.name = name
        self.image = image
        self.desc = desc
        self.rating = rating
        self.genre = genre
        self.year = year

    def __repr__(self):
        return '<Movie %r' % self.name


@app.route("/")
def index():
    # this is our index page
    myMov = Movie.query.all()
    soloMovie = Movie.query.filter_by(name="/static/img/chew.jpg").first()
    return render_template('index.html', myMov=myMov, soloMovie=soloMovie)


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/list')
def table():
    movies = Movie.query.all()
    return render_template('list.html', movies=movies)


@app.route('/post_movie', methods=['POST'])
def post_movie():
    movie = Movie(request.form['name'], request.form['image'], request.form['desc'], request.form['rating'], request.form['genre'], request.form['year'])
    db.session.add(movie)
    db.session.commit()
    return redirect(url_for('index'))


@app.route('/remove_movie/<int:id>')
def remove_movie(id):
    deleteMovie = Movie.query.get_or_404(id)

    try:
        db.session.delete(deleteMovie)
        db.session.commit()
        return redirect('/')
    except:
        return "There was a problem deleting that entry."


if __name__ == '__main__':
    app.debug = True
    ip = '127.0.0.1'
    app.run(host=ip)
