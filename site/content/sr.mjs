// Serbian (Latin script) content. Rules: definition-first lead under each H1, question-style
// H2s, FAQ answers 50 to 100 words, no em/en dashes, no invented stats, no certification claims.
import { pathOf, ECOSYSTEM, COMPANY } from "../config.mjs";

const p = (key) => pathOf(key, "sr");
const AI = ECOSYSTEM.ai.url.sr;
const ACADEMY = ECOSYSTEM.academy.url.sr;

export const ui = {
  lang: "sr",
  skip: "Preskoči na sadržaj",
  menu: "Meni",
  nav: [
    ["services", "Usluge"],
    ["projects", "Projekti"],
    ["about", "O nama"],
    ["contact", "Kontakt"],
  ],
  langSwitch: { label: "English", short: "EN", title: "Read this page in English" },
  breadcrumbHome: "Početna",
  ctaTitle: "Imate projekat na umu?",
  ctaText: "Pošaljite kratak opis ideje ili problema. Odgovaramo sa predlogom sledećih koraka.",
  ctaButton: "Pišite nam",
  ctaSecondary: "Kontakt stranica",
  mailSubject: "Upit sa sajta tridan.rs",
  faqHeading: "Česta pitanja",
  readMore: "Saznajte više",
  footer: {
    tagline: "Agencija za razvoj softvera po meri iz Beograda: web aplikacije, integracije i API, DevOps i cloud, AI integracije.",
    services: "Usluge",
    company: "Kompanija",
    privacy: "Privatnost i kolačići",
    cookieSettings: "Podešavanja kolačića",
    ecosystem: "Tridan ekosistem",
    ecosystemItems: [
      ["ai", "Tridan AI", "AI agenti za pozive i čet"],
      ["academy", "Tridan Academy", "AI i ISO obuke"],
      ["imakohoce", "imakohoce", "AI asistent za mala preduzeća"],
    ],
    founderLabel: "Osnivač",
    legal: `${COMPANY.legalName}, ${COMPANY.address.street}, ${COMPANY.address.postalCode} ${COMPANY.address.locality}, Srbija. MB ${COMPANY.registrationNumber}, PIB ${COMPANY.taxId}.`,
  },
  cookie: {
    label: "Obaveštenje o kolačićima",
    text: "Koristimo Google Analytics samo ako to dozvolite, da bismo videli koje stranice su korisne.",
    link: "Više o privatnosti",
    accept: "Prihvatam",
    reject: "Odbijam",
  },
  notFound: {
    title: "Stranica nije pronađena | Tridan",
    description: "Tražena stranica ne postoji ili je premeštena. Pogledajte usluge razvoja softvera po meri ili se vratite na početnu stranicu sajta Tridan.",
    h1: "Stranica nije pronađena",
    text: "Adresa koju ste otvorili ne postoji ili je premeštena tokom redizajna sajta. Ovo su stranice koje ljudi najčešće traže:",
    other: "This page in English",
  },
  legalLabels: { name: "Pun naziv", mb: "Matični broj (MB)", pib: "PIB", address: "Adresa", email: "E-pošta" },
  lastUpdated: "Poslednje ažuriranje",
  founderJob: "Osnivač",
};

const serviceCards = [
  { title: "Razvoj web aplikacija", href: p("webApps"), text: "Full-stack web aplikacije po meri, od arhitekture i UI/UX dizajna do produkcije i održavanja." },
  { title: "Integracije i API", href: p("integrations"), text: "Povezivanje sistema, platnih servisa i alata preko API-ja da podaci teku automatski." },
  { title: "DevOps i cloud", href: p("devops"), text: "CI/CD, infrastruktura kao kod i nadzor sistema na AWS, Azure i Google Cloud platformi." },
  { title: "AI integracije", href: p("ai"), text: "Uvođenje AI modela u postojeće aplikacije i procese, sa jasnim pravilima za podatke." },
];

