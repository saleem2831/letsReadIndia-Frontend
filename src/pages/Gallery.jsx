
import { useEffect, useState } from "react";
import {
  getGalleryImages,
  getGalleryVideos,
} from "../services/api";

import "../styles/Gallery.css";

import Navbar from '../components/Navbar';
import Footer from "../components/Footer";


// ===============================
// YOUTUBE EMBED URL HELPER
// ===============================
const getYouTubeEmbedUrl = (url) => {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);

    let videoId = "";

    // =====================================
    // Normal YouTube URL
    // https://www.youtube.com/watch?v=VIDEO_ID
    // =====================================
    if (parsedUrl.hostname.includes("youtube.com")) {
      videoId = parsedUrl.searchParams.get("v");

      // =====================================
      // Embed URL
      // https://www.youtube.com/embed/VIDEO_ID
      // =====================================
      if (!videoId && parsedUrl.pathname.startsWith("/embed/")) {
        videoId = parsedUrl.pathname.split("/embed/")[1];
      }

      // =====================================
      // YouTube Shorts
      // https://www.youtube.com/shorts/VIDEO_ID
      // =====================================
      if (!videoId && parsedUrl.pathname.startsWith("/shorts/")) {
        videoId = parsedUrl.pathname.split("/shorts/")[1];
      }
    }

    // =====================================
    // Short YouTube URL
    // https://youtu.be/VIDEO_ID
    // =====================================
    if (parsedUrl.hostname === "youtu.be") {
      videoId = parsedUrl.pathname.substring(1);
    }

    if (!videoId) {
      return "";
    }

    // Remove extra query parameters
    videoId = videoId.split("&")[0].split("?")[0];

    return `https://www.youtube.com/embed/${videoId}`;
  } catch (error) {
    console.error("Invalid YouTube URL:", error);
    return "";
  }
};

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("pictures");

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===============================
  // LOAD GALLERY
  // ===============================
  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      setLoading(true);
      setError("");

      const [imageRes, videoRes] = await Promise.all([
        getGalleryImages(),
        getGalleryVideos(),
      ]);

      setImages(imageRes?.data || []);
      setVideos(videoRes?.data || []);
    } catch (err) {
      console.error("Gallery loading error:", err);
      setError("Unable to load gallery.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gallery-page">
        <Navbar/>

      {/* ===============================
          HERO
      =============================== */}
      <section className="gallery-hero">
        <div className="gallery-hero-content">

          <h1>Our Gallery</h1>

          <p>
            Explore moments, memories and stories from
            the Let's Read journey.
          </p>

        </div>
      </section>


      {/* ===============================
          CONTENT
      =============================== */}
      <section className="gallery-content">

        {/* ===============================
            TABS
        =============================== */}
        <div className="gallery-tabs">

          <button
            className={`gallery-tab ${
              activeTab === "pictures" ? "active" : ""
            }`}
            onClick={() => setActiveTab("pictures")}
          >
            📸 Pictures
          </button>

          <button
            className={`gallery-tab ${
              activeTab === "videos" ? "active" : ""
            }`}
            onClick={() => setActiveTab("videos")}
          >
            ▶ Videos
          </button>

        </div>


        {/* ===============================
            ERROR
        =============================== */}
        {error && (
          <div className="gallery-error">
            {error}
          </div>
        )}


        {/* ===============================
            LOADING
        =============================== */}
        {loading ? (
          <div className="gallery-loading">
            <div className="gallery-spinner"></div>
          </div>
        ) : (

          <>

            {/* =====================================================
                PICTURES
            ===================================================== */}
            {activeTab === "pictures" && (
              <>

                <div className="gallery-section-heading">

                  <h2>Pictures</h2>

                  <p>
                    A glimpse into our reading programmes,
                    activities and special moments.
                  </p>

                </div>


                {/* NO IMAGES */}
                {images.length === 0 ? (

                  <div className="gallery-empty">

                    <div className="gallery-empty-icon">
                      📸
                    </div>

                    <h3>No pictures available</h3>

                    <p>
                      Gallery pictures will appear here.
                    </p>

                  </div>

                ) : (

                //   <div className="gallery-image-grid">

                //     {images.map((image) => (

                //       <div
                //         className="gallery-image-card"
                //         key={image.id}
                //       >

                //         <div className="gallery-image-wrapper">

                //           <img
                //             src={image.image_url}
                //             alt={
                //               image.title ||
                //               "Let's Read India"
                //             }
                //             loading="lazy"
                //           />

                //           <div className="gallery-image-overlay">

                //             <span>
                //               View Picture
                //             </span>

                //           </div>

                //         </div>


                //         {(image.title ||
                //           image.description) && (

                //           <div className="gallery-image-details">

                //             {image.title && (
                //               <h3>
                //                 {image.title}
                //               </h3>
                //             )}

                //             {image.description && (
                //               <p>
                //                 {image.description}
                //               </p>
                //             )}

                //           </div>

                //         )}

                //       </div>

                //     ))}

                //   </div>

//                 <div className="gallery-image-grid">
//   {images.map((image) => (
//     <div
//       className="gallery-hover-card"
//       key={image.id}
//     >
//       <img
//         src={image.image_url}
//         alt={image.title || "Let's Read India"}
//         loading="lazy"
//         onError={(e) => {
//           e.currentTarget.style.display = "none";
//         }}
//       />

//       {/* Bottom-to-top hover overlay */}
//       <div className="gallery-hover-overlay">
//         <div className="gallery-hover-content">
//           {image.title && (
//             <h3>{image.title}</h3>
//           )}

//           {image.description && (
//             <p>{image.description}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   ))}
// </div>

<div className="gallery-image-grid">
  {images.map((image) => (
    <div
      className="gallery-hover-card"
      key={image.id}
    >
      <div className="gallery-image-container">
        <img
          src={image.image_url}
          alt={image.title || "Let's Read India"}
          loading="lazy"
        />

        <div className="gallery-hover-overlay">
          <div className="gallery-hover-content">
            {image.title && (
              <h3>{image.title}</h3>
            )}

            {image.description && (
              <p>{image.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

                )}

              </>
            )}


            {/* =====================================================
                VIDEOS
            ===================================================== */}
            {activeTab === "videos" && (
              <>

                <div className="gallery-section-heading">

                  <h2>Videos</h2>

                  <p>
                    Watch stories, programmes and moments
                    from the Let's Read community.
                  </p>

                </div>


                {/* NO VIDEOS */}
                {videos.length === 0 ? (

                  <div className="gallery-empty">

                    <div className="gallery-empty-icon">
                      ▶
                    </div>

                    <h3>No videos available</h3>

                    <p>
                      Gallery videos will appear here.
                    </p>

                  </div>

                ) : (

                  <div className="gallery-video-grid">

                    {videos.map((video) => {

                      // =====================================
                      // CONVERT YOUTUBE URL TO EMBED URL
                      // =====================================
                      const embedUrl = getYouTubeEmbedUrl(
                        video.youtube_url
                      );

                      // =====================================
                      // INVALID URL
                      // =====================================
                      if (!embedUrl) {
                        return (
                          <div
                            className="gallery-video-card"
                            key={video.id}
                          >

                            <div className="gallery-video-invalid">

                              <div>
                                ⚠️
                              </div>

                              <p>
                                Unable to load this video.
                              </p>

                            </div>

                            {video.title && (
                              <div className="gallery-video-details">
                                <h3>
                                  {video.title}
                                </h3>
                              </div>
                            )}

                          </div>
                        );
                      }

                      return (

                        <div
                          className="gallery-video-card"
                          key={video.id}
                        >

                          {/* ===============================
                              YOUTUBE VIDEO
                          =============================== */}
                          <div className="gallery-video-wrapper">

                            <iframe
                              src={embedUrl}
                              title={
                                video.title ||
                                "Let's Read India video"
                              }
                              loading="lazy"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />

                          </div>


                          {/* ===============================
                              VIDEO DETAILS
                          =============================== */}
                          {(video.title ||
                            video.description) && (

                            <div className="gallery-video-details">

                              {video.title && (
                                <h3>
                                  {video.title}
                                </h3>
                              )}

                              {video.description && (
                                <p>
                                  {video.description}
                                </p>
                              )}

                            </div>

                          )}

                        </div>

                      );

                    })}

                  </div>

                )}

              </>
            )}

          </>

        )}
      </section>
      <Footer/>

    </div>
  );
}