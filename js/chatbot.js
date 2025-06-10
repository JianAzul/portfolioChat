/**
 * =============================================================================
 * CHATBOT LOGIC - Message processing and response generation
 * =============================================================================
 */

const Chatbot = {
    // Conversation state
    state: {
        messageHistory: [],
        currentSession: null,
        lastCommand: null,
        conversationStarted: false
    },

    /**
     * Initialize the chatbot
     */
    init() {
        this.state.currentSession = Utils.generateId();
        Utils.log('Chatbot initialized successfully');
    },

    /**
     * Process incoming message and generate response
     * @param {string} message - User message
     */
    async processMessage(message) {
        if (!message || !message.trim()) return;

        const normalizedMessage = message.toLowerCase().trim();

        // Add to message history
        this.addToHistory('user', message);

        // Find matching command
        const command = Utils.findCommand(normalizedMessage) || 'default';

        // Log the interaction
        Utils.log(`Processing command: ${command} from message: "${message}"`);

        // Process the command
        try {
            await this.executeCommand(command, message);
            this.state.lastCommand = command;
        } catch (error) {
            Utils.log(`Error processing command ${command}: ${error.message}`, 'error');
            await this.handleError(error);
        }
    },

    /**
     * Execute a specific command
     * @param {string} command - Command to execute
     * @param {string} originalMessage - Original user message
     */
    async executeCommand(command, originalMessage) {
        switch (command) {
            case 'intro':
                await this.sendIntroMessage();
                break;

            case 'help':
                await this.sendHelpMessage();
                break;

            case 'skills':
                await this.sendSkillsMessage();
                break;

            case 'education':
                await this.sendEducationMessage();
                break;

            case 'resume':
                await this.sendResumeMessage();
                break;

            case 'contact':
                await this.sendContactMessage();
                break;

            case 'address':
                await this.sendAddressMessage();
                break;

            case 'projects':
                await this.sendProjectsMessage();
                break;

            case 'about':
                await this.sendAboutMessage();
                break;

            case 'clear':
                await this.clearConversation();
                break;

            default:
                await this.sendDefaultMessage();
                break;
        }
    },

    /**
     * Send introduction message
     */
    async sendIntroMessage() {
        const templateData = {
            name: CONFIG.personal.name,
            title: CONFIG.personal.title,
            university: CONFIG.personal.university
        };

        const message = Utils.processTemplate(CONFIG.responses.intro, templateData);
        await UI.addMessageWithTyping(message, true);

        this.addToHistory('bot', message);
        this.state.conversationStarted = true;
    },

    /**
     * Send help message
     */
    async sendHelpMessage() {
        const message = CONFIG.responses.help;
        await UI.addMessageWithTyping(message, true);
        this.addToHistory('bot', message);
    },

    /**
     * Send skills message
     */
    async sendSkillsMessage() {
        const templateData = {
            languages: Utils.formatSkills(CONFIG.skills.languages),
            frameworks: Utils.formatSkills(CONFIG.skills.frameworks),
            tools: Utils.formatSkills(CONFIG.skills.tools),
            databases: Utils.formatSkills(CONFIG.skills.databases)
        };

        const message = Utils.processTemplate(CONFIG.responses.skills, templateData);
        await UI.addMessageWithTyping(message, true);
        this.addToHistory('bot', message);
    },

    /**
     * Send education message
     */
    async sendEducationMessage() {
        const educationData = Utils.formatEducation(CONFIG.education);
        const templateData = {
            currentEducation: educationData.current,
            previousEducation: educationData.previous
        };

        const message = Utils.processTemplate(CONFIG.responses.education, templateData);
        await UI.addMessageWithTyping(message, true);
        this.addToHistory('bot', message);
    },

    /**
     * Send resume message
     */
    async sendResumeMessage() {
        const resumeHTML = Utils.createResumeHTML();
        await UI.addMessageWithTyping(resumeHTML, true);
        this.addToHistory('bot', 'Resume preview and download');
    },

    /**
     * Send contact message
     */
    async sendContactMessage() {
        const contactHTML = Utils.createSocialLinksHTML();
        await UI.addMessageWithTyping(contactHTML, true);
        this.addToHistory('bot', 'Contact information');
    },

    /**
     * Send address message
     */
    async sendAddressMessage() {
        const addressHTML = Utils.createAddressHTML();
        await UI.addMessageWithTyping(addressHTML, true);
        this.addToHistory('bot', 'Address and location');
    },

    /**
     * Send projects message
     */
    async sendProjectsMessage() {
        const templateData = {
            githubLink: CONFIG.social.github,
            name: CONFIG.personal.name
        };

        const message = Utils.processTemplate(CONFIG.responses.projects, templateData);
        await UI.addMessageWithTyping(message, true);
        this.addToHistory('bot', message);
    },

    /**
     * Send about message
     */
    async sendAboutMessage() {
        const templateData = {
            githubLink: CONFIG.social.github,
            name: CONFIG.personal.name
        };

        const message = Utils.processTemplate(CONFIG.responses.about, templateData);
        await UI.addMessageWithTyping(message, true);
        this.addToHistory('bot', message);
    },

    /**
     * Send default/fallback message
     */
    async sendDefaultMessage() {
        const message = CONFIG.responses.default;
        await UI.addMessageWithTyping(message, true);
        this.addToHistory('bot', message);
    },

    /**
     * Clear conversation and restart
     */
    async clearConversation() {
        UI.clearMessages();
        this.state.messageHistory = [];
        this.state.conversationStarted = false;

        // Wait a moment then send intro
        await Utils.delay(500);
        await this.sendIntroMessage();
    },

    /**
     * Handle errors gracefully
     * @param {Error} error - Error object
     */
    async handleError(error) {
        const errorMessage = `I encountered an error: ${error.message}. Please try again or send 'help' for available commands.`;
        await UI.addMessageWithTyping(errorMessage, false);
        this.addToHistory('bot', errorMessage);
    },

    /**
     * Add message to conversation history
     * @param {string} sender - Message sender ('user' or 'bot')
     * @param {string} content - Message content
     */
    addToHistory(sender, content) {
        const historyEntry = {
            id: Utils.generateId(),
            sender,
            content,
            timestamp: new Date().toISOString(),
            session: this.state.currentSession
        };

        this.state.messageHistory.push(historyEntry);

        // Limit history size to prevent memory issues
        if (this.state.messageHistory.length > 100) {
            this.state.messageHistory = this.state.messageHistory.slice(-50);
        }
    },

    /**
     * Get conversation history
     * @param {number} limit - Maximum number of messages to return
     * @returns {Array} Array of message history objects
     */
    getHistory(limit = 10) {
        return this.state.messageHistory.slice(-limit);
    },

    /**
     * Search message history
     * @param {string} query - Search query
     * @returns {Array} Array of matching messages
     */
    searchHistory(query) {
        if (!query || !query.trim()) return [];

        const searchTerm = query.toLowerCase().trim();
        return this.state.messageHistory.filter(entry =>
            entry.content.toLowerCase().includes(searchTerm)
        );
    },

    /**
     * Get conversation statistics
     * @returns {Object} Statistics object
     */
    getStats() {
        const history = this.state.messageHistory;
        const userMessages = history.filter(entry => entry.sender === 'user');
        const botMessages = history.filter(entry => entry.sender === 'bot');

        // Count command usage
        const commandUsage = {};
        userMessages.forEach(msg => {
            const command = Utils.findCommand(msg.content) || 'unknown';
            commandUsage[command] = (commandUsage[command] || 0) + 1;
        });

        return {
            totalMessages: history.length,
            userMessages: userMessages.length,
            botMessages: botMessages.length,
            conversationStarted: this.state.conversationStarted,
            lastCommand: this.state.lastCommand,
            commandUsage,
            sessionId: this.state.currentSession,
            sessionStartTime: history.length > 0 ? history[0].timestamp : null
        };
    },

    /**
     * Export conversation history
     * @param {string} format - Export format ('json' or 'text')
     * @returns {string} Exported conversation
     */
    exportHistory(format = 'json') {
        const history = this.state.messageHistory;

        if (format === 'text') {
            return history.map(entry => {
                const time = new Date(entry.timestamp).toLocaleTimeString();
                const sender = entry.sender === 'user' ? 'You' : CONFIG.personal.name;
                return `[${time}] ${sender}: ${entry.content}`;
            }).join('\n');
        }

        return JSON.stringify(history, null, 2);
    },

    /**
     * Reset chatbot state
     */
    reset() {
        this.state = {
            messageHistory: [],
            currentSession: Utils.generateId(),
            lastCommand: null,
            conversationStarted: false
        };

        Utils.log('Chatbot state reset');
    },

    /**
     * Get suggested responses based on context
     * @param {string} lastMessage - Last user message
     * @returns {Array} Array of suggested responses
     */
    getSuggestedResponses(lastMessage) {
        const suggestions = [];
        const normalizedMessage = lastMessage.toLowerCase().trim();

        // Context-aware suggestions
        if (normalizedMessage.includes('skill') || normalizedMessage.includes('tech')) {
            suggestions.push('Tell me more about your projects');
        }

        if (normalizedMessage.includes('education') || normalizedMessage.includes('study')) {
            suggestions.push('Show me your resume');
        }

        if (normalizedMessage.includes('contact') || normalizedMessage.includes('reach')) {
            suggestions.push('What\'s your location?');
        }

        // Always include help
        suggestions.push('help');

        return suggestions;
    },

    /**
     * Process batch messages (for testing or automation)
     * @param {Array} messages - Array of messages to process
     * @param {number} delay - Delay between messages in ms
     */
    async processBatch(messages, delay = 1000) {
        for (const message of messages) {
            await this.processMessage(message);
            if (delay > 0) {
                await Utils.delay(delay);
            }
        }
    }
};

// Make Chatbot available globally
window.Chatbot = Chatbot;