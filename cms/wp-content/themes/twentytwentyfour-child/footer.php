    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <p>&copy; <?php echo date('Y'); ?> Pro Players Analyst. Sva prava pridržana.</p>
                <nav aria-label="Footer navigacija">
                    <ul>
                        <li><a href="/privatnost">Politika privatnosti</a></li>
                        <li><a href="/uvjeti">Uvjeti korištenja</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </footer>

    <?php wp_footer(); ?>

    <!-- JavaScript za hamburger menu i smooth scroll -->
    <script>
    function toggleMenu() {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        
        navLinks.classList.toggle('active');
        const isExpanded = navLinks.classList.contains('active');
        hamburger.setAttribute('aria-expanded', isExpanded);
    }

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

    // Share funkcionalnost
    function shareBlog(title, url) {
        if (navigator.share) {
            navigator.share({
                title: title,
                url: url
            }).catch(console.error);
        }
    }
    </script>
</body>
</html> 