import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Container, Card, Spinner, Form } from "react-bootstrap";
import firebase from "../Firebase";
import dark_image from "../assets/dark.png";

const UserProfileInfo = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState("");

  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");

  // const [profileImage, setProfileImage] = useState("");
  // const [backgroundImage, setBackgroundImage] = useState("");
  // const [logoImage, setLogoImage] = useState("");

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
    <Card className="mt-5 mb-5">
      <Card.Body>
        <Row className="align-items-center">
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
            <div
              style={{
                width: "100%",
              }}
            >
              <div>
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
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default UserProfileInfo;
