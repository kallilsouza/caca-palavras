function gerarCacaPalavras(){
    let dificuldade = 1;
    let textarea = document.getElementById("entrada-textarea");
    let texto = textarea.value;
    let palavras = texto.toUpperCase().split('\n');
    let matriz = gerarMatrizAleatoria(16, 20);    
    let matrizesComPalavras = inserirPalavrasNaMatriz(palavras, matriz, dificuldade);
    preencheCacaPalavras(matrizesComPalavras[0]);
    preencheCacaPalavrasSegredo(matrizesComPalavras[0], matrizesComPalavras[1]);
    exibePalavras(palavras);
    exibeCheckboxMostrarSegredo();
}

let textarea = document.getElementById("entrada-textarea");
textarea.addEventListener("input", function(){
    let texto = this.value;
    this.value = limitarPalavras(texto);
})

function limitarPalavras(texto){
    texto = texto.replace(" ", "");
    let linhas = texto.split('\n');
    let linhaVazia = linhas.indexOf('');
    if(linhaVazia >= 0 && linhaVazia != linhas.length-1){
        linhas.pop();
    }
    for(i = 0; i < linhas.length; i++){
        linhas[i] = linhas[i].slice(0,12);
    }
    texto = linhas.slice(0,10).join('\n');
    return texto;
}

function gerarMatrizAleatoria(altura, largura){
    let alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    let matriz = [];
    for(i = 0; i < altura; i++){
        let linha = [];
        for(p = 0; p < largura; p++){
            letra = alfabeto[Math.floor(Math.random() * 25)];
            linha.push(letra);
        }
        matriz.push(linha);
    }
    return matriz;
}

function inserirPalavrasNaMatriz(palavras, matriz, dificuldade){
    let altura = matriz.length;
    let largura = matriz[0].length;
    let novaMatriz = matriz;
    let matrizCasasUsadas = [];
    for(i = 0; i < altura; i++){
        let linha = [];
        for(c = 0; c < largura; c++){
            linha.push(" ");
        }
        matrizCasasUsadas.push(linha);
    }
    for(c = 0; c < palavras.length; c++){
        let palavra = palavras[c];        
        let tamanho = palavra.length;
        if(tamanho === 0){
            console.log("Erro: palavra vazia");
            return;
        }
        let posicao = -1;
        if(dificuldade === 1){
            posicao = Math.floor(Math.random() * 2);
        }
        else{
            posicao = Math.floor(Math.random() * 3);
        }
        let posicaoOriginal = posicao;
        let erro = false;
        while(true){
            if(posicao === 0/* horizontal */){
                if(tamanho > largura){
                    if(posicaoOriginal === 1){
                        console.log("Erro: palavra não cabe na matriz");
                        erro = true;
                        break;
                    }
                    else{
                        posicao = 1; // vertical
                        continue;
                    }                    
                }
                else{
                    let tentativas = 500000;
                    let linha = null;
                    let coluna = null;
                    while(tentativas){
                        linha = Math.floor(Math.random() * altura);
                        coluna = Math.floor(Math.random() * (largura%(largura-tamanho)));  
                        let recomecar = false;            
                        for(i = coluna, p = 0; i < tamanho, p < tamanho; i++, p++){
                            if(matrizCasasUsadas[linha][i] !== " "){
                                recomecar = true;
                                break;
                            }
                        }
                        if(!recomecar){
                            break;
                        }
                        tentativas--;   
                    }
                    if(tentativas == 0){
                        console.log("número máximo de tentativas excedido");
                        alert("Erro");
                    }  
                    for(i = coluna, p = 0; i < tamanho, p < tamanho; i++, p++){
                        matrizCasasUsadas[linha][i] = palavra[p];
                        novaMatriz[linha][i] = palavra[p];
                    }
                    break;
                }                
            }
            if(posicao === 1/* vertical */){
                if(tamanho > altura){
                    if(posicaoOriginal === 0){
                        console.log("Erro: palavra não cabe na matriz");
                        erro = true;
                        break;
                    }
                    else{
                        posicao = 0;
                        continue;
                    }
                }
                else{
                    let tentativas = 500000;
                    let linha = null;
                    let coluna = null;
                    while(tentativas){
                        linha = Math.floor(Math.random() * (altura%(altura-tamanho)));
                        coluna = Math.floor(Math.random() * largura);
                        let recomecar = false;               
                        for(i = linha, p = 0; i < tamanho, p < tamanho; i++, p++){
                            if(matrizCasasUsadas[i][coluna] !== " "){
                                recomecar = true;
                                break;
                            }
                        }                        
                        if(!recomecar){
                            break;
                        }
                        tentativas--;   
                    }
                    if(tentativas == 0){
                        console.log("número máximo de tentativas excedido");
                        alert("Erro");
                    }  
                    for(i = linha, p = 0; i < tamanho, p < tamanho; i++, p++){
                        matrizCasasUsadas[i][coluna] = palavra[p];
                        novaMatriz[i][coluna] = palavra[p];
                    }
                    break;
                }
            }
        }    
        if(erro){
            break;
        }
    }
    return [novaMatriz, matrizCasasUsadas];
}

function preencheCacaPalavras(matriz){
    let cacaPalavrasDiv = document.getElementById("caca-palavras");
    cacaPalavrasDiv.className = "caca-palavras-visivel";
    let texto = "";
    matriz.forEach(linha => {
        txt = "";
        linha.forEach(letra => {
            txt += "<span class=\"letra\">"+letra+"</span>";
        });
        texto += txt+"<br />";
    });
    cacaPalavrasDiv.innerHTML = texto;
    let entrada = document.getElementById("entrada");
    entrada.className = "entrada-escondida";
}

function preencheCacaPalavrasSegredo(matriz, matrizSegredo){
    let cacaPalavrasSegredoDiv = document.getElementById("caca-palavras-segredo");
    let texto = "";
    for(i = 0; i < matriz.length; i++){
        txt = "";
        for(c = 0; c < matriz[0].length; c++){
            if(matrizSegredo[i][c] == " "){
                txt += "<span class=\"letra\">"+matriz[i][c]+"</span>";
            }
            else{
                txt += "<span class=\"letra-destaque\">"+matrizSegredo[i][c]+"</span>"
            }            
        }
        texto += txt+"<br />";
    }
    cacaPalavrasSegredoDiv.innerHTML = texto;
}

function exibePalavras(palavras){
    let palavrasDiv = document.getElementById("palavras");
    let texto = "";
    palavras.forEach(palavra => {
        texto += "<div class=\"palavra\">"+palavra+"</div>";
    });
    palavrasDiv.innerHTML = texto;
    palavrasDiv.className = 'palavras-visivel';
}

function exibeCheckboxMostrarSegredo(){
    let mostrarSegredo = document.getElementById('mostrar-segredo');
    mostrarSegredo.className = 'mostrar-segredo-visivel';
}

function exibeSegredo(){
    let segredo = document.getElementById('caca-palavras-segredo');
    let cacaPalavras = document.getElementById('caca-palavras');
    segredo.className = 'caca-palavras-segredo-visivel';
    cacaPalavras.className = 'caca-palavras-escondido';
}

function ocultaSegredo(){
    let segredo = document.getElementById('caca-palavras-segredo');
    let cacaPalavras = document.getElementById('caca-palavras');
    segredo.className = 'caca-palavras-segredo-escondido';
    cacaPalavras.className = 'caca-palavras-visivel';
}

function checarCheckbox(){
    let checkbox = document.getElementById('mostrar-segedo-checkbox');
    if(checkbox.checked){
        exibeSegredo();
    }
    else{
        ocultaSegredo();
    }
}