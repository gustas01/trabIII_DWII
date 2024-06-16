# Trabalho de desenvolvimento Web II 

 ## Como executar a aplicação
 ### OBS: O frontend já está configurado para mandar as requisições para o backend que está executando em nuvem, porém ele está rodando no plano grátis em que a aplicação fica em modo de hibernação depois de meia-hora sem receber requisições. Então para rodar o projeto, basta executar o frontend, mandar uma requisição e esperar 50 segundos para a aplicação "acordar". Após esse tempo, basta fazer as requisições normalmente. Então não é necessário executar o backend, mas caso queira subir localmente, abaixo as instruções. O código do backend local e do que está em nuvem é exatamente o mesmo. <br> <br>
 
 ## Como executar o backend localmente
 1º passo - abra o terminal na pasta 'backend' e execute o comando `npm i` para instalar as dependências. <br>
 2º passo - crie um arquivo `.env` na raiz do backend, copie as chaves abaixo e preencha os campos
 ```
SERVER_PORT=

DB_URL=

TOKEN_SECRET=
```
3º passo - Em todos os arquivos JS, substitua `https://trabiii-dwii.onrender.com``por `http://localhost:3001`, supondo que `3001 seja a porta selecionada no arquivo `.env` do passo anterior, caso seja outra, coloque esse outra.`
4º passo - execute a aplicação com o comando `npm run dev`

<br><br>

 ## Como executar o frontend
 1º passo - Instale no VSCode a extensão `Live Server`. <br>
 2º passo - Abra a pasta do frontend no VSCode. <br>
 3º passo - Cliquei em `Go Live` no canto inferior esquerdo do VSCode. <br>
 ![image](https://github.com/gustas01/trabIII_DWII/assets/50846424/1941749e-a0e2-43c8-a507-1887e6643ab4)
