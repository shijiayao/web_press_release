module.exports = {
  formatTargetDate(date) {
    let targetTime = new Date(date);

    return {
      YY: ''.concat('0000', targetTime.getFullYear()).slice(-4),
      MM: ''.concat('0000', targetTime.getMonth() + 1).slice(-2),
      DD: ''.concat('0000', targetTime.getDate()).slice(-2),
      HH: ''.concat('0000', targetTime.getHours()).slice(-2),
      mm: ''.concat('0000', targetTime.getMinutes()).slice(-2),
      ss: ''.concat('0000', targetTime.getSeconds()).slice(-2),
      SSS: ''.concat('0000', targetTime.getMilliseconds()).slice(-3)
    };
  },
  formatCurrentDate() {
    let currentTime = new Date();

    return {
      YY: ''.concat('0000', currentTime.getFullYear()).slice(-4),
      MM: ''.concat('0000', currentTime.getMonth() + 1).slice(-2),
      DD: ''.concat('0000', currentTime.getDate()).slice(-2),
      HH: ''.concat('0000', currentTime.getHours()).slice(-2),
      mm: ''.concat('0000', currentTime.getMinutes()).slice(-2),
      ss: ''.concat('0000', currentTime.getSeconds()).slice(-2),
      SSS: ''.concat('0000', currentTime.getMilliseconds()).slice(-3)
    };
  }
};
