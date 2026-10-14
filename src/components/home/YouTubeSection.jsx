

// import "./YouTubeSection.css";

// export default function YouTubeSection() {
//   return (
//     <section className="youtube-section">
//       <div className="youtube-container">
//         <div className="youtube-header">
//           <h2>Watch Our Story</h2>
//           <p>
//             Discover how Let's Read is transforming learning through books,
//             technology and passionate educators.
//           </p>
//         </div>

//         <div className="video-wrapper">
//           <iframe
//             src="https://www.youtube.com/embed/pEp6MO6WKYo"
//             title="Let's Read Story"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//             allowFullScreen
//             referrerPolicy="strict-origin-when-cross-origin"
//           ></iframe>
          
//         </div>
//       </div>
//     </section>
//   );
// }

import "./YouTubeSection.css";

const videos = [
  {
    id: "9UjznJw-3s0",
    title: "Let's Read Story",
    description: "Discover the story behind Let's Read.",
  },
  {
    id: "Um4heYOfBio",
    title: "Making Learning Fun",
    description: "Explore how we make learning engaging.",
  },
  {
    id: "8o08xLvIR4o",
    title: "Our Learning Journey",
    description: "See how books inspire young readers.",
  },
  {
    id: "xYV4K0mtTu4",
    title: "Empowering Young Readers",
    description: "Learn more about our educational mission.",
  },
];

export default function YouTubeSection() {
  return (
    <section className="youtube-section">
      <div className="youtube-container">
        <div className="youtube-header">
          <span className="youtube-subtitle">LET'S READ & LEARN</span>

          <h2>Watch Our Story</h2>

          <p>
            Discover how Let's Read is transforming learning through books,
            technology and passionate educators.
          </p>
        </div>


        <div className="youtube-grid">
          {videos.map((video) => (
            <article className="youtube-card" key={video.id}>
              <div className="video-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              <div className="youtube-card-content">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}