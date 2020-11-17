$(function() { 
    
    function exibirCompeticoes() {
        $.ajax({
            url: 'http://localhost:5000/index_competicoes',
            method: 'GET',
            dataType: 'json', 
            success: listar, 
            error: function() {
                alert("erro ao ler dados, verifique o backend");
            }
        });
        function listar (competicoes) {
            $('#corpoTabelaCompeticoes').empty();
            mostrarConteudo("tabelaCompeticoes");     
            for (var i in competicoes) { 
                lin = `<tr id="linha_${competicoes[i].id}">
                <td> ${competicoes[i].cidade} </td>
                <td> ${competicoes[i].uf} </td>
                <td> ${competicoes[i].ano} </td>
                <td> ${competicoes[i].colocacao} </td>
                <td>
                    <a href=# id="${competicoes[i].id}" class="excluir_competicao">
                        <p class"badge badge-danger">Excluir</p>
                    </a>
                </td>
                </tr>`;
                $('#corpoTabelaCompeticoes').append(lin);
            }
        }
    }

    function mostrarConteudo(identificador) {
        $("#tabelaCompeticoes").addClass('invisible');
        $("#conteudoInicial").addClass('invisible');
        $("#"+identificador).removeClass('invisible');      
    }

    $(document).on("click", "#linkListarCompeticoes", function() {
        exibirCompeticoes();
    });
    
    $(document).on("click", "#linkInicio", function() {
        mostrarConteudo("conteudoInicial");
    });

    $(document).on("click", "#btAdicionarCompeticao", function() {
        cidade = $("#campoCidade").val();
        uf = $("#campoUF").val();
        ano = $("#campoAno").val();
        colocacao = $("#campoColocacao").val();
        var dados = JSON.stringify({ cidade: cidade, uf: uf, ano: ano, colocacao: colocacao });
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
                $("#campoColocacao").val("");
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoAdicionar (retorno) {
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });

    $('#modalAdicionarCompeticao').on('hide.bs.modal', function (e) {
        if (! $("#tabelaCompeticoes").hasClass('invisible')) {
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