import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; links?: { text: string; url: string }[] }>>([
    { 
      text: "👋 Hi there! I'm your friendly shopping assistant. How can I help you find the perfect product today?",
      isUser: false 
    }
  ]);
  const [input, setInput] = useState('');
  const { products } = useProducts();
  const navigate = useNavigate();

  const searchProducts = (query: string) => {
    const searchTerms = query.toLowerCase().split(' ');
    return products.filter(product => {
      const searchableText = `${product.name} ${product.description} ${product.category} ${product.details.join(' ')}`.toLowerCase();
      return searchTerms.some(term => searchableText.includes(term));
    });
  };

  const generateResponse = (query: string, matchingProducts: any[]) => {
    const greetings = ['hi', 'hello', 'hey', 'howdy'];
    const isGreeting = greetings.some(greeting => query.toLowerCase().includes(greeting));

    if (isGreeting) {
      return {
        text: "Hello! 😊 I'm here to help you find great products. What are you looking for today?",
        links: []
      };
    }

    if (matchingProducts.length === 0) {
      return {
        text: "I couldn't find any products matching your search. 😕 Could you try different keywords? Or would you like to browse our categories? I'm here to help!",
        links: [{ text: "View All Categories", url: "/categories" }]
      };
    }

    const categories = Array.from(new Set(matchingProducts.map(p => p.category)));
    let responseText = `Great news! 🎉 I found ${matchingProducts.length} products that might interest you:\n\n`;

    if (categories.length === 1) {
      responseText += `These are all from our ${categories[0]} category.`;
    } else {
      responseText += `I found options across these categories: ${categories.join(', ')}.`;
    }

    responseText += "\n\nHere are some top picks for you:";

    return {
      text: responseText,
      links: matchingProducts.slice(0, 3).map(product => ({
        text: `${product.name} - £${product.currentPrice}`,
        url: `/product/${product.id}`
      }))
    };
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);

    // Search for matching products
    const matchingProducts = searchProducts(input);
    const response = generateResponse(input, matchingProducts);

    // Add bot response with links
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: response.text,
        isUser: false,
        links: response.links
      }]);
    }, 500);

    setInput('');
  };

  const handleLinkClick = (url: string) => {
    navigate(url);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-6 p-3 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all duration-300 z-40"
      >
        <MessageSquare size={24} />
      </button>

      {isOpen && (
        <div className="fixed right-6 bottom-20 w-96 bg-white rounded-lg shadow-xl z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">Shopping Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                  {message.links && (
                    <div className="mt-2 space-y-1">
                      {message.links.map((link, i) => (
                        <button
                          key={i}
                          onClick={() => handleLinkClick(link.url)}
                          className="block w-full text-left px-2 py-1 rounded hover:bg-gray-200 text-green-700 text-sm transition-colors"
                        >
                          {link.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about products..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};