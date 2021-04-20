import { getRootDir } from "./getRootDir"
import * as nunjucksLib from "nunjucks"
import hljs from "highlight.js"


export let nunjucks = nunjucksLib.configure(getRootDir() + "/templates", {
    autoescape: true,
    watch: true
})

nunjucks.addFilter("nl2br", function (str: string) {
    return str.replace(/\r|\n|\r\n/g, "<br />")
})

function HighlightJsExtension() {
    this.tags = ['highlightjs'];

    this.parse = function (parser, nodes) {
        const tok = parser.nextToken();  // Get the tag token

        // Parse the args and move after the block end.
        const args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);

        // Parse the body
        const body = parser.parseUntilBlocks('highlightjs', 'endhighlightjs');
        parser.advanceAfterBlockEnd();

        // Actually do work on block body and arguments
        return new nodes.CallExtension(this, 'run', args, [body]);
    };

    this.run = function (context, language, bodyCallback) {
        let rawCode: string = bodyCallback();

        let rawCodeArray = rawCode.split("\n")
        let minSpaces = 1000
        rawCodeArray.forEach(line => {
            const result = line.match(/^([ ]+)/)
            if(result && result[1].length < line.length) {
                minSpaces = Math.min(minSpaces, result[1].length)
            }
        })

        if(minSpaces < 1000) {
            rawCodeArray = rawCodeArray.map(line => line.substr(minSpaces).replace(/[ ]+$/, ""))
            if(rawCodeArray[0].length === 0) {
                rawCodeArray.shift()
            }
            rawCode = rawCodeArray.join("\n")
        }

        const code = hljs.highlight(rawCode, {
            language,            
        });
        const html = `<pre><code class="hljs language-${language.toLowerCase()}">${code.value}</code></pre>`;
        return new nunjucksLib.runtime.SafeString(html);
    };
}

nunjucks.addExtension('HighlightJsExtension', new HighlightJsExtension());
