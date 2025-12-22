import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { loader, snackbar } from "../../utils";
import {
  deleteYoutubeVideo,
  getAllYoutubeVideos,
  videoCategories,
} from "../../Components/service/admin";
import { DeleteButton } from "../../Components/Buttons/DeleteButton";
import { AddYoutubeVideo } from "./AddYoutubeVideo";

export default function YoutubeVideos() {
  const [search, setSearch] = useState("");
  const [allData, setAllData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const navigate = useNavigate();

  // Function to extract YouTube video ID from URL
  const extractYouTubeVideoId = (url) => {
    if (!url) return null;

    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[1];
      }
    }
    return null;
  };

  // Function to get YouTube thumbnail URL
  const getYouTubeThumbnail = (url, quality = "maxresdefault") => {
    const videoId = extractYouTubeVideoId(url);
    if (!videoId) return null;

    // Use the format you provided: https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  };

  // Fetch all categories
  async function getAllCategories() {
    try {
      let res = await videoCategories();
      const categoriesData = res?.data?.data || [];
      setCategories(categoriesData);

      // Set first category as default if categories exist
      if (categoriesData.length > 0 && !selectedCategory) {
        const firstCategoryId = categoriesData[0]._id;
        setSelectedCategory(firstCategoryId);
        getAllVideos(firstCategoryId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Fetch videos based on selected category
  async function getAllVideos(categoryId = "") {
    try {
      loader.start();
      let res;
      if (categoryId) {
        res = await getAllYoutubeVideos(categoryId);
      } else {
        res = await getAllYoutubeVideos();
      }
      setAllData(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      loader.stop();
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  // Handle category change
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    getAllVideos(categoryId);
  };

  // Filter videos by search term
  const filteredVideos = search
    ? allData.filter((video) =>
        video.title.toLowerCase().includes(search.toLowerCase())
      )
    : allData;

  // Delete handler
  async function deleteVideo(video) {
    try {
      loader.start();
      await deleteYoutubeVideo(video._id);
      snackbar.success("Video deleted successfully");
      // Refresh the videos for the current category
      getAllVideos(selectedCategory);
    } catch (error) {
      console.log(error);
    } finally {
      loader.stop();
    }
  }

  return (
    <>
      <h2 className="fw-600">Youtube Videos</h2>
      <div className="row mt-4">
        <div className="col-lg-3 col-md-4 col-sm-6 col-12">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="form-select"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title"
            className="form-control"
          />
        </div>
        <div className="col w-100 d-flex justify-content-end">
          <AddYoutubeVideo onSubmit={() => getAllVideos(selectedCategory)} />
        </div>
      </div>
      <div className="mt-4">
        {filteredVideos.length === 0 ? (
          <div className="text-center">No videos found.</div>
        ) : (
          <div className="row">
            {filteredVideos.map((video) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
                key={video._id}
              >
                <div
                  className="card h-100 shadow-sm border-0 rounded-4 video-card"
                  style={{
                    transition: "transform 0.2s",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <img
                      src={getYouTubeThumbnail(video.link) || video.thumbnail}
                      alt={video.title}
                      className="card-img-top"
                      style={{
                        height: "180px",
                        objectFit: "cover",
                        borderTopLeftRadius: "1rem",
                        borderTopRightRadius: "1rem",
                      }}
                      onError={(e) => {
                        // Fallback to stored thumbnail if YouTube thumbnail fails
                        if (
                          e.target.src !== video.thumbnail &&
                          video.thumbnail
                        ) {
                          e.target.src = video.thumbnail;
                        } else {
                          console.log(
                            "Both YouTube and stored thumbnails failed to load"
                          );
                        }
                      }}
                    />
                    <a
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "rgba(25,118,210,0.7)",
                        borderRadius: "50%",
                        padding: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="#fff"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </a>
                  </div>
                  <div
                    className="card-body d-flex flex-column justify-content-between"
                    style={{ minHeight: "160px" }}
                  >
                    <h5
                      className="card-title text-capitalize mb-2"
                      style={{ fontWeight: 600, fontSize: "1.1rem" }}
                    >
                      {video.title}
                    </h5>
                    <p className="mb-1" style={{ fontSize: "0.95rem" }}>
                      <b>Priority:</b> {video.priority}
                    </p>
                    {video.category && (
                      <p className="mb-1" style={{ fontSize: "0.95rem" }}>
                        <b>Category:</b> {video.category.name}
                      </p>
                    )}
                    <div className="d-flex gap-2 mt-2">
                      <AddYoutubeVideo
                        formData={video}
                        mode="edit"
                        onSubmit={() => getAllVideos(selectedCategory)}
                      />
                      <DeleteButton
                        confirmation
                        display={"Video"}
                        data={video}
                        onDelete={() => deleteVideo(video)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
