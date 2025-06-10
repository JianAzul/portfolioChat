/**
 * =============================================================================
 * UI MANAGEMENT - DOM manipulation and interface interactions
 * =============================================================================
 */

const UI = {
    // DOM element references
    elements: {},

    /**
     * Initialize UI elements and event listeners
     */
    init() {
        this.cacheElements();
        this.bindEvents();
        this.setupInitialState();
        Utils.log('UI initialized successfully');
    },

    /**
     * Cache frequently used DOM elements
     */
    cacheElements() {
        this.elements = {
            messagesContainer: document.getElementById('messagesContainer'),
            messageInput: document.getElementById('messageInput'),
            sendButton: document.getElementById('sendButton'),
            profilePic: document.getElementById('profilePic'),
            profileName: document.getElementById('profileName'),
            lastSeen: document.getElementById('lastSeen'),
            profileModal: document.getElementById('profileModal'),
            closeModal: document.getElementById('closeModal')
        };

        // Validate that all elements exist
        for (const [key, element] of Object.entries(this.elements)) {
            if (!element) {
                Utils.log(`Element not found: ${key}`, 'warn');
            }
        }
    },

    /**
     * Bind event listeners
     */
    bindEvents() {
        // Send button click
        this.elements.sendButton?.addEventListener('click', () => {
            this.handleSendMessage();
        });

        // Enter key press in input
        this.elements.messageInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSendMessage();
            }
        });

        // Profile picture click (open modal)
        this.elements.profilePic?.addEventListener('click', () => {
            this.openProfileModal();
        });

        // Close modal
        this.elements.closeModal?.addEventListener('click', () => {
            this.closeProfileModal();
        });

        // Close modal when clicking outside
        this.elements.profileModal?.addEventListener('click', (e) => {
            if (e.target === this.elements.profileModal) {
                this.closeProfileModal();
            }
        });

        // Keyboard shortcuts
        if (CONFIG.settings.enableKeyboardShortcuts) {
            document.addEventListener('keydown', (e) => {
                this.handleKeyboardShortcuts(e);
            });
        }

        // Window resize handling
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        Utils.log('Event listeners bound successfully');
    },

    /**
     * Set up initial UI state
     */
    setupInitialState() {
        // Set profile name
        if (this.elements.profileName) {
            this.elements.profileName.textContent = CONFIG.personal.name;
        }

        // Set initial last seen
        this.updateLastSeen();

        // Focus on input
        if (this.elements.messageInput) {
            this.elements.messageInput.focus();
        }
    },

    /**
     * Handle sending a message
     */
    handleSendMessage() {
        const input = this.elements.messageInput;
        if (!input || !input.value.trim()) return;

        const message = input.value.trim();

        // Add user message to chat
        this.addMessage(message, 'sent');

        // Clear input
        input.value = '';

        // Process the message through chatbot
        Chatbot.processMessage(message);

        // Play sound
        Utils.playSound();
    },

    /**
     * Add a message to the chat
     * @param {string} content - Message content
     * @param {string} type - Message type ('sent' or 'received')
     * @param {boolean} isHTML - Whether content contains HTML
     */
    addMessage(content, type = 'received', isHTML = false) {
        if (!this.elements.messagesContainer) return;

        const messageElement = this.createMessageElement(content, type, isHTML);
        this.elements.messagesContainer.appendChild(messageElement);

        // Auto-scroll to bottom
        if (CONFIG.settings.autoScroll) {
            Utils.scrollToBottom(this.elements.messagesContainer);
        }

        return messageElement;
    },

    /**
     * Create a message DOM element
     * @param {string} content - Message content
     * @param {string} type - Message type
     * @param {boolean} isHTML - Whether content contains HTML
     * @returns {HTMLElement} Message element
     */
    createMessageElement(content, type, isHTML = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.setAttribute('data-id', Utils.generateId());

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        // Set content safely
        if (isHTML) {
            contentDiv.innerHTML = content;
        } else {
            contentDiv.textContent = content;
        }

        // Add timestamp if enabled
        if (CONFIG.settings.showTimestamps) {
            const timeLabel = document.createElement('span');
            timeLabel.className = 'message-time';
            timeLabel.textContent = Utils.getCurrentTime();
            contentDiv.appendChild(timeLabel);
        }

        messageDiv.appendChild(contentDiv);
        return messageDiv;
    },

    /**
     * Show typing indicator
     */
    showTypingIndicator() {
        const typingElement = this.createTypingIndicator();
        this.elements.messagesContainer.appendChild(typingElement);

        // Auto-scroll to show typing indicator
        Utils.scrollToBottom(this.elements.messagesContainer);

        return typingElement;
    },

    /**
     * Create typing indicator element
     * @returns {HTMLElement} Typing indicator element
     */
    createTypingIndicator() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message received typing-message';
        messageDiv.setAttribute('data-typing', 'true');

        const contentDiv = document.createElement('div');
        contentDiv.className = 'typing-indicator-container';

        const dotsDiv = document.createElement('div');
        dotsDiv.className = 'typing-dots';

        // Create three dots
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            dotsDiv.appendChild(dot);
        }

        contentDiv.appendChild(dotsDiv);
        messageDiv.appendChild(contentDiv);

        return messageDiv;
    },

    /**
     * Remove typing indicator
     */
    removeTypingIndicator() {
        const typingMessage = this.elements.messagesContainer?.querySelector('[data-typing="true"]');
        if (typingMessage) {
            typingMessage.remove();
        }
    },

    /**
     * Update last seen status
     */
    updateLastSeen() {
        if (this.elements.lastSeen) {
            this.elements.lastSeen.textContent = Utils.getLastSeenText();
        }
    },

    /**
     * Set status text (typing, online, etc.)
     * @param {string} status - Status text to display
     */
    setStatus(status) {
        if (this.elements.lastSeen) {
            this.elements.lastSeen.textContent = status;
            this.elements.lastSeen.classList.add('typing-indicator');
        }
    },

    /**
     * Reset status to last seen
     */
    resetStatus() {
        if (this.elements.lastSeen) {
            this.elements.lastSeen.classList.remove('typing-indicator');
            this.updateLastSeen();
        }
    },

    /**
     * Clear all messages from chat
     */
    clearMessages() {
        if (this.elements.messagesContainer) {
            this.elements.messagesContainer.innerHTML = '';
        }
    },

    /**
     * Open profile picture modal
     */
    openProfileModal() {
        if (this.elements.profileModal) {
            this.elements.profileModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    },

    /**
     * Close profile picture modal
     */
    closeProfileModal() {
        if (this.elements.profileModal) {
            this.elements.profileModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    },

    /**
     * Handle keyboard shortcuts
     * @param {KeyboardEvent} e - Keyboard event
     */
    handleKeyboardShortcuts(e) {
        // ESC to close modal
        if (e.key === 'Escape') {
            this.closeProfileModal();
        }

        // Ctrl/Cmd + K to focus on input
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            this.elements.messageInput?.focus();
        }

        // Ctrl/Cmd + L to clear chat
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            Chatbot.processMessage('clear');
        }

        // Ctrl/Cmd + / to show help
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            Chatbot.processMessage('help');
        }
    },

    /**
     * Handle window resize
     */
    handleResize() {
        // Update container height on mobile devices
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        // Auto-scroll to bottom after resize
        setTimeout(() => {
            if (CONFIG.settings.autoScroll) {
                Utils.scrollToBottom(this.elements.messagesContainer, false);
            }
        }, 100);
    },

    /**
     * Show notification
     * @param {string} message - Notification message
     * @param {string} type - Notification type (success, error, info)
     * @param {number} duration - Duration in milliseconds
     */
    showNotification(message, type = 'info', duration = 3000) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: type === 'error' ? '#ff4444' : type === 'success' ? '#00aa00' : '#0066cc',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '4px',
            zIndex: '10000',
            opacity: '0',
            transition: 'opacity 0.3s ease',
            maxWidth: '300px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        });

        // Add to DOM
        document.body.appendChild(notification);

        // Fade in
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);

        // Auto remove
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    },

    /**
     * Add message with typing animation
     * @param {string} content - Message content
     * @param {boolean} isHTML - Whether content contains HTML
     */
    async addMessageWithTyping(content, isHTML = false) {
        // Show typing indicator
        this.setStatus('typing...');
        const typingIndicator = this.showTypingIndicator();

        // Wait for typing delay
        await Utils.delay(CONFIG.settings.typingDelay);

        // Remove typing indicator
        this.removeTypingIndicator();
        this.resetStatus();

        // Add the actual message
        this.addMessage(content, 'received', isHTML);

        // Play sound
        Utils.playSound();
    },

    /**
     * Animate message appearance
     * @param {HTMLElement} element - Element to animate
     */
    animateMessage(element) {
        if (!element) return;

        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';

        setTimeout(() => {
            element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 10);
    },

    /**
     * Highlight a message temporarily
     * @param {HTMLElement} messageElement - Message element to highlight
     */
    highlightMessage(messageElement) {
        if (!messageElement) return;

        const originalBackground = messageElement.style.backgroundColor;
        messageElement.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
        messageElement.style.transition = 'background-color 0.3s ease';

        setTimeout(() => {
            messageElement.style.backgroundColor = originalBackground;
        }, 1000);
    },

    /**
     * Get message count
     * @returns {number} Number of messages in chat
     */
    getMessageCount() {
        return this.elements.messagesContainer?.children.length || 0;
    },

    /**
     * Get last message element
     * @returns {HTMLElement|null} Last message element
     */
    getLastMessage() {
        const container = this.elements.messagesContainer;
        if (!container || container.children.length === 0) return null;
        return container.children[container.children.length - 1];
    },

    /**
     * Set input placeholder text
     * @param {string} text - Placeholder text
     */
    setInputPlaceholder(text) {
        if (this.elements.messageInput) {
            this.elements.messageInput.placeholder = text;
        }
    },

    /**
     * Disable/enable input
     * @param {boolean} disabled - Whether to disable input
     */
    setInputDisabled(disabled) {
        if (this.elements.messageInput) {
            this.elements.messageInput.disabled = disabled;
        }
        if (this.elements.sendButton) {
            this.elements.sendButton.disabled = disabled;
        }
    },

    /**
     * Show loading state
     */
    showLoading() {
        this.setInputDisabled(true);
        this.setInputPlaceholder('Processing...');
    },

    /**
     * Hide loading state
     */
    hideLoading() {
        this.setInputDisabled(false);
        this.setInputPlaceholder('Type a message...');
    },

    /**
     * Handle error state
     * @param {string} errorMessage - Error message to display
     */
    handleError(errorMessage) {
        this.hideLoading();
        this.showNotification(errorMessage, 'error');
        Utils.log(`UI Error: ${errorMessage}`, 'error');
    }
};

// Make UI available globally
window.UI = UI;