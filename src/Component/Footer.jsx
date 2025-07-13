import React from "react";
import footerBG from "../assets/coolBG.png";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer
        className="footer sm:footer-horizontal text-white bg-cover p-10 flex items-end justify-between"
        style={{
          backgroundImage: `url(${footerBG})`,
        }}
      >
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Expert Tutors</a>
          <a className="link link-hover">Group Collaboration</a>
          <a className="link link-hover">Flexible Scheduling</a>
          <a className="link link-hover">Study Materials</a>
          <a className="link link-hover">Live Interactive Sessions</a>
        </nav>
        <nav>
          <h6 className="footer-title">Features</h6>
          <a className="link link-hover">Stripe Payment</a>
          <a className="link link-hover">Dashboard</a>
          <a className="link link-hover">user Role</a>
          <a className="link link-hover">Upload Materials</a>
          <a className="link link-hover">Review & Rating</a>
        </nav>
        <nav className="flex flex-col justify-center items-center">
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a href="https://www.facebook.com/arifuzzaman.arif.98096721/?_rdc=1&_rdr">
              <FaFacebook size={20} />
            </a>
            <a href="https://www.linkedin.com/in/arifuzzaman01/">
              <FaLinkedin size={20} />
            </a>
            <a href="https://github.com/arifuzzaman01">
              <FaGithub size={20} />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
