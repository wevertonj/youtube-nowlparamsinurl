window.onload = function () {
    function ytwlRemoveParams() {
        document.querySelectorAll('a.yt-simple-endpoint').forEach(function (link) {
            let href = link.href;

            if (href.indexOf('&list=WL') > -1) {
                let matches = href.match(/&index=([^&]*)/);
                if (matches && matches.length > 1) {
                    href = href.replace(matches[0], '');
                }

                href = href.replace('&list=WL', '');
                link.href = href;
                link.classList.add('ytwl-removed-params');
            }
        });
    }

    function ytwlLauncher() {
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

    function ytwlUrlChangeObserver() {
        let lastUrl = location.href;
        new MutationObserver(() => {
            const url = location.href;
            if (url !== lastUrl) {
                lastUrl = url;
                ytwlLauncher();
            }
        }).observe(document, {
            subtree: true,
            childList: true
        });
    }

    ytwlUrlChangeObserver();
    ytwlLauncher();
}