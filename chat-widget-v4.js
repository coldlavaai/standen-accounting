/* ═══════════════════════════════════════════════════════
   V4 Premium Chat Widget JavaScript
   Standen Accounting Solutions - NO PLACEHOLDERS!
   ═══════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // V4 CONFIGURATION - NO PLACEHOLDERS!
  const config = {
    businessName: 'Standen Accounting Solutions',
    primaryColor: '#32373c',
    botName: 'Accounting Assistant',
    botEmoji: '📊',
    theme: 'light',
    greeting: 'Hello! 👋 Welcome to Standen Accounting Solutions. I\'m here to help with any questions about our accounting services. How can I assist you?',
    quickReplies: [
      'Get a quote',
      'Tax Returns',
      'Bookkeeping',
      'Payroll Services',
      'Opening hours'
    ],
    responses: [
      {
        keywords: ['book', 'booking', 'appointment', 'schedule', 'reserve', 'reservation', 'register', 'sign up', 'arrange', 'consultation'],
        answer: 'I\'d be happy to help you arrange a consultation with Lee! 📅\\n\\nHere\'s how:\\n\\n📞 **Call us** on 01243 256695\\n📧 **Email** Lee.standen@standenaccounting.com\\n\\n🕐 We\'re open: Monday - Friday: 9:00am - 5:00pm\\n\\nWe look forward to hearing from you!'
      },
      {
        keywords: ['tax', 'returns', 'tax returns', 'self-assessment', 'self assessment'],
        answer: '📋 **Tax & VAT Services**\\n\\nNavigating tax laws can be complex, but we\'re here to help. We prepare and file your tax returns on time, while maximising reliefs and ensuring you stay compliant with HMRC.\\n\\nWant to know more or arrange a consultation?\\n📞 01243 256695'
      },
      {
        keywords: ['bookkeeping', 'accounting', 'accounts'],
        answer: '📊 **Accounting & Bookkeeping**\\n\\nKeeping track of your finances is essential, and we make it effortless. From day-to-day bookkeeping to detailed financial reports, we ensure your records are accurate and up to date.\\n\\nWant to know more or arrange a consultation?\\n📞 01243 256695'
      },
      {
        keywords: ['payroll', 'cis', 'paye'],
        answer: '👥 **Payroll & CIS**\\n\\nManaging payroll can be time-consuming, but we make it simple. We handle your payroll processing, RTI submissions, and CIS returns so you can focus on running your business.\\n\\nWant to know more or arrange a consultation?\\n📞 01243 256695'
      },
      {
        keywords: ['vat', 'returns', 'vat returns', 'mtd'],
        answer: '💷 **VAT Returns**\\n\\nWe prepare and file your VAT returns on time, ensuring compliance with Making Tax Digital (MTD) requirements and keeping you on the right side of HMRC.\\n\\nWant to know more or arrange a consultation?\\n📞 01243 256695'
      },
      {
        keywords: ['business', 'advisory', 'business advisory', 'advice', 'growth'],
        answer: '📈 **Business Advisory & Growth Support**\\n\\nBeyond numbers, we provide strategic business advice to help you make informed decisions, improve profitability, and plan for the future.\\n\\nWant to know more or arrange a consultation?\\n📞 01243 256695'
      },
      {
        keywords: ['company', 'formation', 'company formation', 'start', 'starting', 'setup'],
        answer: '🏢 **Company Formation & Compliance**\\n\\nStarting a business? We assist with company formation, ensuring you\'re set up correctly from day one. We also manage annual filings and compliance requirements.\\n\\nWant to know more or arrange a consultation?\\n📞 01243 256695'
      },
      {
        keywords: ['hour', 'hours', 'open', 'when', 'time', 'times', 'closed', 'saturday', 'sunday', 'monday'],
        answer: 'Our opening hours are:\\n\\n🕐 Monday - Friday: 9:00am - 5:00pm\\nSaturday & Sunday: Closed\\n\\n📍 Find us at: Sussex House, 12 Crane St, Chichester, West Sussex PO19 1LN\\n📞 01243 256695'
      },
      {
        keywords: ['contact', 'phone', 'email', 'address', 'where', 'find', 'location', 'directions', 'map', 'reach'],
        answer: 'Here\'s how to reach us:\\n\\n📍 **Address:** Sussex House, 12 Crane St, Chichester, West Sussex PO19 1LN\\n📞 **Phone:** 01243 256695\\n📧 **Email:** Lee.standen@standenaccounting.com\\n🕐 **Hours:** Monday - Friday: 9:00am - 5:00pm\\n\\nWe look forward to hearing from you! 😊'
      },
      {
        keywords: ['about', 'history', 'who', 'story', 'experience', 'established', 'background', 'lee', 'standen', 'founder'],
        answer: 'Standen Accounting Solutions is run by Lee Standen, an FMAAT-qualified accountant with nearly 20 years of experience helping small businesses and sole traders manage their finances.\\n\\nBased in Chichester, we provide professional, friendly services tailored to your needs. Our approach is personal, professional, and focused on giving you clarity and confidence to grow.\\n\\n📅 **Experience:** 20 Years\\n🎓 **Qualification:** FMAAT'
      },
      {
        keywords: ['price', 'prices', 'pricing', 'cost', 'costs', 'fee', 'fees', 'quote', 'how much'],
        answer: 'We offer competitive pricing tailored to your specific needs. Every business is different, so we provide customised quotes based on your requirements.\\n\\n📞 Call us on 01243 256695 or 📧 email Lee.standen@standenaccounting.com for a free, no-obligation quote.\\n\\nWe\'ll discuss your needs and provide transparent pricing with no hidden fees.'
      }
    ],
    fallback: 'Thanks for your question! For the best answer, I\'d recommend speaking with Lee at Standen Accounting Solutions directly:\\n\\n📞 01243 256695\\n📧 Lee.standen@standenaccounting.com\\n\\nOr I can help you arrange a consultation — just let me know! 😊'
  };

  // State
  let messages = [];
  let isOpen = false;

  // Create widget HTML
  function createWidget() {
    const widgetHTML = `
      <div class="chat-widget">
        <!-- Chat Window -->
        <div class="chat-window" id="chat-window">
          <!-- Header with brand gradient -->
          <div class="chat-header">
            <div class="chat-header-info">
              <div class="chat-header-avatar">${config.botEmoji}</div>
              <div class="chat-header-text">
                <h3>${config.businessName}</h3>
                <p>Online now</p>
              </div>
            </div>
            <button class="chat-close" id="chat-close" aria-label="Close chat">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M12 4L4 12M4 4l8 8"/>
              </svg>
            </button>
          </div>

          <!-- Messages -->
          <div class="chat-messages" id="chat-messages"></div>

          <!-- Quick Replies -->
          <div class="quick-replies" id="quick-replies"></div>

          <!-- Input -->
          <div class="chat-input-wrapper">
            <div class="chat-input-container">
              <input
                type="text"
                class="chat-input"
                id="chat-input"
                placeholder="Type your message..."
                aria-label="Chat message input"
              />
              <button class="chat-send" id="chat-send" aria-label="Send message">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Chat Bubble Button -->
        <button class="chat-bubble" id="chat-bubble" aria-label="Open chat">
          <span id="chat-bubble-icon">${config.botEmoji}</span>
        </button>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', widgetHTML);
  }

  // Add message to chat
  function addMessage(text, sender = 'bot') {
    const messagesContainer = document.getElementById('chat-messages');
    const messageHTML = `
      <div class="message ${sender}">
        <div class="message-bubble">${formatMessage(text)}</div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    messages.push({ text, sender, timestamp: new Date() });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Format message (convert **bold** and \n to HTML)
  function formatMessage(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  // Show typing indicator
  function showTyping() {
    const messagesContainer = document.getElementById('chat-messages');
    const typingHTML = `
      <div class="message bot typing-message">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Hide typing indicator
  function hideTyping() {
    const typing = document.querySelector('.typing-message');
    if (typing) typing.remove();
  }

  // Get bot response
  function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    // Check each response for keyword matches
    for (const response of config.responses) {
      for (const keyword of response.keywords) {
        if (lowerMessage.includes(keyword.toLowerCase())) {
          return response.answer;
        }
      }
    }

    return config.fallback;
  }

  // Handle user message
  function handleUserMessage(text) {
    if (!text.trim()) return;

    // Add user message
    addMessage(text, 'user');

    // Hide quick replies after first message
    document.getElementById('quick-replies').innerHTML = '';

    // Show typing
    showTyping();

    // Get response after delay
    setTimeout(() => {
      hideTyping();
      const response = getBotResponse(text);
      addMessage(response, 'bot');
    }, 800);

    // Clear input
    document.getElementById('chat-input').value = '';
  }

  // Show quick replies
  function showQuickReplies() {
    const quickRepliesContainer = document.getElementById('quick-replies');
    quickRepliesContainer.innerHTML = config.quickReplies
      .map(reply => `
        <button class="quick-reply-btn" data-reply="${reply}">
          ${reply}
        </button>
      `)
      .join('');

    // Add click handlers
    document.querySelectorAll('.quick-reply-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        handleUserMessage(btn.dataset.reply);
      });
    });
  }

  // Toggle chat window
  function toggleChat() {
    isOpen = !isOpen;
    const chatWindow = document.getElementById('chat-window');
    const chatBubble = document.getElementById('chat-bubble');
    const chatBubbleIcon = document.getElementById('chat-bubble-icon');

    if (isOpen) {
      chatWindow.classList.add('open');
      chatBubbleIcon.textContent = '✕';

      // Add greeting if first time opening
      if (messages.length === 0) {
        addMessage(config.greeting, 'bot');
        showQuickReplies();
      }
    } else {
      chatWindow.classList.remove('open');
      chatBubbleIcon.textContent = config.botEmoji;
    }
  }

  // Initialize
  function init() {
    createWidget();

    // Event listeners
    document.getElementById('chat-bubble').addEventListener('click', toggleChat);
    document.getElementById('chat-close').addEventListener('click', toggleChat);

    document.getElementById('chat-send').addEventListener('click', () => {
      const input = document.getElementById('chat-input');
      handleUserMessage(input.value);
    });

    document.getElementById('chat-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleUserMessage(e.target.value);
      }
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
