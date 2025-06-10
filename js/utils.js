/**
 * =============================================================================
 * UTILITY FUNCTIONS - Helper functions and common operations
 * =============================================================================
 */

const Utils = {
    /**
     * Get current time formatted as HH:MM
     * @returns {string} Formatted time string
     */
    getCurrentTime() {
        const date = new Date();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    },

    /**
     * Get formatted last seen text
     * @returns {string} Last seen text
     */
    getLastSeenText() {
        const time = this.getCurrentTime();
        return `last seen today at ${time}`;
    },

    /**
     * Scroll to bottom of messages container
     * @param {HTMLElement} container - Messages container element
     * @param {boolean} smooth - Whether to use smooth scrolling
     */
    scrollToBottom(container, smooth = true) {
        if (!container) return;

        const scrollOptions = {
            top: container.scrollHeight,
            behavior: smooth ? 'smooth' : 'auto'
        };

        container.scrollTo(scrollOptions);
    },

    /**
     * Play notification sound
     * @param {string} soundPath - Path to sound file
     */
    playSound(soundPath = CONFIG.files.messageSound) {
        if (!CONFIG.settings.soundEnabled) return;

        try {
            const audio = new Audio(soundPath);
            audio.volume = 0.5;
            audio.play().catch(error => {
                console.warn('Could not play sound:', error);
            });
        } catch (error) {
            console.warn('Error creating audio:', error);
        }
    },

    /**
     * Sanitize HTML to prevent XSS attacks
     * @param {string} html - HTML string to sanitize
     * @returns {string} Sanitized HTML string
     */
    sanitizeHTML(html) {
        const temp = document.createElement('div');
        temp.textContent = html;
        return temp.innerHTML;
    },

    /**
     * Create a delay using Promise
     * @param {number} ms - Delay in milliseconds
     * @returns {Promise} Promise that resolves after delay
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Generate a unique ID
     * @returns {string} Unique identifier
     */
    generateId() {
        return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Template string replacement
     * @param {string} template - Template string with {placeholders}
     * @param {object} values - Object with replacement values
     * @returns {string} Processed template string
     */
    processTemplate(template, values) {
        return template.replace(/\{(\w+)\}/g, (match, key) => {
            return values[key] !== undefined ? values[key] : match;
        });
    },

    /**
     * Find command from input text
     * @param {string} input - User input text
     * @returns {string|null} Command name or null if not found
     */
    findCommand(input) {
        const normalizedInput = input.toLowerCase().trim();

        for (const [command, aliases] of Object.entries(CONFIG.commands)) {
            if (aliases.includes(normalizedInput)) {
                return command;
            }
        }

        return null;
    },

    /**
     * Format skills array into HTML
     * @param {Array} skills - Array of skills
     * @returns {string} HTML formatted skills
     */
    formatSkills(skills) {
        if (!Array.isArray(skills)) return '';
        return skills.join(', ');
    },

    /**
     * Format education array into HTML
     * @param {Array} education - Array of education objects
     * @returns {object} Object with current and previous education HTML
     */
    formatEducation(education) {
        if (!Array.isArray(education) || education.length === 0) {
            return { current: 'No education data available', previous: '' };
        }

        const current = education.find(edu => edu.status === 'Current');
        const previous = education.filter(edu => edu.status === 'Completed');

        const formatEduItem = (edu) => {
            let result = `${edu.degree}<br>${edu.institution}<br>`;
            if (edu.year) result += `Year: ${edu.year}<br>`;
            if (edu.result && edu.status === 'Completed') {
                result += `Result: ${edu.result}`;
            }
            return result;
        };

        const currentHTML = current ? formatEduItem(current) : 'No current education found';
        const previousHTML = previous.map(formatEduItem).join('<br><br>');

        return {
            current: currentHTML,
            previous: previousHTML
        };
    },

    /**
     * Create social links HTML
     * @returns {string} HTML for social links
     */
    createSocialLinksHTML() {
        const socialItems = [
            {
                href: `tel:${CONFIG.personal.phone}`,
                icon: 'images/phone.svg',
                label: CONFIG.personal.phoneDisplay,
                class: 'phone-item',
                extra: `<span class="phone-number">${CONFIG.personal.phoneDisplay}</span>`
            },
            {
                href: CONFIG.social.email,
                icon: 'images/gmail.svg',
                label: 'Email'
            },
            {
                href: CONFIG.social.github,
                icon: 'images/github.svg',
                label: 'GitHub'
            },
            {
                href: CONFIG.social.whatsapp,
                icon: 'images/whatsapp.svg',
                label: 'WhatsApp'
            },
            {
                href: CONFIG.social.telegram,
                icon: 'images/telegram.svg',
                label: 'Telegram'
            },
            {
                href: CONFIG.social.instagram,
                icon: 'images/instagram.svg',
                label: 'Instagram'
            },
            {
                href: CONFIG.social.linkedin,
                icon: 'images/linkedin.svg',
                label: 'LinkedIn'
            }
        ];

        const socialHTML = socialItems.map(item => `
            <a target="_blank" href="${item.href}" class="social-item ${item.class || ''}">
                <img src="${item.icon}" alt="${item.label}">
                <span class="social-label">${item.label}</span>
                ${item.extra || ''}
            </a>
        `).join('');

        return `<div class="social-links">${socialHTML}</div>`;
    },

    /**
     * Create resume preview HTML
     * @returns {string} HTML for resume preview
     */
    createResumeHTML() {
        return `
            <div class="resume-preview">
                <img src="${CONFIG.files.resumeThumbnail}" class="resume-thumbnail" alt="Resume Thumbnail">
                <div class="resume-download">
                    <div class="resume-info">
                        <img src="images/pdf.png" alt="PDF">
                        <label>${CONFIG.personal.name} Resume.pdf</label>
                    </div>
                    <a href="${CONFIG.files.resumePDF}" download="${CONFIG.personal.name}_Resume.pdf">
                        <button class="download-btn" aria-label="Download Resume">
                            <img src="images/downloadIcon.svg" alt="Download">
                        </button>
                    </a>
                </div>
            </div>
        `;
    },

    /**
     * Create address/map HTML
     * @returns {string} HTML for address and map
     */
    createAddressHTML() {
        return `
            <div class="map-container">
                <iframe 
                    src="${CONFIG.map.embedUrl}" 
                    width="${CONFIG.map.width}" 
                    height="${CONFIG.map.height}"
                    style="border:0;" 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade"
                    title="Location Map">
                </iframe>
            </div>
            <div class="address">
                <address>
                    ${CONFIG.personal.address.line1}<br>
                    ${CONFIG.personal.address.line2 ? CONFIG.personal.address.line2 + '<br>' : ''}
                    ${CONFIG.personal.address.city}, ${CONFIG.personal.address.state}<br>
                    ${CONFIG.personal.address.country} ${CONFIG.personal.address.zip}
                </address>
            </div>
        `;
    },

    /**
     * Validate email address
     * @param {string} email - Email to validate
     * @returns {boolean} Whether email is valid
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Validate phone number
     * @param {string} phone - Phone number to validate
     * @returns {boolean} Whether phone is valid
     */
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    },

    /**
     * Log with timestamp
     * @param {string} message - Message to log
     * @param {string} level - Log level (info, warn, error)
     */
    log(message, level = 'info') {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}`;

        switch (level) {
            case 'error':
                console.error(logMessage);
                break;
            case 'warn':
                console.warn(logMessage);
                break;
            default:
                console.log(logMessage);
        }
    },

    /**
     * Check if device is mobile
     * @returns {boolean} Whether device is mobile
     */
    isMobile() {
        return window.innerWidth <= 768;
    },

    /**
     * Get device type
     * @returns {string} Device type (mobile, tablet, desktop)
     */
    getDeviceType() {
        const width = window.innerWidth;
        if (width <= 767) return 'mobile';
        if (width <= 1023) return 'tablet';
        return 'desktop';
    }
};

// Make Utils available globally
window.Utils = Utils;