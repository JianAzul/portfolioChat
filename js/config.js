/**
 * =============================================================================
 * CONFIGURATION FILE - All customizable settings
 * =============================================================================
 *
 * Edit this file to customize the portfolio chatbot with your information.
 * This separation makes it easy to update personal details without touching the core logic.
 */

const CONFIG = {
    // Personal Information
    personal: {
        name: 'Jian Azul',
        title: 'Software Developer & UX/UI Designer',
        university: 'University of Washington Tacoma',
        email: 'your.email@gmail.com',
        phone: '+1234567890',
        phoneDisplay: '123-456-7890',
        location: 'Tacoma, Washington, USA',
        address: {
            line1: 'MLG 200',
            line2: '',
            city: 'Tacoma',
            state: 'Washington',
            country: 'USA',
            zip: '98402'
        }
    },

    // Social Media Links
    social: {
        github: 'https://github.com/jianazul',
        linkedin: 'https://linkedin.com/in/jianazul',
        instagram: 'https://instagram.com/yourhandle',
        email: 'mailto:your.jijoazul@gmail.com'
    },

    // File Paths
    files: {
        resumePDF: 'assets/Jian_Resume.pdf',
        resumeThumbnail: 'images/resumeThumbnail.png',
        profileImage: 'images/squareDp.jpg',
        messageSound: 'assets/sentmessage.mp3',
        backgroundImage: 'images/bg.webp'
    },

    // App Settings
    settings: {
        soundEnabled: true,
        typingDelay: 1500,
        messageDelay: 2000,
        autoScroll: true,
        showTimestamps: true,
        enableKeyboardShortcuts: true
    },

    // Skills & Technologies
    skills: {
        languages: ['Java', 'C++', 'C', 'Python', 'CSS', 'HTML', 'JavaScript', 'Godot'],
        frameworks: ['React', 'Node.js', 'ThreeJS'],
        tools: ['VSCode', 'Git', 'Docker', 'Linux', 'Firebase', 'Figma', 'Adobe Creative Suite'],
        databases: ['MySQL', 'MongoDB', 'SQLite']
    },

    // Education Details
    education: [
        {
            degree: 'BA in Computer Science with minor in Innovaiton and Design, Business Data Analytics',
            institution: 'University of Washington Tacoma',
            year: '2023-2025',
            status: 'Current',
            result: 'Expected 2025'
        },
        {
            degree: 'Associates of Arts',
            institution: 'Pierce College',
            year: '2021-2023',
            status: 'Completed',
        }
    ],

    // Projects Portfolio
    projects: [
        {
            id: 'reconnect',
            name: 'Re:connect',
            subtitle: 'Retro-Inspired Terminal Game',
            description: 'A nostalgic typing game built with JavaScript, featuring DOS-style interfaces, particle effects, and progressive difficulty. Developed in a 10-week sprint with a small dedicated team.',
            technologies: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Web Audio API'],
            features: [
                'Pseudo-Terminal Launcher interface',
                'Custom particle effects engine',
                'Progressive difficulty system',
                'Glitch visual effects for errors',
                'Immersive sound design'
            ],
            github: 'https://github.com/yourusername/reconnect',
            demo: 'https://www.youtube.com/watch?v=eFfwpp1MaYk',
            images: [
                'images/projects/reconnect-1.png',
                'images/projects/reconnect-2.png'
            ],
            role: 'Lead Developer & UI Designer',
            teamSize: 3,
            duration: '10 weeks',
            challenges: 'Balancing aesthetics, gameplay, and technical complexity within a tight schedule and smaller team size.',
            learnings: [
                'Full software development lifecycle',
                'Small team collaboration and communication',
                'JavaScript-based graphics programming',
                'Project planning and documentation'
            ]
        },
        {
            id: 'microforest',
            name: 'UW Tacoma Microforest',
            subtitle: 'Environmental Education Signage Project',
            description: 'Designed educational signage and website for a Miyawaki microforest on campus, focusing on biodiversity, climate change, and local tribal history.',
            technologies: ['Research', 'Information Design', 'Web Design', 'Environmental Graphics'],
            features: [
                'Biodiversity and climate change education',
                'Tacoma timber history integration',
                'Local plant identification systems',
                'Tribal land acknowledgment',
                'QR code integration for deeper content'
            ],
            website: 'https://www.tacoma.uw.edu/microforest',
            images: [
                'images/projects/microforest-1.png',
                'images/projects/microforest-2.png'
            ],
            role: 'Signage Designer & Researcher',
            teamSize: 4,
            duration: '1 semester',
            client: 'Dr. Ruben at Urban@UW',
            challenges: 'Creating a narrative that connects Japanese internment history, local tribal representation, and environmental education.',
            learnings: [
                'Research-driven design process',
                'Stakeholder collaboration',
                'Cultural sensitivity in design',
                'Environmental storytelling'
            ]
        }
    ],

    // Map Configuration
    map: {
        embedUrl: 'https://www.google.com/maps  /embed?pb=!1m18!1m12!1m3!1d2687.5756476477194!2d-122.43858248436582!3d47.24429597916242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549040d434e66c17%3A0x7b5e5f3a8354b9d1!2sUniversity%20of%20Washington%20Tacoma!5e0!3m2!1sen!2sus!4v1234567890',
        width: '100%',
        height: '200'
    },

    // Chatbot Responses Templates
    responses: {
        intro: `Hello there 👋🏻,<br><br>My name is <span class="bold">{name}</span>.<br><br>I am a {title} at <span class="bold">{university} 👨🏻‍💻📚</span><br><br>I specialize in both software development and design, with experience in game development, environmental graphics, and web applications.<br><br>Send <span class="bold">'help'</span> to know more about me.`,

        help: `<span class="bold">Send a keyword to get what you want to know about me...</span><br><br>Available commands:<br><br><span class="bold">'skills'</span> - to know my technical skills<br><span class="bold">'resume'</span> - to get my resume<br><span class="bold">'education'</span> - to get my education details<br><span class="bold">'projects'</span> - to see my project portfolio<br><span class="bold">'reconnect'</span> - details about my typing game<br><span class="bold">'microforest'</span> - details about my UX design project<br><span class="bold">'address'</span> - to get my location<br><span class="bold">'contact'</span> - to get ways to connect with me<br><span class="bold">'clear'</span> - to clear conversation<br><span class="bold">'about'</span> - to know about this site`,

        skills: `I have experience in both development and design.<br><br><span class="bold">Programming Languages:</span><br>{languages}<br><br><span class="bold">Frameworks & Technologies:</span><br>{frameworks}<br><br><span class="bold">Tools & Environment:</span><br>{tools}<br><br><span class="bold">Databases:</span><br>{databases}<br><br>I also have experience in UX/UI design, environmental graphics, and research-driven design processes.`,

        education: `<span class="bold">Current Education:</span><br>{currentEducation}<br><br><span class="bold">Previous Education:</span><br>{previousEducation}`,

        projects: `Here are some of my key projects:<br><br><div class="project-showcase"><div class="project-card"><h3>🎮 Re:connect</h3><p>A retro-inspired typing game with custom particle effects and DOS-style interface</p><div class="project-tags"><span>JavaScript</span><span>Game Dev</span><span>UI/UX</span></div><div class="project-links"><a href="#" onclick="Chatbot.processMessage('reconnect')">View Details</a></div></div><div class="project-card"><h3>🌲 UW Tacoma Microforest</h3><p>Environmental education signage integrating tribal history and climate education</p><div class="project-tags"><span>UX Design</span><span>Research</span><span>Environmental Graphics</span></div><div class="project-links"><a href="#" onclick="Chatbot.processMessage('microforest')">View Details</a></div></div></div><br>Want to see more? Check out my <a class="link" target="_blank" href="{githubLink}">GitHub</a>!`,

        reconnect: `<div class="project-detail"><h2>🎮 Re:connect - Retro Typing Game</h2><br><img src="images/projects/reconnect-demo.gif" alt="Re:connect Demo" class="project-image"><br><span class="bold">Overview:</span><br>A nostalgic typing game inspired by DOS interfaces and Fallout's Pip-Boy aesthetic. Built with a small team over 10 weeks, featuring custom particle effects and progressive difficulty.<br><br><span class="bold">Key Features:</span><br>• Pseudo-terminal launcher interface<br>• Custom-coded particle effects engine<br>• Glitch visuals for typing errors<br>• Progressive difficulty system<br>• Immersive retro sound design<br><br><span class="bold">Technologies:</span> JavaScript, HTML5 Canvas, CSS3, Web Audio API<br><span class="bold">Team Size:</span> 3 developers<br><span class="bold">Duration:</span> 10 weeks<br><span class="bold">My Role:</span> Lead Developer & UI Designer<br><br><span class="bold">Challenges & Learning:</span><br>Working with a smaller team taught me the importance of clear communication and efficient task distribution. I deepened my knowledge in JavaScript graphics programming and learned the full software development lifecycle.<br><br><a class="link" target="_blank" href="https://www.youtube.com/watch?v=eFfwpp1MaYk">🎥 View Demo</a></div>`,

        microforest: `<div class="project-detail"><h2>🌲 UW Tacoma Microforest Project</h2><br><img src="images/projects/microforest-signs.png" alt="Microforest Signage" class="project-image"><br><span class="bold">Overview:</span><br>Designed educational signage and website for a Miyawaki microforest on the UW Tacoma campus. This narrative-focused project weaves together Japanese internment history, local tribal representation, and environmental education.<br><br><span class="bold">Key Components:</span><br>• Biodiversity & Climate Change signage<br>• Tacoma Timber history integration<br>• Local plant identification systems<br>• Tribal land acknowledgment in Twulshootseed<br>• QR code integration for extended content<br><br><span class="bold">My Role:</span> Signage Designer & Researcher<br><span class="bold">Team Size:</span> 4 members<br><span class="bold">Client:</span> Dr. Ruben at Urban@UW<br><span class="bold">Duration:</span> 1 semester<br><br><span class="bold">Design Process:</span><br>The project required extensive research into local ecosystems, tribal history, and the Miyawaki reforestation method. I focused on creating accessible, educational content that respects cultural significance while promoting environmental awareness.<br><br><span class="bold">Impact:</span><br>The microforest and signage are now implemented on campus, serving as an educational resource for students and visitors.<br><br><a class="link" target="_blank" href="https://www.tacoma.uw.edu/microforest">🌐 Visit Project Website</a></div>`,

        about: `🛠️💻 This portfolio website is built using HTML, CSS and JavaScript from SCRATCH!<br><br>👨🏻‍💻 Designed and Developed by <a class="link" target="_blank" href="{githubLink}"><span class="bold">{name}</span></a> with ❤️<br><br>The chatbot interface provides an interactive way to explore my professional background, combining my development skills with design sensibility. The site showcases both my technical abilities and my approach to user experience design.`,

        default: `Hey I couldn't catch you...😢<br>Send <span class="bold">'help'</span> to know more about usage.<br><br>You can also try:<br>• projects<br>• skills<br>• education<br>• reconnect<br>• microforest<br>• contact<br>• resume`
    },

    // Commands and their aliases
    commands: {
        intro: ['intro', 'start', 'begin'],
        help: ['help', '?', 'commands', 'menu'],
        skills: ['skills', 'skill', 'technology', 'tech', 'programming'],
        education: ['education', 'study', 'academic', 'degree', 'college'],
        resume: ['resume', 'cv', 'download'],
        contact: ['contact', 'social', 'reach', 'connect'],
        address: ['address', 'location', 'map', 'where'],
        projects: ['projects', 'work', 'portfolio', 'github'],
        reconnect: ['reconnect', 'typing game', 'game', 'javascript game'],
        microforest: ['microforest', 'uwt', 'signage', 'design', 'ux'],
        about: ['about', 'site', 'website', 'info'],
        clear: ['clear', 'reset', 'new', 'refresh']
    }
};

// Freeze the config to prevent accidental modifications
Object.freeze(CONFIG);