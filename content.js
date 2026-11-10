/*
  ============================================================
  THIS IS THE ONLY FILE YOU NEED TO EDIT TO CHANGE THE SITE.
  ============================================================
  - Every list below (papers, builds, path, results, writing...)
    is a list of { ... } blocks. To add an item, copy a block,
    paste it where you want it to appear, and change the text.
  - Keep the quotes and commas. If the page goes blank after an
    edit, you most likely deleted a quote, comma or bracket.
  - Research notes are NOT listed here. Any folder you add under
    /research with a README.md inside shows up on the site by
    itself. See README.md for details.
*/

window.SITE = {
  // Used to find your research notes automatically.
  repo: "Sanjidh090/sanjidh090.github.io",
  branch: "main",

  name: "Sanjid Hasan",
  logo: "sanjid-hasan",
  email: "sanjid9657@gmail.com",
  cv: "assets/cv/Sanjid_Hasan_CV.pdf",

  // ---------- Hero ----------
  eyebrow: "EEE @ KUET · class of 2027 · Khulna, Bangladesh",
  headline: "Speech AI that runs on small machines.",
  intro:
    "I'm Sanjid Hasan. I adapt compact speech models to Bangla and to speakers mainstream systems miss, and I build the hardware side too.",

  // Lines in the terminal window. highlight: true makes the output amber.
  terminal: [
    { cmd: "whoami", out: ["sanjid hasan · ai researcher · eee undergrad"] },
    {
      cmd: "cat focus.txt",
      out: [
        "edge-efficient asr",
        "accessible speech recognition",
        "low-resource bangla nlp",
        "embedded systems and pcb design",
      ],
    },
    { cmd: "ls papers/ | wc -l", out: ["5"] },
    { cmd: "next --talk", out: ["NeurIPS 2026 · Sydney · 11 Dec"], highlight: true },
  ],

  // ---------- Cards under the hero ----------
  // Optional fields: wide (double width), highlight (amber border),
  // chips (small tags), bars (a tiny bar chart), dot (status dot).
  stats: [
    {
      wide: true,
      label: "TOKENS PER BENGALI WORD",
      value: "9.16 <span class='muted'>to</span> <span class='accent'>1.30</span>",
      bars: [
        { label: "before", pct: 100, alt: true },
        { label: "after", pct: 14.2 },
      ],
      text: "Swapping an English tokenizer for a Bangla one shortens decoding by 85.8% and stops a small model from looping.",
    },
    {
      label: "EDGE MODEL",
      value: "21.54%",
      text: "WER on Bangla with about 61M parameters, at a real-time factor of 0.0053.",
    },
    {
      highlight: true,
      label: "UP NEXT",
      value: "NeurIPS 2026, Sydney",
      small: true,
      text: "Talk on CPU streaming recognition for dysarthric speech, 11 December.",
    },
    {
      label: "PAPERS",
      value: "5",
      chips: ["ICML WS", "EMNLP WS", "NeurIPS Comp", "IEEE"],
    },
    {
      label: "OPEN DATA",
      value: "882 h",
      text: "of diarized Bengali speech released for anyone to train on.",
    },
    {
      label: "STATUS",
      value: "Open to work",
      small: true,
      dot: true,
      text: "Research collaborations and internships in speech, NLP or embedded AI.",
    },
  ],

  // ---------- Focus areas (numbered automatically) ----------
  focus: [
    { title: "Edge-efficient ASR", text: "Making compact recognisers like Moonshine work outside English." },
    { title: "Accessible speech", text: "Streaming recognition for dysarthric speakers, on a CPU." },
    { title: "Low-resource Bangla", text: "Corpora, diarization and fine-tuning for a language of 230 million." },
    { title: "Embedded hardware", text: "PCB design, ESP32 prototypes and the robots they go into." },
  ],

  // ---------- Papers ----------
  // featured: true makes the card full width (use it for one paper).
  // Badge kinds: "solid" (accent), "amber" (solid amber),
  //              "amber-outline", "outline" (grey).
  // Newest first is a good order.
  papers: [
    {
      featured: true,
      badges: [
        { text: "ICML 2026 Workshop", kind: "solid" },
        { text: "Muslims in ML · poster", kind: "outline" },
        { text: "2nd prize, KUET University Day", kind: "amber-outline" },
      ],
      title: "Tokenizer Transplantation: Mitigating Autoregressive Collapse in Edge-Efficient Bengali ASR",
      url: "https://arxiv.org/abs/2607.09598",
      authors: "Sanjid Hasan, Md. Abdur Rahman · July 2026",
      summary:
        "Moonshine breaks down on Bengali because its English byte-level tokenizer shatters each word. Replacing the decoder vocabulary with BanglaBERT's WordPiece removes the instability.",
      links: [
        { label: "arXiv 2607.09598", url: "https://arxiv.org/abs/2607.09598" },
        { label: "code", url: "https://github.com/Sanjidh090/moonshine-base-bn" },
        { label: "model", url: "https://huggingface.co/Sanjidh090/moonshine-base-bn" },
      ],
    },
    {
      badges: [
        { text: "NeurIPS 2026 Competition Track", kind: "amber" },
        { text: "talk · non-archival", kind: "outline" },
      ],
      title: "Beyond Recognition Accuracy: Efficient CPU Streaming ASR for Dysarthric Speech",
      url: "https://neurips.cc/virtual/2026/181064",
      authors:
        "Sanjid Hasan, Zaina Rahman, Suhita Islam Aurthi, MD Rashaduzzaman Rakib, Sadia Jahan Turabe, Md. Wasif Rahman",
      summary:
        "I led the six-member KMinds team behind this entry to the Speech Accessibility Project Challenge 2.",
      links: [{ label: "neurips page", url: "https://neurips.cc/virtual/2026/181064" }],
    },
    {
      badges: [
        { text: "EMNLP 2026 Workshop", kind: "solid" },
        { text: "SALMA · pp. 190–201", kind: "outline" },
      ],
      title:
        "Lipi-Ghor: A Large-Scale, Diarized, Multi-Domain Bengali Speech Corpus and a Scalable Pipeline for Building It",
      url: "https://arxiv.org/abs/2610.36184",
      authors: "Sanjid Hasan, A H M Fuad, Risalat Labib, Bayazid Hasan Simon",
      summary: "A speaker-labelled Bengali speech corpus and the pipeline for building more like it.",
      links: [
        { label: "arXiv 2610.36184", url: "https://arxiv.org/abs/2610.36184" },
        { label: "dataset", url: "https://huggingface.co/datasets/Sanjidh090/Lipi-Ghor-bn-882-SSTT" },
      ],
    },
    {
      badges: [
        { text: "arXiv preprint · Feb 2026", kind: "outline" },
        { text: "DL Sprint 4.0 podium", kind: "amber-outline" },
      ],
      title:
        "Make It Hard to Hear, Easy to Learn: Long-Form Bengali ASR and Speaker Diarization via Extreme Augmentation and Perfect Alignment",
      url: "https://arxiv.org/abs/2602.23070",
      authors: "Sanjid Hasan, Risalat Labib, A H M Fuad, Bayazid Hasan",
      summary:
        "Training on deliberately degraded audio beats adding more data. The pipeline runs at about 0.019 real-time factor.",
      links: [
        { label: "arXiv 2602.23070", url: "https://arxiv.org/abs/2602.23070" },
        { label: "code", url: "https://github.com/Sanjidh090/DL_Sprint_4.0_Solution" },
      ],
    },
    {
      badges: [
        { text: "IEEE COMPAS 2025", kind: "outline" },
        { text: "computational biology", kind: "outline" },
      ],
      title:
        "KSiFoldNet: A K-Symplectic Integrated Transformer Network for RNA Structural Prediction with AdamW Optimization",
      url: "", // paste the IEEE Xplore link here when you have it
      authors: "A E Evan, A Hassan, R H Tenis, S Singha, E A Rajon, S Hasan",
      summary: "A transformer network for predicting RNA structure.",
      links: [],
    },
  ],

  // ---------- Builds ----------
  // kind is the small label. hardware: true colours it amber.
  // url can be "" for a card that is not a link.
  builds: [
    {
      kind: "model",
      title: "moonshine-base-bn",
      text: "A Bangla speech recogniser small enough for edge devices, trained on 1.43M clips.",
      url: "https://huggingface.co/Sanjidh090/moonshine-base-bn",
    },
    {
      kind: "demo",
      title: "Model 3D Explorer",
      text: "Walk through a speech model's weights as an interactive grid.",
      url: "https://huggingface.co/spaces/Sanjidh090/moonshine-model-3d-explorer",
    },
    {
      kind: "hardware",
      hardware: true,
      title: "Low-cost ECG monitor",
      text: "An ESP32 and AD8232 heart monitor streaming to a live Streamlit dashboard.",
      url: "https://github.com/Sanjidh090/Low-cost-ECG-Monitoring",
    },
    {
      kind: "hardware",
      hardware: true,
      title: "Line-following robot",
      text: "Custom PCB, designed and etched in-house, running embedded C firmware.",
      url: "",
    },
    {
      kind: "dataset",
      title: "Lipi-Ghor",
      text: "882 hours of Bengali speech with speaker turns and transcripts. CC BY 4.0.",
      url: "https://huggingface.co/datasets/Sanjidh090/Lipi-Ghor-bn-882-SSTT",
    },
    {
      kind: "dataset",
      title: "KUET Whispers",
      text: "2,485 anonymised Bangla and English student posts for sentiment research.",
      url: "https://data.mendeley.com/datasets/zhv9jjv3n6/1",
    },
  ],

  // ---------- Research notes ----------
  // Notes come from the /research folder by themselves.
  // Use noteTitles only to give a folder a nicer title than its name.
  notesIntro: "Working notes and literature reviews, straight from my research folder.",
  noteTitles: {
    "bangla-asr": "A short history of Bangla ASR",
    "edge-inference": "Edge-efficient AI: reading list",
  },
  // Shown only if GitHub cannot be reached. Format: "folder/file.md".
  notesFallback: ["asr-study/README.md", "bangla-asr/readme.md", "edge-inference/readme.md"],

  // ---------- Roles (timeline) ----------
  // current: true gives the entry a bright dot.
  pathIntro:
    "Most of what I know I learned by teaching it, so I spend a lot of time running workshops, paper readings and teams at KUET.",
  path: [
    {
      current: true,
      when: "Sep 2026 – now",
      role: "Technical Secretary, IEEE Student Branch KUET",
      text: "Seminars, industrial visits and the branch's official communications.",
    },
    {
      current: true,
      when: "Oct 2025 – now",
      role: "Assistant Domain Lead for NLP and founding member, KMinds",
      text: "KUET's student-led AI research community. I mentor NLP and speech projects and led our NeurIPS challenge team.",
    },
    {
      current: true,
      when: "2025 – now",
      role: "Founder, Team Frozen Voltage",
      text: "Electronics, AI and robotics projects, plus a free PCB design and etching workshop for the 2K24 batch.",
    },
    {
      when: "Jan – Aug 2025",
      role: "Research Assistant, Hackules Institute for Advanced Research",
      text: "Computer vision, generative AI and AI-based skeletal diagnostics.",
    },
    {
      when: "2024 – 2026",
      role: "Techforge KUET and campus ambassador work",
      text: "Organised Circuit Master 1.0 and hardware workshops. Best Campus Ambassador at SciBlitz 1.0.",
    },
  ],

  // ---------- Competition results ----------
  // highlight: true = amber, wide: true = double width.
  results: [
    {
      highlight: true,
      wide: true,
      rank: "2nd runner-up + Dataset Prize",
      event: "DL Sprint 4.0, BUET CSE Fest",
      meta: "Team Villagers · 2026",
    },
    { rank: "2nd prize", event: "KUET University Day poster", meta: "technical segment · 2026" },
    { rank: "3rd", event: "AgriYield 2025", meta: "solo entry" },
    { rank: "4th", event: "NWU CSE Fest Datathon", meta: "Team Maverics · 2025" },
    { rank: "8th", event: "First Byte Datathon", meta: "Team Frozen Voltage · 2025" },
    { rank: "Best ambassador", event: "SciBlitz 1.0", meta: "campus ambassador" },
  ],

  // ---------- Articles published elsewhere ----------
  writing: [
    {
      title: "Painting with Pixels: The Mathematics of Style Transfer",
      where: "medium",
      url: "https://medium.com/@sanjidh090/painting-with-pixels-the-mathematics-of-style-transfer-ba9b9dd09d92",
    },
    {
      title: "What Is Invariance?",
      where: "dev",
      url: "https://dev.to/sanjidh090/what-is-invariencewhy-do-we-need-2n5f",
    },
    {
      title: "Gigabytes vs. Gibibytes",
      where: "dev",
      url: "https://dev.to/sanjidh090/gigabytes-vs-gibibytes-understanding-the-difference-in-data-measurement-9d6",
    },
    {
      title: "The Enigma of Angle Brackets in Coding Culture",
      where: "dev",
      url: "https://dev.to/sanjidh090/the-enigma-of-analyzing-angle-brackets-and-chevrons-in-coding-culture-1l2k",
    },
  ],

  // ---------- About ----------
  // photo: put an image in assets/img and write its path, e.g.
  // "assets/img/me.jpg". Leave "" to show no photo.
  about: {
    photo: "",
    paragraphs: [
      "I study Electrical and Electronic Engineering at KUET and graduate in October 2027.",
      "I'm a Level 7 Google Maps Local Guide with over 1,000 contributions, which I treat as an archive of places in Khulna before they change.",
      "Kaggle Datasets Expert. I speak Bangla and English, and a little Arabic.",
    ],
  },

  // ---------- Footer ----------
  contactHeadline: "Have a speech problem that needs a small model? Write to me.",
  profiles: [
    { label: "github", url: "https://github.com/Sanjidh090" },
    { label: "hugging face", url: "https://huggingface.co/Sanjidh090" },
    { label: "kaggle", url: "https://www.kaggle.com/sanjidh090" },
    { label: "linkedin", url: "https://www.linkedin.com/in/sanjidh090/" },
    { label: "orcid", url: "https://orcid.org/0009-0006-1271-9786" },
    { label: "medium", url: "https://medium.com/@sanjidh090" },
    { label: "dev", url: "https://dev.to/sanjidh090" },
  ],
};
