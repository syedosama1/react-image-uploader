import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageUploading from "react-images-uploading";
import { useNavigate } from "react-router-dom";

// dataUrlKey - handling the uploading image in react application

function Home() {
  const [images, setImages] = useState([]);
  // maxNumber- the number of image user can select 
  const maxNumber = 89;
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [draggedIndex, setDraggedIndex] = useState(null);
  const navigate = useNavigate();

  // imageList- The list of image to render
  /*  onchange is a function which take two parameter imageList and addUpdateIndex the imageList use to render the list of image to render using for each iterate over the image 
  if the image doesn't have title it will set default title  */ 

  const onChange = (imageList, addUpdateIndex) => {
    imageList.forEach((image, index) => {
      if (!image.title) {
        image.title = `Image ${index + 1}`;
      }
    });
    setImages(imageList);
  };

  /*useEffect is executed when the component is mount saveImage variable it retrieves the data  from the local storage using key if no data will be there it will return empty array  */
  useEffect(() => {
    const savedImages =
      JSON.parse(localStorage.getItem("uploadedImages")) || [];
    setImages(savedImages);
  }, []);
/* use Effect is trigger when the image state is change here it is storing the value using setItem method which has a key uploadingImages and it is storing the image converting in a string */
  useEffect(() => {
    localStorage.setItem("uploadedImages", JSON.stringify(images));
  }, [images]);

  /* handleTitleChange function is use to update new title it has two parameter index and newTitle update image store the copy values using spread operator updatedImage its update the value of image 
  title based on the index */
  const handleTitleChange = (index, newTitle) => {
    const updatedImages = [...images];
    updatedImages[index].title = newTitle;
    setImages(updatedImages);
  };
/* handel remove has a one argument index updatedImages variable copied a image using spread operator and deleted it based on the index using splice method and setImages state is update it onUI */
  const handleImageRemove = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };
/* open editModal is use to open the pop pop for editing the image and title based on the index setEditedImage(imageToEdit.data_url);: Sets the editedImage state to 
 the data_url of the image to be edited. setEditedTitle(imageToEdit.title);: Sets the editedTitle state to the title of the image to be edited. */
  const openEditModal = (index) => {
    setEditingIndex(index);
    const imageToEdit = images[index];
    setEditedImage(imageToEdit.data_url);
    setEditedTitle(imageToEdit.title);
  };

  /* saveChanges(): This function is used to save the changes made to the currently edited image. It checks if editingIndex is not null, which means that there is an image being edited. If there is an image being edited, it does the following:
const updatedImages = [...images];: Creates a copy of the images array to avoid directly mutating the state.  updatedImages[editingIndex].data_url = editedImage;: Updates the data_url of the image at the
 editingIndex with the new value stored in editedImage*/
  const saveChanges = () => {
    if (editingIndex !== null) {
      const updatedImages = [...images];
      updatedImages[editingIndex].data_url = editedImage;
      updatedImages[editingIndex].title = editedTitle;
      setImages(updatedImages);
      setEditingIndex(null);
    }
  };
/*handleDragStart(index): This function is triggered when a drag operation starts on an item, and it takes the index of the item being dragged as an argument. It does the following:
setDraggedIndex(index);: Sets the draggedIndex state to the index of the item that is being dragged. This helps in keeping track of the item that is currently being dragged.
handleDragOver(index): This function is triggered when an item is dragged over another item, and it takes the index of the item being dragged over as an argument. It performs the following tasks:
It first checks if there is an item being dragged (i.e., draggedIndex is not null) and if the item is not being dragged over itself (i.e., draggedIndex is not equal to the target index). */
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
                style={{cursor:"pointer"}}
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
