
# Pageturner

 ## Índice 
 * [Objetivo](#objetivo) 
 * [Escopo](#escopo) 
 * [Contexto](#contexto) 
 * [Restrições](#restrições) 
 * [Trade-offs](#trade-offs) 
 * [C4 Model](#c4-model)
 * [Requisitos e casos de uso](#requisitos-e-casos-de-uso)
 * [Modelagem](#modelagem) 
 * [Instalação](/docs/installation.md) 
 * [Stacks](/docs/stacks.md) 


## Objetivo 

O objetivo principal é criar um site para organização de leitura utilizando o acervo de livros da API pública do Google, que fornece uma gama de livros e com todas as informações necessárias. Sendo desenvolvido em React, Next e Ruby on Rails, qualquer usuário que tenha acesso a internet, independente da plataforma, e que possa utilizar um website terá como utilizar.

O foco do website é auxiliar o usuário a organizar suas leituras independentemente da maneira que foi lido, sendo em um PDF, áudio-book, Kindle ou até um livro físico. Com a utilização da API pública do Google fornecendo os dados dos livros, o usuário poderá pesquisar o livro que deseja e cadastrá-lo na categoria que desejar, sendo elas: Já lido, Lendo e Pretendo ler. Além disso, ele poderá dar uma nota a sua leitura e ainda escrever um review sobre. Caso a leitura ainda esteja em progresso, ele poderá inserir em qual página a sua leitura parou para então ver o seu progresso e ir atualizando-o com o tempo. Como todos esses dados serão salvos a partir do seu login com a conta do Google, o usuário poderá acessar em qualquer dispositivo estando logado na sua conta para visualizar suas informações ou até fazer atualizações.

  

## Escopo

  

**1. Coleta de dados:**

- Será coletado dados dos livros a partir da Google Books API e também dados básicos do usuário a partir do cadastro pelo Google.

  

**2. Pré-processamento e Análise:**

- Ao receber os dados da API do Google Books, eles serão processados e limpos para que seja enviado para o front-end somente o que será utilizado.

  

**3. Design de Interface:**

- Criação de um layout no Figma de todas as telas do site de maneira responsiva e seguindo as boas práticas de User Experience e User Interface.

  

**4. Desenvolvimento:**

- Será desenvolvido as telas na parte do front-end em React, Typescript e Next, e para o back-end será desenvolvido a API em Ruby on Rails para que capture os dados da API pública do Google Books e que seja feito todas as funções necessárias para apresentar.

  

**5. Qualidade:**

- Implementação de testes unitários tanto no back-end quanto no front-end do projeto, tendo uma grande cobertura de testes para garantir o funcionamento do sistema. Além disso será implementado o SonarQube para garantir que o código esteja de boa qualidade.

  

**6. CI/CD:**

- Implementação de Continuous Integration e Continuous Delivery pela plataforma do Vercel e pelo próprio Github.

  

**7. Observabilidade:**

- Aplicação de softwares para monitoramento como o NewRelic.

  
  

## Contexto

O Pageturner é uma solução desenvolvida para fornecer uma melhora na organização de leituras de maneira intuitiva e podendo ser utilizado em qualquer dispositivo que tenha acesso a internet.

## Restrições

Custo para manter o sistema no ar caso tenha muitas requisições.

## Trade-offs

- **Portabilidade:**

Será mantido uma aparência uniforme em todos os dispositivos, garantindo uma experiência reconhecível, porém pode limitar a adaptação a diferentes tamanhos de tela.

- **Funcionalidade:**

O Sistema irá manter a interface e as funcionalidades simples e fáceis de usar, atraindo um público que valoriza a facilidade de navegação, mas pode não atender às necessidades de usuários que procuram recursos mais avançados.

- **Confiabilidade:**

Temos uma confiabilidade das informações dos livros a partir dos dados que a API do Google Books nos traz. Caso seja necessário comprovar que todos os dados estejam corretos, teria que utilizar mais de uma requisição que compare as informações, porém isso pode impactar na velocidade de resposta.

- **Usabilidade:**

O sistema foca em uma interface intuitiva e direta, atraindo uma ampla gama de usuários, mas pode limitar a personalização e a adaptação individual.

- **Eficiência:**

Terá como prioridade o carregamento rápido para que possa mostrar a página inicial o mais rápido possível, mas pode resultar em placeholders ou conteúdo faltando até que todos os recursos sejam carregados. É ótimo para causar uma boa primeira impressão, mas pode atrasar a exibição de informações completas.

- **Manutenibilidade:**

O sistema é considerado relativamente simples, o que pode aumentar o nível de manutenibilidade seria caso houvesse muitas requisições em um curto período de tempo, tendo que talvez começar a pagar algum serviço que sustente sem problemas.

## C4 Model

Os diagramas feitos de acordo com o modelo C4 de documentação podem ser encontrados [aqui.](/docs/c4-models.md)

## Requisitos e Casos de uso

Os requisitos funcionais, não funcionais e os casos de uso podem ser encontrados [aqui.](/docs/requirements-and-use-cases.md)

## Modelagem

A metodologia Scrum foi adotada com o auxílio da plataforma Jira. O Scrum dividiu o trabalho em sprints, ciclos de desenvolvimento, enquanto o Jira gerenciou tarefas, histórias de usuário e o progresso.