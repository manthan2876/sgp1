
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";


const Footer = () => {
 
  return (
    <footer className="bg-primary-dark text-primary-light">
      

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left justify-center py-6">
        <div className="text-center">
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">FAQs</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="text-center">
          <h3 className="font-semibold mb-3">Community</h3>
          <ul>
            <li><a href="#" className="hover:underline">Forum</a></li>
            <li><a href="#" className="hover:underline">Events</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Stamp Exchange</a></li>
          </ul>
        </div>

        <div className="text-center">
          <h3 className="font-semibold mb-3">Connect With Us</h3>
          <div className="flex justify-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaFacebook size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
