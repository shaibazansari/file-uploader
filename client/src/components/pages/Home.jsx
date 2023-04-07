import { useState, useEffect } from "react";
import FileUpload from "../fileupload/FileUpload";
import FileList from "../fileupload/FileLIst";
import Header from "../layout/Header";

function Home() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      // Send a GET request to the backend API to fetch the list of files
      const response = await fetch("http://localhost:9000/api/files", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("here response", response, data);
        setFiles(data.data.files);
      } else {
        console.error("Failed to fetch files");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
      <Header />
      <div className="content">
        <div className="container">
          <div className="card">
            <div className="card-header">File Uploader</div>
            <div className="card-body">
              <div className="file-uploader mt-2 mb-5">
                <FileUpload />
              </div>
              <div className="file-list">
                <FileList files={files} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
