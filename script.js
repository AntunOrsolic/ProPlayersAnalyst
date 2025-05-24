// Konstante za WordPress API
const WP_URL = window.location.protocol + '//' + window.location.hostname + '/cms';
const API_URL = `${WP_URL}/wp-json/wp/v2`;

// Funkcija za dohvaćanje blog postova
async function fetchBlogPosts() {
    try {
        console.log('Dohvaćam postove...');
        const apiEndpoint = `${API_URL}/posts?_embed`;
        console.log('API endpoint:', apiEndpoint);
        
        const response = await fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        });
        
        if (!response.ok) {
            throw new Error(`HTTP greška: ${response.status}`);
        }
        
        const posts = await response.json();
        console.log('Dohvaćeni postovi:', posts);
        
        const blogContainer = document.querySelector('.blog-section .blog-container');
        if (!blogContainer) {
            console.error('Blog container nije pronađen!');
            return;
        }
        
        if (posts && posts.length > 0) {
            blogContainer.innerHTML = posts.map(post => renderBlogPost(post)).join('');
            console.log('Blog postovi su uspješno renderirani');
        } else {
            blogContainer.innerHTML = '<p class="no-posts">Trenutno nema dostupnih blog postova.</p>';
        }
    } catch (error) {
        console.error('Greška pri učitavanju postova:', error);
        const blogContainer = document.querySelector('.blog-section .blog-container');
        if (blogContainer) {
            blogContainer.innerHTML = `
                <div class="error-message" role="alert">
                    <p>Došlo je do greške pri učitavanju blog postova.</p>
                    <p>Molimo osvježite stranicu ili pokušajte kasnije.</p>
                    <p class="error-details">Tehnički detalji: ${error.message}</p>
                </div>
            `;
        }
    }
}

// Funkcija za renderiranje blog posta
function renderBlogPost(post) {
    console.log('Renderiram post:', post);
    const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/default-blog-image.jpg';
    const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || '';
    const date = new Date(post.date).toLocaleDateString('hr');
    const postUrl = post.link || `${WP_URL}/${post.slug}/`;
    
    return `
        <article class="blog-post">
            <div class="blog-image">
                <img src="${imageUrl}" 
                     alt="${post.title.rendered}" 
                     loading="lazy">
                <div class="category-tag">${category}</div>
            </div>
            <div class="blog-content">
                <h3>${post.title.rendered}</h3>
                <div class="post-meta">
                    <time datetime="${post.date}">${date}</time>
                </div>
                <div class="post-excerpt">
                    ${post.excerpt.rendered}
                </div>
                <div class="blog-footer">
                    <a href="${postUrl}" class="btn btn-primary read-more">
                        Pročitaj više
                    </a>
                    <div class="social-share">
                        <button class="share-btn" onclick="shareBlog('${post.title.rendered}', '${postUrl}')">
                            <i class="fas fa-share-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    `;
}

// Funkcija za dijeljenje
function shareBlog(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).catch(console.error);
    }
}

// Funkcija za prikaz greške
function showErrorMessage(message) {
    const blogContainer = document.querySelector('.blog-section .blog-container');
    if (blogContainer) {
        blogContainer.innerHTML = `
            <div class="error-message" role="alert">
                <h2>Greška</h2>
                <p>${message}</p>
            </div>
        `;
    }
}

// Fade-in animacija za naslove
function handleFadeInElements() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1, // Aktiviraj kada je 10% elementa vidljivo
        rootMargin: '0px 0px -50px 0px' // Aktiviraj malo prije nego što element dođe u viewport
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Kontrola gumba za povratak na vrh
function handleBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    const aboutSection = document.querySelector('#o-nama');
    
    if (!backToTopButton || !aboutSection) return;
    
    window.addEventListener('scroll', () => {
        const aboutSectionTop = aboutSection.offsetTop;
        
        if (window.pageYOffset > aboutSectionTop) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Kontrola animacije loga i društvenih mreža
function handleLogoAnimation() {
    const logoContainer = document.querySelector('.logo-container');
    const logo = document.querySelector('.logo');
    const socialIcons = document.querySelector('.social-icons');
    let timeout;

    if (!logoContainer || !logo || !socialIcons) return;

    logoContainer.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        logo.classList.add('flipped');
        setTimeout(() => {
            socialIcons.classList.add('visible');
        }, 300);
    });

    logoContainer.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
            socialIcons.classList.remove('visible');
            setTimeout(() => {
                logo.classList.remove('flipped');
            }, 300);
        }, 1500);
    });
}

// Kontrola reference karusela
function handleReferenceCarousel() {
    const container = document.querySelector('.reference-container');
    
    if (!container) return;

    // Touch događaji za mobilnu verziju
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    const handleSwipe = () => {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                container.scrollBy({
                    left: -container.offsetWidth,
                    behavior: 'smooth'
                });
            } else {
                container.scrollBy({
                    left: container.offsetWidth,
                    behavior: 'smooth'
                });
            }
        }
    };
}

