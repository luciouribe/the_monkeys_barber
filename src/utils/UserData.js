
export default {
  icon_user() {
    let urlsplit = localStorage.getItem("auth_url").split("/api/")[0];
    let avatarName = sessionStorage.getItem("userAvatar");
    let icon_user=''
    if (avatarName) {
      icon_user = urlsplit + "/images/users/" + avatarName;
    }
    return icon_user
  }
};
