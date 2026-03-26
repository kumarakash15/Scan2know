function formatDriveLink(link) {
  if (!link) return "";

  try {
    const match =
      link.match(/id=([^&]+)/) ||
      link.match(/\/d\/([^/]+)/);

    if (!match) return "";

    const fileId = match[1];

    const baseUrl = process.env.BACKEND_URL || "http://localhost:5000";

    return `${baseUrl}/image/${fileId}`;

  } catch (err) {
    return "";
  }
}

module.exports = formatDriveLink;