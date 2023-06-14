// THIS FILE GETS THE ORIGINAL HTML.
// TO KEEP MODIFYING, SEE RAW-HTML and INDEX.HTML

/*
    Start file with "node app.js" on command line,
    then fetch("http://127.0.0.1:4000") from index.html
*/

import fetch from "node-fetch";
import * as http from "http";

const hostname = "127.0.0.1";
const port = 4000;

const sections = {
    HOME: "home.html",
    Banishing: "banish.html",
    Baths: "bath.html",
    Binding: "binding.html",
    Blessing: "bless.html",
    Breaking: "break.html",
    "Candle Spells": "candle.html",
    Cleansing: "cleanse.html",
    Correspondences: "corr.html",
    "Dreams/Sleep": "dreamsleep.html",
    "Emotion Vol.1": "emotion.html",
    "Emotion Vol.2": "emotion2.html",
    "Employment/Job": "employment.html",
    "Energy/Power": "enpow.html",
    Fertility: "fert.html",
    "Find Lost Things/People": "lost.html",
    Friendship: "friend.html",
    "Invisibility/Levitation": "invis.html",
    "Get Your Wish": "wish.html",
    "Glamours (appearance)": "glam.html",
    Habits: "habit.html",
    "Healing Vol. 1": "heal.html",
    "Healing Vol. 2": "heal2.html",
    "Herbs Vol. 1": "herb.html",
    "Herbs Vol. 2": "herb2.html",
    "House/Home": "house.html",
    Incense: "incense.html",
    "Jar/Bottle Spells": "jarbottle.html",
    "Justice/Court": "justice.html",
    "Love spells vol.1": "love1.html",
    "Love Spells vol.2": "love2.html",
    "Love Spells vol.3": "love3.html",
    "Make Love Leave": "anti.html",
    Luck: "luck.html",
    Money: "money.html",
    Moon: "moon.html",
    Objects: "objects.html",
    "Oils, Ointments": "oil.html",
    Peace: "peace.html",
    Poppets: "poppet.html",
    Potions: "potions.html",
    "Protection Vol. 1": "protect.html",
    "Protection Vol. 2": "prot2.html",
    "Psychic/Astral": "psychic.html",
    "Reverse/Undo": "break.html",
    "Spirit (s)": "spirit.html",
    "Stones/Gems": "stones.html",
    Strength: "strength.html",
    Tools: "tool.html",
    "Truth/Lies": "truthlies.html",
    Weather: "weather.html",
    "Will It": "will.html",
    "Wishing Spells": "wish.html",
    "Right Hand Links": "rlinks.html",
    "Left Hand Links": "leftlinks.html",
    "Curses/Hexes": "leftspells.html",
    "Other Black Spells": "blackspells.html",
};

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
    ); /* @dev First, read about security */
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
    res.setHeader("Access-Control-Max-Age", 2592000); // 30 days
    loadData().then((resp) => res.end(resp));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

export default async function loadData() {
    const promises = Object.values(sections).map(async (relURL) => {
            const url = `http://www.geocities.ws/freespells/${relURL}`,
                response = await fetch(url),
                html = await response.text();
            return getBodyHTML(html);
        }),
        resolved = await Promise.all(promises),
        result = {};
    Object.keys(sections).forEach((key, i) => (result[key] = resolved[i]));
    return JSON.stringify(result, null, 4);
}

function getBodyHTML(html) {
    const lowercase = html.toLowerCase(),
        openTag = "<body",
        closeTag = "</body>",
        openTagIndex = lowercase.indexOf(openTag),
        closeTagIndex = lowercase.indexOf(closeTag) + closeTag.length,
        result = html.slice(openTagIndex, closeTagIndex);
    return result.replaceAll(/<script.*>[.\s\S]*<\/script>/gi, "");
}
