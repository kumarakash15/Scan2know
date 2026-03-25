function formatDriveLink(link) {
  if (!link) return "";

  try {
    const match =
      link.match(/id=([^&]+)/) ||
      link.match(/\/d\/([^/]+)/);

    if (!match) return "";

    const fileId = match[1];

    return `https://lh3.googleusercontent.com/d/${fileId}`;
  } catch (err) {
    return "";
  }
}

module.exports = formatDriveLink;