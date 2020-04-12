import i18n from 'i18next';

export const numberToText = (views) => {
  if (views > 999_999_999) {
    return i18n.t("numbers.billionMinify", { count: Math.floor(views / 1_000_000_000) })
  } else if (views > 999_999) {
    return i18n.t("numbers.millionMinify", { count: Math.floor(views / 1_000_000) });
  } else if (views > 999) {
    return i18n.t("numbers.thousandMinify", { count: Math.floor(views / 1_000) })
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
  console.error(seconds);
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