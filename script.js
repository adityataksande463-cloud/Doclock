/**
 * script.js – Vigyan Bhairav website
 * Handles persona selection, dynamic recommendations, featured techniques,
 * character interactions, and UI effects.
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // --------------------------------------------------------------
    // 1. TECHNIQUE DATABASE (first 12 techniques from our research)
    // --------------------------------------------------------------
    const techniques = {
        1: {
            id: 1,
            name: 'Look at a Bowl',
            duration: '5-15 min',
            tags: ['beginner', 'student', 'employee'],
            essence: 'Gaze at an empty bowl – the simplest beginning.',
            category: 'Gaze'
        },
        15: {
            id: 15,
            name: 'Witnessing the Breath',
            duration: '5-15 min',
            tags: ['student', 'employee', 'anxious', 'beginner'],
            essence: 'Watch your breath naturally, without control.',
            category: 'Breath'
        },
        32: {
            id: 32,
            name: 'Sound of a Stream',
            duration: '5-15 min',
            tags: ['beginner', 'anxious', 'student', 'employee'],
            essence: 'Merge with a natural sound until you become it.',
            category: 'Sound'
        },
        42: {
            id: 42,
            name: 'The Pause Between Breaths',
            duration: '5-15 min',
            tags: ['overthinker', 'ceo', 'seeker', 'advanced'],
            essence: 'Become aware of the natural gap after each exhale.',
            category: 'Breath / Void'
        },
        48: {
            id: 48,
            name: 'The Delight of Meeting',
            duration: '2-10 min',
            tags: ['heart', 'seeker', 'employee'],
            essence: 'Feel the joy of meeting as pure energy, not directed at anyone.',
            category: 'Emotion'
        },
        54: {
            id: 54,
            name: 'Awareness in Body Centers',
            duration: '5-15 min',
            tags: ['employee', 'anxious', 'beginner', 'student'],
            essence: 'Move awareness through different body centers.',
            category: 'Body'
        },
        68: {
            id: 68,
            name: 'Transforming Anger',
            duration: 'varies',
            tags: ['ceo', 'employee', 'seeker', 'heart'],
            essence: 'When anger arises, watch it as pure energy without acting out.',
            category: 'Emotion'
        },
        80: {
            id: 80,
            name: 'Gazing at an Object',
            duration: '5-15 min',
            tags: ['student', 'ceo', 'overthinker', 'philosophy'],
            essence: 'Fix your gaze on an object until the mind becomes still.',
            category: 'Gaze'
        },
        89: {
            id: 89,
            name: 'Listen to the Inaudible',
            duration: '5-15 min',
            tags: ['philosophy', 'seeker', 'overthinker', 'advanced'],
            essence: 'Listen to subtle inner sounds – the unstruck sound.',
            category: 'Sound / Void'
        },
        104: {
            id: 104,
            name: 'Feel the Body as Infinite Space',
            duration: '5-15 min',
            tags: ['seeker', 'ceo', 'advanced', 'philosophy'],
            essence: 'Experience the body as a field of empty space.',
            category: 'Body / Void'
        },
        112: {
            id: 112,
            name: 'Shiva\'s Last Teaching',
            duration: '10-20 min',
            tags: ['seeker', 'advanced', 'philosophy'],
            essence: 'Remain centered in the space between sleeping and waking.',
            category: 'Sleep / Void'
        }
    };

    // --------------------------------------------------------------
    // 2. PERSONA TO TECHNIQUE MAPPING (using IDs)
    // --------------------------------------------------------------
    const personaMap = {
        student: [15, 32, 80, 1],
        employee: [15, 48, 54, 32],
        ceo: [42, 15, 104, 68],
        seeker: [48, 42, 104, 89, 112],
        anxious: [15, 32, 54, 42],
        overthinker: [42, 15, 89, 80],
        beginner: [1, 15, 32, 54],
        heart: [48, 68, 54, 42]
    };

    // --------------------------------------------------------------
    // 3. DOM ELEMENTS
    // --------------------------------------------------------------
    const personaCards = document.querySelectorAll('.persona-card');
    const recommendationsSection = document.getElementById('recommendations');
    const recGrid = document.getElementById('recGrid');
    const featuredGrid = document.getElementById('featuredGrid');
    const findTechBtn = document.getElementById('findTechBtn');
    const personaSection = document.getElementById('personaSection');
    const shiva = document.getElementById('shiva');
    const shivaBubble = document.getElementById('shivaBubble');

    // --------------------------------------------------------------
    // 4. HELPER: Render a list of technique cards into a grid
    // --------------------------------------------------------------
    function renderTechniqueCards(techniqueIds, container, limit = 4) {
        if (!container) return;
        const idsToRender = techniqueIds.slice(0, limit);
        container.innerHTML = ''; // clear

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
                <div class="tech-tags">
                    ${tech.tags.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
                <a href="techniques/technique-${tech.id}.html" class="tech-link">Try this <i class="fas fa-arrow-right"></i></a>
            `;
            container.appendChild(card);
        });

        // If fewer cards than expected, fill with placeholders? not needed.
    }

    // --------------------------------------------------------------
    // 5. POPULATE FEATURED (TRENDING) TECHNIQUES
    // --------------------------------------------------------------
    const trendingIds = [15, 42, 48, 32]; // most popular from our set
    renderTechniqueCards(trendingIds, featuredGrid, 4);

    // --------------------------------------------------------------
    // 6. PERSONA CLICK HANDLER
    // --------------------------------------------------------------
    let selectedPersona = null;

    function showRecommendations(persona) {
        const techIds = personaMap[persona] || personaMap.student; // fallback
        renderTechniqueCards(techIds, recGrid, 4); // show up to 4
        recommendationsSection.style.display = 'block';
    }

    personaCards.forEach(card => {
        card.addEventListener('click', () => {
            const persona = card.dataset.persona;
            if (!persona) return;

            // Deselect all others
            personaCards.forEach(c => c.classList.remove('selected'));
            // Select this one
            card.classList.add('selected');
            selectedPersona = persona;

            // Show recommendations
            showRecommendations(persona);
        });

        // keyboard accessibility (Enter/Space)
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    // --------------------------------------------------------------
    // 7. "FIND YOUR TECHNIQUE" BUTTON – scroll to persona section
    // --------------------------------------------------------------
    if (findTechBtn) {
        findTechBtn.addEventListener('click', () => {
            personaSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --------------------------------------------------------------
    // 8. LITTLE SHIVA INTERACTION (multiple messages)
    // --------------------------------------------------------------
    if (shiva && shivaBubble) {
        const messages = [
            'Just watch...',
            'I’m always watching with you',
            'The breath is the bridge',
            'No effort, just awareness',
            'You are the witness',
            'Everything is perfect'
        ];
        let msgIndex = 0;
        shiva.addEventListener('click', (e) => {
            e.stopPropagation(); // avoid triggering ripple on parent
            msgIndex = (msgIndex + 1) % messages.length;
            shivaBubble.textContent = messages[msgIndex];
        });
    }

    // --------------------------------------------------------------
    // 9. RIPPLE EFFECT ON CLICK (soft spiritual touch)
    // --------------------------------------------------------------
    function createRipple(x, y) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.position = 'fixed';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 209, 102, 0.4)'; // warm yellow
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple-animation 0.8s ease-out';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '9999';
        document.body.appendChild(ripple);

        // Remove after animation
        setTimeout(() => {
            ripple.remove();
        }, 800);
    }

    document.addEventListener('click', (e) => {
        // Avoid if clicked on interactive elements that might have their own effect
        const target = e.target;
        if (target.closest('a') || target.closest('button') || target.closest('.persona-card')) {
            // still add ripple but also keep default behavior
        }
        createRipple(e.clientX, e.clientY);
    });

    // Inject keyframe animation for ripple if not already present
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple-animation {
                0% { transform: scale(0); opacity: 1; }
                100% { transform: scale(15); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // --------------------------------------------------------------
    // 10. PLACEHOLDER: Ensure technique links work (if pages missing)
    // --------------------------------------------------------------
    // For now, links point to technique-XX.html. We can later create those files.
    // Add a fallback to prevent broken links? Not needed.
});
