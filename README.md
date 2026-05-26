# 🌱 Feijoeiro Mágico - Portal do Infantário S. Vicente (Alfena)

> Um website institucional premium, altamente interativo, leve e responsivo para a **Associação Feijoeiro Mágico**. Desenvolvido com foco na excelência de design, acessibilidade e na promoção de uma pedagogia ativa baseada no afeto e na sustentabilidade ambiental.

---

## 📸 Visão Geral do Projeto

O **Feijoeiro Mágico** é o portal digital do **Infantário S. Vicente em Alfena**. O projeto foi estruturado para refletir a essência da instituição — o afeto e a ecologia —, utilizando animações fluidas inspiradas no crescimento de uma videira mágica. 

O site é composto por **15 páginas estáticas independentes** interligadas com navegação rápida, acessibilidade aprimorada (A11y) e design visual sofisticado com paletas de cores naturais e tipografia moderna.

---

## 🛠️ Arquitetura e Organização de Pastas

Para manter o projeto limpo, modular e fácil de gerir, a estrutura de pastas foi organizada da seguinte forma:

```text
FeijoeiroMagico/
├── 📂 assets/                       # Recursos globais da aplicação
│   ├── 📂 css/
│   │   └── styles.css              # Folha de estilos CSS3 premium (design system, HSL, variáveis)
│   ├── 📂 js/
│   │   └── script.js               # Motor principal de interatividades e validações (Vanilla JS)
│   └── 📂 docs/
│       ├── Cartaz-A-Escola-Resolve.pdf
│       └── Plano-de-Contingencia-Coronavirus.pdf
│
├── 🏠 index.html                    # Portal Principal / Landing Page
│
├── 🏛️ Páginas do Menu "Instituição"
│   ├── missao.html                  # Missão, Valores e Manifesto
│   ├── horario.html                 # Calendário letivo e Horários de funcionamento
│   ├── sinergias.html               # Parcerias institucionais e comunitárias
│   ├── regulamento.html             # Regulamentos internos e downloads formais
│   └── contingencia.html            # Informações e planos de contingência ativa
│
├── 🌿 Páginas do Menu "Serviços" (Valências)
│   ├── servicos.html                # Visão geral de serviços com cards tridimensionais
│   ├── creche.html                  # Valência de Berçário e Creche (Baby Signs®)
│   ├── jardim-infancia.html         # Valência de Jardim de Infância (Montessori, Waldorf, MEM)
│   ├── apoio-estudo.html            # CATL, Apoio ao Estudo e Explicações
│   ├── escola-resolve.html          # Apoio logístico domiciliar premium para famílias
│   ├── programas-ferias.html        # Campos de férias e recreação ativa
│   └── aniversarios.html            # Festas de aniversário, laser tag e insufláveis
│
├── 👥 Comunidade & Feedback
│   └── comunidade.html              # Mural estilo Masonry de partilha de testemunhos das famílias
│
├── ✉️ Contacto Direto
│   └── contactos.html               # Formulário validado com integração geográfica do Google Maps
│
└── 📋 Suporte
    └── SITEMAP.md                   # Guia detalhado do desenvolvedor com o mapa do site
```

---

## 🌟 Funcionalidades e Elementos Premium

### 1. 📈 Animações Visuais Altamente Interativas
* **Crescimento do Feijoeiro (Beanstalk Growth)**: No portal principal, uma ilustração em SVG de um caule de feijoeiro cresce dinamicamente na lateral esquerda do ecrã à medida que o utilizador faz scroll na página. As folhas brotam no momento exato em que são visíveis.
* **Scroll Revelations (Intersection Observer)**: Utilização de uma emulação nativa do *Framer Motion* com `IntersectionObserver` em Javascript para criar efeitos de desabrochar/surgir em cards e secções de texto à medida que entram na janela de visualização (*viewport*).
* **Avião de Papel em 3D**: O formulário de contactos principal possui uma animação interativa que simula o voo de um avião de papel em 3D ao enviar a mensagem, revelando a tela de sucesso após a conclusão do envio simulado.

### 2. 🍽️ Ementas Semanais Dinâmicas
* Um painel interativo estruturado por separadores de dias da semana (Segunda a Sexta) que permite aos pais consultarem a ementa escolar (Sopa, Prato Principal, Sobremesa e Lanche) com transições dinâmicas rápidas e sem recarregamento de página.

### 3. 🛡️ Cofre de Documentos com Progresso
* Na secção de downloads de regulamentos e manuais de saúde, o download simula um progresso real com uma barra de carregamento que se preenche gradualmente em `1.2s` sob o botão, dando um feedback visual premium e interativo antes do download físico do ficheiro.
* Inclui caixas expansíveis de pré-visualização rápida com os pontos principais de cada documento para leitura rápida antes de descarregar.

### 4. 👥 Mural de Testemunhos Masonry
* Uma grelha fluida estilo *Pinterest* que organiza de forma responsiva os depoimentos reais de encarregados de educação, com um formulário que permite enviar mensagens diretamente ao "Castelo" com a opção de submissão anónima dinâmica (que bloqueia e estiliza o campo do Nome de forma interativa).

### 5. ♿ Acessibilidade (A11y)
* Menu hambúrguer móvel estruturado com atributos `aria-expanded`, `aria-hidden` e `aria-controls`.
* **Focus Trap** integrado em todos os modais de serviços para evitar que o foco do teclado (Tab / Shift+Tab) saia do modal enquanto este estiver aberto.
* Links de salto rápido ("skip-links") para leitores de ecrã e navegação por teclado limpa.

---

## 🎨 Design System e Estilização

O projeto usa **CSS3 Vanilla** estruturado e de alto padrão estético:
* **Cores HSL tailoreadas**: Paleta verde botânica (`--primary-green: #34a853`, `--accent-leaf: #4cb877`), fundo texturado suave (`--off-white: #f8faf7`) e tons escuros de floresta para legibilidade extrema.
* **Tipografia**: Utiliza fontes do Google Fonts (`Outfit` para cabeçalhos e títulos com peso forte, e `Inter` para leitura fluida de corpo de texto).
* **Glassmorphism**: Efeitos foscos translúcidos suaves em cabeçalhos fixos e modais de diálogo.
* **Responsividade Absoluta**: Construído com Grid, Flexbox e Media Queries que garantem uma experiência impecável desde telemóveis compactos a ecrãs de computadores UltraWide.

---

## 🚀 Como Executar Localmente

Como o projeto é construído integralmente com tecnologias web puras (HTML5, CSS3 e Javascript Vanilla), não necessita de nenhuma compilação ou instalação complexa.

1. **Clonar o Repositório**:
   ```bash
   git clone https://github.com/LyraPedroDev/FeijoeiroMagico.git
   cd FeijoeiroMagico
   ```

2. **Abrir no Navegador**:
   * Pode simplesmente abrir o ficheiro `index.html` diretamente no seu navegador preferido (Double Click).
   * **Recomendado (Live Server)**: Se utilizar o VS Code, pode usar a extensão *Live Server* ou correr um servidor local simples em python/node para simular o ambiente de produção:
     ```bash
     # Usando Python 3
     python -m http.server 8000
     
     # Usando Node (npx)
     npx serve
     ```
     Depois, aceda a `http://localhost:8000` ou ao endereço fornecido.

---

## 📝 Licença & Autoria

* **Desenvolvimento e Organização**: Associação Feijoeiro Mágico / Pedro Lyra
* **Finalidade**: Apoio Institucional, Comunicação Pedagógica e Conveniência Familiar.

*🌱 Cultivando pequenos sonhos, construindo grandes futuros.*
