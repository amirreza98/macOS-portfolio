// ------------------ TYPES ------------------

export type NavLink = {
  id: number;
  name: string;
  type: string;
};

export type NavIcon = {
  id: number;
  img: string;
};

export type DockApp = {
  id: string;
  name: string;
  icon: string;
  canOpen: boolean;
};

export type TechCategory = {
  category: string;
  items: string[];
};

export type Social = {
  id: number;
  text: string;
  icon: string;
  bg: string;
  link: string;
};

export type PhotoLink = {
  id: number;
  icon: string;
  title: string;
};

export type GalleryItem = {
  id: number;
  img: string;
};

// Finder File System Types
export type FinderFile = {
  id: number;
  name: string;
  icon: string;
  kind: "file";
  fileType: "txt" | "url" | "img" | "fig" | "pdf";
  position?: string;
  subtitle?: string;
  href?: string;
  path?: string;
  imageUrl?: string;
  description?: string[];
};

export type FinderFolder = {
  id: number;
  name: string;
  icon: string;
  kind: "folder";
  type?: string;
  path?: string;
  position?: string;
  windowPosition?: string;
  children: (FinderFolder | FinderFile)[];
};

// Window types
export type WindowInfo = {
  isOpen: boolean;
  zIndex: number;
  data: any | null;
};

export type WindowConfig = Record<string, WindowInfo>;

// ------------------ DATA ------------------

// Nav bar links
export const navLinks: NavLink[] = [
  { id: 1, name: "Projects", type: "finder" },
  { id: 3, name: "Contact", type: "contact" },
  { id: 4, name: "Resume", type: "resume" },
];

export const navIcons: NavIcon[] = [
  { id: 1, img: "/icons/wifi.svg" },
  { id: 2, img: "/icons/search.svg" },
  { id: 3, img: "/icons/user.svg" },
  { id: 4, img: "/icons/mode.svg" },
];

// Dock apps
export const dockApps: DockApp[] = [
  { id: "finder", name: "Finder", icon: "finder.png", canOpen: true },
  { id: "safari", name: "Articles", icon: "safari.png", canOpen: true },
  { id: "photos", name: "Photos", icon: "photos.png", canOpen: true },
  { id: "contact", name: "Contact", icon: "contact.png", canOpen: true },
  { id: "terminal", name: "Skills", icon: "terminal.png", canOpen: true },
  { id: "chatgpt", name: "ChatGPT", icon: "chatgpt.png", canOpen: true },
  { id: "trash", name: "Trash", icon: "trash.png", canOpen: true },
];

// Tech Stack
export const techStack: TechCategory[] = [
  { category: "Frontend", items: ["React.js", "Next.js", "TypeScript"] },
  { category: "Mobile", items: ["React Native", "Expo"] },
  { category: "Styling", items: ["Tailwind CSS", "Sass", "CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "NestJS"] },
  { category: "Database", items: ["MongoDB", "PostgreSQL"] },
  { category: "Dev Tools", items: ["Git", "GitHub", "Docker"] },
];

// Social Media Links
export const socials: Social[] = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/amirreza98",
  },
  {
    id: 2,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/amirrezaazemati/",
  },
];

// Photos sidebar links
export const photosLinks: PhotoLink[] = [
  { id: 1, icon: "/icons/gicon1.svg", title: "Library" },
  { id: 2, icon: "/icons/gicon2.svg", title: "Memories" },
  { id: 3, icon: "/icons/file.svg", title: "Places" },
  { id: 4, icon: "/icons/gicon4.svg", title: "People" },
  { id: 5, icon: "/icons/gicon5.svg", title: "Favorites" },
];

// Gallery
export const gallery: GalleryItem[] = [
  { id: 1, img: "/images/gal1.png" },
  { id: 2, img: "/images/gal2.png" },
  { id: 3, img: "/images/gal3.png" },
  { id: 4, img: "/images/gal4.png" },
];

