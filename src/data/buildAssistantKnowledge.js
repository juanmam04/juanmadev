import {
  site,
  links,
  hero,
  about,
  journey,
  experience,
  projects,
  capabilities,
  stackCategories,
  principles,
  contact,
  whyDifferent,
} from './site.js'
import { assistantProfile } from './assistantProfile.js'

function block(title, lines) {
  return `## ${title}\n${lines.filter(Boolean).join('\n')}`
}

/**
 * Single document that feeds the assistant system prompt.
 * Regenerated from site.js + assistantProfile.js on each deploy.
 */
export function buildAssistantKnowledge() {
  const sections = [
    block('Identity', [
      `Name: ${site.name}`,
      `Title: ${site.title}`,
      `Location: ${site.location}`,
      `Email: ${site.email}`,
      `Languages: ${assistantProfile.identity.languages.map((l) => `${l.language} (${l.level})`).join('; ')}`,
      `Education: ${assistantProfile.identity.education.program}, ${assistantProfile.identity.education.institution} (since ${assistantProfile.identity.education.started}, in progress)`,
    ]),

    block('Professional summary', [assistantProfile.professionalSummary]),

    block('Official links', [
      `Site: https://juanmadevv.vercel.app`,
      `GitHub: ${links.github}`,
      `LinkedIn: ${links.linkedin}`,
      `X (Twitter): ${links.twitter}`,
      `Servo: ${links.servo}`,
      `Resume PDF: ${links.resume} (downloadable from the site)`,
    ]),

    block('Hero / main message', [
      `Badge: ${hero.badge}`,
      `Headline: ${hero.titleAccent} ${hero.titleVariants.join(' / ')}`,
      `Subheadline: ${hero.subheadline}`,
      `Supporting: ${hero.supporting}`,
      `Pillars: ${hero.credibility.join(', ')}`,
    ]),

    block('Why different', whyDifferent.map((d) => `- **${d.title}**: ${d.description}`)),

    block('About', about.paragraphs),

    block('Journey (timeline)', journey.map((j) => `- ${j.year}: ${j.title}`)),

    block(
      'Work experience',
      experience.flatMap((job) => [
        `### ${job.company} — ${job.role}`,
        `Period: ${job.period}`,
        job.description,
        ...job.bullets.map((b) => `- ${b}`),
        '',
        assistantProfile.creditonContext,
      ]),
    ),

    block(
      'Projects',
      projects.flatMap((p) => {
        const lines = [
          `### ${p.name}${p.featured ? ' (FEATURED)' : ''}`,
          `Role: ${p.role}`,
          `Summary: ${p.subtitle}`,
          p.description,
          `Stack: ${p.stack.join(', ')}`,
        ]
        if (p.links?.website) lines.push(`Web: ${p.links.website}`)
        if (p.caseStudy) {
          lines.push('Case study:')
          for (const cs of p.caseStudy) {
            if (cs.list) {
              lines.push(`${cs.title}: ${cs.list.map((i) => `- ${i}`).join(' ')}`)
            } else {
              lines.push(`${cs.title}: ${cs.content}`)
            }
          }
        }
        if (p.id === 'servo') lines.push('', assistantProfile.servoContext)
        if (p.id === 'ai-automation') lines.push('', assistantProfile.aiAutomationContext)
        return lines
      }),
    ),

    block(
      'Capabilities',
      capabilities.map((c) => `- **${c.title}**: ${c.description}`),
    ),

    block(
      'Technical stack by category',
      stackCategories.map((cat) => `- **${cat.name}**: ${cat.skills.join(', ')}`),
    ),

    block('Work principles', principles.map((p) => `- ${p}`)),

    block('Contact / what he is looking for', [contact.title, contact.description, `Career goal: ${assistantProfile.careerGoals.openTo}`, `Availability: ${assistantProfile.careerGoals.availability}`]),

    block('Work style', assistantProfile.workStyle.map((w) => `- ${w}`)),

    block(
      'FAQ (reference)',
      assistantProfile.faq.map((f) => `Q: ${f.q}\nA: ${f.a}`),
    ),

    block('Assistant boundaries (mandatory)', assistantProfile.boundaries.map((b) => `- ${b}`)),
  ]

  return sections.join('\n\n')
}

export const ASSISTANT_SUGGESTED_QUESTIONS = [
  'Who is Juan and what does he do?',
  'What is Servo and what was your role?',
  'What is your experience at CreditON?',
  'What is your tech stack?',
  'Are you open to new roles?',
]
