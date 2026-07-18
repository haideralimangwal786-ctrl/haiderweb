import { useState } from "react";
import { MessageSquare, Trash2, Mail, Clock, CornerUpLeft, CheckCircle2 } from "lucide-react";
import { useMessages } from "../../hooks/useMessages";

const MessagesAdmin = () => {
  const { messages, deleteMessage, replyToMessage } = useMessages();
  const [replyText, setReplyText] = useState({});
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [isSending, setIsSending] = useState({});

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleSendReply = async (e, id) => {
    e.preventDefault();
    const text = replyText[id];
    if (!text || !text.trim()) return;

    setIsSending(prev => ({ ...prev, [id]: true }));
    const success = await replyToMessage(id, text.trim());
    setIsSending(prev => ({ ...prev, [id]: false }));

    if (success) {
      setReplyText(prev => ({ ...prev, [id]: "" }));
      setActiveReplyId(null);
    } else {
      alert("Failed to send email. Please make sure SMTP is configured correctly in Render/backend environment variables.");
    }
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-pink-100 text-pink-600 rounded-2xl">
          <MessageSquare size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Inbox Messages</h2>
          <p className="text-slate-500 font-medium text-sm mt-1">Read and reply to messages sent through the Contact Us form.</p>
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
              <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                 <button 
                   onClick={() => setActiveReplyId(activeReplyId === msg._id ? null : msg._id)} 
                   className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-bold ${activeReplyId === msg._id ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'}`}
                   title="Reply via Email"
                 >
                   <CornerUpLeft size={18} />
                   Reply
                 </button>
                 <button onClick={() => deleteMessage(msg._id)} className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors" title="Delete Message">
                   <Trash2 size={18} />
                 </button>
              </div>

              <div className="flex items-start gap-4 pr-24">
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
                    {msg.isReplied && (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                        <CheckCircle2 size={14} /> Replied
                      </span>
                    )}
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-slate-700 whitespace-pre-wrap text-sm leading-relaxed">{msg.message}</p>
                  </div>

                  {/* Render Saved Reply History */}
                  {msg.isReplied && msg.replyText && (
                    <div className="mt-4 p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100/50">
                      <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Sent Email Response:
                      </p>
                      <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">{msg.replyText}</p>
                    </div>
                  )}

                  {/* Reply Form */}
                  {activeReplyId === msg._id && (
                    <form onSubmit={(e) => handleSendReply(e, msg._id)} className="mt-4 space-y-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
                      <label className="text-xs font-bold text-slate-600">Reply via email to: {msg.email}</label>
                      <textarea
                        value={replyText[msg._id] || ""}
                        onChange={(e) => setReplyText({ ...replyText, [msg._id]: e.target.value })}
                        placeholder="Write your response message here. Clicking send will email it to the client..."
                        rows="4"
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-sm"
                        required
                      />
                      <div className="flex justify-end gap-2">
                        <button 
                          type="button" 
                          onClick={() => setActiveReplyId(null)}
                          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          disabled={isSending[msg._id]}
                          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors disabled:opacity-50 flex items-center gap-1.5"
                        >
                          {isSending[msg._id] ? "Sending Email..." : "Send Reply"}
                        </button>
                      </div>
                    </form>
                  )}
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
