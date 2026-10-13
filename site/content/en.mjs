// English content. Same rules as sr.mjs: definition-first lead, question H2s,
// FAQ answers 50 to 100 words, no em/en dashes, no invented stats, no certification claims.
import { pathOf, ECOSYSTEM, COMPANY } from "../config.mjs";

const p = (key) => pathOf(key, "en");
const AI = ECOSYSTEM.ai.url.en;
const ACADEMY = ECOSYSTEM.academy.url.en;

export const ui = {
  lang: "en",
  skip: "Skip to content",
  menu: "Menu",
  nav: [
    ["services", "Services"],
    ["projects", "Projects"],
    ["about", "About"],
    ["contact", "Contact"],
  ],
  langSwitch: { label: "Srpski", short: "SR", title: "Pročitajte ovu stranicu na srpskom" },
  breadcrumbHome: "Home",
  ctaTitle: "Have a project in mind?",
  ctaText: "Send a short description of the idea or problem. We reply with a proposal for the next steps.",
  ctaButton: "Email us",
  ctaSecondary: "Contact page",
  mailSubject: "Inquiry from tridan.rs",
  faqHeading: "Frequently asked questions",
  readMore: "Learn more",
  footer: {
    tagline: "Custom software development agency in Belgrade: web applications, integrations and APIs, DevOps and cloud, AI integration.",
    services: "Services",
    company: "Company",
    privacy: "Privacy and cookies",
    cookieSettings: "Cookie settings",
    ecosystem: "Tridan ecosystem",
    ecosystemItems: [
      ["ai", "Tridan AI", "AI agents for calls and chat"],
      ["academy", "Tridan Academy", "AI and ISO training"],
      ["imakohoce", "imakohoce", "AI assistant for small businesses"],
    ],
    founderLabel: "Founder",
    legal: `${COMPANY.legalName}, ${COMPANY.address.street}, ${COMPANY.address.postalCode} ${COMPANY.address.locality}, Serbia. Registration no. (MB) ${COMPANY.registrationNumber}, tax ID (PIB) ${COMPANY.taxId}.`,
  },
  cookie: {
    label: "Cookie notice",
    text: "We set Google Analytics cookies only if you allow it, to see which pages are useful.",
    link: "Privacy details",
    accept: "Accept",
    reject: "Reject",
  },
  notFound: {
    title: "Page not found | Tridan",
    description: "The page you requested does not exist or has moved. Browse Tridan custom software development services or go back to the home page.",
    h1: "Page not found",
    text: "The address you opened does not exist or moved during the site redesign. These are the pages people look for most often:",
    other: "Ova stranica na srpskom",
  },
  legalLabels: { name: "Legal name", mb: "Registration number (MB)", pib: "Tax ID (PIB)", address: "Address", email: "Email" },
  lastUpdated: "Last updated",
  founderJob: "Founder",
};

const serviceCards = [
  { title: "Web application development", href: p("webApps"), text: "Custom full-stack web applications, from architecture and UI/UX design to production and maintenance." },
  { title: "Integrations and APIs", href: p("integrations"), text: "Connecting systems, payment services and tools through APIs so data flows automatically." },
  { title: "DevOps and cloud", href: p("devops"), text: "CI/CD, infrastructure as code and monitoring on AWS, Azure and Google Cloud." },
  { title: "AI integration", href: p("ai"), text: "Bringing AI models into existing applications and processes, with clear rules for data." },
];

