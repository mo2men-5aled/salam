import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { useParams } from "react-router-dom";

import Get_Color from "./get_color";
import Create_Vcard from "./vcard";
import UserImage from "./User_image";

import { db } from "../Firebase";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  addDoc,
} from "firebase/firestore";

function PopUpForm({ user, language, triggerAction, setTriggerAction }) {
  const [links, setLinks] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchLinkAndIcon = async () => {
      // Construct the query to get documents in the nested collection with the user ID
      const linkCollectionRef = collection(db, "link");
      const nestedCollectionRef = collection(linkCollectionRef, id, "order");

      // Execute the query
      const querySnapshot = await getDocs(nestedCollectionRef);

      // Get the data from the documents sorted
      setLinks(
        querySnapshot.docs
          .map((doc) => doc.data())
          .sort((a, b) => a.number - b.number)
      );
    };

    if (!triggerAction) {
      fetchLinkAndIcon();
    }

    if (triggerAction !== false) setTriggerAction(false);
  }, [id, triggerAction, setTriggerAction]);

  const date = new Date().toDateString();
  const date_time = new Date().toLocaleTimeString();

  //modal states
  const [show, setShow] = useState(false);

  //modal functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //form states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");

  const [emailFound, setEmailFound] = useState(false);

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
  const Data_Share = collection(db, "users");

  const get_user_id_by_mail = async () => {
    const querySnapshot = await getDocs(
      query(Data_Share, where("email", "==", email))
    );

    setUser_id(querySnapshot.docs[0].id);
  };

  var Users_Emails = [];

  getDocs(Data_Share).then((querySnapshot) => {
    querySnapshot.docs.forEach((doc) => {
      Users_Emails.push(doc.data().email);
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && name && phone) {
      if (emailFound) {
        handleClose();

        setDoc(doc(db, "users", user.id, "connectionData", user_id), {
          ...form_Values,
        });

        setDoc(doc(db, "users", user_id, "connections", id), {
          time: date,
        });
      } else {
        handleClose();
        addDoc(collection(db, "users", user.id, "connectionData"), {
          ...form_Values,
        });
      }
    }
  };

  return (
    <div className="container dot">
      {/* Save Contacts button */}
      <button
        id="bttn"
        onClick={() => {
          Create_Vcard(links, user);
          handleShow();
        }}
        className="btn btn-lg text-center"
        style={{
          width: "100%",
          height: "70px",
          background: `${Get_Color(user.color)}`,
          color: "white",
          fontWeight: "bold",
        }}
      >
        {language === "ar" ? "حفظ جهة الاتصال" : "Save Contact"}
      </button>

      {/* Model form pops up */}

      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="img_div">
          <UserImage User={user} classname="form_image" profile="false" />
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
          {language === "ar"
            ? " شارك معلوماتك مع "
            : "Share your info back with"}
          <p>{language === "ar" ? <>{user.name}</> : <>{user.name}</>}</p>
        </h4>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              dir={language === "ar" ? "rtl" : "ltr"}
              type="email"
              placeholder={language === "ar" ? "البريد الالكتروني" : "Email"}
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              autoComplete="false"
            />

            <Form.Control
              dir={language === "ar" ? "rtl" : "ltr"}
              type="text"
              placeholder={language === "ar" ? "الاسم" : "Name"}
              name="name"
              onChange={(e) => {
                setName(e.target.value);

                if (Users_Emails.includes(email)) {
                  setEmailFound(true);
                }

                // Users_Emails.map((Listemail) => {
                //   if (Listemail === email) {
                //     setEmailFound(true);
                //   }
                // });

                // if (emailFound) {
                //   get_user_id_by_mail();
                // }
              }}
              required
              autoComplete="false"
            />

            <Form.Control
              dir={language === "ar" ? "rtl" : "ltr"}
              type="number"
              placeholder={language === "ar" ? "رقم الهاتف" : "Phone Number"}
              name="number"
              onChange={(e) => {
                setPhone(e.target.value);

                if (emailFound) {
                  get_user_id_by_mail();
                }
              }}
              required
              autoComplete="false"
            />

            <Form.Control
              dir={language === "ar" ? "rtl" : "ltr"}
              type="text"
              name="job title"
              placeholder={language === "ar" ? "المسمى الوظيفي" : "Job Title"}
              onChange={(e) => {
                setJob(e.target.value);

                if (emailFound) {
                  get_user_id_by_mail();
                }
              }}
              autoComplete="false"
            />

            <Form.Control
              dir={language === "ar" ? "rtl" : "ltr"}
              type="text"
              name="company"
              placeholder={language === "ar" ? "الشركة" : "Company"}
              onChange={(e) => {
                setCompany(e.target.value);
              }}
              autoComplete="false"
            />

            <Form.Control
              dir={language === "ar" ? "rtl" : "ltr"}
              as="textarea"
              placeholder={language === "ar" ? "ملاحظات" : "Notes"}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
              autoComplete="false"
            />

            <Button
              className="connect_button"
              type="submit"
              style={{
                width: "100%",
                borderRadius: "30px",
                height: "50px",
                backgroundColor: `${Get_Color(user.color)}`,
                color: "white",
                fontWeight: "bold",
              }}
            >
              {language === "ar" ? "سَلِم" : "Connect"}
            </Button>
            <p className="quete">
              {language === "ar"
                ? "سلام لا تبيع او تشارك بياناتك"
                : "Salam does not sell or share your data"}
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default PopUpForm;
