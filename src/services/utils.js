export function getLanguage() {
    if(getAutoLanguage()) return getBrowserLanguage();
    var lang = localStorage.getItem("lang")
    if(lang !== null && lang !== undefined) return lang;
    return getBrowserLanguage();
}

export function getBrowserLanguage() {
    return navigator.language || navigator.userLanguage; 
}

export function getAutoLanguage() {
    var autoLang = localStorage.getItem("autoLang")
    return autoLang === 'true';
}

export function setLanguage(lang) {
    localStorage.setItem("lang", lang);
}

export function setAutoLanguage(autoLang) {
    localStorage.setItem("autoLang", autoLang);
}