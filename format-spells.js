export default function formatSpells(sections) {
    return Object.entries(sections)
        .sort(sortEntries)
        .map(
            ([section, spells]) => `
                <details>
                    <summary>${section}</summary>
                    ${Object.entries(spells)
                        .sort(sortEntries)
                        .map(
                            ([spellTitle, lines]) => `
                                <details>
                                    <summary>${spellTitle}</summary>
                                    <p>${lines.join("<br/>")}</p>
                                </details>
                            `
                        )
                        .join("")}
                </details>
            `
        )
        .join("<hr/>");
}

function sortEntries(a, b) {
    const [aKey] = a,
        [bKey] = b;
    return aKey.localeCompare(bKey);
}
