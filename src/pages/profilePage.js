import React, { useState } from "react";
import Navbar from "../components/navbar";

import firebase from "../Firebase";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import {
  Col,
  Row,
  Container,
  Card,
  Spinner,
  Form,
  Button,
  Accordion,
} from "react-bootstrap";

import dark_image from "../components/mycollection/dark.png";

import "./profilePage.css";

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState("");

  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");

  const [profileImage, setProfileImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [logoImage, setLogoImage] = useState("");

  // const [link, setLink] = React.useState({});

  useEffect(() => {
    // get user data from firebase and pass it to the components
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUser(doc.data());
          setAddress(doc.data().address);
          setBio(doc.data().bio);
          setCompany(doc.data().company);
          setJobTitle(doc.data().jobTitle);
          setName(doc.data().name);
        }
      });
    //

    firebase
      .firestore()
      .collection("links")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // setLink(doc.data());
        }
      });
  }, [id]);

  //update user data
  const updateProfile = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({
        name: name,
        jobTitle: jobTitle,
        company: company,
        address: address,
        bio: bio,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!user) {
    return (
      <div
        style={{
          display: " block",
          position: "fixed",

          top: "50%",
          right: "50%",
        }}
      >
        <Spinner animation="border" variant="dark" />;
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#ededed" }}>
      <Navbar />
      <Container>
        <Accordion className="pt-4 pb-4" defaultActiveKey="1">
          <Accordion.Item eventKey="1">
            <Accordion.Button
              style={{
                backgroundColor: "#343a40",
                color: "white",
              }}
            >
              User Information
            </Accordion.Button>
            <Accordion.Body>
              <Row>
                <Col lg={4} md={6} className="p-3">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={user.backgroundImage}
                      style={{
                        objectFit: "cover",
                        objectPosition: "50%",
                        height: "12rem",
                      }}
                    />

                    <Card.Body>
                      <div className="text-center">
                        <img
                          src={user.image ? user.image : dark_image}
                          alt="Profile"
                          style={{
                            objectFit: "cover",
                            objectPosition: "50%",
                            width: "8rem",
                            height: "8rem",
                            borderRadius: "50%",
                            border: "5px solid white",
                            marginTop: "-5rem",
                          }}
                        />

                        <h5 className="mt-3">{user.name}</h5>
                        <p>{user.jobTitle}</p>
                        <p>{user.company}</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col lg={8} md={6} className="p-3">
                  <Card
                    style={{
                      width: "100%",
                    }}
                  >
                    <Card.Body>
                      <Form>
                        <Row className="mb-3">
                          <Col sm={2}>
                            <h6 className="mb-0">Full Name</h6>
                          </Col>

                          <Col sm={10} className="text-secondary">
                            <input
                              type="text"
                              className="form-control"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col sm={2}>
                            <h6 className="mb-0">Job Title</h6>
                          </Col>

                          <Col sm={10} className="text-secondary">
                            <Form.Control
                              type="text"
                              className="form-control"
                              value={jobTitle}
                              onChange={(e) => setJobTitle(e.target.value)}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col sm={2}>
                            <h6 className="mb-0">Company</h6>
                          </Col>

                          <Col sm={10} className="text-secondary">
                            <input
                              type="text"
                              className="form-control"
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col sm={2}>
                            <h6 className="mb-0">Address</h6>
                          </Col>

                          <Col sm={10} className="text-secondary">
                            <Form.Control
                              type="text"
                              className="form-control"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </Col>
                        </Row>

                        <Row className="mb-3">
                          <Col sm={2}>
                            <h6 className="mb-0">Bio</h6>
                          </Col>

                          <Col sm={10} className="text-secondary">
                            <Form.Control
                              type="text"
                              className="form-control"
                              value={bio}
                              onChange={(e) => setBio(e.target.value)}
                            />
                          </Col>
                        </Row>
                      </Form>
                      <div className="text-center">
                        <Button variant="dark" onClick={() => updateProfile()}>
                          Update Profile
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </div>
  );
};

export default ProfilePage;
