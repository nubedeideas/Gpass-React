import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  LayoutGrid, 
  Calendar as CalendarIcon, 
  Users, 
  BarChart2, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Globe,
  Mail,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { ViewState, Project } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const PROJECTS: Project[] = [
  { id: '1', name: 'Musica Basura Launch' },
  { id: '2', name: 'Summer Tour 2025' },
  { id: '3', name: 'Merch Drop V1' },
];

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isNewMenuOpen, setIsNewMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const newButtonRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (newButtonRef.current && !newButtonRef.current.contains(event.target as Node)) {
        setIsNewMenuOpen(false);
      }
      if (userButtonRef.current && !userButtonRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { id: 'NOTIFICATIONS', label: 'Home', icon: LayoutGrid },
    { id: 'AGENDA', label: 'Agenda', icon: Users },
    { id: 'CALENDAR', label: 'Calendar', icon: CalendarIcon },
    { id: 'REPORTS', label: 'Fans', icon: BarChart2 },
  ];

  return (
    <GlassCard className="h-full flex flex-col w-64 p-6 relative z-50">
      {/* Brand */}
      <div className="flex items-center gap-2 mb-8 text-slate-800">
        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-lg">L</div>
        <span className="font-bold text-xl tracking-tight">GPass</span>
      </div>

      {/* Project Selector */}
      <div className="relative mb-6">
        <button 
          onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
          className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-slate-600 bg-white/50 hover:bg-white/80 rounded-xl transition-colors border border-transparent hover:border-slate-200"
        >
          <span className="truncate">{selectedProject.name}</span>
          <ChevronDown size={16} />
        </button>
        
        {isProjectDropdownOpen && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-lg border border-slate-100 py-1 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {PROJECTS.map(proj => (
              <button
                key={proj.id}
                onClick={() => {
                  setSelectedProject(proj);
                  setIsProjectDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-cyan-600 transition-colors"
              >
                {proj.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* "New" Button (Google Drive Style) */}
      <div className="relative mb-8" ref={newButtonRef}>
        <button
          onClick={() => setIsNewMenuOpen(!isNewMenuOpen)}
          className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-[20px] shadow-lg shadow-cyan-200 hover:shadow-cyan-300 hover:-translate-y-0.5 transition-all duration-300 w-full font-semibold"
        >
          <Plus size={24} strokeWidth={3} />
          New
        </button>

        {isNewMenuOpen && (
          <div className="absolute top-14 left-0 w-full bg-white rounded-2xl shadow-xl border border-slate-100 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-left z-20">
            <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Create New</div>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors">
              <div className="p-1.5 bg-purple-100 text-purple-600 rounded-lg"><CalendarIcon size={16} /></div>
              <span className="text-sm font-medium">Event</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors">
              <div className="p-1.5 bg-green-100 text-green-600 rounded-lg"><Users size={16} /></div>
              <span className="text-sm font-medium">Contact</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 transition-colors">
              <div className="p-1.5 bg-orange-100 text-orange-600 rounded-lg"><MessageSquare size={16} /></div>
              <span className="text-sm font-medium">Notification</span>
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id as ViewState)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 ${
                isActive 
                  ? 'bg-white text-cyan-600 shadow-sm font-medium' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/40'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="mt-auto pt-6 border-t border-slate-200/50" ref={userButtonRef}>
        <div 
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/50 cursor-pointer transition-colors"
        >
          <img 
            src="https://picsum.photos/100/100" 
            alt="User" 
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">Oscar</p>
            <p className="text-xs text-slate-500 truncate">oscar@laylo.com</p>
          </div>
          <Settings size={16} className="text-slate-400" />
        </div>

        {isUserMenuOpen && (
          <div className="absolute bottom-20 left-6 right-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 py-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-cyan-50 hover:text-cyan-600 transition-colors">
              <Settings size={16} /> Settings
            </button>
            <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-cyan-50 hover:text-cyan-600 transition-colors">
              <Globe size={16} /> Public Profile
            </button>
            <div className="h-px bg-slate-100 my-1 mx-2"></div>
            <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </GlassCard>
  );
};