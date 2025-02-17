var enderecoContrato = "0x77f7a8540Cd5bDCfc1027D6c37A9Fabcb3877d4a";
var provedor = new ethers.providers.Web3Provider(web3.currentProvider);
ethereum.enable();
var signatario = provedor.getSigner();
var contrato = new ethers.Contract(enderecoContrato, abiContrato, signatario);

function registrarMudancaStatus() {
    var textoCampo = document.frmStatus.txtStatusPagamentoAluguel.value;
    var caixaStatusTx = document.getElementById("caixaStatusTx");
    if (textoCampo.length === 8) {
        caixaStatusTx.innerHTML = "Enviando transação...";
        contrato.mudaStatusPagamento(textoCampo)
        .then( (transacao) => {
            console.log("registrarMudancaStatus - Transacao ", transacao);   
            caixaStatusTx.innerHTML = "Transação enviada. Aguardando processamento...";
            transacao.wait()
            .then( (resultado) => {
                buscaStatusContrato();
                caixaStatusTx.innerHTML = "Transação realizada.";
            })       
            .catch( (err) => {
                console.error("registrarMudancaStatus - Aguardando tx ser minerada");
                console.error(err);
                caixaStatusTx.innerHTML = "Algo saiu errado: " + err.message;
            });
        })
        .catch( (err) => {
            console.error("registrarMudancaStatus");
            console.error(err);
            caixaStatusTx.innerHTML = "Algo saiu errado: " + err.message;
        });
    }
}

function registrarContratoEncerrado() {
    var caixaFimDoContratoTx = document.getElementById("caixaFimDoContratoTx");
    caixaFimDoContratoTx.innerHTML = "Enviando transação...";
    contrato.fimDoContrato()
    .then( (transacao) => {
        console.log("registrarContratoEncerrado - Transacao ", transacao);   
        caixaFimDoContratoTx.innerHTML = "Transação enviada. Aguardando processamento...";
        transacao.wait()
        .then( (resultado) => {
            buscaStatusContrato();
            caixaFimDoContratoTx.innerHTML = "Transação realizada.";
        })       
        .catch( (err) => {
            console.error("registrarContratoEncerrado - Aguardando tx ser minerada");
            console.error(err);
            caixaFimDoContratoTx.innerHTML = "Algo saiu errado: " + err.message;
        });
    })
    .catch( (err) => {
        console.error("registrarContratoEncerrado");
        console.error(err);
        caixaFimDoContratoTx.innerHTML = "Algo saiu errado: " + err.message;
    });
           
}
    

function buscaStatusContrato() {
    var status;
    var campoStatus = document.getElementById("campoStatus");     
    contrato.statusPagamentoAluguel()
    .then( (resultado) => {
        campoStatus.innerHTML = resultado;
    })
    .catch( (err) => {
        console.error(err);
        campoStatus.innerHTML = err;
    });

}