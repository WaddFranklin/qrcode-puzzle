import { useState } from "react";

export default function Home() {
  const [images, setImages] = useState([]);
  
  const handleDrop = (event) => {
    event.preventDefault();
    const files = [...event.dataTransfer.files];

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length > 0) {
      const newImages = imageFiles.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileInput = (event) => {
    const files = [...event.target.files];
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length > 0) {
      const newImages = imageFiles.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Monte o Quebra-Cabeça do QR Code</h1>
      <p>Arraste as imagens ou clique para carregar as partes do QR Code.</p>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed gray",
          padding: "20px",
          width: "80%",
          margin: "0 auto",
          cursor: "pointer",
        }}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          style={{ display: "none" }}
          id="fileInput"
        />
        <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
          <p>Clique ou arraste as imagens aqui</p>
        </label>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Parte ${index + 1}`} width="150" />
        ))}
      </div>
    </div>
  );
}
