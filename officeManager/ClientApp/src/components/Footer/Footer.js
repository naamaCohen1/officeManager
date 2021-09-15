import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer px-0 px-lg-3">
        <Container fluid>
          <nav>
            <ul className="footer-menu">
            </ul>
            <p className="copyright text-center">
              © {new Date().getFullYear()}{" "}
              <a>Office Manager</a>, Chen Tevet & Naama Cohen
            </p>
          </nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;
