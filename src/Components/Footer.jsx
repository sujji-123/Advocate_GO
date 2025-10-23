// Footer.jsx
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AdvocateGO
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Your one-step solution for legal assistance. Understand your rights, find the right lawyer, 
              and get legal help in your preferred language.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: FaFacebook, color: 'hover:text-blue-400' },
                { icon: FaTwitter, color: 'hover:text-sky-400' },
                { icon: FaLinkedin, color: 'hover:text-blue-500' },
                { icon: FaInstagram, color: 'hover:text-pink-400' }
              ].map((SocialIcon, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-gray-700 hover:scale-110 ${SocialIcon.color}`}
                >
                  <SocialIcon.icon size={18} />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Find a Lawyer', 'Legal Resources', 'Emergency Help', 'About Us'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center group">
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Legal</h4>
            <ul className="space-y-3">
              {['Terms & Conditions', 'Privacy Policy', 'Cookie Policy', 'Disclaimer'].map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center group">
                    <span className="w-1 h-1 bg-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact Us</h4>
            <address className="not-italic text-gray-400 space-y-4">
              <div className="flex items-start space-x-3 group">
                <FaMapMarkerAlt className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p>123 Legal Avenue</p>
                  <p>PRAKASAM, ANDHRA PRADESH 523001</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group">
                <FaEnvelope className="w-5 h-5 text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="mailto:contact@advocatego.com" className="hover:text-white transition-colors">
                  contact@advocatego.com
                </a>
              </div>
              <div className="flex items-center space-x-3 group">
                <FaPhone className="w-5 h-5 text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="tel:+919876543211" className="hover:text-white transition-colors">
                  +91 9876543211
                </a>
              </div>
            </address>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} AdvocateGO. All rights reserved. | 
            <span className="text-blue-400 ml-1">Empowering Justice Through Technology</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;