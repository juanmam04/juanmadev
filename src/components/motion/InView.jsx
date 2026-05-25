import { useRef } from 'react'
import { useInView } from '../../hooks/useInView'
import { cn } from '../../lib/math'

/**
 * Intersection-observer reveal with CSS custom properties for stagger.
 * @param {object} props
 * @param {'div' | 'section' | 'article' | 'li' | 'header'} [props.as]
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {number} [props.delay] ms
 * @param {boolean} [props.once]
 */
export default function InView({ as: Tag = 'div', children, className = '', delay = 0, once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once })

  return (
    <Tag
      ref={ref}
      className={cn('in-view', inView && 'in-view--visible', className)}
      style={{ '--delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
