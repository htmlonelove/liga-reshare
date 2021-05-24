const prettify = (num) => {
    let n = num.toString();
    let last = n.slice(-1);
    if (n === `11` || n === `12` || n === `13` || n === `14`) {
      return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, `$1` + ` `).replace(/^0+/, ``) + ` лет `;
    } else {
      if (last === `1`) {
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, `$1` + ` `).replace(/^0+/, ``) + ` год `;
      } else if (last === `2` || last === `3` || last === `4`) {
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, `$1` + ` `).replace(/^0+/, ``) + ` года`;
      } else {
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, `$1` + ` `).replace(/^0+/, ``) + ` лет `;
      }
    }
  };