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
    
//                   {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/pEp6MO6WKYo?si=tQVpxOCxy09a0Iyi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
        
//         <iframe
//   src="https://www.youtube.com/embed/pEp6MO6WKYo"
//   title="Let's Read Video"
//   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//   allowFullScreen
//   referrerPolicy="strict-origin-when-cross-origin"
// />
        
//         </div>
//       </div>
//     </section>
//   );
// }


import "./YouTubeSection.css";

export default function YouTubeSection() {
  return (
    <section className="youtube-section">
      <div className="youtube-container">
        <div className="youtube-header">
          <h2>Watch Our Story</h2>
          <p>
            Discover how Let's Read is transforming learning through books,
            technology and passionate educators.
          </p>
        </div>

        <div className="video-wrapper">
          <iframe
            src="https://www.youtube.com/embed/pEp6MO6WKYo"
            title="Let's Read Story"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
      </div>
    </section>
  );
}