import React from "react";
import footerBG from "../assets/coolBG.png";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import logo from "../assets/study-panel2.png"

const Footer = () => {
  return (
    <div>
      <footer
        className="footer sm:footer-horizontal text-white bg-cover p-10 md:flex items-end justify-between"
        style={{
          backgroundImage: `url(${footerBG})`,
        }}
      >
        <nav className="flex-1">
          <img className="w-2/3" src={logo} alt="" />
        </nav>
        <nav className="flex-1">
          <h6 className="footer-title">Services</h6>
          <p className=" hover:scale-105">Expert Tutors</p>
          <p className=" hover:scale-105">Group Collaboration</p>
          <p className=" hover:scale-105">Flexible Scheduling</p>
          <p className=" hover:scale-105">Study Materials</p>
          <p className=" hover:scale-105">Live Interactive Sessions</p>
        </nav>
        <nav className="flex-1">
          <h6 className="footer-title">Features</h6>
          <p className=" hover:scale-105">Stripe Payment</p>
          <p className=" hover:scale-105">Dashboard</p>
          <p className=" hover:scale-105">user Role</p>
          <p className=" hover:scale-105">Upload Materials</p>
          <p className=" hover:scale-105">Review & Rating</p>
        </nav>
        <nav className="flex flex-col justify-center items-center flex-1">
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a className="hover:scale-110" target="blank" href="https://www.facebook.com/arifuzzaman.arif.98096721/?_rdc=1&_rdr">
              <FaFacebook size={24} />
            </a>
            <a className="hover:scale-110" target="blank" href="https://www.linkedin.com/in/arifuzzaman01/">
              <FaLinkedin size={24} />
            </a>
            <a className="hover:scale-110" target="blank" href="https://github.com/arifuzzaman01">
              <FaGithub size={24} />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
