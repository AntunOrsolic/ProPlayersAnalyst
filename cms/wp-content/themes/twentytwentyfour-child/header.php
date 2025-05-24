<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="date=no">
    <meta name="format-detection" content="address=no">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    
    <!-- Fontovi -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <!-- Dodajemo verziju CSS-a -->
    <link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/style.css?v=5">
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

    <!-- Navigation -->
    <nav class="main-nav" aria-label="Glavna navigacija">
        <div class="nav-container">
            <a href="/" class="logo">
                <h1>Pro Players Analyst</h1>
            </a>
            <button class="hamburger" onclick="toggleMenu()" aria-label="Otvori izbornik" aria-expanded="false"
                type="button">
                <span class="hamburger-icon">☰</span>
            </button>
            <ul class="nav-links" role="menubar">
                <li role="none"><a href="/#o-nama" role="menuitem">Naša misija</a></li>
                <li role="none"><a href="/#usluge" role="menuitem">Vještine</a></li>
                <li role="none"><a href="/#edukacija" role="menuitem">Edukacija</a></li>
                <li role="none"><a href="/#reference" role="menuitem">Reference</a></li>
                <li role="none"><a href="/#blog" role="menuitem">Blog</a></li>
                <li role="none"><a href="/#faq" role="menuitem">FAQ</a></li>
                <li role="none"><a href="/#subscribe" role="menuitem">Newsletter</a></li>
                <li role="none"><a href="/#contact" role="menuitem">Kontakt</a></li>
            </ul>
        </div>
    </nav> 