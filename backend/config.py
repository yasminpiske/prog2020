from flask import Flask
from flask import jsonify
from flask import request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from os import path, remove


app = Flask(__name__)
CORS(app)
caminho = path.dirname(path.abspath(__file__))
banco_dados = path.join(caminho,'competicoes.db')
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///" + banco_dados
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)