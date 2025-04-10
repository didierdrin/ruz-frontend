const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">Marketplace</h2>
              <p className="text-gray-400">Buy and sell with confidence</p>
            </div>
            <div className="flex space-x-6">
              <a href="/about" className="hover:text-indigo-400 transition-colors">
                About
              </a>
              <a href="/contact" className="hover:text-indigo-400 transition-colors">
                Contact
              </a>
              <a href="/privacy" className="hover:text-indigo-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-indigo-400 transition-colors">
                Terms
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Marketplace. All rights reserved.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;