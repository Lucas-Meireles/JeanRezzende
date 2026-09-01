import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { smoothScrollToId } from '../../services/navigation';

export function LiquidButton({ children, href, onClick, variant = 'primary', className = '' }) {
  const ref = useRef(null);

  const move = (event) => {
    if (!ref.current || matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();

    gsap.to(ref.current, {
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 8,
      y: ((event.clientY - rect.top) / rect.height - 0.5) * 6,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const reset = () => {
    if (!ref.current) {
      return;
    }

    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.55,
      ease: 'elastic.out(1,.45)',
    });
  };

  const handleClick = (event) => {
    onClick?.(event);

    if (event.defaultPrevented || !href?.startsWith('#')) {
      return;
    }

    event.preventDefault();
    smoothScrollToId(href);
  };

  const props = {
    ref,
    className: `liquid-button liquid-button--${variant} ${className}`,
    onMouseMove: move,
    onMouseLeave: reset,
    onClick: handleClick,
  };

  const content = (
    <>
      <span>{children}</span>
      <ArrowUpRight size={18} />
    </>
  );

  return href ? <a href={href} {...props}>{content}</a> : <button type="button" {...props}>{content}</button>;
}
