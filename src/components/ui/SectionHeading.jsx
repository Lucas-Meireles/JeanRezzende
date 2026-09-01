import { Reveal } from '../motion/Reveal';
export function SectionHeading({ eyebrow, title, text }) { return <Reveal className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</Reveal>; }
