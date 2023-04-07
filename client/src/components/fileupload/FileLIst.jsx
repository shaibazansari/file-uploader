function FileList({ files }) {
  const getDate = (date) => {
    return new Date(date).toLocaleDateString();
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
          {files.map((file, index) => (
            <tr key={file._id}>
              <th>{index + 1}</th>
              <td>{file.originalName}</td>
              <td>{file.size}</td>
              <td>{getDate(file.uploadedOn)}</td>
              <td>
                <button type="button" className="btn btn-primary btn-sm">
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default FileList;
