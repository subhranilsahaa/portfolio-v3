export const Navbar: React.FC<{ name: string }> = ({ name }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10 h-[58px] bg-black/55 backdrop-blur-xl border-b border-border">
      <div className="font-display font-bold text-[1.05rem] tracking-tight cursor-pointer select-none">
        <span className="grad-text">{name.split(' ')[0]}</span>
      </div>
      <div className="hidden md:flex gap-8">
        {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm text-muted hover:text-text transition-colors relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-accent to-[#b87fff] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
          </a>
        ))}
      </div>
    </nav>
  );
};
