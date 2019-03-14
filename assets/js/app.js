(function() {
    'use strict';

    {{ if or (.Site.Params.showTagCloud | default true) (.Site.Params.showSearch | default true) (.Site.Params.showtoc | default true) (.Site.Params.showScrollToTop | default true) }}

    window.addEventListener("load", function(){
        {{ if .Site.Params.showScrollToTop | default true }}
        document.getElementById("scroll-to-top").onclick = function(){
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        };
        {{ end }}

        var prevScrollpos = window.pageYOffset;
        window.onscroll = function() {
            var currentScrollPos = window.pageYOffset;

            {{ if .Site.Params.showTagCloud | default true }}
            if (document.getElementById("tag-cloud") !== null) {
                    if (prevScrollpos > currentScrollPos) { // scroll up
                            document.getElementById("tag-cloud").style.visibility = "visible";
                            document.getElementById("tag-cloud").style.opacity = "1";
                    } else {
                            document.getElementById("tag-cloud").style.visibility = "hidden";
                            document.getElementById("tag-cloud").style.opacity = "0";
                    }
            }
            {{ end }}

            {{ if .Site.Params.showSearch | default true }}
            if (document.getElementById("site-search") !== null) {
                    if (prevScrollpos > currentScrollPos) { // scroll up
                            document.getElementById("site-search").style.visibility = "visible";
                            document.getElementById("site-search").style.opacity = "1";
                    } else {
                            document.getElementById("site-search").style.visibility = "hidden";
                            document.getElementById("site-search").style.opacity = "0";
                    }
            }
            {{ end }}

            {{ if .Site.Params.showScrollToTop | default true }}
            if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
                document.getElementById("scroll-to-top").style.display = "inline";
                document.getElementById("scroll-to-top").style.visibility = "visible";
                document.getElementById("scroll-to-top").style.opacity = "1";
            } else {
                document.getElementById("scroll-to-top").style.visibility = "hidden";
                document.getElementById("scroll-to-top").style.opacity = "0";
            }
            {{ end }}
            prevScrollpos = currentScrollPos;
        }
        {{ if .Params.math }}
            renderMathInElement(document.body,
                {
                    delimiters: [
                        {left: "$$", right: "$$", display: true},
                        {left: "$", right: "$", display: false},
                    ]
                }
            );

            var inlineMathArray = document.querySelectorAll("script[type='math/tex']");
            for (var i = 0; i < inlineMathArray.length; i++) {
                var inlineMath = inlineMathArray[i];
                var tex = inlineMath.innerText || inlineMath.textContent;
                var replaced = document.createElement("span");
                replaced.innerHTML = katex.renderToString(tex, {displayMode: false});
                inlineMath.parentNode.replaceChild(replaced, inlineMath);
            }

            var displayMathArray = document.querySelectorAll("script[type='math/tex; mode=display']");
            for (var i = 0; i < displayMathArray.length; i++) {
                var displayMath = displayMathArray[i];
                var tex = displayMath.innerHTML;
                var replaced = document.createElement("span");
                replaced.innerHTML = katex.renderToString(tex.replace(/%.*/g, ''), {displayMode: true});
                displayMath.parentNode.replaceChild(replaced, displayMath);
            }
        {{ end }}

        {{ if .Site.Params.showtoc | default true }}
        if (document.getElementById("contents-list") !== null && document.getElementsByClassName("post-content").length !== 0) {
            tocbot.init({
                // Where to render the table of contents.
                tocSelector: '#contents-list',
                // Where to grab the headings to build the table of contents.
                contentSelector: '.post-content',
                // Which headings to grab inside of the contentSelector element.
                headingSelector: 'h1, h2, h3',
            });
        }
        {{ end }}
    });
    {{ end }}
})();
