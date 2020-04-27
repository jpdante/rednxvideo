export function getLanguage() {
    if(getAutoLanguage()) return getBrowserLanguage();
    var lang = localStorage.getItem("lang")
    if(lang !== null && lang instanceof String) return lang;
    return getBrowserLanguage();
}

export function getBrowserLanguage() {
    return navigator.language || navigator.userLanguage; 
}

export function getAutoLanguage() {
    var autoLang = localStorage.getItem("autoLang")
    if(autoLang === null || (autoLang instanceof Boolean) === false) {
        setAutoLanguage(true);
        return false;
    }
    if(autoLang === true) return true;
    return false;
}

export function setLanguage(lang) {
    localStorage.setItem("lang", lang);
}

export function setAutoLanguage(autoLang) {
    localStorage.setItem("autoLang", autoLang);
}