// ------------------ FINDER LOCATIONS ------------------

export const WORK_LOCATION: FinderFolder = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  windowPosition: "top-[10vh] left-20",
  children: [
    // Project 1 — Classroom Management SaaS (new)
    {
      id: 1,
      name: "Classroom SaaS",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-5 left-0",
      windowPosition: "top-[5vh] left-10",
      children: [
        {
          id: 1,
          name: "ClassroomSaaS.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Stack: React · TypeScript · NestJS · Spring Boot · Kafka · PostgreSQL · MongoDB · Redis · Docker · AWS EC2/S3 · Prometheus · Grafana",
            "Production microservices platform with 8 containerized services built on Spring Boot and Spring Cloud Gateway (ES256 JWT validation via JWKS, Redis fixed-window rate limiting per role).",
            "Services: Express auth-service (better-auth, GitHub OAuth, Arcjet bot detection), Spring Boot academic core (Stripe payments, Flyway migrations, Kafka event publishing), NestJS voice service (OpenAI Realtime API, PDF-to-voice via AWS S3), Spring Boot analytics (Kafka consumer), and a Yjs CRDT collaboration service (STOMP/SockJS, Redis pub/sub for multi-instance broadcast).",
            "Deployed on AWS EC2 with Nginx reverse proxy, SSL, and selective CI/CD via GitHub Actions (paths-filter rebuilds only changed services, tree-hash image caching).",
            "Full observability via Prometheus scraping all services every 15 s with auto-provisioned Grafana dashboards.",
          ],
        },
        {
          id: 2,
          name: "classroom.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://classroom-nine-omega.vercel.app",
          position: "top-5 right-10",
        },
        {
          id: 3,
          name: "github.com",
          icon: "/images/git.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/amirreza98/classroom",
          position: "top-20 right-10",
        },
      ],
    },
    // Project 2 — Textile Defect Detection (new)
    {
      id: 2,
      name: "Textile Defect AI",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-5 left-35",
      windowPosition: "top-[10vh] left-20",
      children: [
        {
          id: 1,
          name: "TextileDefect.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Stack: Python · YOLOv8 · AWS Lambda · ECR · API Gateway · S3 · Docker · GitHub Actions",
            "Real-time AI quality control system for textile manufacturing.",
            "Trained a YOLOv8s model on 1,900+ labeled fabric defect images achieving 4-class defect classification (stains, tears, loose threads, general defects).",
            "Deployed inference as a containerized Lambda function via Docker + ECR with automated CI/CD through GitHub Actions.",
            "Integrated API Gateway as the public REST endpoint and S3 for annotated result storage.",
            "Built a dashboard consuming the serverless API, displaying real-time bounding boxes and confidence scores.",
          ],
        },
        {
          id: 2,
          name: "textile-dashboard.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://textile-dashboard-nine.vercel.app",
          position: "top-5 right-10",
        },
        {
          id: 3,
          name: "github.com",
          icon: "/images/git.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/amirreza98/textile-defect",
          position: "top-20 right-10",
        },
      ],
    },
    // Project 3 — macOS Portfolio (new)
    {
      id: 3,
      name: "macOS Portfolio",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-5 left-70",
      windowPosition: "top-[15vh] left-20",
      children: [
        {
          id: 1,
          name: "macOS Portfolio.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Stack: TypeScript · React · Node.js · Vite · Zustand · GSAP · AWS Lambda · API Gateway · Terraform",
            "Interactive macOS-style portfolio with an integrated GPT-powered AI assistant, real-time chat via REST API, and GSAP-driven animations.",
            "Migrated backend from EC2 to serverless AWS Lambda + API Gateway, with infrastructure managed via Terraform and automated deployments through GitHub Actions CI/CD.",
          ],
        },
        {
          id: 2,
          name: "github.com",
          icon: "/images/git.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/amirreza98/macos_portfolio",
          position: "top-5 right-10",
        },
      ],
    },
    // Project 4 — SolarSense
    {
      id: 4,
      name: "SolarSense",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-5 left-105",
      windowPosition: "top-[5vh] left-10",
      children: [
        {
          id: 1,
          name: "SolarSense.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Realtime microgrid dashboard monitoring and fault detection (Modbus/MQTT, React).",
          ],
        },
        {
          id: 2,
          name: "SolarSence.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/SolarSence.png",
        },
        {
          id: 3,
          name: "Design.fig",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://www.figma.com/design/qshNmE2vylw1DtA5Pi8lHK/SolaSense?node-id=0-1&t=dzWSDv6ESIbNSJMy-1",
          position: "top-60 right-20",
        },
      ],
    },
    // Project 5 — CISpace Platform
    {
      id: 5,
      name: "CISpace Platform",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-35 left-0",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "CISpace Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "Seat/room booking platform with admin dashboard — React + Python API.",
          ],
        },
        {
          id: 2,
          name: "CISpace Website.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://cispace.vercel.app",
          position: "top-5 left-15",
        },
        {
          id: 3,
          name: "Preview 1.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-40",
          imageUrl: "/images/CISpace.png",
        },
        {
          id: 4,
          name: "Preview 2.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-70",
          imageUrl: "/images/CISpace2.png",
        },
        {
          id: 5,
          name: "Preview 3.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-40 left-105",
          imageUrl: "/images/CISpace3.png",
        },
        {
          id: 6,
          name: "Preview 4.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-70 left-105",
          imageUrl: "/images/CISpace4.png",
        },
        {
          id: 7,
          name: "Preview 5.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-65 left-0",
          imageUrl: "/images/CISpace5.png",
        },
        {
          id: 8,
          name: "github.com",
          icon: "/images/git.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/amirreza98/CISpace",
          position: "top-20 left-60",
        },
      ],
    },
    // Project 6 — T-shirt Customizer (updated description)
    {
      id: 6,
      name: "t-shirt-customizer",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-35 left-35",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "t-shirt-customizer.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Stack: React · Three.js · WebGL · Node.js · JWT · PostgreSQL",
            "3D product visualization platform with real-time texture rendering, camera controls, and GPU-optimized mesh rendering.",
            "Implemented user authentication, persistent design storage, and performance optimization for smooth 60 fps rendering across devices.",
          ],
        },
        {
          id: 2,
          name: "t-shirt-customizer.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://thriving-bubblegum-aee085.netlify.app",
          position: "top-10 right-5",
        },
        {
          id: 3,
          name: "Preview 1.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-0",
          imageUrl: "/images/t-shirt-customize.png",
        },
        {
          id: 4,
          name: "Preview 2.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-35",
          imageUrl: "/images/t-shirt-customize2.png",
        },
        {
          id: 5,
          name: "Preview 3.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-70",
          imageUrl: "/images/t-shirt-customize3.png",
        },
        {
          id: 6,
          name: "Preview 4.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-105",
          imageUrl: "/images/t-shirt-customize4.png",
        },
        {
          id: 7,
          name: "github.com",
          icon: "/images/git.png",
          kind: "file",
          fileType: "fig",
          position: "top-12 left-45",
          href: "https://github.com/amirreza98/t-shirt-customizer",
        },
      ],
    },
    // Project 7 — Real Estate (updated description)
    {
      id: 7,
      name: "realtor Platform",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-35 left-70",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "realtor Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Stack: Next.js · TypeScript · Tailwind CSS · REST API",
            "Property listing platform with advanced filtering, search, and server-side rendering for SEO optimization.",
          ],
        },
        {
          id: 2,
          name: "realtor.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://realtor-tan-beta.vercel.app",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "Preview 1.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-5",
          imageUrl: "/images/realtor.png",
        },
        {
          id: 4,
          name: "Preview 2.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-40",
          imageUrl: "/images/realtor2.png",
        },
        {
          id: 5,
          name: "Preview 3.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/realtor3.png",
        },
        {
          id: 6,
          name: "github.com",
          icon: "/images/git.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/amirreza98/realtor",
          position: "top-12 right-45",
        },
      ],
    },
    // Project 8 — old-portfolio
    {
      id: 8,
      name: "old-portfolio",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-35 left-105",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "old-portfolio Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "My old portfolio website (Vanilla JS, CSS).",
          ],
        },
        {
          id: 2,
          name: "old-portfolio.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://thunderous-scone-5524b8.netlify.app",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "Preview 1.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-35 left-0",
          imageUrl: "/images/old-portfolio.png",
        },
        {
          id: 4,
          name: "Preview 2.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-35 left-35",
          imageUrl: "/images/old-portfolio2.png",
        },
        {
          id: 5,
          name: "Preview 3.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-35 left-67",
          imageUrl: "/images/old-portfolio3.png",
        },
        {
          id: 6,
          name: "Preview 4.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-65 left-0",
          imageUrl: "/images/old-portfolio4.png",
        },
        {
          id: 7,
          name: "Preview 5.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-65 left-35",
          imageUrl: "/images/old-portfolio5.png",
        },
        {
          id: 8,
          name: "Preview 6.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-65 left-65",
          imageUrl: "/images/old-portfolio6.png",
        },
        {
          id: 9,
          name: "github.com",
          icon: "/images/git.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/amirreza98/old-portfolio",
          position: "top-60 right-10",
        },
      ],
    },
    // Project 9 — OpenMemory
    {
      id: 9,
      name: "OpenMemory",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-65 left-0",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "Open Memory.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Platform for sharing memories and photos.",
          ],
        },
        {
          id: 2,
          name: "openmemory.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://polite-mochi-42c933.netlify.app/",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "Preview 1.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-50",
          imageUrl: "/images/openmemory.png",
        },
        {
          id: 4,
          name: "Preview 2.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-95",
          imageUrl: "/images/openmemory2.png",
        },
        {
          id: 5,
          name: "github.com",
          icon: "/images/git.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/amirreza98/openmemory",
          position: "top-60 right-10",
        },
      ],
    },
    // Project 10 — wishlist-extention
    {
      id: 10,
      name: "wishlist-extention",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-65 left-35",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "wishlist extention.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-35 left-90",
          description: [
            "A chrome extension for saving products from e-commerce sites to a wishlist and viewing them later. Products can be categorized.",
          ],
        },
        {
          id: 2,
          name: "github.com",
          icon: "/images/git.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/amirreza98/wishlist-extention",
          position: "top-20 right-90",
        },
      ],
    },
    // Project 11 — MemoryGame
    {
      id: 11,
      name: "MemoryGame",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-65 left-70",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "MemoryGame Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Play a classic memory card game to improve your concentration and memory skills.",
          ],
        },
        {
          id: 2,
          name: "memorygame.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://fanciful-cascaron-80c237.netlify.app/",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "Preview 1.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-90",
          imageUrl: "/images/memorygame.png",
        },
        {
          id: 4,
          name: "Preview 2.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-50",
          imageUrl: "/images/memorygame2.png",
        },
        {
          id: 5,
          name: "github.com",
          icon: "/images/git.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/amirreza98/memorygame",
          position: "top-60 right-20",
        },
      ],
    },
    // Project 12 — architectSytileTimline
    {
      id: 12,
      name: "architectSytileTimline",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-65 left-105",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "architectSytileTimline.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "A timeline website for architectural styles from ancient to modern.",
          ],
        },
        {
          id: 2,
          name: "architectSytileTimline.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://architect-sytile-timline-7vm3o9xpa-amir-reza-azematis-projects.vercel.app",
          position: "top-10 right-20",
        },
        {
          id: 3,
          name: "github.com",
          icon: "/images/plain.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/amirreza98/architectSytileTimline",
          position: "top-60 right-20",
        },
      ],
    },
  ],
};

