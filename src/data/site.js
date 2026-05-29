export const site = {
  name: 'Juan Manuel Martínez',
  title: 'Fullstack Software Engineer',
  location: 'Montevideo, Uruguay',
  email: 'juanmartinezt.dev@gmail.com',
}

export const links = {
  github: 'https://github.com/juanmam04',
  linkedin: 'https://www.linkedin.com/in/juan-manuel-mart%C3%ADnez-trinidad',
  twitter: 'https://x.com/jm_martiinez',
  servo: 'https://servo.com.uy/',
  email: 'mailto:juanmartinezt.dev@gmail.com',
  resume: '/JuanManuelMartinezResume.pdf',
  resumeFilename: 'JuanManuelMartinezResume.pdf',
}

export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  badge: 'Available for startup opportunities',
  headline: 'I build software that ships to production.',
  titleAccent: 'I build software',
  titleVariants: [
    'that ships to production.',
    'end to end.',
    'for startup teams.',
    'from UI to infrastructure.',
    'people actually use.',
  ],
  subheadline:
    'Fullstack Software Engineer based in Uruguay, working across frontend, backend, cloud infrastructure, product development, and automation systems.',
  supporting:
    'Currently building and maintaining production systems at CreditON while independently developing Servo, a marketplace platform for service providers in Uruguay.',
  credibility: [
    'Production Systems',
    'Fullstack Development',
    'Cloud Infrastructure',
    'Product Engineering',
    'Automation Workflows',
  ],
}

export const whyDifferent = [
  {
    title: 'Product-minded engineer',
    description:
      "I don't only write code. I think about the product, the user experience, the business logic, and the system behind it.",
  },
  {
    title: 'End-to-end builder',
    description:
      'I can work across frontend, backend, infrastructure, deployment, databases, and product decisions.',
  },
  {
    title: 'Real production experience',
    description:
      'I work with real systems, real operational workflows, real bugs, and real infrastructure.',
  },
  {
    title: 'Startup execution mindset',
    description:
      'I enjoy moving quickly, solving problems, taking ownership, and turning ideas into working software.',
  },
]

export const about = {
  title: 'About',
  paragraphs: [
    "I'm a fullstack software engineer from Montevideo, Uruguay. My work sits at the intersection of engineering, product, infrastructure, and experimentation.",
    'Professionally, I build and maintain production systems using Ruby on Rails, JavaScript, MySQL, and cloud infrastructure. Independently, I build software products and automation systems from scratch, including Servo, a marketplace platform for service providers in Uruguay.',
    "I'm interested in startup environments, scalable software, product engineering, automation systems, and teams that care about shipping useful products quickly.",
  ],
}

export const journey = [
  {
    year: '2023',
    title: 'Started Computer Science degree at Universidad ORT Uruguay.',
  },
  {
    year: '2024',
    title: 'Joined CreditON as Fullstack Developer.',
  },
  {
    year: '2024',
    title: 'Started building Servo.',
  },
  {
    year: 'Now',
    title: 'Looking for startup engineering opportunities and continuing to build products and systems.',
  },
]

export const experience = [
  {
    company: 'CreditON',
    role: 'Fullstack Developer',
    period: 'February 2024 – Present',
    description:
      'Developing and maintaining production features for internal financial systems using Ruby on Rails, JavaScript, and MySQL.',
    bullets: [
      'Build and maintain production features used in real operational workflows.',
      'Implement system improvements, new functionalities, and bug fixes.',
      'Work with Ruby on Rails, JavaScript, MySQL, and internal tooling.',
      'Handle infrastructure-related tasks involving AWS EC2, Linux environments, PM2, and NGINX.',
      'Collaborate on backend maintenance, performance optimization, and production reliability.',
    ],
  },
]

