function gerarCacaPalavras(){
    let dificuldade = 1;
    let textarea = document.getElementById("entrada-textarea");
    let texto = textarea.value;
    let palavras = texto.toUpperCase().split('\n');
    let matriz = gerarMatrizAleatoria(12, 18);    
    let matrizComPalavras = inserirPalavrasNaMatriz(palavras, matriz, dificuldade);
    matrizComPalavras.forEach(linha => {
        txt = "";
        linha.forEach(letra => {
            txt += letra+" ";
        });
        console.log(txt);
    });
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
                    let linha = Math.floor(Math.random() * altura);
                    let coluna = Math.floor(Math.random() * (largura%(largura-tamanho)));
                    for(i = coluna, p = 0; i < tamanho, p < tamanho; i++, p++){
                        novaMatriz[linha][i] = palavra[p];
                    }
                    console.log("Palavra: "+palavra);
                    console.log("Linha: "+linha);
                    console.log("Coluna: "+coluna);
                    console.log("------------------");
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
                    console.log("VERTICAL")
                    let linha = Math.floor(Math.random() * (altura%(altura-tamanho)));
                    let coluna = Math.floor(Math.random() * largura);
                    for(i = linha, p = 0; i < tamanho, p < tamanho; i++, p++){
                        novaMatriz[i][coluna] = palavra[p];
                    }
                    console.log("Palavra: "+palavra);
                    console.log("Linha: "+linha);
                    console.log("Coluna: "+coluna);
                    console.log("------------------");
                    break;
                }
            }
        }    
        if(erro){
            break;
        }
    }
    return novaMatriz;
}

