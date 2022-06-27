import { useState } from "react";
import { useHistory } from "react-router-dom";

const Upload = () => {
  const [name, setName] = useState('');
  const [file, setFile] = useState();
  const [uploader, setUploader] = useState('');

  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [isSucced, setIsSucced] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    fetch("http://localhost:4000/upload/", {
      method: "POST",
      body: formData
    }).then(res => {
      if(res.ok !== true)
        throw Error('Fetch failed');
  
      return res.json();
    })
    .then((data) => {
      console.log(data);
      if(data.code !== 1){
        throw Error(data.message);
      }
      const path = data.path;
      const image = {path, name, uploader};

      fetch('http://localhost:8000/images/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(image)
      }).then(() => {
        history.push('/');
      })

      setIsSucced(true);
      setIsPending(false);
      setError(null);
      return data;
    })
    .catch(err => {
      setError(err);
    })
  }

  const changeHandler = (e) =>{
    setFile(e.target.files[0]);
  }

  return (
    <div className="upload">
      <h2>Upload:</h2>
      {!isPending && 
              <form onSubmit={handleSubmit}>
              <article>
                <label>Image name</label>
                <input type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  ></input>
      
                <label>File</label>
                <input type="file"
                  accept="image/*"
                  required
                  onChange={changeHandler}
                  ></input>
      
                <label>Uploader</label>
                <input type="text"
                  required
                  value={uploader}
                  onChange={(e) => setUploader(e.target.value)}
                  ></input>
      
                <button className="submit">Upload</button>
              </article>
            </form>
      }

      {isPending && <p>Uploading...</p>}
      {error && <p>Error: {error}</p>}
      {isSucced && <p style={{color: 'green'}}>File uploaded!</p>}
    </div>
  );
}
 
export default Upload;