export const projects = [
  {
    id: 'servo',
    featured: true,
    name: 'Servo',
    role: 'Founder & Fullstack Developer',
    subtitle: 'Marketplace platform for service providers in Uruguay.',
    description:
      "Servo connects clients with service providers across Uruguay — search, profiles, and direct contact in one product. I own the stack end-to-end: frontend, backend, database, AWS infrastructure, deployment, and product decisions.",
    stack: ['React', 'Node.js', 'MySQL', 'AWS EC2', 'AWS RDS', 'NGINX', 'PM2'],
    links: {
      website: links.servo,
      caseStudy: '#servo-case-study',
    },
    caseStudy: [
      {
        key: 'problem',
        title: 'Problem',
        content:
          'Finding trusted local service providers in Uruguay is fragmented — clients bounce between informal channels with little visibility into quality or availability.',
      },
      {
        key: 'solution',
        title: 'Solution',
        content:
          'A focused marketplace where clients discover verified providers by category and location, with real ratings and direct contact — built as a production web product, not a prototype.',
      },
      {
        key: 'role',
        title: 'My role',
        content:
          'Founder and sole engineer: product direction, UX, API design, frontend, backend, schema, AWS deployment, and ongoing operations.',
      },
      {
        key: 'stack',
        title: 'Stack',
        content:
          'React SPA, Node.js API, MySQL on RDS, EC2 + NGINX + PM2 for production hosting and process management.',
      },
      {
        key: 'challenges',
        title: 'Challenges',
        wide: true,
        list: [
          'Shipping full product scope while maintaining production reliability solo.',
          'Designing search and discovery flows that stay simple on mobile.',
          'Owning infrastructure, deployments, and iteration speed without a dedicated ops team.',
        ],
      },
    ],
  },
  {
    id: 'ai-automation',
    featured: false,
    name: 'AI Content Automation Systems',
    role: 'Builder / Experimentation',
    subtitle: 'Automation workflows for AI-generated storytelling and content creation.',
    description:
      'Experiments focused on automating parts of the content creation process, including prompt engineering, image generation workflows, rendering pipelines, scene planning, and storytelling automation.',
    stack: [
      'Prompt Engineering',
      'Automation Systems',
      'AI Workflows',
      'Rendering Pipelines',
      'Content Systems',
    ],
  },
]

export const capabilities = [
  {
    title: 'Fullstack Web Development',
    description:
      'End-to-end web applications with modern frontend interfaces and reliable backend systems.',
  },
  {
    title: 'Product Engineering',
    description:
      'Translating product requirements into technical decisions, user flows, and shippable features.',
  },
  {
    title: 'Cloud Deployment',
    description:
      'Deploying and maintaining applications on AWS with proper server configuration and monitoring.',
  },
  {
    title: 'Backend Systems',
    description:
      'Building and maintaining APIs, databases, authentication, and production backend logic.',
  },
  {
    title: 'Frontend Interfaces',
    description:
      'Crafting responsive, accessible interfaces with clean component architecture and attention to detail.',
  },
  {
    title: 'Automation Workflows',
    description:
      'Designing automated pipelines for content generation, AI workflows, and operational efficiency.',
  },
  {
    title: 'Debugging & Maintenance',
    description:
      'Diagnosing production issues, optimizing performance, and keeping systems reliable over time.',
  },
  {
    title: 'Startup Execution',
    description:
      'Moving fast with ownership, prioritizing what matters, and shipping working software under constraints.',
  },
]

export const stackCategories = [
  {
    name: 'Frontend',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Responsive UI', 'UI Implementation'],
  },
  {
    name: 'Backend',
    skills: [
      'Ruby on Rails',
      'Node.js',
      'MySQL',
      'REST APIs',
      'Authentication',
      'Backend Maintenance',
    ],
  },
  {
    name: 'Infrastructure',
    skills: [
      'AWS EC2',
      'AWS RDS',
      'NGINX',
      'PM2',
      'Linux',
      'Deployment',
      'Server Configuration',
    ],
  },
  {
    name: 'Tools',
    skills: ['Git', 'GitHub', 'VS Code', 'Cursor', 'Terminal'],
  },
  {
    name: 'Product',
    skills: [
      'Product Thinking',
      'UX Decisions',
      'Rapid Prototyping',
      'Technical Ownership',
      'Startup Execution',
    ],
  },
  {
    name: 'Automation',
    skills: [
      'Prompt Engineering',
      'AI Workflows',
      'Rendering Pipelines',
      'Workflow Design',
      'Content Automation',
    ],
  },
]

export const principles = [
  'Build real things, not just demos.',
  'Ship quickly, then improve.',
  'Understand the product before writing code.',
  'Take ownership across the stack.',
  'Keep systems simple until complexity is necessary.',
  'Care about both user experience and technical quality.',
  'Learn aggressively when the problem requires it.',
  'Use AI-assisted workflows to prototype and iterate faster.',
]

export const contact = {
  title: "Let's build something useful.",
  description:
    "I'm interested in fullstack engineering opportunities in ambitious startup environments, especially teams that value ownership, speed, product instinct, and practical execution.",
}

export const socialLinks = [
  { label: 'GitHub', href: links.github, icon: 'github' },
  { label: 'LinkedIn', href: links.linkedin, icon: 'linkedin' },
  { label: 'X', href: links.twitter, icon: 'x' },
  { label: 'Servo', href: links.servo, icon: 'external' },
  { label: 'Email', href: links.email, icon: 'mail' },
]
