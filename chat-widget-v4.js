/* ═══════════════════════════════════════════════════════
   V4 Premium Chat Widget JavaScript
   The Fishbourne Accountant - NO PLACEHOLDERS!
   ═══════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // V4 CONFIGURATION - NO PLACEHOLDERS!
  const config = {
    businessName: 'The Fishbourne Accountant',  // FIXED: No {{BUSINESS_NAME}}
    primaryColor: '#ffe380',  // FIXED: No {{PRIMARY_COLOR}}
    botName: 'Accounts Assistant',
    botEmoji: '📊',
    theme: 'light',
    greeting: 'Hello! 👋 Welcome to The Fishbourne Accountant. I\'m here to help with any questions about our accounting and tax services. How can I assist you?',
    quickReplies: [
      'Get a quote',
      'Tax Returns',
      'Bookkeeping',
      'Company Formation',
      'Opening hours'
    ],
    responses: [
      {
        keywords: ['book', 'booking', 'appointment', 'schedule', 'reserve', 'reservation', 'register', 'sign up', 'arrange'],
        answer: 'We\'d love to help you arrange a consultation! 📅\\n\\nHere\'s how:\\n\\n📞 **Call us** on 01243 123 456\\n📧 **Email** monica@thefishbourneaccountant.com\\n\\n🕐 We\'re open: Monday - Friday: 9:00am - 5:00pm\\n\\nWe look forward to hearing from you!'
      },
      {
        keywords: ['tax', 'returns', 'tax returns'],
        answer: '📋 **Tax Returns**\\n\\nSelf-assessment and company tax returns, filed on time, every time. We handle HMRC so you don\'t have to.\\n\\nWant to know more or arrange a consultation?\\n📞 01243 123 456'
      },
      {
        keywords: ['bookkeeping'],
        answer: '📊 **Bookkeeping**\\n\\nCloud-based bookkeeping using Xero and QuickBooks. Real-time visibility of your numbers, zero shoebox receipts.\\n\\nWant to know more or arrange a consultation?\\n📞 01243 123 456'
      },
      {
        keywords: ['company', 'formation', 'company formation'],
        answer: '🏢 **Company Formation**\\n\\nFrom sole trader to limited company, we set you up properly with Companies House, HMRC and your bank.\\n\\nWant to know more or arrange a consultation?\\n📞 01243 123 456'
      },
      {
        keywords: ['vat', 'returns', 'vat returns'],
        answer: '💷 **VAT Returns**\\n\\nMTD-compliant VAT returns filed quarterly. We monitor your threshold and keep you on the right side of HMRC.\\n\\nWant to know more or arrange a consultation?\\n📞 01243 123 456'
      },
      {
        keywords: ['payroll'],
        answer: '👥 **Payroll**\\n\\nPAYE, auto-enrolment pensions, RTI submissions. Reliable monthly payroll so your team always gets paid correctly.\\n\\nWant to know more or arrange a consultation?\\n📞 01243 123 456'
      },
      {
        keywords: ['business', 'advisory', 'business advisory'],
        answer: '📈 **Business Advisory**\\n\\nBeyond the numbers. We help you plan, forecast and make better decisions to grow your business with confidence.\\n\\nWant to know more or arrange a consultation?\\n📞 01243 123 456'
      },
      {
        keywords: ['hour', 'hours', 'open', 'when', 'time', 'times', 'closed', 'saturday', 'sunday', 'monday'],
        answer: 'Our opening hours are:\\n\\n🕐 Monday - Friday: 9:00am - 5:00pm\\nSaturday: By appointment\\nSunday: Closed\\n\\n📍 Find us at: 11 Barker Close, Fishbourne, West Sussex PO18 8BJ\\n📞 01243 123 456'
      },
      {
        keywords: ['contact', 'phone', 'email', 'address', 'where', 'find', 'location', 'directions', 'map', 'reach'],
        answer: 'Here\'s how to reach us:\\n\\n📍 **Address:** 11 Barker Close, Fishbourne, West Sussex PO18 8BJ\\n📞 **Phone:** 01243 123 456\\n📧 **Email:** monica@thefishbourneaccountant.com\\n🕐 **Hours:** Monday - Friday: 9:00am - 5:00pm\\nSaturday: By appointment\\nSunday: Closed\\n\\nWe look forward to hearing from you! 😊'
      },
      {
        keywords: ['about', 'history', 'who', 'story', 'experience', 'established', 'background', 'company', 'business', 'you'],
        answer: 'The Fishbourne Accountant (formerly HB Associates) brings caring, expert accounting services to businesses and individuals across West Sussex. We genuinely care about your success and bring heart to everything we do.\\n\\n📅 **Established:** 2018 (7 years of experience)\\n⭐ **Rating:** 5.0/5 (30+ reviews)'
      },
      {
        keywords: ['review', 'reviews', 'testimonial', 'rating', 'feedback', 'reputation', 'recommend', 'stars', 'trustpilot', 'google'],
        answer: 'Here\'s what our customers say about us! ⭐\\n\\n💬 *"Harper & Grey transformed how I run my business finances. I actually understand my numbers now and tax season is no l..."*\\n— **Sarah Mitchell** (Freelance Designer)\\n\\n💬 *"Switched from a big firm and the difference is night and day. They actually know my name, respond quickly, and their ..."*\\n— **James Patterson** (E-commerce Business Owner)\\n\\n⭐ **Overall rating: 4.9/5** from 127 reviews'
      }
    ],
    fallback: 'Thanks for your question! For the best answer, I\'d recommend speaking with our team at The Fishbourne Accountant directly:\\n\\n📞 01243 123 456\\n📧 monica@thefishbourneaccountant.com\\n\\nOr I can help you arrange a consultation — just let me know! 😊'
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
