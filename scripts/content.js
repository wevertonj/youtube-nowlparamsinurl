window.onload = function () {
    function ytwlRemoveParams() {
        document.querySelectorAll('a.ytd-playlist-video-renderer').forEach(function (link) {
            let href = link.href;

            if (!link.classList.contains('ytwl-removed-params')) {
                if (href.indexOf('&list=WL') > -1) {
                    let matches = href.match(/&index=([^&]*)/);
                    if (matches && matches.length > 1) {
                        href = href.replace(matches[0], '');
                    }

                    href = href.replace('&list=WL', '');
                    link.href = href;
                    link.classList.add('ytwl-removed-params');
                }
            }
        });
    }

    if (window.location.href == 'https://www.youtube.com/playlist?list=WL') {
        let ytwlTimer = setInterval(() => {
            let ytwlVideoContainer = document.querySelector('ytd-playlist-video-list-renderer');

            if (ytwlVideoContainer) {
                ytwlVideoContainer.addEventListener('DOMSubtreeModified', () => ytwlRemoveParams());
                ytwlRemoveParams();
                clearInterval(ytwlTimer);
            }
        }, 500);
    }
}