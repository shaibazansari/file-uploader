import { useState } from "react";

function FileUpload({ addFile }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (loading || !file) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/files/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      setLoading(false);
      if (response.ok) {
        const data = await response.json();
        addFile(data.data.file);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="input-group">
      <input type="file" className="form-control" onChange={handleFileChange} />
      {loading ? (
        <button className="btn btn-success" type="button" disabled>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Uploading...
        </button>
      ) : (
        <button className={"btn btn-success " + (!file ? "disabled" : "")} onClick={handleUpload}>
          Upload
        </button>
      )}
    </div>
  );
}

export default FileUpload;
