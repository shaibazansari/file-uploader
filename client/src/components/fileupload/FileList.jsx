import { useState } from "react";

function FileList({ files }) {
  const [downloadFileId, setDownloadFileId] = useState(null);

  const getDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const getFileSize = (size) => {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
  };

  const downloadFile = async (name, id) => {
    setDownloadFileId(id);
    try {
      const response = await fetch("/api/files/" + id + "/download", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const blob = await response.blob();

        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
        setDownloadFileId(null);
      }
    } catch (error) {
      console.error(error);
      setDownloadFileId(null);
    }
  };

  return (
    <>
      <h6 className="card-subtitle mb-2 text-muted">All Files</h6>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Size</th>
            <th>Uploaded on</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {!files.length ? (
            <tr>
              <td className="text-center" colSpan="5">
                No files Found
              </td>
            </tr>
          ) : (
            files.map((file, index) => (
              <tr key={file._id}>
                <th>{index + 1}</th>
                <td>{file.originalName}</td>
                <td>{getFileSize(file.size)}</td>
                <td>{getDate(file.uploadedOn)}</td>
                <td>
                  {downloadFileId === file._id ? (
                    <button className="btn btn-primary btn-sm" type="button" disabled>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Donwloading...
                    </button>
                  ) : (
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => downloadFile(file.originalName, file._id)}>
                      Download
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
}

export default FileList;
