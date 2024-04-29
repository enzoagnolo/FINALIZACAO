google.charts.load('current', {'packages':['corechart', 'table']});
google.charts.setOnLoadCallback(drawChart);

function calcular() {
    var investimento = parseFloat(document.getElementById('investimento').value);
    var precoCompra = parseFloat(document.getElementById('precoCompra').value);
    var precoAtual = parseFloat(document.getElementById('precoAtual').value);
    var dataCompra = new Date(document.getElementById('dataCompra').value);
    var dataAtual = new Date();

    var diasPassados = Math.floor((dataAtual - dataCompra) / (1000 * 60 * 60 * 24));
    var ganhoPerda = (precoAtual - precoCompra) * investimento / precoCompra;
    var mensagem = '';
    if (ganhoPerda > 0) {
        mensagem = "Você ganhou R$" + ganhoPerda.toFixed(2);
        document.getElementById('chart_div').style.border = "2px solid green";
    } else if (ganhoPerda < 0) {
        mensagem = "Você perdeu R$" + Math.abs(ganhoPerda).toFixed(2);
        document.getElementById('chart_div').style.border = "2px solid red";
    } else {
        mensagem = "Você não ganhou nem perdeu dinheiro";
        document.getElementById('chart_div').style.border = "none";
    }

    mensagem += " em " + diasPassados + " dias.";

    document.getElementById('resultado').innerHTML = mensagem;

    // Criar e atualizar o gráfico e a tabela
    drawChart(precoCompra, precoAtual, diasPassados, ganhoPerda);
}

function drawChart(precoCompra, precoAtual, diasPassados, ganhoPerda) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Dias');
    data.addColumn('number', 'Valor do Bitcoin');

    var valorBitcoin = precoCompra;
    for (var i = 0; i <= diasPassados; i++) {
        data.addRow([i.toString(), valorBitcoin]);
        valorBitcoin += (precoAtual - precoCompra) / diasPassados;
    }

    var options = {
        title: 'Ganhos/Perdas com Bitcoin ao longo do tempo',
        curveType: 'function',
        legend: { position: 'bottom' },
        colors: [ganhoPerda > 0 ? 'green' : 'red'],
        hAxis: {
            title: 'Dias',
            titleTextStyle: { bold: true, fontSize: 14, color: '#fff' }
        },
        vAxis: {
            title: 'Valor do Bitcoin (R$)',
            titleTextStyle: { bold: true, fontSize: 14, color: '#fff' }
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);

    // Criar a tabela ao lado do gráfico
    var tabelaData = new google.visualization.DataTable();
    tabelaData.addColumn('string', 'Descrição');
    tabelaData.addColumn('string', 'Valor');

    tabelaData.addRow(['Ganho/Perda', ganhoPerda.toFixed(2)]);
    tabelaData.addRow(['Dias', diasPassados]);

    var tabelaOptions = {
        width: '100%',
        height: '100%',
        cssClassNames: {
            headerRow: 'tabelaHeaderRow',
            tableRow: 'tabelaRow',
            headerCell: 'tabelaHeaderCell',
            tableCell: 'tabelaCell'
        }
    };

    var tabela = new google.visualization.Table(document.getElementById('tabela_div'));
    tabela.draw(tabelaData, tabelaOptions);
}
