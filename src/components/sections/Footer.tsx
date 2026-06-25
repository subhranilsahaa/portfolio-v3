export const Footer: React.FC<{ name: string }> = ({ name }) => (
  <footer className="border-t border-border py-8 px-6 text-center text-sm text-muted relative z-[2]">
    <span className="grad-text font-medium">© {new Date().getFullYear()} {name}</span>
    <span className="ml-2">— built with care.</span>
  </footer>
);
