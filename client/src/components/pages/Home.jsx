import { useState, useEffect } from "react";
import FileUpload from "../fileupload/FileUpload";
import FileList from "../fileupload/FileList";
import Header from "../layout/Header";

function Home({ user, setUser }) {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await fetch("/api/files", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setFiles(data.data.files);
      }
      
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchFiles();
  }, []);

  const addFile = file => {
    setFiles( files => files.concat(file))
  }

  return (
    <>
      <Header user={user} setUser={setUser}/>
      <div className="content">
        <div className="container">
          <div className="card">
            <div className="card-header">File Uploader</div>
            <div className="card-body">
              <div className="file-uploader mt-2 mb-5">
                <FileUpload addFile={addFile} />
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
