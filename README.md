CarCheck - Sistema de Gestão para Serviços Mecânicos
Descrição
CarCheck é uma aplicação desenvolvida com Next.js e TypeScript para gerenciar serviços de mecânica automotiva. O sistema permite ao usuário visualizar e gerenciar serviços em andamento, registrar detalhes do veículo, histórico de serviços e status de cada atividade. Com foco em usabilidade e suporte multiplataforma, o CarCheck oferece uma interface intuitiva e moderna para mecânicos e administradores de oficinas.

Funcionalidades
Gestão de Serviços em Andamento: Visualização e gerenciamento de serviços em andamento, com possibilidade de concluir ou adicionar novos serviços.
Visualização de Detalhes: Cada serviço permite o acesso a detalhes como código do serviço, data, hora, veículo e laudo.
Histórico de Serviços: Os serviços concluídos são movidos para o histórico e salvos no localStorage para consulta futura.
Sistema de Redirecionamento: A navegação entre as páginas de serviços em andamento e concluídos é feita de forma dinâmica com uso de roteamento Next.js.
Suporte Multiplataforma: Otimizado para desktops e dispositivos móveis.
Tecnologias Utilizadas
Next.js: Framework React para renderização do lado do cliente e servidor, proporcionando uma aplicação rápida e otimizada.
React: Biblioteca JavaScript para construção de interfaces de usuário dinâmicas.
TypeScript: Suporte a tipagem estática para maior segurança e consistência no código.
CSS Modules: Modularização de estilos CSS para garantir um encapsulamento dos componentes.
React Icons: Biblioteca de ícones para facilitar o design e usabilidade da aplicação.
Estrutura do Projeto
components/: Componentes reutilizáveis, como o cabeçalho.
assets/: Arquivos de estilos (CSS) e imagens.
pages/: Páginas principais do projeto, como /mecanico e /servicosconcluido.
public/: Arquivos públicos, como ícones e logos.
Instalação
Para instalar o projeto localmente:

Clone o repositório:
bash
Copiar código
git clone https://github.com/seu-usuario/CarCheck.git
Navegue até o diretório do projeto:
bash
Copiar código
cd CarCheck
Instale as dependências:
bash
Copiar código
npm install
Uso
Inicie o servidor de desenvolvimento:
bash
Copiar código
npm run dev
Abra http://localhost:3000 no navegador para ver a aplicação.
Scripts Disponíveis
npm run dev: Inicia o servidor de desenvolvimento.
npm run build: Compila o projeto para produção.
npm run start: Inicia o servidor com o build de produção.
npm run lint: Executa o linter para verificar problemas no código.


Próximas Funcionalidades
Sistema de Recompensas por Fidelidade: Oferecer descontos e benefícios para clientes frequentes.
Notificações em Tempo Real: Acompanhamento em tempo real dos serviços para mecânicos e clientes.
Integração com Plataforma de Pagamentos: Opção para pagamento e faturamento dos serviços diretamente no sistema.
Contribuição
Para contribuir com este projeto:

Crie um fork do repositório.
Crie uma nova branch:
bash
Copiar código
git checkout -b sua-branch
Faça as alterações e faça o commit:
bash
Copiar código
git commit -m "Descrição das alterações"
Envie para o repositório original:
bash
Copiar código
git push origin sua-branch
Abra um Pull Request.
