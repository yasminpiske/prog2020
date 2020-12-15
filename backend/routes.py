from config import *
from models import Competicao, Atleta, Equipe

@app.route("/")
def main():
    return "sou foda, se liga nas minhas competições!" +\
        '<a href="/index_competicoes"> Clique para ver</a>'

@app.route("/index/<string:classe>")
def index_classe(classe):
    dados = None

    if classe == "Competicao":
        dados = db.session.query(Competicao).all()
    elif classe == "Atleta":
        dados = db.session.query(Atleta).all()
    elif classe == "Equipe":
        dados = db.session.query(Equipe).all()

    lista_json = [ dado.json() for dado in dados ]
    resposta = jsonify(lista_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/index_competicoes")
def index_competicoes():
    competicoes = db.session.query(Competicao).all()
    json_competicoes = [ competicao.json() for competicao in competicoes ]
    resposta = jsonify(json_competicoes)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/adicionar_competicao", methods=["post"])
def adicionar_competicao():
    resposta = jsonify({ "resultado":"ok", "detalhes":"ok" })
    dados = request.get_json()

    try:
        nova_competicao = Competicao(**dados)
        db.session.add(nova_competicao)
        db.session.commit()
    except Exception as e:
        resposta = jsonify({ "resultado":"erro", "detalhes":str(e) })

    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/excluir_competicao/<int:competicao_id>", methods=["delete"])
def excluir_competicao(competicao_id):
    resposta = jsonify({ "resultado":"ok", "detalhes":"ok" })

    try:
        Competicao.query.filter(Competicao.id == competicao_id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({ "resultado":"erro", "detalhes":str(e) })

    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta