import { emojis } from "./emojis.js"

export function searchByName(name) {
    name = name.toLowerCase()
    const reg = new RegExp(`(?<![a-z])${name}`)
    return emojis.filter(emoji => emoji.slug.match(reg)).sort((a, b) => {
        return levenshtein(a.slug, name) - levenshtein(b.slug, name);
    });
}

export function searchByCategory(category) {
    category = category.toLowerCase()
    const reg = new RegExp(`(?<![a-z])${category}`)
    return emojis.filter(emoji => emoji.subGroup.match(reg))
}

function levenshtein(s, t) {
    if (!s.length) return t.length;
    if (!t.length) return s.length;

    return Math.min(
        levenshtein(s.substring(1), t) + 1,
        levenshtein(t.substring(1), s) + 1,
        levenshtein(s.substring(1), t.substring(1)) + (s[0] !== t[0] ? 1 : 0)
    );
}
