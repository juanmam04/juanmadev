/**
 * Extra context for the assistant (beyond site.js).
 * Edit this file to help the AI know you better.
 */
export const assistantProfile = {
  identity: {
    fullName: 'Juan Manuel Martínez',
    preferredName: 'Juan',
    nationality: 'Uruguayan',
    city: 'Montevideo',
    country: 'Uruguay',
    languages: [
      { language: 'Spanish', level: 'Native' },
      { language: 'English', level: 'Professional working proficiency (reading, writing, technical meetings)' },
    ],
    education: {
      institution: 'Universidad ORT Uruguay',
      program: 'B.S. in Computer Science (in progress)',
      started: '2023',
    },
  },

  professionalSummary: `
Juan is a fullstack software engineer with a product mindset and startup execution.
He combines work on production financial systems (CreditON) with building complete products
independently (Servo). He does not limit himself to "closing tickets": he thinks about UX, business logic, deployment, and maintenance.
He is interested in ambitious teams that value ownership, speed, and practical quality.
`.trim(),

  workStyle: [
    'Prefers to understand the problem and the user before writing code.',
    'Comfortable owning frontend, backend, database, and infrastructure when needed.',
    'Used to real bugs, deploys, and production maintenance — not just demos.',
    'Uses AI tools (Cursor, prompt workflows) to prototype and iterate faster, not to replace technical judgment.',
    'Values simplicity until complexity is justified.',
  ],

  careerGoals: {
    openTo: 'Fullstack opportunities at startups, especially with ownership and product impact.',
    availability: 'Open to new opportunities (per site badge: available for startup opportunities).',
    notInterestedIn: 'Not specified on the site — if asked about something far outside technical/product profile, suggest direct contact.',
  },

  creditonContext: `
At CreditON he works on internal financial systems in production. Main stack: Ruby on Rails, JavaScript, MySQL.
Also touches infrastructure: AWS EC2, Linux, PM2, NGINX. His role includes new features, improvements, bugs,
optimization, and reliability in real environments operated by the business.
`.trim(),

  servoContext: `
Servo (servo.com.uy) is his own product: a marketplace connecting clients with service providers in Uruguay.
He is founder and sole engineer: product, UX, API, React frontend, Node.js backend, MySQL on RDS, hosting on EC2 with NGINX and PM2.
Problem it solves: finding trusted local providers without relying only on informal channels.
`.trim(),

  aiAutomationContext: `
Personal project/experimentation (not a listed company): AI content automation systems —
prompt engineering, image generation, render pipelines, scene planning, and automated storytelling.
It is an area of interest and experimentation, not a public commercial product like Servo.
`.trim(),

  faq: [
    {
      q: 'Do you take freelance work?',
      a: 'The site is focused on fullstack startup opportunities. For one-off collaborations, email is best with scope details.',
    },
    {
      q: 'Do you work remotely?',
      a: 'Based in Montevideo, Uruguay. Remote/hybrid arrangement is not explicit on the site; contact him directly for that.',
    },
    {
      q: 'How many years of experience do you have?',
      a: 'At CreditON since February 2024. Also building own products (Servo since 2024). Do not invent a total years number if not in the data.',
    },
    {
      q: 'Can you work frontend-only or backend-only?',
      a: 'His profile is end-to-end fullstack; he can go deep on any layer per team needs, but his edge is covering product + full stack.',
    },
  ],

  boundaries: [
    'DO NOT invent salaries, equity, hire dates, or companies not in the data.',
    'DO NOT claim certifications, awards, or user/revenue metrics not documented.',
    'If information is insufficient, say so honestly and offer contact: juanmartinezt.dev@gmail.com',
    'For legal, medical, or intimate personal topics: redirect to direct contact.',
    'Live site: juanmadevv.vercel.app; GitHub: github.com/juanmam04',
  ],
}
