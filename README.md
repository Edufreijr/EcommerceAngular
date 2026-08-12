# EdHardwareShop

## O que é o projeto?
Este projeto trata-se de um e-commerce de produtos de hardware e tecnologia desenvolvido utilizando o Angular.

É Simulado uma loja virtual onde o usuário pode visualizar protudos, pesquisar itens, consultar itens e detalhes,
adicionar produtos ao carrinho, realizar cadastro e finalizar uma compra.

Além disso foi desenvolvido um painel administrativo, onde é possível gerenciar os produtos cadastrados na loja.

## Ferramentas utilizadas

### Front-end

- Angular
- TypeScript
- HTML5
- CSS3

## Competências utilizadas

Durante o desenvolvimento do projeto foram aplicadas diversas competências relacionadas ao desenvolvimento front-end.

### Componentização

O sistema foi dividido em componentes independentes, facilitando a organização e manutenção do código.

Entre eles estão:

- Header
- Banner
- Footer
- Product Card
- Login
- Carrinho
- Detalhes do Produto
- Administração

### TypeScript

Foi utilizado TypeScript para criação de interfaces, classes, serviços, tipagem dos produtos e gerenciamento das regras da aplicação.

Um exemplo é a interface `Product`, responsável por definir a estrutura dos produtos:

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  visible: boolean;
}.

## Como usar 
### O usuário pode:

-Visualizar os produtos disponíveis
-Pesquisar produtos
-Filtrar produtos pela pesquisa
-Visualizar detalhes de um produto
-Ver preço e estoque
-Adicionar produtos ao carrinho
-Carrinho

### O carrinho permite:

-Adicionar produtos
-Aumentar a quantidade
-Diminuir a quantidade
-Remover produtos
-Visualizar o total da compra
-Continuar comprando
-Finalizar a compra

### Login

O sistema possui uma tela de login com opção de acesso como:

-Cliente
-Administrador

O acesso como administrador direciona para o painel administrativo.

### Painel Administrativo

O administrador pode:

-Visualizar a quantidade de produtos
-Visualizar a quantidade de produtos disponíveis
-Visualizar o estoque total
-Identificar produtos sem estoque
-Visualizar os produtos cadastrados
-Ocultar produtos
-Tornar produtos visíveis
-Remover produtos
-Adicionar novos produtos

## Como Logar Como admin

Existe um login de admin cadastrado no Sistema.

usuario: admin@email.com
senha: 1234