// Cookie Consent funkcionalnost
function handleCookieConsent() {
    const cookieConsent = document.querySelector('.cookie-consent');
    const acceptBtn = document.querySelector('.accept-cookies');
    const rejectBtn = document.querySelector('.reject-cookies');

    // Provjeri postoji li već spremljena preferencija
    const cookiePreference = localStorage.getItem('cookieConsent');

    if (!cookiePreference) {
        cookieConsent.style.display = 'block';
    }

    // Funkcija za spremanje preferencije
    function saveCookiePreference(preference) {
        localStorage.setItem('cookieConsent', preference);
        cookieConsent.style.display = 'none';

        // Ako je korisnik prihvatio kolačiće, inicijaliziraj Google Analytics
        if (preference === 'accepted') {
            initializeAnalytics();
        }
    }

    // Event listeneri za gumbe
    acceptBtn.addEventListener('click', () => {
        saveCookiePreference('accepted');
    });

    rejectBtn.addEventListener('click', () => {
        saveCookiePreference('rejected');
    });
}

// Funkcija za inicijalizaciju Google Analytics (dodati kasnije)
function initializeAnalytics() {
    // Ovdje će ići kod za Google Analytics
    console.log('Google Analytics inicijaliziran');
}

// Inicijalizacija
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM je učitan, iniciram funkcionalnosti...');
    
    // FAQ funkcionalnost
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            // Zatvori sva ostala pitanja
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Toggle trenutno pitanje
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            question.setAttribute('aria-expanded', !isExpanded);
        });
    });

    // Inicijaliziraj blog ako postoji
    const blogContainer = document.querySelector('.blog-section .blog-container');
    if (blogContainer) {
        console.log('Blog container pronađen, dohvaćam postove...');
        fetchBlogPosts();
    }

    // Inicijaliziraj fade-in animacije
    handleFadeInElements();
    
    // Inicijaliziraj gumb za povratak na vrh
    handleBackToTop();
    
    // Inicijaliziraj animaciju loga
    handleLogoAnimation();

    // Inicijaliziraj reference karusel
    handleReferenceCarousel();
    
    // Inicijalizacija cookie consent bannera
    handleCookieConsent();
});

// Rukovanje poviješću preglednika
window.addEventListener('popstate', (event) => {
    console.log('Popstate event:', event);
    initBlog();
});

async function loadPosts() {
    try {
        console.log('Dohvaćam postove...');
        const response = await fetch(`${API_URL}/posts`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const posts = await response.json();
        console.log('Dohvaćeni postovi:', posts);
        
        const mainContent = document.querySelector('main');
        if (!mainContent) {
            console.error('Main element nije pronađen!');
            return;
        }
        
        mainContent.innerHTML = `
            <div class="blog-container">
                ${posts.map(post => createBlogPostLink(post)).join('')}
            </div>
        `;
    } catch (error) {
        console.error('Greška pri učitavanju postova:', error);
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="error-message">
                    <h2>Došlo je do greške</h2>
                    <p>${error.message}</p>
                </div>
            `;
        }
    }
}

// Dodajte i ove CSS stilove

// Hamburger menu funkcionalnost
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.classList.toggle('active');
    const isExpanded = navLinks.classList.contains('active');
    hamburger.setAttribute('aria-expanded', isExpanded);
}

// Smooth scroll za navigacijske linkove
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Zatvaramo mobilni menu ako je otvoren
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Zatvaranje mobilnog menija kada se klikne izvan
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.hamburger')) {
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Animacija za scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    const headerImage = document.querySelector('.hero-header');
    
    if (backToTopButton && headerImage) {
        window.addEventListener('scroll', function() {
            const headerBottom = headerImage.getBoundingClientRect().bottom;
            
            if (headerBottom < 0) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Pop-up Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('popup-modal');
    const closeBtn = document.querySelector('.popup-close');
    
    // Provjeri je li korisnik već zatvorio pop-up ili preuzeo brošuru
    const hasInteractedWithPopup = localStorage.getItem('popupInteracted');
    
    if (!hasInteractedWithPopup) {
        // Show modal after 5 seconds
        setTimeout(function() {
            modal.style.display = 'block';
        }, 5000);
    }
    
    // Close modal when X is clicked
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        localStorage.setItem('popupInteracted', 'true');
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            localStorage.setItem('popupInteracted', 'true');
        }
    });
});

// Download brochure function
function downloadBrochure() {
    // Replace this URL with the actual path to your brochure file
    const brochureUrl = '/documents/brosura.pdf';
    
    // Create a temporary link element and trigger download
    const link = document.createElement('a');
    link.href = brochureUrl;
    link.download = 'brosura.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Close the modal and save interaction
    document.getElementById('popup-modal').style.display = 'none';
    localStorage.setItem('popupInteracted', 'true');
}