export const pages = {
  home: {
    title: "Custom Software Development in Belgrade | Tridan",
    description: "Tridan is a Belgrade custom software development agency: web applications, integrations and APIs, DevOps and cloud, and AI integration for companies.",
    h1: "Custom software development from Belgrade",
    lead: "Tridan is a custom software development agency based in Belgrade, Serbia. We design, build and maintain web applications, connect systems through API integrations, set up DevOps and cloud infrastructure and bring AI into existing business processes, from architecture to production and long-term support.",
    heroCtas: [
      { label: "Send an inquiry", href: p("contact"), primary: true, contact: true },
      { label: "See our services", href: p("services") },
    ],
    sections: [
      {
        h2: "What does Tridan do?",
        blocks: [
          { p: "Tridan turns a business idea or problem into working software. The team is made of developers, engineers and problem solvers, and every project is a collaboration with the client at the center. We work in four areas:" },
          { cards: serviceCards },
        ],
      },
      {
        h2: "What is it like to work with Tridan?",
        blocks: [
          { p: "Every engagement starts with a conversation about the goal, not the technology. An iterative (agile) approach means you see results early and can change the plan while the project runs." },
          {
            steps: [
              { title: "Architecture and plan", text: "Together we define the goal, the scope of the first version and the technical architecture." },
              { title: "Iterative development", text: "We deliver in short cycles and show progress regularly." },
              { title: "Testing and release", text: "Every solution is tested for reliability and security before production." },
              { title: "Support and upgrades", text: "We stay with the project after release, with maintenance and new features." },
            ],
          },
        ],
      },
      {
        h2: "Who has Tridan worked with?",
        blocks: [
          { p: `We have worked with companies such as Coca-Cola, VIBE, ICO-cert, Blokaria, Billboard and Nature Plant, on projects ranging from biometric systems and online exams to promotional campaigns and blockchain technology. See the details on the <a href="${p("projects")}">projects</a> page.` },
        ],
      },
      {
        h2: "Where are the training courses and AI agents?",
        blocks: [
          { p: `Training no longer runs on this site. Courses on AI, information security management and AI regulation are delivered by <a href="${ACADEMY}">Tridan Academy</a>, a separate company dedicated to training.` },
          { p: `If you need ready-made AI agents for phone calls and website chat, see the <a href="${AI}">Tridan AI</a> platform.` },
        ],
      },
    ],
    faq: [
      {
        q: "What is custom software development?",
        a: "Custom software development is building an application for the specific needs of one company instead of adapting an off-the-shelf product. Tridan first analyses the processes, users and existing systems, then designs the architecture and builds the solution in iterations. The result is software that follows the way your team actually works, grows with the business and connects to the tools you already use.",
      },
      {
        q: "What services does Tridan offer?",
        a: "Tridan offers four main services: custom web application development, integrations and API development, DevOps and cloud infrastructure on AWS, Microsoft Azure and Google Cloud, and AI integration into existing applications. Alongside development we handle UI/UX design, testing, data migration and long-term maintenance. Services can be combined, for example a new web application with a payment integration and automated cloud delivery.",
      },
      {
        q: "What does the development process at Tridan look like?",
        a: "The development process at Tridan starts with a conversation about the goal and the scope of the first version. We then define the architecture and work in short agile cycles, after which the client sees and tries the progress. Every release is tested before production. After launch we continue with maintenance, fixes and upgrades, so the software stays secure and in line with new business needs.",
      },
      {
        q: "Does Tridan work with clients outside Serbia?",
        a: "Yes, Tridan works with clients in Serbia and abroad. Delivered projects include payment gateway integrations for companies in the United Kingdom and Ireland and database migrations for global enterprises. We communicate in English and Serbian, and collaboration runs online, with regular meetings and access to the project's progress throughout development.",
      },
      {
        q: "How much does custom software development cost?",
        a: "The cost of custom software development depends on the scope of features, the number of integrations, infrastructure requirements and the deadline. Tridan therefore does not publish fixed prices. After the first conversation and a short analysis we prepare an estimate for the first version and a proposal of phases, so the investment can be split into smaller parts and checked against results before the next step.",
      },
      {
        q: "Does Tridan maintain software after delivery?",
        a: "Yes, Tridan offers long-term support after delivery. Maintenance covers bug fixes, security updates, system monitoring, infrastructure adjustments and new features. The goal is a long-term partnership: software should stay scalable and reliable as the business grows. We can also take over maintenance of an existing system built by someone else, after a technical review of the code.",
      },
      {
        q: "Does Tridan offer training for developers and teams?",
        a: "Training has moved to Tridan Academy, a separate company dedicated to education. Tridan Academy runs courses on artificial intelligence, information security management and AI regulation, including preparation for ISO standards. The tridan.rs site is about software development; for training visit tridan-academy.com, where programmes, dates and enrolment for individuals and teams are described.",
      },
      {
        q: "Can Tridan add an AI assistant to our website?",
        a: "Yes. For an AI assistant for chat or phone calls, the fastest route is the Tridan AI platform, which offers ready-made AI agents that are added to a website. When something specific is needed, such as connecting an AI model to your database, internal documents or business processes, Tridan builds a custom AI integration through APIs and defines what the model is allowed to see.",
      },
    ],
  },

  services: {
    title: "Services: Web, API, DevOps and AI | Tridan",
    description: "Overview of Tridan services: custom web application development, integrations and APIs, DevOps and cloud infrastructure, and AI integration for companies.",
    h1: "Software development services",
    breadcrumb: "Services",
    lead: "Tridan provides four custom software development services: web applications, integrations and APIs, DevOps and cloud, and AI integration. Each service can be a project of its own or part of a larger solution, and the same team follows the project from architecture to production and maintenance.",
    sections: [
      { h2: "Which services does Tridan provide?", blocks: [{ cards: serviceCards }] },
      {
        h2: "How do you choose the right service for a project?",
        blocks: [
          { p: "If you are building a new product or internal tool, start with web application development. If systems already exist but do not share data, an integration solves it. If releases are slow or infrastructure is unstable, the answer is DevOps. If you want AI to do a concrete job inside your processes, you need an AI integration. When you are unsure, describe the problem and we propose an approach." },
        ],
      },
      {
        h2: "What do you get in every engagement?",
        blocks: [
          {
            list: [
              "<strong>Tailored solution:</strong> software designed for your needs, from architecture to deployment.",
              "<strong>Agile approach:</strong> short cycles, early visible results and a flexible plan.",
              "<strong>Quality assurance:</strong> reliability and security testing before every release.",
              "<strong>Long-term partnership:</strong> maintenance, updates and new features after launch.",
              "<strong>Scalability:</strong> an architecture that keeps up with growing users, data and teams.",
            ],
          },
        ],
      },
    ],
  },

  webApps: {
    title: "Custom Web Application Development | Tridan",
    description: "Tridan builds custom full-stack web applications in Belgrade: architecture, UI/UX design, frontend, backend, databases, testing and maintenance.",
    h1: "Custom web application development",
    breadcrumb: "Web application development",
    service: { name: "Custom web application development", type: "Web application development" },
    lead: "Web application development is the design and construction of software that runs in the browser and on the server: user interface, business logic, database and API. Tridan builds custom full-stack web applications, from architecture and UI/UX design to production release and maintenance.",
    sections: [
      {
        h2: "What does web application development include?",
        blocks: [
          {
            list: [
              "System architecture and technology choices based on the project's needs.",
              "UI/UX design of intuitive interfaces that users pick up quickly.",
              "Frontend and backend development, including APIs for mobile and other clients.",
              "Database design and migration of existing data.",
              "Internal tools and enterprise solutions that simplify processes.",
              "Testing before every release and security best practices.",
              "Maintenance, monitoring and new features after launch.",
            ],
          },
        ],
      },
      {
        h2: "When is a custom web application the right choice?",
        blocks: [
          { p: "A custom application makes sense when an off-the-shelf product does not cover your process, when you pay for several tools that do not share data, or when the software is part of what you offer your customers. An example from our work is online exam platforms with face analysis and fraud management, built for clients in the biometrics field." },
          { p: `If you already have an application that is slow or hard to maintain, we can review and optimise it instead of starting from scratch. See also <a href="${p("integrations")}">integrations and APIs</a> if the application needs to connect to other systems.` },
        ],
      },
      {
        h2: "How does Tridan ensure quality and security?",
        blocks: [
          { p: "We ensure quality through code review, automated tests and checking every release before production. Security is considered from the architecture onward: access control, data protection, up-to-date dependencies and web application best practices. We design applications to scale and to be maintainable for years, with clear documentation for your team." },
        ],
      },
    ],
    faq: [
      {
        q: "How long does web application development take?",
        a: "The duration of web application development depends on the number of features, integrations and design requirements. Tridan therefore splits the project into phases: first a core version with the most important features is delivered so users can try it right away, then new parts are added in short cycles. After the first conversation you receive an estimate for the first version and a plan for the following phases.",
      },
      {
        q: "Can Tridan take over an existing web application?",
        a: "Yes, Tridan can take over development and maintenance of an existing web application. We start with a technical review of the code, architecture, infrastructure and security, then propose a plan: fixes, performance optimisation, gradual modernisation or, when needed, a new version. This keeps what works well and keeps the risk of change under control.",
      },
      {
        q: "Does Tridan also design the user interface?",
        a: "Yes, UI/UX design is part of web application development at Tridan. We design the interface around the real tasks of users, with the goal of an application that is clear and easy to use without long onboarding. Design happens alongside development, so ideas are tested early in a working version of the application rather than only in static mockups.",
      },
    ],
  },

  integrations: {
    title: "System Integration and API Development | Tridan",
    description: "Tridan connects software systems through API integrations: payment gateways, third-party services, data migration and custom REST API development.",
    h1: "System integration and API development",
    breadcrumb: "Integrations and APIs",
    service: { name: "System integration and API development", type: "API development and system integration" },
    lead: "API integration is connecting two or more software systems so they exchange data automatically through a programming interface (API). Tridan builds custom APIs and integrates existing services, such as payment gateways, marketing platforms, databases and internal tools, into existing or new workflows.",
    sections: [
      {
        h2: "Which integrations does Tridan build?",
        blocks: [
          {
            list: [
              "Design and development of REST APIs for your applications and partners.",
              "Payment gateway integration, including solutions for UK and Irish companies.",
              "Connecting third-party services to existing processes.",
              "Integrations for promotional campaigns, such as Coca-Cola giveaways.",
              "Data migration between systems and databases.",
              "Integrations with the Cardano and Avalanche blockchain networks.",
            ],
          },
        ],
      },
      {
        h2: "What does an integration project look like?",
        blocks: [
          {
            steps: [
              { title: "System analysis", text: "We map the systems, the data and who owns which data." },
              { title: "API contract design", text: "We define messages, errors, authentication and limits." },
              { title: "Build and test", text: "The integration is built and tested in an isolated environment." },
              { title: "Launch and monitoring", text: "We monitor the integration and respond to errors after launch." },
            ],
          },
        ],
      },
      {
        h2: "Why do integrations matter for a business?",
        blocks: [
          { p: `When systems do not share data, people copy it by hand, which is slow and error prone. A good integration removes that step, gives everyone the same data and makes automation possible. Integrations often go together with <a href="${p("webApps")}">web application development</a> and <a href="${p("ai")}">AI integration</a>, where an API connects the model to your data.` },
        ],
      },
    ],
    faq: [
      {
        q: "What is a REST API?",
        a: "A REST API is the way one application offers its data and functions to other applications over HTTP, the same protocol the web uses. Each resource, such as an order or a user, has its own address, and applications read and change it with standard requests. Tridan designs REST APIs with clear documentation, authentication and error handling, so integrations stay reliable.",
      },
      {
        q: "Can an older system without an API be connected?",
        a: "Often it can. When an older system has no API, Tridan evaluates other routes: database access, file exchange, existing exports or a dedicated API layer in front of the system. The choice depends on security, stability and how often the data changes. After the analysis you receive a proposed solution with its limitations stated clearly, before development starts.",
      },
      {
        q: "Does Tridan integrate payment gateways?",
        a: "Yes, Tridan has integrated payment gateways tailored to companies in the United Kingdom and Ireland. A payment integration covers the checkout flow, confirmations and refunds, error handling, reconciliation of transactions with your system and secure handling of data. Every integration is tested in the payment provider's sandbox environment before switching to real transactions.",
      },
    ],
  },

  devops: {
    title: "DevOps and Cloud: AWS, Azure, GCP | Tridan",
    description: "Tridan sets up DevOps processes and cloud infrastructure on AWS, Azure and Google Cloud: CI/CD, infrastructure as code, containers and monitoring.",
    h1: "DevOps and cloud infrastructure",
    breadcrumb: "DevOps and cloud",
    service: { name: "DevOps and cloud infrastructure", type: "DevOps and cloud infrastructure" },
    lead: "DevOps is a set of practices that joins development and operations so software is released often, reliably and automatically. Tridan sets up and maintains cloud infrastructure on Amazon Web Services, Microsoft Azure and Google Cloud Platform, with CI/CD pipelines, infrastructure as code and system monitoring.",
    sections: [
      {
        h2: "Which DevOps services does Tridan provide?",
        blocks: [
          {
            list: [
              "Infrastructure as code (IaC) with Terraform and Ansible.",
              "CI/CD pipelines for automated testing and delivery, for example with Jenkins and CircleCI.",
              "Containers and orchestration with Docker and Kubernetes.",
              "Monitoring and logs with the ELK stack (Elasticsearch, Logstash, Kibana), Prometheus, Grafana and DataDog.",
              "Microservices architecture and database migrations.",
              "Security best practices for cloud environments.",
            ],
          },
        ],
      },
      {
        h2: "Which cloud platforms does Tridan work with?",
        blocks: [
          { p: "We work on three major cloud platforms: Amazon Web Services (AWS), Microsoft Azure and Google Cloud Platform (GCP). We have set up CI/CD pipelines on AWS and Azure and carried out database migrations for global enterprises. The platform is chosen based on your existing infrastructure, costs and data location requirements." },
        ],
      },
      {
        h2: "What does DevOps change in a team's daily work?",
        blocks: [
          { p: `Instead of manual deployments to a server, every change passes automated tests and is released through the same repeatable procedure. Infrastructure is described in code, so environments can be recreated, and monitoring shows problems early. The team ships more often and with less stress. DevOps is part of every <a href="${p("webApps")}">web application development</a> project at Tridan.` },
        ],
      },
    ],
    faq: [
      {
        q: "What is CI/CD?",
        a: "CI/CD stands for continuous integration and continuous delivery. With continuous integration every code change is automatically built and tested, so errors are found right away. Continuous delivery then deploys the same verified version to a test or production environment automatically. Tridan sets up CI/CD pipelines on AWS and Azure, so releasing becomes a regular and predictable step.",
      },
      {
        q: "What is infrastructure as code?",
        a: "Infrastructure as code (IaC) means that servers, networks, databases and other cloud resources are described in files kept alongside the application code. Tools such as Terraform and Ansible create and change infrastructure from those files. Every change then has a history and a review, environments are identical, and after a failure the system can be rebuilt the same way.",
      },
      {
        q: "Can Tridan take over existing cloud infrastructure?",
        a: "Yes, Tridan can take over maintenance of existing infrastructure on AWS, Azure or Google Cloud. We first review the configuration, costs, security, backups and monitoring, then propose priorities: describing the infrastructure as code, automating delivery and setting up alerts. Changes are introduced gradually, so the system keeps running without interruption during the transition.",
      },
    ],
  },

  ai: {
    title: "AI Integration for Companies | Tridan",
    description: "Tridan brings AI into existing applications and processes: chat assistants, document processing, internal knowledge search and automation via APIs.",
    h1: "AI integration for companies",
    breadcrumb: "AI integration",
    service: { name: "AI integration", type: "AI integration" },
    lead: "AI integration is bringing artificial intelligence models, such as large language models, into existing software and business processes. Tridan connects AI to your applications, data and tools through APIs, so the AI does a concrete job: answers questions, processes documents or automates steps in a process.",
    sections: [
      {
        h2: "What can an AI integration do?",
        blocks: [
          {
            list: [
              "A chat assistant on your website or in an internal app that answers from your data.",
              "Document processing and data extraction from emails, contracts or forms.",
              "Natural language search across internal knowledge, manuals and documentation.",
              "Automation of repetitive steps in a process, with human review where needed.",
              "Connecting AI services to existing applications through APIs.",
            ],
          },
        ],
      },
      {
        h2: "When is a ready-made product better than custom development?",
        blocks: [
          { p: `For AI agents that answer phone calls and website chat there is a ready-made platform: <a href="${AI}">Tridan AI</a>. Custom development makes sense when AI has to work inside your own applications, with your databases and specific business rules.` },
        ],
      },
      {
        h2: "How does Tridan approach data and security?",
        blocks: [
          { p: "Before development we agree which data the model may see, who has access, which AI service is used and where data is processed. Access is limited to what the task needs, and answers and actions are logged for review. Where a mistake has consequences, the AI proposes and a person approves." },
        ],
      },
    ],
    faq: [
      {
        q: "What is an AI agent?",
        a: "An AI agent is a program based on a language model that does more than answer questions: it carries out steps in a process, such as reading data from a system, filling in forms, booking appointments or forwarding a request to the right person. The agent works within the tools and rules Tridan gives it. Ready-made AI agents for calls and chat are offered by the Tridan AI platform.",
      },
      {
        q: "Does our data go to a public AI model?",
        a: "That depends on the chosen AI service and deployment, and it is agreed before the project starts. Tridan selects the model provider, the processing region and the data usage terms together with you, and the model receives only the data needed for the task. When data must not leave your infrastructure, we consider models that run on your own servers or in your own cloud account.",
      },
      {
        q: "Where can I learn how to use AI safely in a company?",
        a: "Training on artificial intelligence is delivered by Tridan Academy, a separate company dedicated to education. Its programmes cover applying AI in business, managing AI systems and regulation such as the EU AI Act, including preparation for ISO standards. Tridan builds and integrates the systems, while Tridan Academy trains the people who use and oversee them.",
      },
    ],
  },

  projects: {
    title: "Projects and Clients | Tridan",
    description: "Tridan projects: online exams with face analysis, CI/CD on AWS and Azure, payment gateways, database migrations, promotional campaigns and blockchain.",
    h1: "Projects and clients",
    breadcrumb: "Projects",
    lead: "Tridan has worked on projects in biometrics, online exams, payment systems, cloud infrastructure, promotional campaigns and blockchain technology. This page describes the kinds of projects we have delivered and the companies we have worked with.",
    sections: [
      {
        h2: "Which projects has Tridan delivered?",
        blocks: [
          { h3: "Online exam platforms with face analysis" },
          { p: "We work with clients in the biometrics field. We built online exam platforms with integrated face analysis and fraud management." },
          { h3: "CI/CD on AWS and Azure" },
          { p: `We set up continuous integration and continuous delivery pipelines on Amazon Web Services and Microsoft Azure for efficient and reliable software delivery. More on the <a href="${p("devops")}">DevOps and cloud</a> page.` },
          { h3: "Payment gateway integration" },
          { p: `We integrated payment gateways tailored to companies in the United Kingdom and Ireland. See <a href="${p("integrations")}">integrations and APIs</a>.` },
          { h3: "Database migration" },
          { p: "We carried out database migrations for global enterprises." },
          { h3: "Promotional campaigns" },
          { p: "We supported promotional campaigns such as Coca-Cola giveaways by integrating the systems that power marketing activities." },
          { h3: "Blockchain solutions" },
          { p: "We delivered projects on the Cardano and Avalanche blockchain networks, with solutions built on decentralised networks." },
        ],
      },
      {
        h2: "Which companies has Tridan worked with?",
        blocks: [
          { p: "We have worked with companies in areas from biometric systems to blockchain technology and promotional campaigns:" },
          { clients: true },
        ],
      },
    ],
  },

  about: {
    title: "About Tridan: Software Development Team | Tridan",
    description: "Tridan is a team of developers and engineers in Belgrade building custom software. Learn who is behind the company, how we work and our company details.",
    h1: "About Tridan",
    breadcrumb: "About",
    lead: "Tridan is a team of software developers, engineers and problem solvers based in Belgrade, Serbia. We build custom software for companies, with a focus on full-stack development, integrations, cloud and AI. Every project is a collaboration with the client at the center, from the first idea to long-term support.",
    sections: [
      {
        h2: "Who is behind Tridan?",
        blocks: [
          { p: `Tridan was founded by <a href="${COMPANY.founder.linkedin}">Nemanja Milivojevic</a>, who leads the team and the company's technical direction. He writes and records videos about software development and AI on his <a href="${COMPANY.founder.youtube}">YouTube channel</a>.` },
          { p: `The same company also builds <a href="${AI}">Tridan AI</a>, a platform for AI agents for calls and chat. Training is delivered by <a href="${ACADEMY}">Tridan Academy</a>, a separate company.` },
        ],
      },
      {
        h2: "How does Tridan work?",
        blocks: [
          {
            list: [
              "<strong>Collaborative team:</strong> developers, designers and strategists work directly with you from start to finish.",
              "<strong>Experience across industries:</strong> biometrics, payments, marketing, cloud and blockchain.",
              "<strong>Agile and flexible:</strong> the process adapts to your needs while the project runs.",
              "<strong>Quality:</strong> every solution is tested for reliability and security.",
              "<strong>Long-term partnership:</strong> support and upgrades so the software stays scalable.",
            ],
          },
        ],
      },
      { h2: "What are the official company details?", blocks: [{ legal: true }] },
    ],
  },

  contact: {
    title: "Contact: Send a Project Inquiry | Tridan",
    description: "Contact Tridan at office@tridan.rs. Send a short project description and we reply with proposed next steps. Based in Belgrade, Savski Venac.",
    h1: "Contact",
    breadcrumb: "Contact",
    lead: `You can contact Tridan by email at <a href="mailto:${COMPANY.email}" data-contact>${COMPANY.email}</a>. Send a short description of the project, the deadline and the systems to connect, and we reply with a proposal for the next steps. The company is based in Belgrade, in the Savski Venac municipality.`,
    heroCtas: [{ label: `Email ${COMPANY.email}`, mail: true, primary: true }],
    sections: [
      {
        h2: "How do you start a project with Tridan?",
        blocks: [
          {
            steps: [
              { title: "Send an inquiry", text: "Describe the goal, users, existing systems and the desired deadline." },
              { title: "Intro call", text: "We clarify requirements and propose an approach and technologies." },
              { title: "Estimate and plan", text: "You receive the scope of the first version, phases and an estimate." },
              { title: "Development starts", text: "We work in short cycles with regular visibility of progress." },
            ],
          },
        ],
      },
      { h2: "What are the company details?", blocks: [{ legal: true }] },
    ],
  },

  privacy: {
    title: "Privacy and Cookies | Tridan",
    description: "How Tridan handles data on tridan.rs: Google Analytics cookies only with consent, email and your rights.",
    h1: "Privacy and cookie policy",
    breadcrumb: "Privacy",
    lastUpdated: "13 October 2026",
    lead: "This page explains which data the tridan.rs website processes, why, and how you can change your choice. The site uses no advertising cookies, and Google Analytics cookies are set only if you explicitly accept them in the cookie notice.",
    sections: [
      { h2: "Who is the data controller?", blocks: [{ p: `The data controller is ${COMPANY.legalName}, ${COMPANY.address.street}, ${COMPANY.address.postalCode} ${COMPANY.address.locality}, Serbia, registration no. ${COMPANY.registrationNumber}, tax ID ${COMPANY.taxId}. Privacy contact: <a href="mailto:${COMPANY.email}">${COMPANY.email}</a>.` }] },
      {
        h2: "Which cookies and data do we use?",
        blocks: [
          {
            list: [
              "<strong>Google Analytics 4</strong> (cookies <code>_ga</code> and <code>_ga_*</code>): cookies are set only after you click \"Accept\". It records pages visited, device type and approximate location so we can see which pages are useful. Before consent the Google tag runs without cookies and sends only anonymous signals without identifiers (Google Consent Mode).",
              "<strong>Your choice</strong> (<code>tridan-consent</code> in the browser's local storage): remembers whether you accepted or rejected analytics.",
              "<strong>Email</strong>: when you write to us, we use your address and message only to reply and discuss the project.",
            ],
          },
        ],
      },
      {
        h2: "How can you change your choice and exercise your rights?",
        blocks: [
          { p: "You can change your cookie choice at any time with the \"Cookie settings\" link in the site footer. Withdrawing consent switches analytics off and deletes the Google Analytics cookies." },
          { p: `You have the right to request access to, correction or deletion of your data and to lodge a complaint with the Serbian Commissioner for Information of Public Importance and Personal Data Protection. Send requests to <a href="mailto:${COMPANY.email}">${COMPANY.email}</a>.` },
        ],
      },
    ],
  },
};
