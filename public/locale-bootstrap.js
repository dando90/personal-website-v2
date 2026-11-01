try {
  const savedLocale = window.localStorage.getItem("portfolio-locale");

  if (savedLocale === "it" || savedLocale === "es") {
    window.location.replace(`/${savedLocale}/`);
  }
} catch {
  // Keep the English static page when browser storage is unavailable.
}
