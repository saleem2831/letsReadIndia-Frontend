export const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);

    let videoId = "";

    // https://www.youtube.com/watch?v=VIDEO_ID
    if (parsedUrl.hostname.includes("youtube.com")) {
      videoId = parsedUrl.searchParams.get("v");

      // https://www.youtube.com/embed/VIDEO_ID
      if (!videoId && parsedUrl.pathname.startsWith("/embed/")) {
        videoId = parsedUrl.pathname.split("/embed/")[1];
      }

      // https://www.youtube.com/shorts/VIDEO_ID
      if (!videoId && parsedUrl.pathname.startsWith("/shorts/")) {
        videoId = parsedUrl.pathname.split("/shorts/")[1];
      }
    }

    // https://youtu.be/VIDEO_ID
    if (parsedUrl.hostname === "youtu.be") {
      videoId = parsedUrl.pathname.substring(1);
    }

    if (!videoId) {
      return "";
    }

    // Remove anything after the video ID
    videoId = videoId.split("&")[0].split("?")[0];

    return `https://www.youtube.com/embed/${videoId}`;
  } catch (error) {
    console.error("Invalid YouTube URL:", error);
    return "";
  }
};