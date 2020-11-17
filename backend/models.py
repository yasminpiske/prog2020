from config import *


class Competicao(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cidade = db.Column(db.String(254))
    uf = db.Column(db.String(2))
    ano = db.Column(db.Integer)


    def __str__(self):
        return f"[{self.id}] {self.cidade}; {self.uf}; {self.ano}."


    def json(self):
        return{
            "id": self.id,
            "cidade": self.cidade,
            "uf": self.uf,
            "ano": self.ano
        }


class Equipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    endereco = db.Column(db.String(254))
    tecnico = db.Column(db.String(254))

    competicao_id = db.Column(db.Integer, db.ForeignKey(Competicao.id), nullable=False)
    competicao = db.relationship("Competicao")


    def __str__(self):
        return f"[{self.id}] {self.nome}; {self.endereco}; {self.tecnico}; {self.competicao}."


    def json(self):
        return{
            "id": self.id,
            "nome": self.nome,
            "endereco": self.endereco,
            "tecnico": self.tecnico,
            "competicao_id": self.competicao_id,
            "competicao": self.competicao
        }


class Atleta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cpf = db.Column(db.String(14))
    nome = db.Column(db.String(254))
    endereco = db.Column(db.String(254))
    sexo = db.Column(db.String(128))
    colocacao = db.Column(db.Integer)

    equipe_id = db.Column(db.Integer, db.ForeignKey(Equipe.id), nullable=False)
    equipe = db.relationship("Equipe")


    def __str__(self):
        return f"[{self.id}] {self.cpf}; {self.nome} {self.endereco}; {self.sexo}; {self.colocacao}; {self.equipe}."


    def json(self):
        return{
            "id": self.id,
            "cpf": self.cpf,
            "nome": self.nome,
            "endereco": self.endereco,
            "sexo": self.sexo,
            "colocacao": self.colocacao,
            "equipe_id": self.equipe_id,
            "equipe": self.equipe
        }


if __name__ == "__main__":
    if path.exists(banco_dados):
        remove(banco_dados)

    db.create_all()

    c1 = Competicao(cidade="Blumenau", uf="SC", ano=2020)
    db.session.add(c1)

    e1 = Equipe(nome="Associação Pomerodense de Atletismo",
                endereco="Rua Morro Strassmann, 1.140",
                tecnico="Odair", competicao=c1)
    db.session.add(e1)

    a1 = Atleta(cpf="333.333.333-22", nome="Yasmin J. Piske",
                endereco="Rua Hermann Schwanke, 1",
                sexo="Feminino", colocacao=1 ,equipe=e1)
    db.session.add(a1)

    db.session.commit()

    print(c1)
    print(c1.json())
    print('\n')
    print(e1)
    print(e1.json())
    print('\n')
    print(a1)
    print(a1.json())