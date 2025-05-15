<?php get_header(); ?>

<main class="single-post-content">
    <div class="container">
        <?php while (have_posts()) : the_post(); ?>
            <article class="blog-post single">
                <?php if (has_post_thumbnail()) : ?>
                    <div class="blog-image">
                        <?php the_post_thumbnail('full', array('class' => 'featured-image')); ?>
                        <?php
                        $categories = get_the_category();
                        if ($categories) : ?>
                            <div class="category-tag">
                                <?php echo esc_html($categories[0]->name); ?>
                            </div>
                        <?php endif; ?>
                    </div>
                <?php endif; ?>

                <div class="blog-content">
                    <h1><?php the_title(); ?></h1>
                    
                    <div class="post-meta">
                        <time datetime="<?php echo get_the_date('c'); ?>">
                            <?php echo get_the_date(); ?>
                        </time>
                        <span class="author">
                            <?php echo get_the_author(); ?>
                        </span>
                    </div>

                    <div class="post-content">
                        <?php the_content(); ?>
                    </div>

                    <div class="blog-footer">
                        <div class="social-share">
                            <button class="share-btn" onclick="shareBlog('<?php echo esc_js(get_the_title()); ?>', '<?php echo esc_js(get_permalink()); ?>')">
                                <i class="fas fa-share-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        <?php endwhile; ?>
    </div>
</main>

<?php get_footer(); ?> 