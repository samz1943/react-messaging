function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h5 className="text-lg font-semibold mb-2">About Us</h5>
            <p className="text-gray-400">
              We are committed to providing the best React TypeScript boilerplate.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-2">Quick Links</h5>
            <ul className="space-y-1">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-2">Follow Us</h5>
            <ul className="flex justify-center md:justify-start space-x-4">
              <li>
                <a href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} React TypeScript. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
