/**
 * =============================================================================
 * MAIN APPLICATION - Entry point and application lifecycle
 * =============================================================================
 */

const App = {
    // Application state
    isInitialized: false,
    isReady: false,
    startTime: null,

    /**
     * Initialize the application
     */
    async init() {
        try {
            this.startTime = Date.now();
            Utils.log('Starting application initialization...');

            // Show loading state
            this.showLoadingScreen();

            // Initialize modules in sequence
            await this.initializeModules();

            // Start the chatbot conversation
            await this.startConversation();

            // Mark as initialized
            this.isInitialized = true;
            this.isReady = true;

            // Hide loading screen
            this.hideLoadingScreen();

            // Log successful initialization
            const initTime = Date.now() - this.startTime;
            Utils.log(`Application initialized successfully in ${initTime}ms`);

            // Set up error handling
            this.setupGlobalErrorHandling();

        } catch (error) {
            Utils.log(`Failed to initialize application: ${error.message}`, 'error');
            this.handleInitializationError(error);
        }
    },

    /**
     * Initialize all application modules
     */
    async initializeModules() {
        // Initialize UI first
        UI.init();
        await Utils.delay(100); // Small delay to ensure DOM is ready

        // Initialize chatbot
        Chatbot.init();
        await Utils.delay(100);

        // Initialize additional features
        this.initializeServiceWorker();
        this.initializeAnalytics();
        this.initializePerformanceMonitoring();
    },

    /**
     * Start the initial conversation
     */
    async startConversation() {
        // Small delay to ensure everything is ready
        await Utils.delay(500);

        // Send the intro message
        await Chatbot.processMessage('intro');
    },

    /**
     * Show loading screen
     */
    showLoadingScreen() {
        // Create loading overlay if it doesn't exist
        let loader = document.getElementById('app-loader');
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'app-loader';
            loader.innerHTML = `
                <div class="loader-content">
                    <div class="loader-spinner"></div>
                    <div class="loader-text">Loading Portfolio...</div>
                </div>
            `;

            // Add loader styles
            const loaderStyles = `
                #app-loader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: var(--bg-primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    transition: opacity 0.5s ease;
                }
                .loader-content {
                    text-align: center;
                    color: var(--text-primary);
                }
                .loader-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid var(--text-secondary);
                    border-top: 3px solid var(--accent-green);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem auto;
                }
                .loader-text {
                    font-size: 1rem;
                    color: var(--text-secondary);
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;

            // Add styles to head
            const styleSheet = document.createElement('style');
            styleSheet.textContent = loaderStyles;
            document.head.appendChild(styleSheet);

            document.body.appendChild(loader);
        }

        loader.style.display = 'flex';
    },

    /**
     * Hide loading screen
     */
    hideLoadingScreen() {
        const loader = document.getElementById('app-loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 500);
        }
    },

    /**
     * Handle initialization errors
     * @param {Error} error - Initialization error
     */
    handleInitializationError(error) {
        this.hideLoadingScreen();

        // Show error message to user
        const errorHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-primary);">
                <h2 style="color: var(--error-color); margin-bottom: 1rem;">
                    ⚠️ Application Failed to Load
                </h2>
                <p style="margin-bottom: 1rem;">
                    Sorry, there was an error loading the portfolio. Please refresh the page to try again.
                </p>
                <button onclick="window.location.reload()" 
                        style="background: var(--accent-green); color: white; border: none; 
                               padding: 0.75rem 1.5rem; border-radius: 5px; cursor: pointer;">
                    Refresh Page
                </button>
            </div>
        `;

        document.body.innerHTML = errorHTML;
    },

    /**
     * Set up global error handling
     */
    setupGlobalErrorHandling() {
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            Utils.log(`Unhandled promise rejection: ${event.reason}`, 'error');
            event.preventDefault();
        });

        // Handle general JavaScript errors
        window.addEventListener('error', (event) => {
            Utils.log(`JavaScript error: ${event.message} at ${event.filename}:${event.lineno}`, 'error');
        });

        // Handle resource loading errors
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                Utils.log(`Resource loading error: ${event.target.src || event.target.href}`, 'error');
            }
        }, true);
    },

    /**
     * Initialize service worker for offline support
     */
    initializeServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    Utils.log('Service Worker registered successfully');
                })
                .catch(error => {
                    Utils.log(`Service Worker registration failed: ${error}`, 'warn');
                });
        }
    },

    /**
     * Initialize analytics (if needed)
     */
    initializeAnalytics() {
        // Placeholder for analytics initialization
        // You can add Google Analytics, Plausible, or other analytics here
        Utils.log('Analytics initialized (placeholder)');
    },

    /**
     * Initialize performance monitoring
     */
    initializePerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            try {
                // Largest Contentful Paint
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    Utils.log(`LCP: ${lastEntry.renderTime || lastEntry.loadTime}ms`);
                }).observe({ entryTypes: ['largest-contentful-paint'] });

                // First Input Delay
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        Utils.log(`FID: ${entry.processingStart - entry.startTime}ms`);
                    });
                }).observe({ entryTypes: ['first-input'] });

                // Cumulative Layout Shift
                new PerformanceObserver((list) => {
                    let clsValue = 0;
                    const entries = list.getEntries();
                    entries.forEach(entry => {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    });
                    Utils.log(`CLS: ${clsValue}`);
                }).observe({ entryTypes: ['layout-shift'] });

            } catch (error) {
                Utils.log(`Performance monitoring setup failed: ${error}`, 'warn');
            }
        }
    },

    /**
     * Get application health status
     * @returns {Object} Health status object
     */
    getHealthStatus() {
        return {
            initialized: this.isInitialized,
            ready: this.isReady,
            uptime: this.startTime ? Date.now() - this.startTime : 0,
            modules: {
                ui: typeof UI !== 'undefined' && UI.elements.messagesContainer !== null,
                chatbot: typeof Chatbot !== 'undefined' && Chatbot.state.currentSession !== null,
                utils: typeof Utils !== 'undefined'
            },
            stats: this.isReady ? Chatbot.getStats() : null,
            performance: {
                memory: performance.memory ? {
                    used: Math.round(performance.memory.usedJSHeapSize / 1048576),
                    total: Math.round(performance.memory.totalJSHeapSize / 1048576),
                    limit: Math.round(performance.memory.jsHeapSizeLimit / 1048576)
                } : null,
                navigation: performance.navigation ? {
                    type: performance.navigation.type,
                    redirectCount: performance.navigation.redirectCount
                } : null
            }
        };
    },

    /**
     * Restart the application
     */
    async restart() {
        Utils.log('Restarting application...');

        // Clear chatbot state
        Chatbot.reset();

        // Clear UI
        UI.clearMessages();

        // Restart conversation
        await this.startConversation();

        Utils.log('Application restarted successfully');
    },

    /**
     * Handle page visibility changes
     */
    handleVisibilityChange() {
        if (document.hidden) {
            Utils.log('Page hidden - pausing non-essential operations');
        } else {
            Utils.log('Page visible - resuming operations');
            // Update last seen when page becomes visible again
            UI.updateLastSeen();
        }
    },

    /**
     * Handle online/offline status changes
     */
    handleConnectionChange() {
        if (navigator.onLine) {
            Utils.log('Connection restored');
            UI.showNotification('Connection restored', 'success', 2000);
        } else {
            Utils.log('Connection lost');
            UI.showNotification('You are offline. Some features may not work.', 'info', 5000);
        }
    },

    /**
     * Set up event listeners for app lifecycle
     */
    setupEventListeners() {
        // Page visibility changes
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });

        // Online/offline status
        window.addEventListener('online', () => {
            this.handleConnectionChange();
        });

        window.addEventListener('offline', () => {
            this.handleConnectionChange();
        });

        // Before page unload
        window.addEventListener('beforeunload', (event) => {
            // Log session end
            const stats = this.getHealthStatus();
            Utils.log(`Session ending. Stats: ${JSON.stringify(stats.stats)}`);

            // Don't show confirmation dialog for normal navigation
            // event.preventDefault();
            // event.returnValue = '';
        });

        // Page load complete
        window.addEventListener('load', () => {
            Utils.log('Page fully loaded');
        });
    },

    /**
     * Debug mode utilities
     */
    debug: {
        /**
         * Enable debug mode
         */
        enable() {
            window.DEBUG_MODE = true;
            console.log('Debug mode enabled');
            console.log('Available debug commands:');
            console.log('- App.debug.getState() - Get application state');
            console.log('- App.debug.getChatHistory() - Get chat history');
            console.log('- App.debug.testCommand(cmd) - Test a command');
            console.log('- App.debug.exportData() - Export all data');
        },

        /**
         * Get application state
         */
        getState() {
            return {
                app: App.getHealthStatus(),
                config: CONFIG,
                ui: {
                    messageCount: UI.getMessageCount(),
                    lastMessage: UI.getLastMessage()?.textContent,
                },
                chatbot: Chatbot.getStats()
            };
        },

        /**
         * Get chat history
         */
        getChatHistory() {
            return Chatbot.getHistory(50);
        },

        /**
         * Test a command
         */
        async testCommand(command) {
            console.log(`Testing command: ${command}`);
            await Chatbot.processMessage(command);
        },

        /**
         * Export all data
         */
        exportData() {
            const data = {
                timestamp: new Date().toISOString(),
                state: this.getState(),
                history: this.getChatHistory(),
                config: CONFIG
            };

            const blob = new Blob([JSON.stringify(data, null, 2)], {
                type: 'application/json'
            });

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `portfolio-debug-${Date.now()}.json`;
            a.click();
            URL.revokeObjectURL(url);
        }
    },

    /**
     * Check if app is running in development mode
     */
    isDevelopment() {
        return window.location.hostname === 'localhost' ||
            window.location.hostname === '127.0.0.1' ||
            window.location.protocol === 'file:';
    },

    /**
     * Initialize development features
     */
    initDevelopmentFeatures() {
        if (this.isDevelopment()) {
            // Enable debug mode automatically in development
            this.debug.enable();

            // Add development styles
            const devStyles = `
                body::before {
                    content: "DEV MODE";
                    position: fixed;
                    top: 0;
                    left: 0;
                    background: #ff6b6b;
                    color: white;
                    padding: 4px 8px;
                    font-size: 10px;
                    z-index: 10000;
                    font-family: monospace;
                }
            `;

            const styleSheet = document.createElement('style');
            styleSheet.textContent = devStyles;
            document.head.appendChild(styleSheet);

            Utils.log('Development features enabled');
        }
    }
};

/**
 * Document ready handler
 */
function onDocumentReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

/**
 * Application entry point
 */
onDocumentReady(async () => {
    try {
        // Set up event listeners first
        App.setupEventListeners();

        // Initialize development features if needed
        App.initDevelopmentFeatures();

        // Initialize the application
        await App.init();

        // Make App available globally for debugging
        window.App = App;

    } catch (error) {
        console.error('Failed to start application:', error);
        App.handleInitializationError(error);
    }
});

/**
 * Export for module systems (if needed)
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}