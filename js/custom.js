// Keep the existing resume layout compatible with lazy portfolio images.
(function ($) {
    'use strict';
    $(function () {
        window.addEventListener('keydown', function (event) {
            if (event.key !== 'Escape') return;
            var toggle = event.target.closest('.language-switcher')?.querySelector('.language-toggle[aria-expanded="true"]');
            if (!toggle) return;
            event.preventDefault();
            event.stopPropagation();
            bootstrap.Dropdown.getOrCreateInstance(toggle).hide();
            toggle.focus();
        }, true);
        var $gallery = $('#portfolio .sort-destination');
        var pending = false;
        // Section links use the URL hash. Keep gallery filters independent of it.
        $('#portfolio .sort-source').themePluginSort({ useHash: false });
        // The image viewer must also work on touch and keyboard activation.
        var galleryLanguage = {
            tr: {
                tClose: 'Kapat (Esc)',
                tLoading: 'Yükleniyor…',
                gallery: {
                    tPrev: 'Önceki (sol ok)',
                    tNext: 'Sonraki (sağ ok)',
                    tCounter: '%curr% / %total%'
                },
                image: { tError: '<a href="%url%">Görsel</a> yüklenemedi.' }
            },
            de: {
                tClose: 'Schließen (Esc)',
                tLoading: 'Wird geladen…',
                gallery: {
                    tPrev: 'Zurück (Pfeiltaste links)',
                    tNext: 'Weiter (Pfeiltaste rechts)',
                    tCounter: '%curr% von %total%'
                },
                image: { tError: '<a href="%url%">Das Bild</a> konnte nicht geladen werden.' }
            },
            es: {
                tClose: 'Cerrar (Esc)',
                tLoading: 'Cargando…',
                gallery: {
                    tPrev: 'Anterior (flecha izquierda)',
                    tNext: 'Siguiente (flecha derecha)',
                    tCounter: '%curr% de %total%'
                },
                image: { tError: 'No se pudo cargar <a href="%url%">la imagen</a>.' }
            },
            it: {
                tClose: 'Chiudi (Esc)',
                tLoading: 'Caricamento…',
                gallery: {
                    tPrev: 'Precedente (freccia sinistra)',
                    tNext: 'Successiva (freccia destra)',
                    tCounter: '%curr% di %total%'
                },
                image: { tError: 'Impossibile caricare <a href="%url%">l’immagine</a>.' }
            }
        };
        var galleryOptions = theme.fn.getOptions($gallery.data('plugin-options'));
        $gallery.themePluginLightbox($.extend(true, {}, galleryOptions,
            galleryLanguage[document.documentElement.lang]));
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
