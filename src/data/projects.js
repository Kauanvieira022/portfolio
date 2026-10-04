const projects = {
  en: {
    featuredId: "portfolio",
    items: [
      {
        id: "inventory-control",
        title: "Inventory Control System",
        status: "Desktop application",
        collaboration: "Team project",
        description:
          "A Windows desktop application for managing products, stock levels and inventory movements through a clear operational workflow.",
        highlights: [
          "Product registration, search and minimum-stock alerts",
          "Stock entries, withdrawals and movement history",
          "Dashboard with category charts and monthly filters",
          "Excel export, local database and Windows installer",
        ],
        tags: ["Python", "CustomTkinter", "SQLite", "Matplotlib", "Pandas"],
        source: "https://github.com/Kauanvieira022/essencial-by-dani-estoque",
      },
      {
        id: "portfolio",
        title: "Personal Portfolio",
        status: "Portfolio website",
        description:
          "A bilingual portfolio built as a maintainable product, bringing together my professional background, technical profile and selected projects.",
        challenge:
          "Present a multidisciplinary profile across software, data and business operations with clear, verifiable evidence.",
        solution:
          "A modular React experience with centralized content, responsive layouts, accessible navigation and automated deployment.",
        highlights: [
          "Reusable components and scoped CSS Modules",
          "Portuguese and English content with saved preference",
          "Responsive and keyboard-accessible navigation",
          "Automated production deployment through Vercel",
        ],
        tags: ["React", "Vite", "CSS Modules", "Framer Motion", "PixiJS"],
        source: "https://github.com/Kauanvieira022/portfolio",
        live: "https://portfolio-six-black-66.vercel.app/",
      },
      {
        id: "payroll-system",
        title: "Payroll System",
        status: "Academic application",
        collaboration: "Team project",
        description:
          "A command-line payroll simulation that connects employee records, benefits and financial calculations in a local database.",
        highlights: [
          "Employee and benefit registration with relational SQLite tables",
          "Object-oriented domain model and input validation",
          "INSS, IRRF, FGTS, vacation and net salary calculations",
          "Payslip generation and monthly company cost calculation",
        ],
        tags: ["Python", "SQLite", "OOP", "Business rules"],
        source: "https://github.com/Kauanvieira022/Folha-de-pagamento",
      },
    ],
  },
  pt: {
    featuredId: "portfolio",
    items: [
      {
        id: "inventory-control",
        title: "Sistema de Controle de Estoque",
        status: "Aplicação desktop",
        collaboration: "Projeto em equipe",
        description:
          "Aplicação desktop para Windows que organiza produtos, níveis de estoque e movimentações em um fluxo operacional simples.",
        highlights: [
          "Cadastro, busca e alertas de estoque mínimo",
          "Entradas, saídas e histórico de movimentações",
          "Dashboard com gráficos por categoria e filtros mensais",
          "Exportação Excel, banco local e instalador para Windows",
        ],
        tags: ["Python", "CustomTkinter", "SQLite", "Matplotlib", "Pandas"],
        source: "https://github.com/Kauanvieira022/essencial-by-dani-estoque",
      },
      {
        id: "portfolio",
        title: "Portfólio Pessoal",
        status: "Site de portfólio",
        description:
          "Um portfólio bilíngue construído como produto, reunindo minha trajetória profissional, perfil técnico e projetos selecionados.",
        challenge:
          "Apresentar um perfil multidisciplinar entre software, dados e operações de negócio com evidências claras e verificáveis.",
        solution:
          "Uma experiência modular em React, com conteúdo centralizado, layouts responsivos, navegação acessível e deploy automatizado.",
        highlights: [
          "Componentes reutilizáveis e estilos isolados com CSS Modules",
          "Conteúdo em português e inglês com preferência salva",
          "Navegação responsiva e acessível por teclado",
          "Deploy de produção automatizado pela Vercel",
        ],
        tags: ["React", "Vite", "CSS Modules", "Framer Motion", "PixiJS"],
        source: "https://github.com/Kauanvieira022/portfolio",
        live: "https://portfolio-six-black-66.vercel.app/",
      },
      {
        id: "payroll-system",
        title: "Sistema de Folha de Pagamento",
        status: "Aplicação acadêmica",
        collaboration: "Projeto em equipe",
        description:
          "Simulação em linha de comando que conecta cadastro de colaboradores, benefícios e cálculos de folha em um banco de dados local.",
        highlights: [
          "Cadastro de colaboradores e benefícios com tabelas relacionais",
          "Modelo orientado a objetos e validação de entradas",
          "Cálculos de INSS, IRRF, FGTS, férias e salário líquido",
          "Geração de holerite e cálculo do custo mensal da empresa",
        ],
        tags: ["Python", "SQLite", "POO", "Regras de negócio"],
        source: "https://github.com/Kauanvieira022/Folha-de-pagamento",
      },
    ],
  },
};

export default projects;
