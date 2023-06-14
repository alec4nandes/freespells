import rawHTML from "./raw-html.js";

const spells = getSpells();

console.log(spells);

function getSpells() {
    let result = Object.entries(rawHTML).reduce(
        (acc, [section, html]) => ({
            ...acc,
            [section]: processRawHTML(html),
        }),
        {}
    );
    result = fixNonCapitalizedHeaders(result);
    // remove empty sections
    return Object.fromEntries(
        Object.entries(result).filter(
            ([key, value]) => Object.entries(value).length
        )
    );
}

function processRawHTML(html) {
    document.body.innerHTML = html;
    const selector = `font[size="-1"]`,
        spells = [...document.querySelectorAll(selector)]
            .map((spell) => spell.innerHTML)
            .map((spell) =>
                spell
                    .split("<br>")
                    .map((line) => line.replaceAll("\n", " ").trim())
                    .filter(Boolean)
            )
            .filter(([title, ...lines]) => lines.length)
            .reduce(
                (acc, [title, ...lines]) => ({
                    ...acc,
                    [title]: lines,
                }),
                {}
            );
    document.body.innerHTML = "<pre><xmp></xmp></pre>";
    return spells;
}

function fixNonCapitalizedHeaders(result) {
    const sections = Object.entries(result);
    sections.forEach(([section, spells]) => {
        let lastTitle;
        // modify spells
        Object.entries(spells).forEach(([spellTitle, lines]) => {
            const isTitle = !spellTitle.split(" ")[0].match(/[a-z]/);
            if (!isTitle && lastTitle) {
                spells[lastTitle] = [
                    ...spells[lastTitle],
                    spellTitle,
                    ...lines,
                ];
                delete spells[spellTitle];
            } else {
                lastTitle = spellTitle;
            }
        });
    });
    return result;
}

export default spells;
