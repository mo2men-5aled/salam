import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Firebase";
import dark_image from "../assets/dark.png";

import {
  Form,
  Image,
  Spinner,
  Row,
  Col,
  Container,
  Button,
  Alert,
} from "react-bootstrap";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../Firebase";

import whiteLogo from "../assets/white_logo.png";
import "./fadeImage.css";
import CustomModal from "../modals/modal";
import { useNavigate } from "react-router-dom";

import { getDownloadURL } from "firebase/storage";

const UserProfileInfo = ({ triggerAction, setTriggerAction, language }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState("");

  const [name, setName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");

  const [error, setError] = useState();
  const [uploading, setUploading] = useState(false);

  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const handleClosePhotoModal = () => setShowPhotoModal(false);
  const handleShowPhotoModal = () => setShowPhotoModal(true);

  const [showDataModal, setDataModal] = useState(false);
  const handleCloseDataModal = () => setDataModal(false);
  const handleShowDataModal = () => setDataModal(true);

  const [image, setImage] = useState("");
  const [folder, setFolder] = useState("");

  const [size, setSize] = useState("");

  const handleFileSelect = (event) => {
    setImage(event.target.files[0]);
  };

  function handleSelectChange(event) {
    setFolder(event.target.value);
  }

  const handleUpdateBGImage = () => {
    const storageRef = ref(storage, `${folder}/${id}`);

    const uploadTask = uploadBytesResumable(storageRef, image);

    // upload image and get the image link after finish
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setUploading(true);
      },
      (error) => {
        setError(error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // update the user profile with the new image link
          if (folder === "userImage") {
            updateDoc(doc(db, "users", id), {
              image: downloadURL,
            })
              .then(() => {
                setUploading(false);
                setTriggerAction(true);
                handleClosePhotoModal();
              })
              .catch((error) => {
                setError(error);
                setUploading(false);
              });
          } else if (folder === "backgroundImage") {
            updateDoc(doc(db, "users", id), {
              backgroundImage: downloadURL,
            })
              .then(() => {
                setUploading(false);
                setTriggerAction(true);
                handleClosePhotoModal();
              })
              .catch((error) => {
                setError(error);
                setUploading(false);
              });
          } else {
            updateDoc(doc(db, "users", id), {
              logoImage: downloadURL,
            })
              .then(() => {
                setUploading(false);
                setTriggerAction(true);
                handleClosePhotoModal();
              })
              .catch((error) => {
                setError(error);
                setUploading(false);
              });
          }
        });
      }
    );
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const userDocRef = doc(db, "users", id);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUser(userDocSnap.data());
          setName(userDocSnap.data().name);
          setJobTitle(userDocSnap.data().jobTitle);
          setCompany(userDocSnap.data().company);
          setAddress(userDocSnap.data().address);
          setBio(userDocSnap.data().bio);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };

    if (!triggerAction) getUser();

    if (triggerAction !== false) setTriggerAction(false);

    const handleResize = () => {
      if (window.innerWidth < 600) {
        setSize("sm");
      } else if (window.innerWidth < 768) {
        setSize("md");
      } else {
        setSize("lg");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [id, triggerAction, setTriggerAction]);

  const updateUserData = async () => {
    try {
      setUploading(true);

      const userDocRef = doc(db, "users", id);
      await updateDoc(userDocRef, {
        name: name,
        jobTitle: jobTitle,
        company: company,
        address: address,
        bio: bio,
      });
      handleCloseDataModal();
      setTriggerAction(true);
    } catch (error) {
      setError(error);
      setUploading(false);
    }
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
    <div>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Image
          className="mb-3 fading-image"
          style={{
            width: "100%",
            height: "40rem",
            objectFit: "cover",
            objectPosition: "50%",
            borderRadius: "0rem 0 0.5rem 0.5rem",
          }}
          src={user.backgroundImage ? user.backgroundImage : whiteLogo}
          alt="User Background Image"
        />
        <Button
          style={{
            position: "absolute",
            top: "5%",
            left: "5%",
          }}
          variant="dark"
          onClick={() => {
            handleShowPhotoModal();
          }}
        >
          <i
            className="fa fa-edit"
            style={{
              color: "white",
            }}
          ></i>
        </Button>
      </div>

      <Container className="d-flex justify-content-center">
        <Row
          className="mb-8 "
          style={{
            margin: "-12rem 0 0 2rem",
          }}
        >
          <Col
            xs={12}
            sm={12}
            md={3}
            lg={3}
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              roundedCircle
              style={{
                width: "13rem",
                height: "13rem",
                objectFit: "cover",
                objectPosition: "60%",
                border: "0.2rem solid white",
              }}
              src={user.image ? user.image : dark_image}
              alt="User Profile Image"
            />
            <Image
              roundedCircle
              style={{
                width: "3.5rem",
                height: "3.5rem",
                objectFit: "cover",
                objectPosition: "60%",
                border: "0.16rem solid white",
                margin: "-4rem 0 0 10rem",
              }}
              src={user.logoImage ? user.logoImage : whiteLogo}
              alt="User Logo Image"
            />
          </Col>

          <Col
            xs={12}
            sm={12}
            md={9}
            lg={9}
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <div
              className={size === "md" || size === "sm" ? "text-center" : null}
            >
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: `${
                      size === "md" || size === "sm" ? "center" : "flex-start"
                    }`,
                    alignItems: "center",
                  }}
                >
                  {user.name}
                </div>
              </div>

              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                {user.jobTitle} - {user.company}
                <div>{user.address}</div>
              </div>
              <div>{user.bio}</div>
              <>
                <Button
                  variant="dark"
                  style={{
                    margin: "1rem 0 0 0",
                  }}
                  size="sm"
                  onClick={() => {
                    handleShowDataModal();
                  }}
                >
                  {language === "ar" ? "تعديل البيانات" : "Edit Info"}
                </Button>
                <Button
                  variant="dark"
                  style={{
                    margin: "1rem 0 0 1rem",
                  }}
                  size="sm"
                  onClick={() => {
                    navigate(`/${user.id}`);
                  }}
                >
                  {language === "ar" ? "عرض البطاقة" : "Preview Card"}
                </Button>
              </>
            </div>
          </Col>
        </Row>
      </Container>

      <CustomModal
        show={showPhotoModal}
        handleClose={handleClosePhotoModal}
        header={
          language === "ar" ? "تعديل صور الملف الشخصي" : "Edit Profile Images"
        }
        FooterChildren={
          <Button
            variant="dark"
            disabled={folder && image ? false : true}
            type="submit"
            onClick={() => {
              handleUpdateBGImage();
            }}
          >
            {language === "ar" ? "حفظ" : "Save"}
          </Button>
        }
      >
        <Form onSubmit={handleUpdateBGImage}>
          <Form.Select
            onChange={handleSelectChange}
            style={
              language === "ar" ? { textAlign: "right" } : { textAlign: "left" }
            }
          >
            <option value="default">
              {language === "ar" ? "اختر نوع الصورة" : "Select Image Type"}
            </option>
            <option value="backgroundImage">
              {language === "ar" ? "صورة الغلاف" : "Background Image"}
            </option>
            <option value="userImage">
              {language === "ar" ? "الصورة الشخصيه" : "Profile Image"}
            </option>
            <option value="logoImage">
              {language === "ar" ? "اللوجو" : "Logo Image"}
            </option>
          </Form.Select>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            style={
              language === "ar"
                ? { textAlign: "right", margin: "1rem 0 0 0" }
                : { textAlign: "left", margin: "1rem 0 0 0" }
            }
          >
            <Form.Label>
              {language === "ar" ? "تحميل صورة" : "Upload Image"}
            </Form.Label>
            <Form.Control
              style={
                language === "ar"
                  ? { textAlign: "right" }
                  : { textAlign: "left" }
              }
              //make it accept only jpg nad jpeg
              accept={
                folder === "userImage"
                  ? "image/jpeg, image/jpg"
                  : "image/jpeg, image/jpg, image/png"
              }
              type="file"
              onChange={handleFileSelect}
            />
          </Form.Group>
          <div className="text-center mb-3">
            {error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              <div>
                {!uploading ? (
                  <Alert variant="warning">
                    {language === "ar"
                      ? "JPG, JPEG يسمح فقط لصورة الملف الشخصي ان تكون بامتداد "
                      : "JPG, JPEG image only allowed for profile image"}
                  </Alert>
                ) : (
                  <Spinner animation="border" variant="dark" />
                )}
              </div>
            )}
          </div>
        </Form>
      </CustomModal>

      <CustomModal
        show={showDataModal}
        handleClose={handleCloseDataModal}
        header={language === "ar" ? "تعديل الملف الشخصي" : "Edit Profile"}
        FooterChildren={
          <Button
            variant="dark"
            type="submit"
            onClick={() => {
              updateUserData();
            }}
          >
            {language === "ar" ? "حفظ" : "Save"}
          </Button>
        }
      >
        <Form onSubmit={updateUserData}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              style={
                language === "ar"
                  ? { textAlign: "right" }
                  : { textAlign: "left" }
              }
              type="text"
              placeholder={language === "ar" ? "ادخل الاسم" : "Enter Your Name"}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Form.Control
              type="text"
              style={
                language === "ar"
                  ? { textAlign: "right" }
                  : { textAlign: "left" }
              }
              placeholder={
                language === "ar"
                  ? "ادخل المسمى الوظيفي"
                  : "Enter Your Job Title"
              }
              value={jobTitle}
              onChange={(e) => {
                setJobTitle(e.target.value);
              }}
            />
            <Form.Control
              style={
                language === "ar"
                  ? { textAlign: "right" }
                  : { textAlign: "left" }
              }
              type="text"
              placeholder={
                language === "ar" ? "ادخل اسم الشركه" : "Enter Your Company"
              }
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
            />
            <Form.Control
              style={
                language === "ar"
                  ? { textAlign: "right" }
                  : { textAlign: "left" }
              }
              type="text"
              placeholder={
                language === "ar" ? "ادخل العنوان" : "Enter Your Address"
              }
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <Form.Control
              style={
                language === "ar"
                  ? { textAlign: "right" }
                  : { textAlign: "left" }
              }
              type="text"
              placeholder={language === "ar" ? "ادخل الوصف" : "Enter Your Bio"}
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </Form.Group>
          <div className="text-center mb-3">
            {error ? (
              <Alert variant="danger">{error}</Alert>
            ) : (
              <div>
                {!uploading ? (
                  <Alert variant="warning">
                    {language === "ar"
                      ? "لا تنسى حفظ التغيرات"
                      : "Don't foget to save Updates"}
                  </Alert>
                ) : (
                  <Spinner animation="border" variant="dark" />
                )}
              </div>
            )}
          </div>
        </Form>
      </CustomModal>
    </div>
  );
};

export default UserProfileInfo;
