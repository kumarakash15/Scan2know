function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 pt-4 pb-3">
      <div className="container">
        
        <div className="row text-center text-md-start">

          {/* Left Section */}
          <div className="col-12 col-md-6 mb-3">
            <h5 className="fw-bold">Eatm Hostel</h5>
            <p className="mb-1">
              Einstein Academy of Technology and Management
            </p>
            <small>Smart Room Member Information System</small>
          </div>

          {/* Right Section */}
          <div className="col-12 col-md-6 mb-3 text-md-end">
            <p className="mb-1">Developed by TechVortex</p>
            <small>Scan2Know is a simple and smart solution to instantly access
            room member details using a quick scan.</small>
          </div>

        </div>

        {/* Divider */}
        <hr className="border-light my-2" />

        {/* Bottom */}
        <div className="text-center">
          <small>
            © {new Date().getFullYear()} TechVortex. All rights reserved.
          </small>
        </div>

      </div>
    </footer>
  )
}

export default Footer