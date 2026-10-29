# Vorcaro Pizza — Frontend

Painel web para gerenciamento de uma pizzaria. A aplicação permite autenticar usuários e administrar categorias, produtos e pedidos em produção por meio da API do backend.

> Este projeto foi desenvolvido com acompanhamento para meu treino em desenvolvimento web, servindo como prática de React, Next.js, TypeScript, autenticação, consumo de API e construção de interfaces responsivas.

## Funcionalidades

### Acesso e usuários

- Cadastro de novos usuários.
- Login com email e senha.
- Persistência da sessão em cookie HTTP-only com validade de 30 dias.
- Logout.
- Redirecionamento de usuários já autenticados para o painel.
- Controle de acesso: somente usuários com perfil `ADMIN` acessam o painel administrativo.
- Tela de acesso negado para usuários sem permissão.

### Painel administrativo

- Layout responsivo com menu lateral para desktop.
- Menu em `Sheet` para dispositivos móveis.
- Identificação do usuário autenticado no menu.
- Navegação entre pedidos, produtos e categorias.

### Pedidos

- Listagem de pedidos enviados para produção.
- Filtro visual de pedidos ainda não finalizados.
- Atualização manual da lista de pedidos.
- Exibição de mesa, itens, quantidades e total.
- Modal com detalhes completos do pedido.
- Finalização de pedido com atualização dos dados exibidos.
- Estados de carregamento e mensagens de erro.

### Categorias

- Listagem de categorias cadastradas.
- Criação de novas categorias.
- Atualização da tela após o cadastro.

### Produtos

- Listagem de produtos ativos com nome, imagem, categoria, descrição e preço.
- Cadastro de produto com nome, preço, descrição, categoria e imagem.
- Formatação de preço em Real brasileiro.
- Preview da imagem antes do envio.
- Validação de formato (`JPG`, `JPEG` ou `PNG`) e tamanho máximo de 4 MB.
- Exclusão/arquivamento de produtos.
- Atualização da tela após alterações.

## Tecnologias

- [Next.js](https://nextjs.org/) 16 com App Router.
- React 19.
- TypeScript em modo estrito.
- Tailwind CSS 4.
- Base UI e componentes inspirados no shadcn/ui.
- Lucide React para ícones.
- API HTTP do backend com autenticação Bearer.

## Pré-requisitos

- Node.js compatível com Next.js 16.
- npm.
- Backend da pizzaria em execução.

## Instalação

```bash
npm install
```

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

O arquivo `.env` não deve ser commitado. Ajuste a URL conforme o ambiente do backend.

## Comandos

```bash
# Desenvolvimento
npm run dev

# Verificação e build de produção
npm run build

# Executar o build de produção
npm run start
```

Depois de iniciar o modo de desenvolvimento, acesse <http://localhost:3000>.

## Rotas da aplicação

| Rota | Descrição | Acesso |
| --- | --- | --- |
| `/` | Redireciona para o login | Público |
| `/login` | Autenticação | Público |
| `/register` | Cadastro de usuário | Público |
| `/acess-denied` | Aviso de acesso não autorizado | Público |
| `/dashboard` | Pedidos em produção | Administrador |
| `/dashboard/products` | Gerenciamento de produtos | Administrador |
| `/dashboard/categories` | Gerenciamento de categorias | Administrador |

## Integração com o backend

O cliente HTTP centralizado está em [`src/lib/api.ts`](./src/lib/api.ts). As ações do servidor ficam em [`src/actions/`](./src/actions/) e usam o cookie de sessão para enviar o token ao backend.

Os endpoints esperados, exemplos de payloads e respostas estão documentados em [`endpoint.md`](./endpoint.md), que é mantido apenas como documentação interna e não é incluído no Git por configuração do projeto.

Principais operações utilizadas pelo frontend:

- `POST /users` e `POST /session` para cadastro e login.
- `GET /me` para validar a sessão.
- `GET /category` e `POST /category` para categorias.
- `GET /products`, `POST /product` e `DELETE /product` para produtos.
- `GET /orders`, `GET /order/detail` e `PUT /order/finish` para pedidos.

## Estrutura principal

```text
src/
├── actions/       # Server Actions para autenticação e operações do painel
├── app/           # Rotas, layouts e estilos globais do App Router
├── components/    # Formulários, painel, modais e componentes de interface
└── lib/           # Cliente HTTP, autenticação, tipos, utilitários e formatação
```

## Observações para evolução

- O frontend depende da disponibilidade e do contrato da API do backend.
- As permissões de administrador também devem ser validadas no backend; a proteção do frontend não substitui autorização no servidor.
- Recomenda-se adicionar testes automatizados para ações, autenticação e fluxos de pedidos antes de ampliar o painel.
- Em produção, use HTTPS para que o cookie seguro e a comunicação com a API sejam protegidos.
