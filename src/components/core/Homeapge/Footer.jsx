import { NavLink } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 border-b border-gray-600 pb-10">
        {/* Company Section */}
        {/* Company Section */}
        {/* Company Section */}
<div>
  <h2 className="text-xl sm:text-lg md:text-2xl font-bold flex items-center gap-2">
    <span className="bg-gray-500 text-gray-900 px-2 py-0.5 sm:px-2 sm:py-0.5 md:px-3 md:py-1 rounded-full font-extrabold text-base sm:text-sm md:text-lg">SV</span>
    <span className="text-gray-300 text-base sm:text-sm md:text-xl">StackVortex</span>
  </h2>
  <ul className="mt-4 space-y-3 text-gray-400">
    <li><NavLink to="/about" className="text-[13px] hover:text-gray-300">About</NavLink></li>
    <li><NavLink to="/careers" className="text-[13px] hover:text-gray-300">Careers</NavLink></li>
    <li><NavLink to="/affiliates" className="text-[13px] hover:text-gray-300">Affiliates</NavLink></li>
  </ul>
  <div className="flex gap-4 mt-4 text-lg">
    <FaFacebookF className="cursor-pointer text-gray-400 hover:text-blue-500" />
    <FaGoogle className="cursor-pointer text-gray-400 hover:text-red-500" />
    <FaTwitter className="cursor-pointer text-gray-400 hover:text-blue-400" />
    <FaYoutube className="cursor-pointer text-gray-400 hover:text-red-600" />
  </div>
</div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold text-gray-300">Resources</h3>
          <ul className="mt-3 space-y-3 text-gray-400">
            <li><NavLink to="/articles" className="text-[13px] hover:text-gray-300">Articles</NavLink></li>
            <li><NavLink to="/blog" className="text-[13px] hover:text-gray-300">Blog</NavLink></li>
            <li><NavLink to="/chart-sheet" className="text-[13px] hover:text-gray-300">Chart Sheet</NavLink></li>
            <li><NavLink to="/code-challenges" className="text-[13px] hover:text-gray-300">Code Challenges</NavLink></li>
            <li><NavLink to="/docs" className="text-[13px] hover:text-gray-300">Docs</NavLink></li>
            <li><NavLink to="/projects" className="text-[13px] hover:text-gray-300">Projects</NavLink></li>
            <li><NavLink to="/videos" className="text-[13px] hover:text-gray-300">Videos</NavLink></li>
            <li><NavLink to="/workspaces" className="text-[13px] hover:text-gray-300">Workspaces</NavLink></li>
          </ul>
          <h3 className="font-semibold mt-7 text-gray-300">Support</h3>
          <ul className="mt-3 space-y-3 text-gray-400">
            <li><NavLink to="/plans/memberships" className="text-[13px] hover:text-gray-300">Help Center</NavLink></li>
          </ul>
        </div>

        {/* Plans & Community */}
        <div className="border-r border-gray-500 pr-4">
          <h3 className="font-semibold text-gray-300">Plans</h3>
          <ul className="mt-3 space-y-3 text-gray-400">
            <li><NavLink to="/plans/memberships" className="text-[13px] hover:text-gray-300">Paid Memberships</NavLink></li>
            <li><NavLink to="/plans/students" className="text-[13px] hover:text-gray-300">For Students</NavLink></li>
            <li><NavLink to="/plans/business" className="text-[13px] hover:text-gray-300">Business Solutions</NavLink></li>
          </ul>
          <h3 className="font-semibold text-gray-300 mt-6">Community</h3>
          <ul className="mt-3 space-y-3 text-gray-400">
            <li><NavLink to="/community/forums" className="text-[13px] hover:text-gray-300">Forums</NavLink></li>
            <li><NavLink to="/community/chapters" className="text-[13px] hover:text-gray-300">Chapters</NavLink></li>
            <li><NavLink to="/community/events" className="text-[13px] hover:text-gray-300">Events</NavLink></li>
          </ul>
        </div>

        {/* Subjects */}
        <div>
          <h3 className="font-semibold text-gray-300">Subjects</h3>
          <ul className="mt-3 space-y-3 text-gray-400">
            {[
              "AI", "Cloud Computing", "Code Foundations", "Computer Science", "Cybersecurity",
              "Data Analytics", "Data Science", "Data Visualization", "Developer Tools", "DevOps",
              "Game Development", "IT", "Machine Learning", "Math", "Mobile Development",
              "Web Design", "Web Development"
            ].map((subject, index) => (
              <li key={index}>
                <NavLink
                  to={`/subjects/${subject.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-[13px] hover:text-gray-300"
                >
                  {subject}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Career Building */}
        <div>
          <h3 className="font-semibold text-gray-300">Career Building</h3>
          <ul className="mt-3 space-y-3 text-gray-400">
            <li><NavLink to="/career/paths" className="text-[13px] hover:text-gray-300">Career Paths</NavLink></li>
            <li><NavLink to="/career/services" className="text-[13px] hover:text-gray-300">Career Services</NavLink></li>
            <li><NavLink to="/career/interview-prep" className="text-[13px] hover:text-gray-300">Interview Prep</NavLink></li>
            <li><NavLink to="/career/certifications" className="text-[13px] hover:text-gray-300">Professional Certification</NavLink></li>
            <li><NavLink to="/catalog" className="text-[13px] hover:text-gray-300">Full Catalog</NavLink></li>
            <li><NavLink to="/beta-content" className="text-[13px] hover:text-gray-300">Beta Content</NavLink></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 mt-6 text-gray-400 text-[13px]">
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <NavLink to="/privacy" className="hover:text-gray-300">Privacy Policy</NavLink>
          <NavLink to="/cookies" className="hover:text-gray-300">Cookie Policy</NavLink>
          <NavLink to="/terms" className="hover:text-gray-300">Terms</NavLink>
        </div>
        <div className="text-center">Made by ❤️ Aditya Singh © 2025 StackVortex</div>
      </div>
    </footer>
  );
};

export default Footer;
