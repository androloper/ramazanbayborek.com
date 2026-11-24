// Keep the existing resume layout compatible with lazy portfolio images.
(function ($) {
    'use strict';
    $(function () {
        var $gallery = $('#portfolio .sort-destination');
        var pending = false;
        $('#portfolio .sort-source').themePluginSort();
        // The image viewer must also work on touch and keyboard activation.
        $gallery.themePluginLightbox(theme.fn.getOptions($gallery.data('plugin-options')));
        function refreshGallery() {
            if (pending) return;
            pending = true;
            requestAnimationFrame(function () {
                pending = false;
                if ($gallery.data('isotope')) $gallery.isotope('layout');
            });
        }
        $gallery.find('img').on('load error', refreshGallery);

        // Initialize the existing education carousel without waiting for a scroll.
        $('#edu-skills .owl-carousel').each(function () {
            var $carousel = $(this);
            $carousel.themePluginCarousel(theme.fn.getOptions($carousel.data('plugin-options')));
        });
    });
})(jQuery);
