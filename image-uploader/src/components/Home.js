import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageUploading from "react-images-uploading";
import { useNavigate } from "react-router-dom";

function Home() {
  const [images, setImages] = useState([]);
  const maxNumber = 89;
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [draggedIndex, setDraggedIndex] = useState(null);
  const navigate = useNavigate();

  const onChange = (imageList, addUpdateIndex) => {
    imageList.forEach((image, index) => {
      if (!image.title) {
        image.title = `Image ${index + 1}`;
      }
    });
    setImages(imageList);
  };

  useEffect(() => {
    const savedImages =
      JSON.parse(localStorage.getItem("uploadedImages")) || [];
    setImages(savedImages);
  }, []);

  useEffect(() => {
    localStorage.setItem("uploadedImages", JSON.stringify(images));
  }, [images]);

  const handleTitleChange = (index, newTitle) => {
    const updatedImages = [...images];
    updatedImages[index].title = newTitle;
    setImages(updatedImages);
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const openEditModal = (index) => {
    setEditingIndex(index);
    const imageToEdit = images[index];
    setEditedImage(imageToEdit.data_url);
    setEditedTitle(imageToEdit.title);
  };

  const saveChanges = () => {
    if (editingIndex !== null) {
      const updatedImages = [...images];
      updatedImages[editingIndex].data_url = editedImage;
      updatedImages[editingIndex].title = editedTitle;
      setImages(updatedImages);
      setEditingIndex(null);
    }
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      const updatedImages = [...images];
      const [draggedItem] = updatedImages.splice(draggedIndex, 1);
      updatedImages.splice(index, 0, draggedItem);
      setImages(updatedImages);
      setDraggedIndex(index);
    }
  };

  const handleLogOut = () => {
    navigate("/");
  };

  return (
    // Add these CSS classes and styles to your Home component

    <div className="container mt-5">
      <h1 className="text-center mb-4">Image Gallery</h1>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          isDragging,
          dragProps,
        }) => (
          <div className="mb-4 text-center">
            <button
              className={`btn btn-primary ${isDragging ? "bg-primary" : ""}`}
              onClick={onImageUpload}
              {...dragProps}
            >
              {isDragging ? "Drop Here" : "Upload Images"}
            </button>
            <button className="btn btn-danger ms-2" onClick={onImageRemoveAll}>
              Remove all images
            </button>
            <button className="btn btn-secondary ms-2" onClick={handleLogOut}>
              Log Out
            </button>
          </div>
        )}
      </ImageUploading>
      <div className="row">
        {images.map((image, index) => (
          <div
            key={index}
            className="col-md-4 mb-4"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={() => handleDragOver(index)}
          >
            <div className="card">
              <img
                src={image.data_url}
                alt=""
                className="card-img-top rounded"
              />
              <div className="card-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Image Title"
                  value={image.title}
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                />
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => openEditModal(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => handleImageRemove(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingIndex !== null && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          id="editModal"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Image</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  onClick={() => setEditingIndex(null)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="file"
                  onChange={(e) =>
                    setEditedImage(URL.createObjectURL(e.target.files[0]))
                  }
                />
                <input
                  type="text"
                  placeholder="Title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setEditingIndex(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveChanges}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
