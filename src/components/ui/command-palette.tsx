'use client';
import { useEffect, useState, useCallback } from 'react';
import { Home, User, Cpu, BarChart2, Briefcase, Clock, Mail, X } from 'lucide-react';

const COMMANDS = [
  { label: 'Home', id: 'home', icon: Home, shortcut: '1' },
  { label: 'About', id: 'about', icon: User, shortcut: '2' },
  { label: 'Skills', id: 'skills', icon: Cpu, shortcut: '3' },
  { label: 'Stats', id: 'stats', icon: BarChart2, shortcut: '4' },
  { label: 'Projects', id: 'projects', icon: Briefcase, shortcut: '5' },
  { label: 'Timeline', id: 'timeline', icon: Clock, shortcut: '6' },
  { label: 'Contact', id: 'contact', icon: Mail, shortcut: '7' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);

  const filtered = COMMANDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  const close = useCallback(() => { setOpen(false); setQuery(''); setSelected(0); }, []);

  const navigate = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    close();
  }, [close]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setOpen(o => !o); }
      if (e.key === 'Escape') close();
      if (!open) return;
      if (e.key === 'ArrowDown') setSelected(s => Math.min(s + 1, filtered.length - 1));
      if (e.key === 'ArrowUp') setSelected(s => Math.max(s - 1, 0));
      if (e.key === 'Enter' && filtered[selected]) navigate(filtered[selected].id);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, selected, filtered, navigate, close]);

  if (!open) return null;

  return (
    <div className="command-overlay" onClick={close} role="dialog" aria-modal aria-label="Command palette">
      <div className="command-box" onClick={e => e.stopPropagation()}>
        <div className="flex items-center px-4 border-b border-white/6">
          <span className="text-white/20 mr-3 text-xs">⌘</span>
          <input
            autoFocus
            value={query}
            onChange={e => { setQuery(e.target.value); setSelected(0); }}
            placeholder="Search sections..."
            className="command-input"
            aria-label="Search commands"
          />
          <button onClick={close} className="text-white/20 hover:text-white/50 transition-colors p-1">
            <X size={14} />
          </button>
        </div>
        <div className="py-2 max-h-64 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-white/20 text-sm px-4 py-3">No results</p>
          ) : filtered.map((cmd, i) => (
            <button
              key={cmd.id}
              onClick={() => navigate(cmd.id)}
              className={`command-item w-full text-left ${i === selected ? 'selected' : ''}`}
            >
              <cmd.icon size={14} className="flex-shrink-0" />
              <span className="flex-1">{cmd.label}</span>
              <span className="text-white/15 text-xs border border-white/6 px-1.5 py-0.5 rounded">{cmd.shortcut}</span>
            </button>
          ))}
        </div>
        <div className="px-4 py-2 border-t border-white/5 flex items-center gap-4">
          <span className="text-white/15 text-xs">↑↓ navigate</span>
          <span className="text-white/15 text-xs">↵ select</span>
          <span className="text-white/15 text-xs ml-auto">ESC close</span>
        </div>
      </div>
    </div>
  );
}
