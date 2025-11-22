import React from 'react';
import { Edit2, Trash2, Mail, MessageCircle, User as UserIcon, MoreVertical, Smartphone, X } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Notification, NotificationType } from '../types';

interface DetailPaneProps {
  notification: Notification | null;
  onClose: () => void;
}

export const DetailPane: React.FC<DetailPaneProps> = ({ notification, onClose }) => {
  if (!notification) {
    return (
      <GlassCard className="h-full w-[400px] flex flex-col items-center justify-center p-8 text-center text-slate-400 bg-slate-50/30">
        <Smartphone size={64} className="mb-4 text-slate-300" strokeWidth={1} />
        <h3 className="text-lg font-medium text-slate-600 mb-2">No Selection</h3>
        <p className="text-sm max-w-[200px]">Select a notification from the list to view its details and recipients.</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="h-full w-[400px] flex flex-col relative animate-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="p-6 border-b border-slate-100/50 flex items-center justify-between bg-white/40">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="md:hidden p-2 -ml-2 text-slate-500"><X size={20}/></button>
          <div>
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider flex items-center gap-1.5">
              {notification.type === NotificationType.EMAIL ? <Mail size={12} /> : <MessageCircle size={12} />}
              {notification.type} Preview
            </span>
            <h2 className="text-lg font-bold text-slate-800 mt-1 line-clamp-1">{notification.title}</h2>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-full transition-colors" title="Edit">
            <Edit2 size={18} />
          </button>
          <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Delete">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Phone Preview */}
        <div className="p-8 flex justify-center bg-slate-50/50">
          <div className="w-[280px] bg-white rounded-[32px] border-[8px] border-slate-900 shadow-2xl overflow-hidden relative">
             {/* Notch */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-b-xl z-10"></div>
             
             {/* Screen Content */}
             <div className="h-[400px] bg-gray-50 flex flex-col pt-8 pb-4 px-4 overflow-y-auto">
                
                {/* Simulated App Header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                  <div className="h-3 w-20 bg-slate-200 rounded"></div>
                </div>

                {/* Message Bubble */}
                <div className="bg-white p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 mb-2">
                  <p className="text-xs font-bold text-slate-800 mb-1">{notification.title}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{notification.message}</p>
                </div>
                <p className="text-[10px] text-slate-400 ml-1">Delivered {notification.time}</p>

                {/* Call to Action Mockup */}
                <div className="mt-4 p-3 bg-slate-200/50 rounded-xl border border-slate-200">
                   <div className="w-full h-24 bg-slate-300 rounded-lg mb-2 relative overflow-hidden">
                      <img src={`https://picsum.photos/seed/${notification.id}/200/150`} className="w-full h-full object-cover opacity-80" alt="content" />
                   </div>
                   <div className="h-2 w-full bg-slate-300 rounded mb-1.5"></div>
                   <div className="h-2 w-2/3 bg-slate-300 rounded"></div>
                   <div className="mt-3 w-full h-8 bg-blue-500 rounded-lg"></div>
                </div>
             </div>
          </div>
        </div>

        {/* Details & Recipients */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-700">Recipients</h3>
            <span className="text-xs font-bold bg-cyan-100 text-cyan-700 px-2 py-1 rounded-full">
              {notification.recipients.length} Fans
            </span>
          </div>

          <div className="space-y-3">
            {notification.recipients.map(contact => (
              <div key={contact.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/60 border border-transparent hover:border-slate-100 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-500 overflow-hidden">
                    {contact.avatar ? (
                      <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon size={14} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{contact.name}</p>
                    <p className="text-xs text-slate-400">{contact.email || contact.phone}</p>
                  </div>
                </div>
                <button className="text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};