import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUpload } from "@mui/icons-material";
import { Spinner } from "react-bootstrap";

const DropzoneBox = ({ placeholder, onFileChange }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      setLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLoading(false);
      };
      reader.readAsDataURL(file);
      setPreview(URL.createObjectURL(file));
      onFileChange(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #cccccc",
        borderRadius: "10px",
        padding: "2px",
        textAlign: "center",
        height: "180px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: isDragActive ? "#f3e8ff" : "#fafafa",
        transition: "background 0.2s ease-in-out",
        position: "relative",
      }}
    >
      <input {...getInputProps()} />

      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255,255,255,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#555",
          }}
        >
          <Spinner animation="border" variant="primary" size="sm" />
        </div>
      )}

      {preview ? (
        <img
          src={preview}
          alt="preview"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        !loading && (
          <div style={{ display: "flex", gap: "5px" }}>
            <CloudUpload style={{ fontSize: "40px", color: "#888" }} />
            <p
              style={{
                marginTop: "10px",
                fontSize: "14px",
                color: "#555",
                fontWeight: "bold",
                fontStyle: "italic",
              }}
            >
              {placeholder}
            </p>
          </div>
        )
      )}
    </div>
  );
};

const UploadImages = ({ uploadImagesRef }) => {
  const [imageFiles, setImageFiles] = useState({
    businessImage: "",
    personalImage: "",
  });

  useMemo(() => {
    const formData = new FormData();
    if (imageFiles.businessImage) {
      formData.append(
        "business_image",
        imageFiles.businessImage,
        imageFiles.businessImage.name
      );
    }
    if (imageFiles.personalImage) {
      formData.append(
        "customer_image",
        imageFiles.personalImage,
        imageFiles.personalImage.name
      );
    }

    uploadImagesRef.current.imageData = formData;
  }, [imageFiles]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        padding: "20px",
      }}
    >
      <DropzoneBox
        placeholder="Upload Business Image"
        onFileChange={(value) =>
          setImageFiles((prev) => ({ ...prev, businessImage: value }))
        }
      />
      <DropzoneBox
        placeholder="Upload Personal Image"
        onFileChange={(value) =>
          setImageFiles((prev) => ({ ...prev, personalImage: value }))
        }
      />
    </div>
  );
};
export default UploadImages;
