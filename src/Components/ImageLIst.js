import { BsFillTrashFill } from 'react-icons/bs';

const ImageList = ({images, title}) => {
  return (
    <div className="image-list">
      <h2>{title}</h2>
      {images.length === 0 && <p>Nobody posted any images :(</p>}
      {images.map(image => 
      {
        return(
          <div className="image-element" key={image.id}>
            <img src={"/images/" + image.path}></img>
            <p className="name">{image.name}</p>
            <p className="uploader">Uploader: {image.uploader}</p>
            <button onClick={() => {
                fetch('http://localhost:8000/images/' + image.id, {  method: 'DELETE',});
                
                fetch('http://localhost:4000/delete/' + image.path, {  method: 'DELETE',})
                .then(window.location.reload());
              }
              }><BsFillTrashFill></BsFillTrashFill>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
 
export default ImageList;