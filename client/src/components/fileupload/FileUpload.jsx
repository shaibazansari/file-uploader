import { useState, useRef } from "react";

function FileUpload({ addFile }) {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (loading || !selectedFile) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/files/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      setLoading(false);
      if (response.ok) {
        const data = await response.json();
        addFile(data.data.file);
        setSelectedFile(null);
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="input-group">
      <input type="file" className="form-control" ref={fileInputRef} onChange={handleFileChange} />
      {loading ? (
        <button className="btn btn-success" type="button" disabled>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Uploading...
        </button>
      ) : (
        <button className={"btn btn-success " + (!selectedFile ? "disabled" : "")} onClick={handleUpload}>
          Upload
        </button>
      )}
    </div>
  );
}

export default FileUpload;
