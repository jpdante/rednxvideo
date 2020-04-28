import i18n from 'i18next';

export const numberToText = (views) => {
  if (views > 999_999_999) {
    return i18n.t("numbers.billionMinify", { count: (views / 1_000_000_000).toFixed(1) })
  } else if (views > 999_999) {
    return i18n.t("numbers.millionMinify", { count: (views / 1_000_000).toFixed(1) });
  } else if (views > 999) {
    return i18n.t("numbers.thousandMinify", { count: (views / 1_000).toFixed(1) })
  } else {
    return views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");;
  }
}

export const timeToText = (unix_timestamp) =>  {
  var seconds = Math.floor((new Date() - new Date(unix_timestamp * 1000)) / 1000);
  var interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return i18n.t('time.year', { count: interval });
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return i18n.t('time.month', { count: interval });
  }
  interval = Math.floor(seconds / 604800);
  if (interval >= 1) {
    return i18n.t('time.week', { count: interval });
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return i18n.t('time.day', { count: interval });
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return i18n.t('time.hour', { count: interval });
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return i18n.t('time.minute', { count: interval });
  }
  return i18n.t('time.second', { count: Math.floor(seconds) });
}

export const numberToTime = (time) => {
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;
  var ret = "";
  if (hrs > 0) {
      ret += "" + (hrs < 10 ? "0" : "") + hrs + ":";
  }
  ret += "" + (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + "" + secs;
  return ret;
}