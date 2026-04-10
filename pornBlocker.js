(function () {

    const BLOCKED_SITES = [
        "pornhub.com","xvideos.com","xnxx.com","redtube.com","youporn.com","xhamster.com",
        "nhentai.net","hanime.tv","hentaihaven.xxx","rule34.xxx","gelbooru.com","e621.net",
        "spankbang.com","tnaflix.com","porntrex.com","hqporner.com","beeg.com","sex.com",
        "tube8.com","thumbzilla.com","porn.com","nuvid.com","brazzers.com","bangbros.com",
        "realitykings.com","fakehub.com","eporner.com","hentaicity.com","hentaimama.io",
        "watchhentai.net"
    ];

    function isBlockedSite(host) {
        return BLOCKED_SITES.some(site =>
            host === site || host.endsWith("." + site)
        );
    }

    function blockPage() {
        document.documentElement.innerHTML = `
            <head><title>Blocked</title></head>
            <body style="
                margin:0;
                display:flex;
                justify-content:center;
                align-items:center;
                height:100vh;
                background:#121212;
                color:white;
                font-family:sans-serif;
                text-align:center;
            ">
                <div>
                    <h1>🚫 Blocked by webshield</h1>
                    <p><span class="highlight">This site is blocked for your focus, Pls don't goon bro.</span></p>
                </div>
            </body>
        `;
    }

    function runBlocker() {
        const host = window.location.hostname;

        chrome.storage.local.get(["global_pornBlocker"], (res) => {
            if (!res.global_pornBlocker) return;

            if (isBlockedSite(host)) {
                blockPage();
            }
        });
    }

    // Run immediately
    runBlocker();

    // IMPORTANT: keep checking (for dynamic sites)
    const observer = new MutationObserver(() => {
        runBlocker();
    });

    observer.observe(document, {
        childList: true,
        subtree: true
    });

})();