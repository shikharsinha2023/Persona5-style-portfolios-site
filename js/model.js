/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  githubUser: "shikharsinha2023",

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "shikharsinha2025@gmail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured projects (hand-written, shown above the GitHub feed) ----
  featured: [
    {
      title: "Smart PC Builder",
      tag: "PC Builder", color: "#3dff6e",
      url: "https://github.com/Priyanshu-Lakra/smart_pc_builder", cta: "View on GitHub →",
      tech: ["Java", "Maven", "3D Model"],
      desc: "A PC-building project with a 3D gaming PC model. Explore the repository for its implementation and current features.",
    },
    {
      title: "SpendSphere – Expense Tracking Desktop App",
      tag: "Desktop App", color: "#f1e05a", date: "Oct 2026",
      url: "https://github.com/tejwanirishabh1/SpendSphere", cta: "View on GitHub →",
      tech: ["Java", "Java Swing", "SQLite"],
      desc: "Built a Java desktop app for tracking expenses and visualizing spending trends, with monthly and category budgets, persistent SQLite storage, and searchable, filterable transactions.",
    },
    {
      title: "AI-Based Inventory Forecasting System",
      tag: "Machine Learning", color: "#e60012", date: "Jan 2026 – Apr 2026",
      url: "https://github.com/tushardaga69-official/AI-Project-", cta: "View on GitHub →",
      tech: ["Python", "Machine Learning", "Linear Regression", "Pandas", "Streamlit"],
      desc: "Developed a Linear Regression model analyzing historical sales data to predict demand and estimate stock requirements. Designed an intuitive interface to help businesses reduce stockouts and overstocking through data-driven decisions.",
    },
    {
      title: "TRACTION – AI Productivity & Personal Finance",
      tag: "AI Web App", color: "#3178c6", date: "Dec 2025 – Mar 2026",
      url: "https://github.com/shikharsinha2023", cta: "Explore GitHub →",
      tech: ["React", "Node.js", "Supabase", "AI Integration", "JavaScript", "CSS3"],
      desc: "Built an all-in-one dashboard combining expense tracking, task management, calendar scheduling, and group expense splitting. AI categorizes expenses and turns natural-language input into structured tasks, with secure Supabase authentication and a responsive UI.",
    },
  ],

  // Repos already shown in "featured" get hidden from the GitHub feed
  featuredRepoNames: [
    "smart_pc_builder",
    "SpendSphere",
    "AI-Project-",
  ],

  // Shown if the GitHub API can't be reached
  fallbackRepos: [
  ],

  // Optional thumbnail overrides: repo name → image path.
  // Anything not listed is looked up at assets/projects/<RepoName>.png
  projectImages: {},

  langColors: {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", HTML: "#e34c26",
    "Jupyter Notebook": "#DA5B0B", MATLAB: "#e16737", Java: "#b07219", C: "#555", "C++": "#f34b7d",
  },

  // ---- Skills screen ----
  skills: [
    { group: "Languages", items: ["Python", "Java (Swing)", "JavaScript", "C", "C++"] },
    { group: "Web Development", items: ["React", "Node.js", "Flask", "HTML5", "CSS3", "Frontend & Backend Architecture", "UI/UX Design"] },
    { group: "AI, ML & Data", items: ["Machine Learning", "Linear Regression", "CNNs", "Deep Learning", "Pandas", "Streamlit", "Data Cleaning", "Prompt Engineering"] },
    { group: "Tools & Platforms", items: ["GitHub", "GitHub Copilot", "Gemini", "Lovable (GenAI)", "Supabase", "SQLite", "MS Excel", "Canva", "UiPath (RPA)"] },
    { group: "Professional", items: ["Team Management", "Effective Communication", "Time Management", "Adaptability", "Self-learning"] },
  ],

  // ---- Data fetching ----
  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};
