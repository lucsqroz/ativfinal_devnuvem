document.getElementById('pontoColetaForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const rua = document.getElementById('rua').value;
    const cep = document.getElementById('cep').value;
    const bairro = document.getElementById('bairro').value;

    const response = await fetch('https://83b19784-dda7-4d9e-975e-7a93f3b82e1c-00-1ehewumuks9f3.spock.replit.dev/pontos-coleta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, rua, cep, bairro })
    });

    const pontoColeta = await response.json();
    adicionarPontoNaLista(pontoColeta);
});

async function carregarPontosColeta() {
    const response = await fetch('https://83b19784-dda7-4d9e-975e-7a93f3b82e1c-00-1ehewumuks9f3.spock.replit.dev/pontos-coleta');
    const pontosColeta = await response.json();

    pontosColeta.forEach(adicionarPontoNaLista);
}

function adicionarPontoNaLista(ponto) {
    const lista = document.getElementById('listaPontosColeta');
    const item = document.createElement('li');
    item.id = `ponto-${ponto.objectId}`;
    item.textContent = `${ponto.nome} - ${ponto.rua}, ${ponto.bairro} (CEP: ${ponto.cep}) `;
    const botaoDeletar = document.createElement('button');
    botaoDeletar.textContent = 'Deletar';
    botaoDeletar.onclick = () => deletarPontoColeta(ponto.objectId);
    item.appendChild(botaoDeletar);
    lista.appendChild(item);
}

async function deletarPontoColeta(id) {
    const response = await fetch(`https://83b19784-dda7-4d9e-975e-7a93f3b82e1c-00-1ehewumuks9f3.spock.replit.dev/pontos-coleta/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const item = document.getElementById(`ponto-${id}`);
        item.remove();
    } else {
        console.error('Erro ao deletar o ponto de coleta');
    }
}

carregarPontosColeta();


