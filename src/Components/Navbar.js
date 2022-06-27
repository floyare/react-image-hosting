import { Link } from 'react-router-dom';
import Logo from '../logo.svg';
import { AiFillHome } from 'react-icons/ai';
import { ImFolderUpload } from 'react-icons/im';


const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li><img src={Logo}></img></li>
        <li>
          <h2>React Image Hosting</h2>
          <p>Simple image hosting written in React.</p>
        </li>
      </ul>
      <ul className="links">
        <li>
          <Link to="/"><AiFillHome></AiFillHome> Home</Link>
          <Link to="/upload"><ImFolderUpload></ImFolderUpload>Upload Image</Link>
        </li>
      </ul>
    </div>
  );
}
 
export default Navbar;