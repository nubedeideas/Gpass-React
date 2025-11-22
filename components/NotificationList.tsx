import React from 'react';
import { Mail, MessageCircle, Clock, MoreHorizontal } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Notification, NotificationType } from '../types';

interface NotificationListProps {
  notifications: Notification[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({ 
  notifications, 
  selectedId, 
  onSelect 
}) => {
  
  // Group notifications by Date
  const grouped = notifications.reduce((acc, curr) => {
    const date = curr.date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(curr);
    return acc;
  }, {} as Record<string, Notification[]>);

  const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  // Helper to format date nicely
  const formatDateHeader = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) return "Today";
    
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  return (
    <GlassCard className="h-full flex flex-col flex-1 min-w-[360px] p-0">
      <div className="p-6 pb-2 border-b border-slate-100/50">
        <h2 className="text-2xl font-bold text-slate-800">Drop Messages</h2>
        <p className="text-slate-500 text-sm mt-1">Manage your automated communications</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {sortedDates.map(dateKey => (
          <div key={dateKey}>
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 bg-slate-100/50 px-3 py-1 rounded-full">
                {formatDateHeader(dateKey)}
              </h3>
              <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            <div className="space-y-3">
              {grouped[dateKey].map(notif => {
                const isSelected = selectedId === notif.id;
                return (
                  <div
                    key={notif.id}
                    onClick={() => onSelect(notif.id)}
                    className={`group relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                      isSelected 
                        ? 'bg-white border-cyan-400 shadow-lg shadow-cyan-100/50 scale-[1.02]' 
                        : 'bg-white/40 border-white/60 hover:bg-white/80 hover:shadow-md hover:scale-[1.01]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 overflow-hidden">
                        <div className={`mt-0.5 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          notif.type === NotificationType.EMAIL 
                            ? 'bg-purple-100 text-purple-600' 
                            : 'bg-emerald-100 text-emerald-600'
                        }`}>
                          {notif.type === NotificationType.EMAIL ? <Mail size={18} /> : <MessageCircle size={18} />}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-bold text-slate-800 truncate text-sm">{notif.title}</span>
                            <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 font-medium">
                              {notif.groupName}
                            </span>
                          </div>
                          <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                            {notif.message}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                          <Clock size={12} /> {notif.time}
                        </span>
                        {isSelected && (
                           <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};