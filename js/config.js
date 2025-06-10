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
        title: 'Computer Engineering Student',
        university: 'UW TACOMA',
        email: 'your.email@gmail.com',
        phone: '+1234567890',
        phoneDisplay: '123-456-7890',
        location: 'Your City, State, Country',
        address: {
            city: 'TACOMA/SEATTLE',
            state: 'WA',
            country: 'USA',
        }
    },

    // Social Media Links
    social: {
        github: 'https://github.com/jianazul',
        linkedin: 'https://linkedin.com/in/jianazul',
        instagram: 'https://instagram.com/nuke.seattle',
        email: 'mailto:jijoazul@gmail.com',
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
        languages: ['Java', 'C++', 'C', 'PHP', 'Kotlin', 'Dart', 'Python', 'CSS', 'HTML', 'JavaScript'],
        frameworks: ['Android', 'Flutter', 'ReactJs', 'GTK', 'Node.js', 'Express'],
        tools: ['VSCode', 'Git', 'Docker', 'Linux', 'Firebase'],
        databases: ['MySQL', 'MongoDB', 'SQLite']
    },

    // Education Details
    education: [
        {
            degree: 'B.Tech in Computer Science Engineering',
            institution: 'Your University',
            year: '2020-2024',
            status: 'Current',
            result: 'Expected 2024'
        },
        {
            degree: 'Diploma in Computer Engineering',
            institution: 'Your College',
            year: '2017-2020',
            status: 'Completed',
            result: '86.06%'
        },
        {
            degree: 'Secondary School Certificate',
            institution: 'Your School',
            year: '2016',
            status: 'Completed',
            result: 'First Class'
        }
    ],

    // Projects (optional - can be expanded)
    projects: [
        {
            name: 'Portfolio Website',
            description: 'Interactive chatbot-style portfolio built with vanilla HTML, CSS, and JavaScript',
            technologies: ['HTML', 'CSS', 'JavaScript'],
            github: 'https://github.com/yourusername/portfolio',
            demo: 'https://yourportfolio.com'
        }
        // Add more projects here
    ],

    // Map Configuration
    map: {
        embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d238.63833262443757!2d74.19014864534314!3d16.865338763272877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1a7dcf40f5dd7%3A0xd7b69fe1fcfa9877!2zMTbCsDUxJzU1LjQiTiA3NMKwMTEnMjUuMyJF!5e0!3m2!1sen!2sin!4v1645079906766!5m2!1sen!2sin',
        width: '100%',
        height: '200'
    },

    // Chatbot Responses Templates
    responses: {
        intro: `Hello there 👋🏻,<br><br>My name is <span class="bold">{name}</span>.<br><br>I am a {title} at <span class="bold">{university} 👨🏻‍💻📚</span><br><br>I am eager to hear about potential career opportunities, so I would be pleased to chat about job openings in the engineering sphere.<br><br>Send <span class="bold">'help'</span> to know more about me.`,

        help: `<span class="bold">Send a keyword to get what you want to know about me...</span><br><br>Available commands:<br><br><span class="bold">'skills'</span> - to know my skills<br><span class="bold">'resume'</span> - to get my resume<br><span class="bold">'education'</span> - to get my education details<br><span class="bold">'address'</span> - to get my address<br><span class="bold">'contact'</span> - to get ways to connect with me<br><span class="bold">'projects'</span> - to get details of my projects<br><span class="bold">'clear'</span> - to clear conversation<br><span class="bold">'about'</span> - to know about this site`,

        skills: `I am currently pursuing a degree in Computer Science Engineering.<br><br><span class="bold">Programming Languages:</span><br>{languages}<br><br><span class="bold">Frameworks & Technologies:</span><br>{frameworks}<br><br><span class="bold">Tools & Environment:</span><br>{tools}<br><br><span class="bold">Databases:</span><br>{databases}`,

        education: `<span class="bold">Current Education:</span><br>{currentEducation}<br><br><span class="bold">Previous Education:</span><br>{previousEducation}`,

        about: `🛠️💻 This portfolio website is built using HTML, CSS and JavaScript from SCRATCH!<br><br>👨🏻‍💻 Designed and Developed by <a class="link" target="_blank" href="{githubLink}"><span class="bold">{name}</span></a> with ❤️<br><br>The chatbot interface provides an interactive way to explore my professional background and skills.`,

        projects: `You want to check my projects? Then just jump into my Github Account to see my latest work!<br><br><div class="social-links"><a target="_blank" href="{githubLink}" class="social-item"><img src="images/github.svg" alt="GitHub"><span class="social-label">GitHub Profile</span></a></div>`,

        default: `Hey I couldn't catch you...😢<br>Send <span class="bold">'help'</span> to know more about usage.<br><br>You can also try:<br>• skills<br>• education<br>• contact<br>• resume<br>• projects`
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
        about: ['about', 'site', 'website', 'info'],
        clear: ['clear', 'reset', 'new', 'refresh']
    }
};

// Freeze the config to prevent accidental modifications
Object.freeze(CONFIG);