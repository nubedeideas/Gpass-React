import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { NotificationList } from './components/NotificationList';
import { DetailPane } from './components/DetailPane';
import { Notification, NotificationType, ViewState, Contact } from './types';
import { GlassCard } from './components/GlassCard';
import { Calendar, Users, BarChart2 } from 'lucide-react';

// --- MOCK DATA ---
const RECIPIENTS_MOCK: Contact[] = [
  { id: '1', name: 'Ana Garcia', email: 'ana@example.com', avatar: 'https://picsum.photos/id/64/100/100' },
  { id: '2', name: 'David Lee', phone: '+1 555-0123', avatar: 'https://picsum.photos/id/91/100/100' },
  { id: '3', name: 'Sophie Turner', email: 'sophie@music.com', avatar: 'https://picsum.photos/id/129/100/100' },
  { id: '4', name: 'Marcus Jones', phone: '+1 555-0987' },
];

const NOTIFICATIONS_MOCK: Notification[] = [
  {
    id: '1',
    title: 'Lanzamiento Musica Basura',
    message: 'Este es el nuevo lanzamiento de mi Musica Basura!!! Check it out now.',
    date: '2025-05-30',
    time: '11:45 AM',
    type: NotificationType.SMS,
    groupName: 'Super Fans',
    recipients: RECIPIENTS_MOCK,
  },
  {
    id: '2',
    title: 'Pre-save Reminder',
    message: 'Hey! Just a reminder that the new track drops in 24 hours. Pre-save now to be the first to hear it.',
    date: '2025-05-30',
    time: '09:00 AM',
    type: NotificationType.EMAIL,
    groupName: 'All Subscribers',
    recipients: [...RECIPIENTS_MOCK, { id: '5', name: 'Extra Fan', email: 'fan@fan.com' }],
  },
  {
    id: '3',
    title: 'Merch Drop Early Access',
    message: 'Secret link for the new hoodie drop. Only for VIPs.',
    date: '2025-05-29',
    time: '4:20 PM',
    type: NotificationType.SMS,
    groupName: 'VIP',
    recipients: [RECIPIENTS_MOCK[0], RECIPIENTS_MOCK[2]],
  },
  {
    id: '4',
    title: 'Tour Announcement',
    message: 'We are going on tour! Check the dates in your city.',
    date: '2025-05-28',
    time: '10:00 AM',
    type: NotificationType.EMAIL,
    groupName: 'Newsletter',
    recipients: RECIPIENTS_MOCK,
  },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('NOTIFICATIONS');
  const [selectedNotificationId, setSelectedNotificationId] = useState<string | null>('1');

  const selectedNotification = NOTIFICATIONS_MOCK.find(n => n.id === selectedNotificationId) || null;

  const renderContent = () => {
    switch (currentView) {
      case 'AGENDA':
        return (
           <GlassCard className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-white/40 border-dashed border-2 border-slate-300">
             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                <Users size={40} />
             </div>
             <h2 className="text-3xl font-bold text-slate-800 mb-2">Google Contacts</h2>
             <p className="text-slate-500 max-w-md">Syncing your contacts directory... (Simulation)</p>
           </GlassCard>
        );
      case 'CALENDAR':
        return (
          <GlassCard className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-white/40 border-dashed border-2 border-slate-300">
             <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6 text-purple-600">
                <Calendar size={40} />
             </div>
             <h2 className="text-3xl font-bold text-slate-800 mb-2">Google Calendar</h2>
             <p className="text-slate-500 max-w-md">Fetching your scheduled events... (Simulation)</p>
           </GlassCard>
        );
      case 'REPORTS':
        return (
          <GlassCard className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-white/40 border-dashed border-2 border-slate-300">
             <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-600">
                <BarChart2 size={40} />
             </div>
             <h2 className="text-3xl font-bold text-slate-800 mb-2">Analytics</h2>
             <p className="text-slate-500 max-w-md">Viewing fan engagement reports... (Simulation)</p>
           </GlassCard>
        );
      default:
        // 'NOTIFICATIONS' View - Split Layout
        return (
          <>
            <NotificationList 
              notifications={NOTIFICATIONS_MOCK} 
              selectedId={selectedNotificationId}
              onSelect={setSelectedNotificationId}
            />
            
            <div className="hidden lg:block">
              <DetailPane 
                notification={selectedNotification} 
                onClose={() => setSelectedNotificationId(null)}
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex h-screen w-screen p-4 gap-5 bg-[#eef2f6]">
      {/* Column 1: Navigation Sidebar */}
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
      />

      {/* Dynamic Content Area (Columns 2 & 3) */}
      <main className="flex-1 flex gap-5 min-w-0">
        {renderContent()}
      </main>

      {/* Mobile/Tablet Detail Overlay (Optional functionality for responsiveness) */}
      {selectedNotificationId && currentView === 'NOTIFICATIONS' && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm p-4 flex items-center justify-end">
            <div className="h-full bg-transparent shadow-2xl">
              <DetailPane 
                notification={selectedNotification} 
                onClose={() => setSelectedNotificationId(null)}
              />
            </div>
        </div>
      )}
    </div>
  );
};

export default App;