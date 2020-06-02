export function setProfileUsername(username) {
    if(username === '' || username == null || username === undefined) localStorage.setItem("profile.username", "Default");
    else localStorage.setItem("profile.username", username);
}

export function setProfilePicture(pictureGuid) {
    if(pictureGuid === '' || pictureGuid == null || pictureGuid === undefined) localStorage.setItem("profile.picture", "http://public.tryhosting.com.br/pp/default.webp");
    else localStorage.setItem("profile.picture", "http://public.tryhosting.com.br/pp/" + pictureGuid + ".webp");
}

export function setProfileEmail(email) {
    if(email === '' || email == null || email === undefined) localStorage.setItem("profile.email", "default@mail.com");
    else localStorage.setItem("profile.email", email);
}

export function getProfileUsername() {
    return localStorage.getItem("profile.username");
}

export function getProfilePicture() {
    return localStorage.getItem("profile.picture");
}

export function getProfileEmail() {
    return localStorage.getItem("profile.email");
}