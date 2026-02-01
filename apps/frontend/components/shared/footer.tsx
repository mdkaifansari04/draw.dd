import React from "react";

function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-sm text-gray-600">© 2026 draw.dd</div>
          <div className="flex gap-8 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-900">
              Terms
            </a>
            <a href="#" className="hover:text-gray-900">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
