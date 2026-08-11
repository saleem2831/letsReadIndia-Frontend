import { useEffect, useState } from "react";

import Toast from "../../components/Toast";

import {
  getGalleryImages,
  uploadGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  getGalleryVideos,
  addGalleryVideo,
  updateGalleryVideo,
  deleteGalleryVideo,
} from "../../services/api";

import "../../styles/SuperAdminGallery.css";


export default function SuperAdminGallery() {

  const token = localStorage.getItem("token");

  const [activeTab, setActiveTab] = useState("pictures");

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState(null);

  // IMAGE
  const [showImageForm, setShowImageForm] = useState(false);
  const [editingImage, setEditingImage] = useState(null);

  const [imageForm, setImageForm] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  // VIDEO
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);

  const [videoForm, setVideoForm] = useState({
    title: "",
    description: "",
    youtube_url: "",
  });

  const [videoLoading, setVideoLoading] = useState(false);

  // DELETE
  const [deleteType, setDeleteType] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [deleteLoading, setDeleteLoading] = useState(false);


  // =====================================
  // LOAD DATA
  // =====================================

  useEffect(() => {
    loadGallery();
  }, []);


  const loadGallery = async () => {

    setLoading(true);

    try {

      const [imageResponse, videoResponse] =
        await Promise.all([
          getGalleryImages(),
          getGalleryVideos(),
        ]);

      setImages(imageResponse.data || []);
      setVideos(videoResponse.data || []);

    } catch (error) {

      console.error(error);

      showToast(
        error.message || "Unable to load gallery"
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================
  // TOAST
  // =====================================

  const showToast = (message) => {

    setToast({
      message,
      duration: 3000,
    });

  };


  // =====================================
  // IMAGE FILE CHANGE
  // =====================================

  const handleImageChange = (e) => {

    const file = e.target.files?.[0];

    if (!file) return;


    if (!file.type.startsWith("image/")) {

      showToast("Please select an image file");

      return;

    }


    if (file.size > 5 * 1024 * 1024) {

      showToast("Image size must be less than 5MB");

      return;

    }


    setImageForm((prev) => ({
      ...prev,
      image: file,
    }));


    setImagePreview(
      URL.createObjectURL(file)
    );

  };


  // =====================================
  // OPEN ADD IMAGE
  // =====================================

  const openAddImage = () => {

    setEditingImage(null);

    setImageForm({
      title: "",
      description: "",
      image: null,
    });

    setImagePreview(null);

    setShowImageForm(true);

  };


  // =====================================
  // OPEN EDIT IMAGE
  // =====================================

  const openEditImage = (image) => {

    setEditingImage(image);

    setImageForm({
      title: image.title || "",
      description: image.description || "",
      image: null,
    });

    setImagePreview(
      image.image_url || null
    );

    setShowImageForm(true);

  };


  // =====================================
  // SUBMIT IMAGE
  // =====================================

  const handleImageSubmit = async (e) => {

    e.preventDefault();

    if (!imageForm.title.trim()) {

      showToast("Please enter image title");

      return;

    }


    if (!editingImage && !imageForm.image) {

      showToast("Please select an image");

      return;

    }


    setImageLoading(true);


    try {

      const formData = new FormData();

      formData.append(
        "title",
        imageForm.title
      );

      formData.append(
        "description",
        imageForm.description
      );


      if (imageForm.image) {

        formData.append(
          "image",
          imageForm.image
        );

      }


      if (editingImage) {

        await updateGalleryImage(
          editingImage.id,
          formData,
          token
        );

        showToast(
          "Gallery image updated successfully"
        );

      } else {

        await uploadGalleryImage(
          formData,
          token
        );

        showToast(
          "Gallery image uploaded successfully"
        );

      }


      closeImageForm();

      await loadGallery();

    } catch (error) {

      console.error(error);

      showToast(
        error.message || "Image operation failed"
      );

    } finally {

      setImageLoading(false);

    }

  };


  // =====================================
  // CLOSE IMAGE FORM
  // =====================================

  const closeImageForm = () => {

    setShowImageForm(false);

    setEditingImage(null);

    setImageForm({
      title: "",
      description: "",
      image: null,
    });

    setImagePreview(null);

  };


  // =====================================
  // OPEN ADD VIDEO
  // =====================================

  const openAddVideo = () => {

    setEditingVideo(null);

    setVideoForm({
      title: "",
      description: "",
      youtube_url: "",
    });

    setShowVideoForm(true);

  };


  // =====================================
  // OPEN EDIT VIDEO
  // =====================================

  const openEditVideo = (video) => {

    setEditingVideo(video);

    setVideoForm({
      title: video.title || "",
      description: video.description || "",
      youtube_url: video.youtube_url || "",
    });

    setShowVideoForm(true);

  };


  // =====================================
  // SUBMIT VIDEO
  // =====================================

  const handleVideoSubmit = async (e) => {

    e.preventDefault();


    if (!videoForm.title.trim()) {

      showToast("Please enter video title");

      return;

    }


    if (!videoForm.youtube_url.trim()) {

      showToast(
        "Please enter YouTube URL"
      );

      return;

    }


    setVideoLoading(true);


    try {

      if (editingVideo) {

        await updateGalleryVideo(
          editingVideo.id,
          videoForm,
          token
        );

        showToast(
          "Gallery video updated successfully"
        );

      } else {

        await addGalleryVideo(
          videoForm,
          token
        );

        showToast(
          "Gallery video added successfully"
        );

      }


      closeVideoForm();

      await loadGallery();

    } catch (error) {

      console.error(error);

      showToast(
        error.message || "Video operation failed"
      );

    } finally {

      setVideoLoading(false);

    }

  };


  // =====================================
  // CLOSE VIDEO FORM
  // =====================================

  const closeVideoForm = () => {

    setShowVideoForm(false);

    setEditingVideo(null);

    setVideoForm({
      title: "",
      description: "",
      youtube_url: "",
    });

  };


  // =====================================
  // DELETE
  // =====================================

  const openDelete = (type, id) => {

    setDeleteType(type);

    setDeleteId(id);

  };


  const closeDelete = () => {

    setDeleteType(null);

    setDeleteId(null);

  };


  const confirmDelete = async () => {

    if (!deleteId || !deleteType) return;


    setDeleteLoading(true);


    try {

      if (deleteType === "image") {

        await deleteGalleryImage(
          deleteId,
          token
        );

        showToast(
          "Gallery image deleted successfully"
        );

      } else {

        await deleteGalleryVideo(
          deleteId,
          token
        );

        showToast(
          "Gallery video deleted successfully"
        );

      }


      closeDelete();

      await loadGallery();

    } catch (error) {

      console.error(error);

      showToast(
        error.message || "Delete failed"
      );

    } finally {

      setDeleteLoading(false);

    }

  };


  // =====================================
  // YOUTUBE ID
  // =====================================

  const getYoutubeId = (url) => {

    if (!url) return null;

    const match =
      url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^&?/\s]+)/
      );

    return match ? match[1] : null;

  };


  // =====================================
  // RENDER
  // =====================================

  return (

    <div className="super-gallery-page">

      {toast && (
        <Toast
          message={toast.message}
          duration={toast.duration}
          onClose={() => setToast(null)}
        />
      )}


      <div className="super-gallery-container">


        {/* HEADER */}

        <div className="super-gallery-header">

          <div>

            <span className="super-gallery-eyebrow">
              CONTENT MANAGEMENT
            </span>

            <h1>
              Gallery Management
            </h1>

            <p>
              Manage pictures and YouTube videos
              displayed on the website.
            </p>

          </div>

        </div>


        {/* TABS */}

        <div className="super-gallery-tabs">

          <button
            className={
              activeTab === "pictures"
                ? "gallery-tab active"
                : "gallery-tab"
            }
            onClick={() =>
              setActiveTab("pictures")
            }
          >
            📷 Pictures
            <span>
              {images.length}
            </span>
          </button>


          <button
            className={
              activeTab === "videos"
                ? "gallery-tab active"
                : "gallery-tab"
            }
            onClick={() =>
              setActiveTab("videos")
            }
          >
            ▶️ Videos
            <span>
              {videos.length}
            </span>
          </button>

        </div>


        {/* =================================
            PICTURES
        ================================= */}

        {activeTab === "pictures" && (

          <section className="gallery-content">

            <div className="gallery-section-header">

              <div>

                <h2>
                  Gallery Pictures
                </h2>

                <p>
                  Upload and manage images
                  displayed in the public gallery.
                </p>

              </div>


              <button
                className="gallery-primary-btn"
                onClick={openAddImage}
              >
                + Add Picture
              </button>

            </div>


            {loading ? (

              <div className="gallery-loading">
                Loading pictures...
              </div>

            ) : images.length === 0 ? (

              <div className="gallery-empty">

                <div className="gallery-empty-icon">
                  📷
                </div>

                <h3>
                  No pictures yet
                </h3>

                <p>
                  Upload your first gallery picture.
                </p>

                <button
                  className="gallery-primary-btn"
                  onClick={openAddImage}
                >
                  + Add Picture
                </button>

              </div>

            ) : (

              <div className="gallery-image-grid">

                {images.map((image) => (

                  <div
                    className="gallery-image-card"
                    key={image.id}
                  >

                    <div className="gallery-image-wrapper">

                      <img
                        src={image.image_url}
                        alt={image.title}
                      />

                    </div>


                    <div className="gallery-card-body">

                      <h3>
                        {image.title}
                      </h3>

                      {image.description && (
                        <p>
                          {image.description}
                        </p>
                      )}


                      <div className="gallery-card-actions">

                        <button
                          className="gallery-edit-btn"
                          onClick={() =>
                            openEditImage(image)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="gallery-delete-btn"
                          onClick={() =>
                            openDelete(
                              "image",
                              image.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

        )}


        {/* =================================
            VIDEOS
        ================================= */}

        {activeTab === "videos" && (

          <section className="gallery-content">

            <div className="gallery-section-header">

              <div>

                <h2>
                  Gallery Videos
                </h2>

                <p>
                  Add and manage YouTube videos
                  displayed on the public gallery.
                </p>

              </div>


              <button
                className="gallery-primary-btn"
                onClick={openAddVideo}
              >
                + Add Video
              </button>

            </div>


            {loading ? (

              <div className="gallery-loading">
                Loading videos...
              </div>

            ) : videos.length === 0 ? (

              <div className="gallery-empty">

                <div className="gallery-empty-icon">
                  ▶️
                </div>

                <h3>
                  No videos yet
                </h3>

                <p>
                  Add your first YouTube video.
                </p>

                <button
                  className="gallery-primary-btn"
                  onClick={openAddVideo}
                >
                  + Add Video
                </button>

              </div>

            ) : (

              <div className="gallery-video-grid">

                {videos.map((video) => {

                  const youtubeId =
                    getYoutubeId(
                      video.youtube_url
                    );


                  return (

                    <div
                      className="gallery-video-card"
                      key={video.id}
                    >

                      <div className="gallery-video-preview">

                        {youtubeId ? (

                          <iframe
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />

                        ) : (

                          <div className="invalid-video">
                            Invalid YouTube URL
                          </div>

                        )}

                      </div>


                      <div className="gallery-card-body">

                        <h3>
                          {video.title}
                        </h3>

                        {video.description && (
                          <p>
                            {video.description}
                          </p>
                        )}


                        <div className="gallery-video-url">

                          {video.youtube_url}

                        </div>


                        <div className="gallery-card-actions">

                          <button
                            className="gallery-edit-btn"
                            onClick={() =>
                              openEditVideo(video)
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="gallery-delete-btn"
                            onClick={() =>
                              openDelete(
                                "video",
                                video.id
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                    </div>

                  );

                })}

              </div>

            )}

          </section>

        )}

      </div>


      {/* =================================
          IMAGE MODAL
      ================================= */}

      {showImageForm && (

        <div className="gallery-modal-overlay">

          <div className="gallery-modal">

            <div className="gallery-modal-header">

              <div>

                <h2>
                  {editingImage
                    ? "Edit Picture"
                    : "Add Picture"}
                </h2>

                <p>
                  {editingImage
                    ? "Update gallery picture details."
                    : "Upload a new picture to the gallery."}
                </p>

              </div>


              <button
                className="gallery-modal-close"
                onClick={closeImageForm}
              >
                ×
              </button>

            </div>


            <form
              onSubmit={handleImageSubmit}
              className="gallery-form"
            >

              <label>
                Title
              </label>

              <input
                type="text"
                value={imageForm.title}
                onChange={(e) =>
                  setImageForm({
                    ...imageForm,
                    title: e.target.value,
                  })
                }
                placeholder="Picture title"
              />


              <label>
                Description
              </label>

              <textarea
                value={imageForm.description}
                onChange={(e) =>
                  setImageForm({
                    ...imageForm,
                    description:
                      e.target.value,
                  })
                }
                placeholder="Picture description"
                rows="4"
              />


              <label>
                {editingImage
                  ? "Replace Image"
                  : "Image"}
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />


              {imagePreview && (

                <div className="gallery-upload-preview">

                  <img
                    src={imagePreview}
                    alt="Preview"
                  />

                </div>

              )}


              <div className="gallery-modal-actions">

                <button
                  type="button"
                  className="gallery-cancel-btn"
                  onClick={closeImageForm}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="gallery-primary-btn"
                  disabled={imageLoading}
                >
                  {imageLoading
                    ? "Uploading..."
                    : editingImage
                    ? "Update Picture"
                    : "Upload Picture"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =================================
          VIDEO MODAL
      ================================= */}

      {showVideoForm && (

        <div className="gallery-modal-overlay">

          <div className="gallery-modal">

            <div className="gallery-modal-header">

              <div>

                <h2>
                  {editingVideo
                    ? "Edit Video"
                    : "Add Video"}
                </h2>

                <p>
                  Add a YouTube video to
                  your gallery.
                </p>

              </div>


              <button
                className="gallery-modal-close"
                onClick={closeVideoForm}
              >
                ×
              </button>

            </div>


            <form
              onSubmit={handleVideoSubmit}
              className="gallery-form"
            >

              <label>
                Title
              </label>

              <input
                type="text"
                value={videoForm.title}
                onChange={(e) =>
                  setVideoForm({
                    ...videoForm,
                    title: e.target.value,
                  })
                }
                placeholder="Video title"
              />


              <label>
                Description
              </label>

              <textarea
                value={videoForm.description}
                onChange={(e) =>
                  setVideoForm({
                    ...videoForm,
                    description:
                      e.target.value,
                  })
                }
                placeholder="Video description"
                rows="4"
              />


              <label>
                YouTube URL
              </label>

              <input
                type="url"
                value={videoForm.youtube_url}
                onChange={(e) =>
                  setVideoForm({
                    ...videoForm,
                    youtube_url:
                      e.target.value,
                  })
                }
                placeholder="https://www.youtube.com/watch?v=..."
              />


              <div className="youtube-help">
                Example:
                https://www.youtube.com/watch?v=pEp6MO6WKYo
              </div>


              <div className="gallery-modal-actions">

                <button
                  type="button"
                  className="gallery-cancel-btn"
                  onClick={closeVideoForm}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="gallery-primary-btn"
                  disabled={videoLoading}
                >
                  {videoLoading
                    ? "Saving..."
                    : editingVideo
                    ? "Update Video"
                    : "Add Video"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* =================================
          DELETE MODAL
      ================================= */}

      {deleteId && (

        <div className="gallery-modal-overlay">

          <div className="gallery-delete-modal">

            <div className="gallery-delete-icon">
              ⚠️
            </div>

            <h2>
              Delete {deleteType === "image"
                ? "Picture"
                : "Video"}?
            </h2>

            <p>
              This action cannot be undone.
              Are you sure you want to delete
              this item?
            </p>


            <div className="gallery-modal-actions">

              <button
                className="gallery-cancel-btn"
                onClick={closeDelete}
              >
                Cancel
              </button>


              <button
                className="gallery-delete-confirm-btn"
                onClick={confirmDelete}
                disabled={deleteLoading}
              >
                {deleteLoading
                  ? "Deleting..."
                  : "Delete"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}