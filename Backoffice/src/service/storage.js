class Storage {
  checkToken() {
    return localStorage.getItem("member") == null ? false : true;
  }

  setToken(item) {
    localStorage.setItem("member", item);
  }

  getToken() {
    return localStorage.getItem("member");
  }

  clearToken() {
    localStorage.removeItem("member");
    sessionStorage.clear();
    window.location.reload();
  }
}

export default new Storage();
