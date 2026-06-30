import { MessageSquare, Trash2, Mail, Clock } from "lucide-react";
import { useMessages } from "../../hooks/useMessages";

const MessagesAdmin = () => {
  const { messages, deleteMessage } = useMessages();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-pink-100 text-pink-600 rounded-2xl">
          <MessageSquare size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Inbox Messages</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Read messages sent through the Contact Us form.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {messages.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center shadow-sm">
             <MessageSquare size={48} className="mx-auto text-slate-300 mb-4" />
             <h3 className="text-xl font-bold text-slate-900">No Messages Yet</h3>
             <p className="text-slate-500 mt-2">When someone contacts you, their message will appear here.</p>
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg._id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative group">
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button onClick={() => deleteMessage(msg._id)} className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
                   <Trash2 size={18} />
                 </button>
              </div>

              <div className="flex items-start gap-4 pr-12">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl uppercase shrink-0">
                  {msg.name.charAt(0)}
                </div>
                <div className="w-full">
                  <h3 className="text-lg font-bold text-slate-900">{msg.name}</h3>
                  <div className="flex flex-wrap gap-4 mt-1 mb-4">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                      <Mail size={14} /> {msg.email}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                      <Clock size={14} /> {formatDate(msg.createdAt)}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-slate-700 whitespace-pre-wrap text-sm leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessagesAdmin;
