export const GlitchText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => (
  <span className={`glitch ${className}`} data-text={text}>
    {text}
  </span>
);
