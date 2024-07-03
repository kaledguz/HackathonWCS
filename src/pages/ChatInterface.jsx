import ChatBot from '../component/ChatBot';

function ChatInterface() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="mb-6 text-4xl font-bold text-blue-500">Chat Interface</h1>
      <ChatBot />
    </div>
  );
}

export default ChatInterface;