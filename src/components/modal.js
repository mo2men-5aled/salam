import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import firebase from "firebase";
import { useParams } from "react-router-dom";

import Colors from "./Colors";
import Get_Color from "./get_color";
import property from "./Get_property_func";
import Create_Vcard from "./vcard";
import UserImage from "./User_image";

function PopUpForm(props) {
  const date = new Date().toDateString();
  const date_time = new Date().toLocaleTimeString();

  //form states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");

  const [emailFound, setEmailFound] = useState(true);

  const [user_id, setUser_id] = useState("empty");

  const form_Values = {
    email: email,
    name: name,
    phone: phone,
    job: job,
    company: company,
    notes: notes,
    date: date + " " + date_time,
    web: "",
    address: "",
    image: "",
    bgImage: "",
    instagram: "",
  };
  const Data_Share = firebase.firestore().collection("users");

  const get_user_id_by_mail = async () => {
    const response = await Data_Share.where("email", "==", email).get();

    setUser_id(response.docs[0].id);
  };

  const params = useParams();

  //to post the user's data to the database in the connections collection
  const User_Connections = firebase
    .firestore()
    .collection("users")
    .doc(user_id)
    .collection("connections");

  const Shared_Connection = firebase
    .firestore()
    .collection("users")
    .doc(params.id)
    .collection("connectionData");

  var Users_Emails = [];

  Data_Share.get().then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      Users_Emails.push(doc.data().email);
    });
  });

  //modal states
  const [show, setShow] = useState(false);

  //modal functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container dot">
      {/* Save Contacts button */}
      <button
        id="bttn"
        onClick={() => {
          Create_Vcard(props.data, props.username, props.image, params.id);
          handleShow();
        }}
        className="btn btn-lg text-center"
        style={{
          width: "100%",
          height: "70px",
          background: `${
            Get_Color(props.color, Colors, property).value.background
          }`,
          color: "white",
          fontWeight: "bold",
        }}
      >
        {props.language === "ar" ? "حفظ جهة الاتصال" : "Save Contact"}
      </button>

      {/* Model form pops up */}
      <div className="d-flex align-items-center">
        <Modal
          show={show}
          onHide={handleClose}
          style={{ padding: "60px 30px 30px 30px", borderRadius: "100px" }}
        >
          <div className="img_div">
            <UserImage
              User={props.image}
              classname="form_image"
              profile="false"
            />
          </div>

          <div className="close_btn">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>

          <h4 className="text-center">
            {props.language === "ar"
              ? " شارك معلوماتك مع "
              : "Share your info back with"}
            <p>
              {props.language === "ar" ? (
                <>{props.username.name}</>
              ) : (
                <>{props.username.name}</>
              )}
            </p>
          </h4>

          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                dir={props.language === "ar" ? "rtl" : "ltr"}
                type="email"
                placeholder={
                  props.language === "ar" ? "البريد الالكتروني" : "Email"
                }
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (Users_Emails.includes(e.target.value)) {
                    setEmailFound(true);
                  } else {
                    setEmailFound(false);
                  }
                }}
                required
              />

              <Form.Control
                dir={props.language === "ar" ? "rtl" : "ltr"}
                type="text"
                placeholder={props.language === "ar" ? "الاسم" : "Name"}
                name="name"
                onChange={(e) => {
                  setName(e.target.value);

                  if (emailFound) {
                    get_user_id_by_mail();
                  }
                }}
                required
              />

              <Form.Control
                dir={props.language === "ar" ? "rtl" : "ltr"}
                type="number"
                placeholder={
                  props.language === "ar" ? "رقم الهاتف" : "Phone Number"
                }
                name="number"
                onChange={(e) => {
                  setPhone(e.target.value);

                  if (emailFound) {
                    get_user_id_by_mail();
                  }
                }}
                required
              />

              <Form.Control
                dir={props.language === "ar" ? "rtl" : "ltr"}
                type="text"
                name="job title"
                placeholder={
                  props.language === "ar" ? "المسمى الوظيفي" : "Job Title"
                }
                onChange={(e) => {
                  setJob(e.target.value);

                  if (emailFound) {
                    get_user_id_by_mail();
                  }
                }}
              />

              <Form.Control
                dir={props.language === "ar" ? "rtl" : "ltr"}
                type="text"
                name="company"
                placeholder={props.language === "ar" ? "الشركة" : "Company"}
                onChange={(e) => {
                  setCompany(e.target.value);
                }}
              />

              <Form.Control
                dir={props.language === "ar" ? "rtl" : "ltr"}
                as="textarea"
                placeholder={props.language === "ar" ? "ملاحظات" : "Notes"}
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
              />

              <Button
                className="connect_button"
                type="submit"
                style={{
                  width: "100%",
                  borderRadius: "30px",
                  height: "50px",
                  backgroundColor: `${
                    Get_Color(props.color, Colors, property).value.background
                  }`,
                  color: "white",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  if (email && name && phone) {
                    if (emailFound) {
                      handleClose();
                      Shared_Connection.doc(user_id).set({ ...form_Values });
                      User_Connections.doc(params.id).set(
                        { time: date },
                        { merge: true }
                      );
                    } else {
                      handleClose();
                      Shared_Connection.add({ ...form_Values });
                    }
                  }
                }}
              >
                {props.language === "ar" ? "سَلِم" : "Connect"}
              </Button>
              <p className="quete">
                {props.language === "ar"
                  ? "سلام لا تبيع او تشارك بياناتك"
                  : "Salam does not sell or share your data"}
              </p>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default PopUpForm;
