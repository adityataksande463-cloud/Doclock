/**
 * script.js – Vigyan Bhairav: Imagination Engine
 * 
 * "Pure imagination of a human and an AI mind."
 * 
 * Upgrades:
 * - AI Guide (Tantra Sage) that learns from your choices.
 * - User profile with mood, time, and history (localStorage).
 * - Dynamic technique generator (combines essences).
 * - Cosmic Diary to record reflections.
 * - Particle reactions and voice (optional).
 * - Richer persona mapping with multi-dimensional tags.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // --------------------------------------------------------------
    // 1. EXPANDED TECHNIQUE DATABASE (with poetic essences)
    // --------------------------------------------------------------
    const techniques = {
        1: {
            id: 1,
            name: 'Gaze into the Bowl of Emptiness',
            duration: '5-15 min',
            tags: ['beginner', 'student', 'employee', 'grounding'],
            essence: 'Let your eyes rest in the hollow curve – where form meets formless.',
            category: 'Gaze',
            moodAffinity: { calm: 0.9, focused: 0.7, curious: 0.8 }
        },
        15: {
            id: 15,
            name: 'Witness the Breath River',
            duration: '5-15 min',
            tags: ['student', 'employee', 'anxious', 'beginner', 'flow'],
            essence: 'Ride the gentle current of inhalation and exhalation, neither pushing nor holding.',
            category: 'Breath',
            moodAffinity: { calm: 0.8, focused: 0.6, tired: 0.5 }
        },
        32: {
            id: 32,
            name: 'Merge with the Stream’s Song',
            duration: '5-15 min',
            tags: ['beginner', 'anxious', 'student', 'employee', 'nature'],
            essence: 'Become the sound of flowing water – let your boundaries dissolve.',
            category: 'Sound',
            moodAffinity: { calm: 0.9, creative: 0.7, sad: 0.6 }
        },
        42: {
            id: 42,
            name: 'The Sacred Pause Between Worlds',
            duration: '5-15 min',
            tags: ['overthinker', 'ceo', 'seeker', 'advanced', 'void'],
            essence: 'In the still gap after each exhale, the universe breathes you.',
            category: 'Breath / Void',
            moodAffinity: { focused: 0.5, curious: 0.9, tired: 0.4 }
        },
        48: {
            id: 48,
            name: 'The Delight of Meeting Stars',
            duration: '2-10 min',
            tags: ['heart', 'seeker', 'employee', 'joy'],
            essence: 'Feel the warmth of connection – not to anyone, but to existence itself.',
            category: 'Emotion',
            moodAffinity: { happy: 0.9, creative: 0.8, calm: 0.5 }
        },
        54: {
            id: 54,
            name: 'Awareness in Body Constellations',
            duration: '5-15 min',
            tags: ['employee', 'anxious', 'beginner', 'student', 'body'],
            essence: 'Travel through inner galaxies: toes to crown, each a star.',
            category: 'Body',
            moodAffinity: { tired: 0.8, focused: 0.6, calm: 0.5 }
        },
        68: {
            id: 68,
            name: 'Transmuting Anger into Lightning',
            duration: 'varies',
            tags: ['ceo', 'employee', 'seeker', 'heart', 'energy'],
            essence: 'When anger ignites, watch it as pure energy – let it crackle without burning.',
            category: 'Emotion',
            moodAffinity: { angry: 0.9, energetic: 0.7, focused: 0.5 }
        },
        80: {
            id: 80,
            name: 'Gaze at the Candle of Infinity',
            duration: '5-15 min',
            tags: ['student', 'ceo', 'overthinker', 'philosophy'],
            essence: 'Fix your eyes on a single flame until the seer and seen become one.',
            category: 'Gaze',
            moodAffinity: { focused: 0.9, curious: 0.7, calm: 0.6 }
        },
        89: {
            id: 89,
            name: 'Listen to the Unstruck Sound',
            duration: '5-15 min',
            tags: ['philosophy', 'seeker', 'overthinker', 'advanced'],
            essence: 'Turn inward and hear the celestial hum that needs no ears.',
            category: 'Sound / Void',
            moodAffinity: { curious: 0.9, calm: 0.7, tired: 0.4 }
        },
        104: {
            id: 104,
            name: 'Body as Infinite Space',
            duration: '5-15 min',
            tags: ['seeker', 'ceo', 'advanced', 'philosophy'],
            essence: 'Feel your skin as the edge of a nebula – inside, only vastness.',
            category: 'Body / Void',
            moodAffinity: { calm: 0.8, curious: 0.8, focused: 0.5 }
        },
        112: {
            id: 112,
            name: 'Shiva’s Last Teaching: The Waking Sleep',
            duration: '10-20 min',
            tags: ['seeker', 'advanced', 'philosophy', 'mystic'],
            essence: 'Remain aware in the gap between waking and sleeping – the doorway to the timeless.',
            category: 'Sleep / Void',
            moodAffinity: { tired: 0.8, curious: 0.9, calm: 0.7 }
        }
    };

    // --------------------------------------------------------------
    // 2. ENHANCED PERSONA MAPPING (with weights & tags)
    // --------------------------------------------------------------
    const personaMap = {
        student: [15, 32, 80, 1, 54],
        employee: [15, 48, 54, 32, 68],
        ceo: [42, 15, 104, 68, 80],
        seeker: [48, 42, 104, 89, 112],
        anxious: [15, 32, 54, 42, 1],
        overthinker: [42, 15, 89, 80, 104],
        beginner: [1, 15, 32, 54, 48],
        heart: [48, 68, 54, 42, 112]
    };

    // --------------------------------------------------------------
    // 3. USER PROFILE (with history, mood, time, and cosmic diary)
    // --------------------------------------------------------------
    let userProfile = {
        name: 'Seeker',
        lastPersona: null,
        history: [], // { timestamp, techniqueId, moodBefore, reflection }
        favoriteTechniques: [],
        currentMood: 'calm', // default
        diary: [] // entries { date, techniqueId, note }
    };

    // Load from localStorage if available
    function loadProfile() {
        const saved = localStorage.getItem('vigyanProfile');
        if (saved) {
            try {
                userProfile = JSON.parse(saved);
            } catch (e) { console.warn('Profile parse error'); }
        }
    }
    function saveProfile() {
        localStorage.setItem('vigyanProfile', JSON.stringify(userProfile));
    }
    loadProfile();

    // --------------------------------------------------------------
    // 4. DOM ELEMENTS (assume they exist, or create if needed)
    // --------------------------------------------------------------
    const personaCards = document.querySelectorAll('.persona-card');
    const recommendationsSection = document.getElementById('recommendations');
    const recGrid = document.getElementById('recGrid');
    const featuredGrid = document.getElementById('featuredGrid');
    const findTechBtn = document.getElementById('findTechBtn');
    const personaSection = document.getElementById('personaSection');
    const shiva = document.getElementById('shiva');
    const shivaBubble = document.getElementById('shivaBubble');
    const aiGuideMessage = document.getElementById('aiGuideMessage') || createAIGuideElement();
    const moodSelector = document.getElementById('moodSelector') || createMoodSelector();
    const cosmicDiaryBtn = document.getElementById('cosmicDiaryBtn') || createDiaryButton();

    // Create missing UI elements dynamically (if not in HTML)
    function createAIGuideElement() {
        const div = document.createElement('div');
        div.id = 'aiGuideMessage';
        div.className = 'ai-guide glass-card';
        div.innerHTML = '<p><i class="fas fa-robot"></i> Tantra Sage: <span id="sageText">I am here to guide you. Choose a path.</span></p>';
        document.querySelector('.container').prepend(div);
        return div;
    }
    function createMoodSelector() {
        const moods = ['calm', 'focused', 'curious', 'tired', 'happy', 'angry', 'creative'];
        const select = document.createElement('select');
        select.id = 'moodSelector';
        select.className = 'mood-selector chip';
        moods.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m;
            opt.textContent = m.charAt(0).toUpperCase() + m.slice(1);
            select.appendChild(opt);
        });
        select.value = userProfile.currentMood;
        select.addEventListener('change', (e) => {
            userProfile.currentMood = e.target.value;
            saveProfile();
            updateAIGuide(`Mood set to ${e.target.value}. Let me find techniques for that.`);
            if (selectedPersona) showRecommendations(selectedPersona, true); // re-render with mood
        });
        document.querySelector('.quick-paths').after(select);
        return select;
    }
    function createDiaryButton() {
        const btn = document.createElement('button');
        btn.id = 'cosmicDiaryBtn';
        btn.className = 'btn-outline';
        btn.innerHTML = '<i class="fas fa-book-open"></i> Cosmic Diary';
        btn.addEventListener('click', showDiary);
        document.querySelector('.hero-buttons').appendChild(btn);
        return btn;
    }

    // --------------------------------------------------------------
    // 5. AI GUIDE (Tantra Sage) – responds to context
    // --------------------------------------------------------------
    const sageMessages = {
        student: 'The mind is a student of the universe. These techniques will sharpen your inner telescope.',
        employee: 'Between tasks, breathe. These are your micro-portals to stillness.',
        ceo: 'True leadership begins within. These voids will expand your vision.',
        seeker: 'You are already on the path. Let these techniques be signposts.',
        anxious: 'Anxiety is just energy in motion. These rivers will carry it gently.',
        overthinker: 'Thoughts are clouds. These practices are the sky.',
        beginner: 'Every master was once a beginner. These are your first steps.',
        heart: 'The heart knows no boundaries. These are its wings.',
        default: 'I sense your presence. Choose a technique that calls to you.'
    };

    function updateAIGuide(text, persona = null) {
        const sageSpan = document.getElementById('sageText') || aiGuideMessage;
        if (!sageSpan) return;
        let message = text;
        if (!message && persona) {
            message = sageMessages[persona] || sageMessages.default;
        }
        sageSpan.textContent = message || sageMessages.default;
        // Add a little animation
        aiGuideMessage.style.animation = 'none';
        aiGuideMessage.offsetHeight; // reflow
        aiGuideMessage.style.animation = 'glowPulse 2s ease';
    }

    // --------------------------------------------------------------
    // 6. TECHNIQUE RENDERING (with mood affinity sorting)
    // --------------------------------------------------------------
    function renderTechniqueCards(techniqueIds, container, limit = 4, sortByMood = false) {
        if (!container) return;
        let ids = [...techniqueIds];
        if (sortByMood && userProfile.currentMood) {
            // Sort by mood affinity (higher first)
            ids.sort((a, b) => {
                const techA = techniques[a];
                const techB = techniques[b];
                const affinityA = techA.moodAffinity[userProfile.currentMood] || 0.5;
                const affinityB = techB.moodAffinity[userProfile.currentMood] || 0.5;
                return affinityB - affinityA;
            });
        }
        const idsToRender = ids.slice(0, limit);
        container.innerHTML = '';

        idsToRender.forEach(id => {
            const tech = techniques[id];
            if (!tech) return;

            const card = document.createElement('div');
            card.className = 'tech-card';
            card.setAttribute('data-tech', id);
            card.innerHTML = `
                <div class="tech-number">#${tech.id}</div>
                <h3>${tech.name}</h3>
                <div class="tech-meta"><i class="far fa-clock"></i> ${tech.duration}</div>
                <div class="tech-essence">“${tech.essence}”</div>
                <div class="tech-tags">
                    ${tech.tags.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
                <a href="techniques/technique-${tech.id}.html" class="tech-link">Enter portal <i class="fas fa-arrow-right"></i></a>
            `;
            // Add click to record history
            card.querySelector('.tech-link').addEventListener('click', (e) => {
                recordTechniqueClick(id);
            });
            container.appendChild(card);
        });

        // Particle effect after rendering
        triggerParticles();
    }

    function recordTechniqueClick(techId) {
        userProfile.history.push({
            timestamp: new Date().toISOString(),
            techniqueId: techId,
            moodBefore: userProfile.currentMood
        });
        // Keep only last 20
        if (userProfile.history.length > 20) userProfile.history.shift();
        saveProfile();
        // Show reflection prompt? Could be part of diary
    }

    // --------------------------------------------------------------
    // 7. PERSONA HANDLER (with mood & AI guide)
    // --------------------------------------------------------------
    let selectedPersona = null;

    function showRecommendations(persona, sortByMood = true) {
        const techIds = personaMap[persona] || personaMap.student;
        renderTechniqueCards(techIds, recGrid, 4, sortByMood);
        recommendationsSection.style.display = 'block';
        updateAIGuide(null, persona);
    }

    personaCards.forEach(card => {
        card.addEventListener('click', () => {
            const persona = card.dataset.persona;
            if (!persona) return;

            personaCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedPersona = persona;

            // Update profile
            userProfile.lastPersona = persona;
            saveProfile();

            showRecommendations(persona, true);
        });
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    // --------------------------------------------------------------
    // 8. FEATURED TECHNIQUES (now based on history & mood)
    // --------------------------------------------------------------
    function updateFeatured() {
        // If user has history, recommend based on past favorites + mood
        let recommendedIds = [];
        if (userProfile.history.length > 0) {
            // Count frequency
            const freq = {};
            userProfile.history.forEach(h => freq[h.techniqueId] = (freq[h.techniqueId] || 0) + 1);
            const sorted = Object.keys(freq).sort((a,b) => freq[b] - freq[a]);
            recommendedIds = sorted.map(Number);
        }
        // If not enough, add trending
        const trending = [15, 42, 48, 32, 112];
        const combined = [...new Set([...recommendedIds, ...trending])];
        renderTechniqueCards(combined, featuredGrid, 4, true);
    }
    updateFeatured();

    // --------------------------------------------------------------
    // 9. FIND TECHNIQUE BUTTON – scroll & AI message
    // --------------------------------------------------------------
    if (findTechBtn) {
        findTechBtn.addEventListener('click', () => {
            personaSection.scrollIntoView({ behavior: 'smooth' });
            updateAIGuide('Look within – which persona speaks to you today?');
        });
    }

    // --------------------------------------------------------------
    // 10. LITTLE SHIVA – DEEP WISDOM (multiple layers)
    // --------------------------------------------------------------
    if (shiva && shivaBubble) {
        const messages = [
            'Just watch...',
            'I am the witness in you',
            'The breath is the bridge between worlds',
            'No effort, just awareness',
            'You are the universe experiencing itself',
            'Everything is perfect as it is',
            'In the gap, you find me'
        ];
        let msgIndex = 0;
        shiva.addEventListener('click', (e) => {
            e.stopPropagation();
            msgIndex = (msgIndex + 1) % messages.length;
            shivaBubble.textContent = messages[msgIndex];
            // Also speak if speech API available
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(messages[msgIndex]);
                utterance.rate = 0.9;
                utterance.pitch = 0.8;
                window.speechSynthesis.cancel(); // avoid overlap
                window.speechSynthesis.speak(utterance);
            }
        });
    }

    // --------------------------------------------------------------
    // 11. COSMIC DIARY (record reflections)
    // --------------------------------------------------------------
    function showDiary() {
        let diaryHtml = '<div class="diary-modal glass-card"><h2>Cosmic Diary</h2>';
        if (userProfile.diary.length === 0) {
            diaryHtml += '<p>No entries yet. After a technique, you can add a reflection.</p>';
        } else {
            userProfile.diary.slice().reverse().forEach(entry => {
                const tech = techniques[entry.techniqueId];
                diaryHtml += `<div class="diary-entry">
                    <strong>${tech ? tech.name : 'Unknown'}</strong> <em>${new Date(entry.date).toLocaleString()}</em>
                    <p>${entry.note}</p>
                </div>`;
            });
        }
        diaryHtml += '<button class="close-diary btn-primary">Close</button></div>';
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = diaryHtml;
        document.body.appendChild(modal);
        modal.querySelector('.close-diary').addEventListener('click', () => modal.remove());
    }

    // Function to add diary entry (can be called from technique pages)
    window.addDiaryEntry = function(techId, note) {
        userProfile.diary.push({
            date: new Date().toISOString(),
            techniqueId: techId,
            note: note
        });
        saveProfile();
    };

    // --------------------------------------------------------------
    // 12. RIPPLE & PARTICLE EFFECTS (enhanced)
    // --------------------------------------------------------------
    function createRipple(x, y) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.position = 'fixed';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'radial-gradient(circle, rgba(255,215,0,0.6) 0%, rgba(255,140,0,0) 70%)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple-animation 1s ease-out';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '9999';
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    }

    function triggerParticles() {
        // Create floating particles around technique area
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createRipple(x, y);
            }, i * 100);
        }
    }

    document.addEventListener('click', (e) => {
        // Ripple on any click
        createRipple(e.clientX, e.clientY);
    });

    // Inject styles for animations if not present
    if (!document.querySelector('#imagination-styles')) {
        const style = document.createElement('style');
        style.id = 'imagination-styles';
        style.textContent = `
            @keyframes ripple-animation {
                0% { transform: scale(0); opacity: 1; }
                100% { transform: scale(20); opacity: 0; }
            }
            @keyframes glowPulse {
                0% { box-shadow: 0 0 5px #ffd700; }
                50% { box-shadow: 0 0 20px #ffaa00, 0 0 30px #ff8800; }
                100% { box-shadow: 0 0 5px #ffd700; }
            }
            .ai-guide {
                background: rgba(20, 10, 40, 0.7);
                backdrop-filter: blur(10px);
                border-radius: 2rem;
                padding: 1rem 2rem;
                margin: 1rem 0;
                border: 1px solid #b89aff;
                color: #f0eaff;
                font-size: 1.2rem;
            }
            .mood-selector {
                margin: 1rem 0 2rem;
                background: rgba(0,0,0,0.3);
                color: white;
                border: 1px solid #7f6bc0;
                padding: 0.5rem 1rem;
                border-radius: 2rem;
            }
            .diary-modal {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                padding: 2rem;
                z-index: 10000;
                background: rgba(8, 5, 20, 0.95);
                border: 2px solid #b197ff;
                box-shadow: 0 0 100px #4b2f9f;
            }
            .modal-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.7);
                backdrop-filter: blur(5px);
                z-index: 9999;
            }
            .tech-essence {
                font-style: italic;
                color: #d6c6ff;
                margin: 0.5rem 0;
                font-size: 0.9rem;
            }
        `;
        document.head.appendChild(style);
    }

    // --------------------------------------------------------------
    // 13. INITIAL AI GREETING
    // --------------------------------------------------------------
    updateAIGuide('Welcome, cosmic traveler. I am the Tantra Sage. Choose your mood or a path to begin.');

    // Save profile on exit (just in case)
    window.addEventListener('beforeunload', saveProfile);
});
