class Cookie {
  constructor(name) {
    this.name = name;
  }

  get() {
    const matches = document.cookie.match(new RegExp(
        '(?:^|; )' + this.name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + '=([^;]*)'
    ));

    return matches ? decodeURIComponent(matches[1]) : false;
  }

  set(value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = this.name + '=' + (value || '') + expires + '; path=/';
  }

  destroy() {
    this.set('', -1);
  }
}

export {Cookie};