export const pages = {
  home: {
    title: "Razvoj softvera po meri u Beogradu | Tridan",
    description: "Tridan je agencija iz Beograda za razvoj softvera po meri: web aplikacije, integracije i API, DevOps i cloud, i AI integracije za kompanije.",
    h1: "Razvoj softvera po meri iz Beograda",
    lead: "Tridan je agencija za razvoj softvera po meri sa sedištem u Beogradu. Projektujemo, razvijamo i održavamo web aplikacije, povezujemo sisteme preko API integracija, postavljamo DevOps i cloud infrastrukturu i uvodimo AI u postojeće poslovne procese, od arhitekture do produkcije i dugoročne podrške.",
    heroCtas: [
      { label: "Pošaljite upit", href: p("contact"), primary: true, contact: true },
      { label: "Pogledajte usluge", href: p("services") },
    ],
    sections: [
      {
        h2: "Šta radi Tridan?",
        blocks: [
          { p: "Tridan pretvara poslovnu ideju ili problem u softver koji radi. Tim čine programeri, inženjeri i ljudi koji rešavaju probleme, a svaki projekat vodimo kao saradnju sa klijentom u centru. Radimo u četiri oblasti:" },
          { cards: serviceCards },
        ],
      },
      {
        h2: "Kako izgleda saradnja sa Tridanom?",
        blocks: [
          { p: "Saradnja počinje razgovorom o cilju, a ne o tehnologiji. Iterativni (agilni) pristup znači da rezultat vidite rano i da plan možete menjati dok projekat traje." },
          {
            steps: [
              { title: "Arhitektura i plan", text: "Zajedno definišemo cilj, obim prve verzije i tehničku arhitekturu." },
              { title: "Iterativni razvoj", text: "Isporučujemo u kratkim ciklusima i redovno pokazujemo napredak." },
              { title: "Testiranje i isporuka", text: "Svako rešenje prolazi testiranje pouzdanosti i bezbednosti pre produkcije." },
              { title: "Podrška i nadogradnje", text: "Ostajemo uz projekat posle isporuke, sa održavanjem i novim funkcijama." },
            ],
          },
        ],
      },
      {
        h2: "Sa kim je Tridan sarađivao?",
        blocks: [
          { p: `Radili smo sa kompanijama kao što su Coca-Cola, VIBE, ICO-cert, Blokaria, Billboard i Nature Plant, na projektima od biometrijskih sistema i online ispita do promotivnih kampanja i blockchain tehnologija. Detalje pogledajte na stranici <a href="${p("projects")}">projekti</a>.` },
        ],
      },
      {
        h2: "Gde su obuke i AI agenti?",
        blocks: [
          { p: `Obuke više ne vodimo na ovom sajtu. Kurseve iz oblasti AI, upravljanja bezbednošću informacija i AI regulative drži <a href="${ACADEMY}">Tridan Academy</a>, zasebna kompanija posvećena obukama.` },
          { p: `Ako vam trebaju gotovi AI agenti za telefonske pozive i čet na sajtu, pogledajte platformu <a href="${AI}">Tridan AI</a>.` },
        ],
      },
    ],
    faq: [
      {
        q: "Šta je razvoj softvera po meri?",
        a: "Razvoj softvera po meri je izrada aplikacije za tačno određene potrebe jedne kompanije, umesto prilagođavanja gotovog proizvoda. Tridan prvo analizira procese, korisnike i postojeće sisteme, zatim projektuje arhitekturu i razvija rešenje u iteracijama. Rezultat je softver koji prati način na koji vaš tim stvarno radi, može da raste zajedno sa poslovanjem i povezuje se sa alatima koje već koristite.",
      },
      {
        q: "Koje usluge Tridan nudi?",
        a: "Tridan nudi četiri glavne usluge: razvoj web aplikacija po meri, integracije i razvoj API-ja, DevOps i cloud infrastrukturu na AWS, Microsoft Azure i Google Cloud platformi, i AI integracije u postojeće aplikacije. Uz razvoj radimo UI/UX dizajn, testiranje, migracije podataka i dugoročno održavanje. Usluge se mogu kombinovati, na primer nova web aplikacija sa integracijom platnog sistema i automatizovanom isporukom u cloud.",
      },
      {
        q: "Kako izgleda proces razvoja kod Tridana?",
        a: "Proces razvoja kod Tridana počinje razgovorom o cilju i obimu prve verzije. Zatim definišemo arhitekturu i radimo u kratkim agilnim ciklusima, posle kojih klijent vidi i proba napredak. Svako izdanje prolazi testiranje pre produkcije. Posle lansiranja nastavljamo sa održavanjem, ispravkama i nadogradnjama, tako da softver ostaje bezbedan i usklađen sa novim potrebama poslovanja.",
      },
      {
        q: "Da li Tridan radi sa klijentima van Srbije?",
        a: "Da, Tridan radi sa klijentima u Srbiji i inostranstvu. Među isporučenim projektima su integracije platnih sistema za kompanije iz Velike Britanije i Irske i migracije baza podataka za globalne kompanije. Komuniciramo na srpskom i engleskom jeziku, a saradnja se odvija online, uz redovne sastanke i pristup napretku projekta tokom celog razvoja.",
      },
      {
        q: "Koliko košta razvoj softvera po meri?",
        a: "Cena razvoja softvera po meri zavisi od obima funkcija, broja integracija, zahteva za infrastrukturu i roka. Tridan zato ne objavljuje fiksne cene. Posle prvog razgovora i kratke analize pripremamo procenu za prvu verziju i predlog faza, tako da se ulaganje može podeliti na manje celine i proveriti na rezultatima pre sledećeg koraka.",
      },
      {
        q: "Da li Tridan održava softver posle isporuke?",
        a: "Da, Tridan nudi dugoročnu podršku posle isporuke. Održavanje obuhvata ispravke grešaka, bezbednosna ažuriranja, praćenje rada sistema, prilagođavanje infrastrukture i razvoj novih funkcija. Cilj je dugoročno partnerstvo: softver treba da ostane skalabilan i pouzdan i kada poslovanje raste. Možemo preuzeti i održavanje postojećeg sistema koji je razvio neko drugi, posle tehničke analize koda.",
      },
      {
        q: "Da li Tridan nudi obuke za programere i timove?",
        a: "Obuke su prešle u Tridan Academy, zasebnu kompaniju posvećenu obrazovanju. Tridan Academy drži kurseve iz oblasti veštačke inteligencije, upravljanja bezbednošću informacija i AI regulative, uz pripremu za ISO standarde. Sajt tridan.rs je posvećen razvoju softvera, a za obuke posetite tridan-academy.com, gde su opisani programi, termini i načini prijave za pojedince i timove.",
      },
      {
        q: "Može li Tridan da doda AI asistenta na naš sajt?",
        a: "Da. Za AI asistenta za čet ili telefonske pozive najbrži put je platforma Tridan AI, koja nudi gotove AI agente koji se postavljaju na sajt. Kada je potrebno nešto specifično, na primer povezivanje AI modela sa vašom bazom, internim dokumentima ili poslovnim procesima, Tridan razvija AI integraciju po meri preko API-ja i definiše šta model sme da vidi.",
      },
    ],
  },

  services: {
    title: "Usluge: web, API, DevOps i AI | Tridan",
    description: "Pregled usluga agencije Tridan: razvoj web aplikacija po meri, integracije i API, DevOps i cloud infrastruktura i AI integracije za kompanije.",
    h1: "Usluge razvoja softvera",
    breadcrumb: "Usluge",
    lead: "Tridan pruža četiri usluge razvoja softvera po meri: web aplikacije, integracije i API, DevOps i cloud, i AI integracije. Svaka usluga može biti zaseban projekat ili deo većeg rešenja, a isti tim prati projekat od arhitekture do produkcije i održavanja.",
    sections: [
      { h2: "Koje usluge Tridan pruža?", blocks: [{ cards: serviceCards }] },
      {
        h2: "Kako izabrati pravu uslugu za projekat?",
        blocks: [
          { p: "Ako gradite novi proizvod ili interni alat, krenite od razvoja web aplikacije. Ako sistemi već postoje ali ne razmenjuju podatke, problem rešava integracija. Ako je isporuka spora ili infrastruktura nestabilna, rešenje je DevOps. Ako želite da AI obavlja konkretan posao u vašim procesima, potrebna je AI integracija. Kada niste sigurni, opišite problem, a mi predlažemo pristup." },
        ],
      },
      {
        h2: "Šta dobijate u svakoj saradnji?",
        blocks: [
          {
            list: [
              "<strong>Rešenje po meri:</strong> softver prilagođen vašim potrebama, od arhitekture do isporuke.",
              "<strong>Agilni pristup:</strong> kratki ciklusi, rana vidljivost rezultata i fleksibilan plan.",
              "<strong>Kontrola kvaliteta:</strong> testiranje pouzdanosti i bezbednosti pre svakog izdanja.",
              "<strong>Dugoročno partnerstvo:</strong> održavanje, ažuriranja i nove funkcije posle lansiranja.",
              "<strong>Skalabilnost:</strong> arhitektura koja prati rast korisnika, podataka i tima.",
            ],
          },
        ],
      },
    ],
  },

  webApps: {
    title: "Razvoj web aplikacija po meri | Tridan",
    description: "Tridan razvija full-stack web aplikacije po meri u Beogradu: arhitektura, UI/UX dizajn, frontend, backend, baze podataka, testiranje i održavanje.",
    h1: "Razvoj web aplikacija po meri",
    breadcrumb: "Razvoj web aplikacija",
    service: { name: "Razvoj web aplikacija po meri", type: "Web application development" },
    lead: "Razvoj web aplikacija je projektovanje i izrada softvera koji radi u pregledaču i na serveru: korisnički interfejs, poslovna logika, baza podataka i API. Tridan razvija full-stack web aplikacije po meri, od arhitekture i UI/UX dizajna do isporuke u produkciju i održavanja.",
    sections: [
      {
        h2: "Šta obuhvata razvoj web aplikacije?",
        blocks: [
          {
            list: [
              "Arhitekturu sistema i izbor tehnologija prema potrebama projekta.",
              "UI/UX dizajn intuitivnih interfejsa koji korisnici brzo savladaju.",
              "Frontend i backend razvoj, uključujući API za mobilne i druge klijente.",
              "Projektovanje baza podataka i migraciju postojećih podataka.",
              "Interne alate i enterprise rešenja koja pojednostavljuju procese.",
              "Testiranje pre svakog izdanja i bezbednosne dobre prakse.",
              "Održavanje, praćenje rada i razvoj novih funkcija posle lansiranja.",
            ],
          },
        ],
      },
      {
        h2: "Kada je web aplikacija po meri pravi izbor?",
        blocks: [
          { p: "Aplikacija po meri ima smisla kada gotov proizvod ne pokriva vaš proces, kada plaćate više alata koji ne razmenjuju podatke ili kada je softver deo vaše ponude klijentima. Primer iz naše prakse su online platforme za polaganje ispita sa analizom lica i upravljanjem prevarama, razvijene za klijente iz oblasti biometrije." },
          { p: `Ako već imate aplikaciju koja je spora ili teška za održavanje, možemo je analizirati i optimizovati umesto da počinjemo od nule. Pogledajte i <a href="${p("integrations")}">integracije i API</a> ako aplikaciju treba povezati sa drugim sistemima.` },
        ],
      },
      {
        h2: "Kako Tridan obezbeđuje kvalitet i bezbednost?",
        blocks: [
          { p: "Kvalitet obezbeđujemo kroz pregled koda, automatske testove i proveru svakog izdanja pre produkcije. Bezbednost pratimo od arhitekture: kontrola pristupa, zaštita podataka, ažurne zavisnosti i dobre prakse za web aplikacije. Aplikacije projektujemo tako da se mogu skalirati i održavati godinama, sa jasnom dokumentacijom za vaš tim." },
        ],
      },
    ],
    faq: [
      {
        q: "Koliko traje razvoj web aplikacije?",
        a: "Trajanje razvoja web aplikacije zavisi od broja funkcija, integracija i zahteva za dizajn. Tridan zato deli projekat na faze: prvo se isporučuje osnovna verzija sa najvažnijim funkcijama, koju korisnici mogu odmah da probaju, a zatim se dodaju nove celine u kratkim ciklusima. Posle prvog razgovora dobijate procenu roka za prvu verziju i plan narednih faza.",
      },
      {
        q: "Da li Tridan može da preuzme postojeću web aplikaciju?",
        a: "Da, Tridan može da preuzme razvoj i održavanje postojeće web aplikacije. Prvo radimo tehničku analizu koda, arhitekture, infrastrukture i bezbednosti, a zatim predlažemo plan: ispravke, optimizaciju performansi, postepeno osavremenjavanje ili, ako je potrebno, novu verziju. Tako se zadržava ono što radi dobro, a rizik promene ostaje pod kontrolom za vas i korisnike.",
      },
      {
        q: "Da li Tridan radi i dizajn korisničkog interfejsa?",
        a: "Da, UI/UX dizajn je deo razvoja web aplikacija u Tridanu. Interfejs projektujemo na osnovu stvarnih zadataka korisnika, sa ciljem da aplikacija bude jasna i laka za korišćenje bez dugog uvođenja. Dizajn pravimo zajedno sa razvojem, tako da se ideje rano proveravaju u radnoj verziji aplikacije, a ne samo na statičnim skicama.",
      },
    ],
  },

  integrations: {
    title: "Integracije sistema i razvoj API-ja | Tridan",
    description: "Tridan povezuje softverske sisteme preko API integracija: platni sistemi, servisi trećih strana, migracije podataka i razvoj sopstvenih REST API-ja.",
    h1: "Integracije sistema i razvoj API-ja",
    breadcrumb: "Integracije i API",
    service: { name: "Integracije sistema i razvoj API-ja", type: "API development and system integration" },
    lead: "API integracija je povezivanje dva ili više softverskih sistema tako da automatski razmenjuju podatke preko programskog interfejsa (API). Tridan razvija sopstvene API-je i integriše postojeće servise, kao što su platni sistemi, marketinške platforme, baze podataka i interni alati, u postojeće ili nove tokove rada.",
    sections: [
      {
        h2: "Koje integracije Tridan razvija?",
        blocks: [
          {
            list: [
              "Projektovanje i razvoj REST API-ja za vaše aplikacije i partnere.",
              "Integraciju platnih sistema, uključujući rešenja za kompanije iz Velike Britanije i Irske.",
              "Povezivanje servisa trećih strana sa postojećim procesima.",
              "Integracije za promotivne kampanje, kao što su nagradne igre za Coca-Colu.",
              "Migraciju podataka između sistema i baza podataka.",
              "Integracije sa blockchain mrežama Cardano i Avalanche.",
            ],
          },
        ],
      },
      {
        h2: "Kako izgleda projekat integracije?",
        blocks: [
          {
            steps: [
              { title: "Analiza sistema", text: "Mapiramo sisteme, podatke i ko je vlasnik kog podatka." },
              { title: "Dizajn API ugovora", text: "Definišemo poruke, greške, autentifikaciju i ograničenja." },
              { title: "Razvoj i testiranje", text: "Integraciju gradimo i testiramo u izolovanom okruženju." },
              { title: "Lansiranje i nadzor", text: "Pratimo rad integracije i reagujemo na greške posle lansiranja." },
            ],
          },
        ],
      },
      {
        h2: "Zašto su integracije važne za poslovanje?",
        blocks: [
          { p: `Kada sistemi ne razmenjuju podatke, ljudi ih prepisuju ručno, što je sporo i podložno greškama. Dobra integracija uklanja taj korak, daje svima iste podatke i omogućava automatizaciju. Integracije često idu uz <a href="${p("webApps")}">razvoj web aplikacija</a> i <a href="${p("ai")}">AI integracije</a>, gde API povezuje model sa vašim podacima.` },
        ],
      },
    ],
    faq: [
      {
        q: "Šta je REST API?",
        a: "REST API je način na koji jedna aplikacija nudi svoje podatke i funkcije drugim aplikacijama preko HTTP protokola, istog koji koristi web. Svaki resurs, na primer porudžbina ili korisnik, ima svoju adresu, a aplikacije ga čitaju i menjaju standardnim zahtevima. Tridan projektuje REST API-je sa jasnom dokumentacijom, autentifikacijom i obradom grešaka, da bi integracija bila pouzdana.",
      },
      {
        q: "Može li se povezati stariji sistem koji nema API?",
        a: "Često može. Kada stariji sistem nema API, Tridan procenjuje druge puteve: pristup bazi podataka, razmenu fajlova, postojeće izvoze ili izradu posebnog API sloja ispred sistema. Izbor zavisi od bezbednosti, stabilnosti i toga koliko se podaci često menjaju. Posle analize dobijate predlog rešenja sa jasno navedenim ograničenjima, pre nego što razvoj počne.",
      },
      {
        q: "Da li Tridan integriše platne sisteme?",
        a: "Da, Tridan je integrisao platne sisteme prilagođene kompanijama iz Velike Britanije i Irske. Integracija platnog sistema obuhvata proces plaćanja, potvrde i povraćaje, obradu grešaka, usklađivanje transakcija sa vašim sistemom i bezbedno rukovanje podacima. Svaku integraciju testiramo u testnom okruženju pružaoca plaćanja pre prelaska na stvarne transakcije, a posle lansiranja pratimo neuspela plaćanja.",
      },
    ],
  },

  devops: {
    title: "DevOps i cloud: AWS, Azure, GCP | Tridan",
    description: "Tridan postavlja DevOps procese i cloud infrastrukturu na AWS, Azure i Google Cloud: CI/CD, infrastruktura kao kod, kontejneri i nadzor sistema.",
    h1: "DevOps i cloud infrastruktura",
    breadcrumb: "DevOps i cloud",
    service: { name: "DevOps i cloud infrastruktura", type: "DevOps and cloud infrastructure" },
    lead: "DevOps je skup praksi koje spajaju razvoj i operacije kako bi se softver isporučivao često, pouzdano i automatski. Tridan postavlja i održava cloud infrastrukturu na Amazon Web Services, Microsoft Azure i Google Cloud platformi, sa CI/CD procesima, infrastrukturom kao kodom i nadzorom sistema.",
    sections: [
      {
        h2: "Koje DevOps usluge Tridan pruža?",
        blocks: [
          {
            list: [
              "Infrastrukturu kao kod (IaC) sa alatima Terraform i Ansible.",
              "CI/CD procese za automatsko testiranje i isporuku, na primer sa Jenkins i CircleCI.",
              "Kontejnere i orkestraciju sa Docker i Kubernetes.",
              "Nadzor i logove sa ELK stekom (Elasticsearch, Logstash, Kibana), Prometheus, Grafana i DataDog.",
              "Arhitekturu mikroservisa i migracije baza podataka.",
              "Bezbednosne dobre prakse za cloud okruženja.",
            ],
          },
        ],
      },
      {
        h2: "Na kojim cloud platformama Tridan radi?",
        blocks: [
          { p: "Radimo na tri velike cloud platforme: Amazon Web Services (AWS), Microsoft Azure i Google Cloud Platform (GCP). Postavljali smo CI/CD procese na AWS i Azure i radili migracije baza podataka za globalne kompanije. Platformu biramo prema postojećoj infrastrukturi, troškovima i zahtevima za lokaciju podataka." },
        ],
      },
      {
        h2: "Šta DevOps menja u svakodnevnom radu tima?",
        blocks: [
          { p: `Umesto ručnog postavljanja na server, svaka promena prolazi automatske testove i isporučuje se istim, ponovljivim postupkom. Infrastruktura je opisana u kodu, pa se okruženja mogu ponovo napraviti, a nadzor rano pokazuje probleme. Tim zato isporučuje češće i sa manje stresa. DevOps je deo svakog projekta <a href="${p("webApps")}">razvoja web aplikacija</a> u Tridanu.` },
        ],
      },
    ],
    faq: [
      {
        q: "Šta je CI/CD?",
        a: "CI/CD znači kontinuirana integracija i kontinuirana isporuka. Kod kontinuirane integracije svaka promena koda automatski prolazi izgradnju i testove, pa se greške otkrivaju odmah. Kontinuirana isporuka zatim istu proverenu verziju automatski postavlja na testno ili produkciono okruženje. Tridan postavlja CI/CD procese na AWS i Azure, tako da isporuka postaje redovan i predvidiv korak.",
      },
      {
        q: "Šta je infrastruktura kao kod?",
        a: "Infrastruktura kao kod (IaC) znači da su serveri, mreže, baze i ostali cloud resursi opisani u fajlovima koji se čuvaju zajedno sa kodom aplikacije. Alati kao što su Terraform i Ansible iz tih fajlova prave i menjaju infrastrukturu. Tako svaka promena ima istoriju i pregled, okruženja su ista, a sistem se posle kvara može ponovo podići na isti način.",
      },
      {
        q: "Da li Tridan može da preuzme postojeću cloud infrastrukturu?",
        a: "Da, Tridan može da preuzme održavanje postojeće infrastrukture na AWS, Azure ili Google Cloud platformi. Prvo pregledamo konfiguraciju, troškove, bezbednost, rezervne kopije i nadzor, a zatim predlažemo prioritete: opisivanje infrastrukture u kodu, automatizaciju isporuke i podešavanje upozorenja. Promene uvodimo postepeno, tako da sistem radi bez prekida tokom prelaza i posle njega.",
      },
    ],
  },

  ai: {
    title: "AI integracije za kompanije | Tridan",
    description: "Tridan uvodi AI u postojeće aplikacije i procese: čet asistenti, obrada dokumenata, pretraga internog znanja i automatizacija preko API-ja.",
    h1: "AI integracije za kompanije",
    breadcrumb: "AI integracije",
    service: { name: "AI integracije", type: "AI integration" },
    lead: "AI integracija je uvođenje modela veštačke inteligencije, kao što su veliki jezički modeli, u postojeći softver i poslovne procese. Tridan povezuje AI sa vašim aplikacijama, podacima i alatima preko API-ja, tako da AI obavlja konkretan posao: odgovara na pitanja, obrađuje dokumente ili automatizuje korake u procesu.",
    sections: [
      {
        h2: "Šta može da uradi AI integracija?",
        blocks: [
          {
            list: [
              "Čet asistent na sajtu ili u internoj aplikaciji koji odgovara iz vaših podataka.",
              "Obrada dokumenata i izdvajanje podataka iz mejlova, ugovora ili formulara.",
              "Pretraga internog znanja, uputstava i dokumentacije prirodnim jezikom.",
              "Automatizacija ponavljajućih koraka u procesu, uz proveru čoveka gde je potrebno.",
              "Povezivanje AI servisa sa postojećim aplikacijama preko API-ja.",
            ],
          },
        ],
      },
      {
        h2: "Kada je bolje gotovo rešenje nego razvoj po meri?",
        blocks: [
          { p: `Za AI agente koji odgovaraju na telefonske pozive i čet na sajtu postoji gotova platforma: <a href="${AI}">Tridan AI</a>. Razvoj po meri ima smisla kada AI treba da radi unutar vaših aplikacija, sa vašim bazama i specifičnim pravilima poslovanja.` },
        ],
      },
      {
        h2: "Kako Tridan pristupa podacima i bezbednosti?",
        blocks: [
          { p: "Pre razvoja zajedno definišemo koje podatke model sme da vidi, ko ima pristup, koji AI servis se koristi i gde se podaci obrađuju. Pristup je ograničen na ono što je zadatku potrebno, a odgovori i akcije se beleže radi provere. Gde greška ima posledice, AI predlaže, a čovek odobrava." },
        ],
      },
    ],
    faq: [
      {
        q: "Šta je AI agent?",
        a: "AI agent je program zasnovan na jezičkom modelu koji ne samo da odgovara na pitanja, već i obavlja korake u procesu: čita podatke iz sistema, popunjava formulare, zakazuje termine ili prosleđuje zahtev pravoj osobi. Agent radi u granicama alata i pravila koje mu Tridan zada. Gotove AI agente za pozive i čet nudi platforma Tridan AI.",
      },
      {
        q: "Da li naši podaci odlaze u javni AI model?",
        a: "To zavisi od izabranog AI servisa i načina postavljanja, i dogovara se pre početka projekta. Tridan sa vama bira pružaoca modela, region obrade i uslove korišćenja podataka, a model dobija samo podatke potrebne za zadatak. Kada podaci ne smeju da napuste vašu infrastrukturu, razmatramo modele koji rade na vašim serverima ili u vašem cloud nalogu.",
      },
      {
        q: "Gde mogu da naučim kako se AI bezbedno koristi u kompaniji?",
        a: "Obuke o veštačkoj inteligenciji drži Tridan Academy, zasebna kompanija za obrazovanje. Programi pokrivaju primenu AI u poslovanju, upravljanje AI sistemima i propise kao što je evropski AI Act, uz pripremu za ISO standarde. Tridan se bavi razvojem i integracijom, a Tridan Academy obukom ljudi koji te sisteme koriste i nadziru.",
      },
    ],
  },

  projects: {
    title: "Projekti i klijenti | Tridan",
    description: "Projekti agencije Tridan: online ispiti sa analizom lica, CI/CD na AWS i Azure, platni sistemi, migracije baza, promotivne kampanje i blockchain.",
    h1: "Projekti i klijenti",
    breadcrumb: "Projekti",
    lead: "Tridan je radio na projektima iz oblasti biometrije, online ispita, platnih sistema, cloud infrastrukture, promotivnih kampanja i blockchain tehnologija. Ova stranica opisuje vrste projekata koje smo isporučili, tehnologije koje smo koristili i kompanije sa kojima smo sarađivali.",
    sections: [
      {
        h2: "Koje projekte je Tridan isporučio?",
        blocks: [
          { h3: "Online platforme za ispite sa analizom lica" },
          { p: "Sarađujemo sa klijentima iz oblasti biometrije. Razvili smo online platforme za polaganje ispita sa integrisanom analizom lica i upravljanjem prevarama." },
          { h3: "CI/CD na AWS i Azure" },
          { p: `Postavili smo procese kontinuirane integracije i isporuke na Amazon Web Services i Microsoft Azure, za efikasnu i pouzdanu isporuku softvera. Više o tome na stranici <a href="${p("devops")}">DevOps i cloud</a>.` },
          { h3: "Integracija platnih sistema" },
          { p: `Integrisali smo platne sisteme prilagođene kompanijama iz Velike Britanije i Irske. Pogledajte <a href="${p("integrations")}">integracije i API</a>.` },
          { h3: "Migracija baza podataka" },
          { p: "Radili smo migracije baza podataka za globalne kompanije." },
          { h3: "Promotivne kampanje" },
          { p: "Podržali smo promotivne kampanje kao što su Coca-Cola nagradne igre, integracijom sistema koji pokreću marketinške aktivnosti." },
          { h3: "Blockchain rešenja" },
          { p: "Radili smo projekte na blockchain mrežama Cardano i Avalanche, sa rešenjima zasnovanim na decentralizovanim mrežama." },
        ],
      },
      {
        h2: "Sa kojim kompanijama je Tridan sarađivao?",
        blocks: [
          { p: "Sarađivali smo sa kompanijama u oblastima od biometrijskih sistema do blockchain tehnologija i promotivnih kampanja:" },
          { clients: true },
        ],
      },
    ],
  },

  about: {
    title: "O nama: tim za razvoj softvera | Tridan",
    description: "Tridan je tim programera i inženjera iz Beograda koji razvija softver po meri. Saznajte ko stoji iza kompanije, kako radimo i podatke o firmi.",
    h1: "O kompaniji Tridan",
    breadcrumb: "O nama",
    lead: "Tridan je tim softverskih programera, inženjera i ljudi koji rešavaju probleme, sa sedištem u Beogradu. Razvijamo softver po meri za kompanije, sa fokusom na full-stack razvoj, integracije, cloud i AI. Svaki projekat vodimo kao saradnju u kojoj je klijent u centru, od ideje do dugoročne podrške.",
    sections: [
      {
        h2: "Ko stoji iza Tridana?",
        blocks: [
          { p: `Tridan je osnovao <a href="${COMPANY.founder.linkedin}">Nemanja Milivojević</a>, koji vodi tim i tehnički pravac kompanije. O razvoju softvera i AI piše i snima na svom <a href="${COMPANY.founder.youtube}">YouTube kanalu</a>.` },
          { p: `Ista kompanija razvija i <a href="${AI}">Tridan AI</a>, platformu za AI agente za pozive i čet. Obuke drži <a href="${ACADEMY}">Tridan Academy</a>, zasebna kompanija.` },
        ],
      },
      {
        h2: "Kako Tridan radi?",
        blocks: [
          {
            list: [
              "<strong>Tim koji sarađuje:</strong> programeri, dizajneri i stratezi rade direktno sa vama od početka do kraja projekta.",
              "<strong>Iskustvo iz više industrija:</strong> biometrija, plaćanja, marketing, cloud i blockchain.",
              "<strong>Agilno i fleksibilno:</strong> proces se prilagođava vašim potrebama dok projekat traje.",
              "<strong>Kvalitet:</strong> svako rešenje prolazi testiranje pouzdanosti i bezbednosti.",
              "<strong>Dugoročno partnerstvo:</strong> podrška i nadogradnje da softver ostane skalabilan.",
            ],
          },
        ],
      },
      { h2: "Koji su zvanični podaci o kompaniji?", blocks: [{ legal: true }] },
    ],
  },

  contact: {
    title: "Kontakt: pošaljite upit za projekat | Tridan",
    description: "Kontaktirajte Tridan na office@tridan.rs. Pošaljite opis projekta, a mi odgovaramo sa predlogom sledećih koraka. Sedište: Beograd, Savski venac.",
    h1: "Kontakt",
    breadcrumb: "Kontakt",
    lead: `Tridan možete kontaktirati e-poštom na <a href="mailto:${COMPANY.email}" data-contact>${COMPANY.email}</a>. Pošaljite kratak opis projekta, rok i sisteme koje treba povezati, a mi odgovaramo sa predlogom sledećih koraka i okvirnim planom. Sedište kompanije je u Beogradu, na Savskom vencu, a sa klijentima radimo i online.`,
    heroCtas: [{ label: `Pišite na ${COMPANY.email}`, mail: true, primary: true }],
    sections: [
      {
        h2: "Kako započeti projekat sa Tridanom?",
        blocks: [
          {
            steps: [
              { title: "Pošaljite upit", text: "Opišite cilj, korisnike, postojeće sisteme i željeni rok." },
              { title: "Uvodni razgovor", text: "Razjašnjavamo zahteve i predlažemo pristup i tehnologije." },
              { title: "Procena i plan", text: "Dobijate obim prve verzije, faze i procenu." },
              { title: "Početak razvoja", text: "Radimo u kratkim ciklusima uz redovan uvid u napredak." },
            ],
          },
        ],
      },
      { h2: "Koji su podaci o kompaniji?", blocks: [{ legal: true }] },
    ],
  },

  privacy: {
    title: "Privatnost i kolačići | Tridan",
    description: "Kako Tridan obrađuje podatke na sajtu tridan.rs: Google Analytics samo uz pristanak, kolačići, e-pošta i vaša prava.",
    h1: "Politika privatnosti i kolačića",
    breadcrumb: "Privatnost",
    lastUpdated: "13. oktobar 2026.",
    lead: "Ova stranica objašnjava koje podatke sajt tridan.rs obrađuje, zašto i kako možete da promenite svoj izbor. Sajt ne koristi kolačiće za oglašavanje, a Google Analytics se učitava samo ako ga izričito prihvatite u obaveštenju o kolačićima.",
    sections: [
      { h2: "Ko je rukovalac podacima?", blocks: [{ p: `Rukovalac podacima je ${COMPANY.legalName}, ${COMPANY.address.street}, ${COMPANY.address.postalCode} ${COMPANY.address.locality}, Srbija, MB ${COMPANY.registrationNumber}, PIB ${COMPANY.taxId}. Kontakt za pitanja o privatnosti: <a href="mailto:${COMPANY.email}">${COMPANY.email}</a>.` }] },
      {
        h2: "Koje kolačiće i podatke koristimo?",
        blocks: [
          {
            list: [
              "<strong>Google Analytics 4</strong> (kolačići <code>_ga</code> i <code>_ga_*</code>): učitava se tek kada kliknete „Prihvatam”. Beleži posećene stranice, vrstu uređaja i približnu lokaciju, da bismo videli koje stranice su korisne. Pre pristanka Google skripta se ne učitava.",
              "<strong>Vaš izbor</strong> (<code>tridan-consent</code> u lokalnoj memoriji pregledača): pamti da li ste prihvatili ili odbili analitiku.",
              "<strong>E-pošta</strong>: kada nam pišete, koristimo vašu adresu i poruku samo da bismo odgovorili i vodili dogovor o projektu.",
            ],
          },
        ],
      },
      {
        h2: "Kako da promenite izbor i ostvarite svoja prava?",
        blocks: [
          { p: "Izbor o kolačićima možete promeniti u svakom trenutku preko linka „Podešavanja kolačića” u podnožju sajta. Povlačenjem pristanka analitika se isključuje, a kolačići Google Analytics se brišu." },
          { p: `Imate pravo da zatražite pristup, ispravku ili brisanje svojih podataka i da podnesete pritužbu Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti. Zahtev pošaljite na <a href="mailto:${COMPANY.email}">${COMPANY.email}</a>.` },
        ],
      },
    ],
  },
};

