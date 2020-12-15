$(function() {

    function exibirCompeticoes() {
        $.ajax({
            url: 'http://localhost:5000/index/Competicao',
            method: 'GET',
            dataType: 'json',
            success: listar,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function listar(competicoes) {
            $('#corpoTabelaCompeticoes').empty();
            mostrarConteudo("competicoes");
            for (var i in competicoes) {
                lin = `<tr id="linha_${competicoes[i].id}">
                <td> ${competicoes[i].cidade} </td>
                <td> ${competicoes[i].uf} </td>
                <td> ${competicoes[i].ano} </td>
                <td>
                    <a href=# id="${competicoes[i].id}" class="excluir_competicao">
                        <button type="button" class="btn btn-danger">Excluir</button>
                    </a>
                </td>
                </tr>`;
                $('#corpoTabelaCompeticoes').append(lin);
            }
        }
    }

    function exibirEquipe() {
        $.ajax({
            url: 'http://localhost:5000/index/Equipe',
            method: 'GET',
            dataType: 'json',
            success: listar,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function listar(equipes) {
            $('#corpoTabelaEquipe').empty();
            mostrarConteudo("equipes");
            for (var i in equipes) {
                lin = `<tr id="linha_${equipes[i].id}">
                <td> ${equipes[i].nome} </td>
                <td> ${equipes[i].endereco} </td>
                <td> ${equipes[i].tecnico} </td>
                <td> ${equipes[i].competicao.cidade} </td>
                <td> ${equipes[i].competicao.uf} </td>
                <td> ${equipes[i].competicao.ano} </td>
                </tr>`;
                $('#corpoTabelaEquipes').append(lin);
            }
        }
    }

    function exibirAtleta() {
        $.ajax({
            url: 'http://localhost:5000/index/Atleta',
            method: 'GET',
            dataType: 'json',
            success: listar,
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });

        function listar(atletas) {
            $('#corpoTabelaAtletas').empty();
            mostrarConteudo("atletas");
            for (var i in atletas) {
                lin = `<tr id="linha_${atletas[i].id}">
                <td> ${atletas[i].cpf} </td>
                <td> ${atletas[i].nome} </td>
                <td> ${atletas[i].endereco} </td>
                <td> ${atletas[i].sexo} </td>
                <td> ${atletas[i].colocacao} </td>
                <td> ${atletas[i].equipe.nome} </td>
                <td> ${atletas[i].equipe.endereco} </td>
                <td> ${atletas[i].equipe.tecnico} </td>
                <td> ${atletas[i].competicao.cidade} </td>
                <td> ${atletas[i].competicao.uf} </td>
                <td> ${atletas[i].competicao.ano} </td>
                </tr>`;
                $('#corpoTabelaAtletas').append(lin);
            }
        }
    }

    function mostrarConteudo(identificador) {
        $("#competicoes").addClass('d-none');
        $("#equipes").addClass('d-none');
        $("#atletas").addClass('d-none');
        $("#conteudoInicial").addClass('d-none');
        $("#"+identificador).removeClass('d-none');
    }

    $(document).on("click", "#linkListarCompeticoes", function() {
        exibirCompeticoes();
    });

    $(document).on("click", "#linkListarEquipes", function() {
        exibirEquipe();
    });

    $(document).on("click", "#linkListarAtletas", function() {
        exibirAtleta();
    });

    $(document).on("click", "#linkInicio", function() {
        mostrarConteudo("conteudoInicial");
    });

    $(document).on("click", "#btAdicionarCompeticao", function() {
        cidade = $("#campoCidade").val();
        uf = $("#campoUF").val();
        ano = $("#campoAno").val();
        var dados = JSON.stringify({ cidade: cidade, uf: uf, ano: ano });
        $.ajax({
            url: 'http://localhost:5000/adicionar_competicao',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: dados,
            success: competicaoAdicionada,
            error: erroAoAdicionar
        });
        function competicaoAdicionada (retorno) {
            if (retorno.resultado == "ok") {
                alert("Competição adicionada com sucesso!");
                $("#campoCidade").val("");
                $("#campoUF").val("");
                $("#campoAno").val("");
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }
        }
        function erroAoAdicionar (retorno) {
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });

    $('#modalAdicionarCompeticao').on('hide.bs.modal', function (e) {
        if (! $("#tabelaCompeticoes").hasClass('d-none')) {
            exibirCompeticoes();
        }
    });

    $(document).on("click", ".excluir_competicao", function() {
        var idCompeticao = $(this).attr("id");

        $.ajax({
          url: `http://localhost:5000/excluir_competicao/${idCompeticao}`,
          type: "DELETE",
          dataType: 'json',
          success: excluirCompeticao,
          error: erroAoExcluir
        });

        function excluirCompeticao(retorno) {
          if (retorno.resultado === "ok") {
            $(`#linha_${idCompeticao}`).fadeOut(500, () => {
                alert("Competição excluida!")
            });
          } else {
            alert(`ERROR: ${retorno.resultado}: ${retorno.detalhes}`);
          }
        }

        function erroAoExcluir(retorno) {
          alert("Erro: Procurar na rota");
        }
      });

    mostrarConteudo("conteudoInicial");
});