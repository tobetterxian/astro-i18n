export const defaultLang = "en";

export const languages = {
  en: "English",
  zh: "简体中文",
};

const regexLangInCollection = new RegExp(
  `^(${Object.keys(languages).join("|")})/(.+)`
);

export function startsWithLanguages(s: string) {
  return regexLangInCollection.test(s);
}

export function startsWithLanguage(s: string, l: Lang) {
  return new RegExp(`^(${l})/(.+)`).test(s);
}

const regexLangInId = new RegExp(`^(${Object.keys(languages).join("|")})(/|$)`);

export function stripLangPrefix(pathname: string) {
  return pathname.replace(regexLangInId, "");
}

export type Lang = keyof typeof languages;
