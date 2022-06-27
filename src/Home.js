import ImageList from "./Components/ImageLIst";
import { useEffect, useState } from "react";

const Home = () => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/images")
    .then(res => {
      return res.json();
    })
    .then(data => {
      setImages(data);
    });
  }, []);

  return (
    <div className="content">
      {images && <ImageList images={images} title="Latest images:"></ImageList>}
    </div>
  );
}
 
export default Home;