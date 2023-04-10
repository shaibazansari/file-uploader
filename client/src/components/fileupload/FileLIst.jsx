function FileList({ files }) {
  const getDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const downloadFile = async (name, id) => {
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
      }
    } catch (error) {
      console.error(error);
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
                <td>{file.size}</td>
                <td>{getDate(file.uploadedOn)}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => downloadFile(file.originalName, file._id)}
                  >
                    Download
                  </button>
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