export const ABOUT_LOCATION: FinderFolder = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/Amir.JPEG",
    },
    {
      id: 2,
      name: "graduated-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/images/Amir-2.JPEG",
    },
    {
      id: 3,
      name: "conference-me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-52 left-80",
      imageUrl: "/images/Amir-3.JPG",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      imageUrl: "/images/Amir.JPEG",
      description: [
        "Hey! I’m Amir Reza 👋, a Full Stack developer.",
        "I specialize in React, Next.js, and clean UI/UX.",
        "I love building smooth, fast, interactive experiences.",
      ],
    },
  ],
};

export const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      path: "/files/resume.pdf",
      fileType: "pdf",
    },
    {
      id: 2,
      name: "Certificates",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-5 right-35",
      children: [
        {
          id: 1,
          name: "Degree.pdf",
          icon: "/images/pdf.png",
          path: "/files/Certificates/MasterDegree.pdf",
          fileType: "pdf",
        },
        {
          id: 2,
          name: "Docker.pdf",
          icon: "/images/pdf.png",
          path: "/files/Certificates/Docker.pdf",
          kind: "file",
          fileType: "pdf",
        },
        {
          id: 3,
          name: "Accessibility.pdf",
          icon: "/images/pdf.png",
          path: "/files/Certificates/Accessibility.pdf",
          kind: "file",
          fileType: "pdf",
        },
        {
          id: 4,
          name: "FullStack.pdf",
          icon: "/images/pdf.png",
          path: "/files/Certificates/FullStack.pdf",
          kind: "file",
          fileType: "pdf",
        },
        {
          id: 5,
          name: "IntroductionJs.pdf",
          icon: "/images/pdf.png",
          path: "/files/Certificates/IntroductionJs.pdf",
          kind: "file",
          fileType: "pdf",
        },
        {
          id: 6,
          name: "Python.pdf",
          icon: "/images/pdf.png",
          path: "/files/Certificates/Python.pdf",
          kind: "file",
          fileType: "pdf",
        },
        {
          id: 7,
          name: "React.pdf",
          icon: "/images/pdf.png",
          path: "/files/Certificates/React.pdf",
          kind: "file",
          fileType: "pdf",
        },
        {
          id: 8,
          name: "React2.pdf",
          icon: "/images/pdf.png",
          path: "/files/Certificates/React2.pdf",
          kind: "file",
          fileType: "pdf",
        },
        {
          id: 9,
          name: "React3.pdf",
          icon: "/images/pdf.png",
          path: "/files/Certificates/React3.pdf",
          kind: "file",
          fileType: "pdf",
        },
        {
          id: 10,
          name: "React4.pdf",
          icon: "/images/pdf.png",
          path: "/files/Certificates/React4.pdf",
          kind: "file",
          fileType: "pdf",
        },
        {
          id: 11,
          name: "ReactHooks.pdf",
          icon: "/images/pdf.png",
          path: "/files/Certificates/ReactHooks.pdf",
          kind: "file",
          fileType: "pdf",
        },
        {
          id: 12,
          name: "ServerSide.pdf",
          icon: "/images/pdf.png",
          path: "/files/Certificates/ServerSide.pdf",
          kind: "file",
          fileType: "pdf",
        },
        {
          id: 13,
          name: "Authentication.pdf",
          icon: "/images/pdf.png",
          path: "/files/Certificates/Authentication.pdf",
          kind: "file",
          fileType: "pdf",
        },
      ],
    },
  ],
};

export const TRASH_LOCATION: FinderFolder = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

// ------------------ WINDOWS ------------------

export const INITIAL_Z_INDEX = 1000;

export const WINDOW_CONFIG: WindowConfig = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  instagram: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  chatgpt: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  trash: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};
