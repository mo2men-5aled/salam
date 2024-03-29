import { useState } from "react";
import { db } from "../Firebase";
import { doc, addDoc, collection, updateDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import Icon_Codes from "./Icon_Links";

import CustomModal from "../modals/modal";

const AddLinks = ({ links, setTriggerAction, language }) => {
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [FormField, setFormField] = useState("");
  const [Loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddLink = (e) => {
    e.preventDefault();

    const linkRef = doc(db, "link", id);
    const orderCollectionRef = collection(linkRef, "order");
    const position = links.length;

    setLoading(true);

    addDoc(orderCollectionRef, {
      type: selectedItem,
      link: FormField,
      number: position,
    })
      .then((data) => {
        const docRef = doc(orderCollectionRef, data.id);

        try {
          updateDoc(docRef, {
            id: data.id,
          });
        } catch (error) {
          console.error("Error updating document: ", error);
        } finally {
          setFormField("");
          setLoading(false);
          setTriggerAction(true);

          handleClose();
        }
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const icons = Object.keys(Icon_Codes);

  return (
    <div>
      <Row>
        {icons.map((icon) => {
          return (
            <Col
              className="p-3"
              key={icon}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card className="d-inline-block align-top">
                <Card.Body
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <img
                    alt="icon"
                    src={Icon_Codes[icon]}
                    style={{
                      width: "7rem",
                      height: "7rem",
                      borderRadius: "0.5rem",
                    }}
                  />
                  <Card.Text
                    style={{
                      padding: "0.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    {icon}
                  </Card.Text>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() => {
                      handleShow();
                      setSelectedItem(icon);
                    }}
                  >
                    {language === "ar" ? "اضافة رابط" : "Add Link"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <CustomModal
        show={show}
        handleClose={handleClose}
        header={`Add ${selectedItem} Link`}
        FooterChildren={
          <Button
            variant="dark"
            onClick={handleAddLink}
            disabled={FormField.length === 0 || Loading ? true : false}
            typr="submit"
          >
            {Loading ? (
              <Spinner
                animation="border"
                variant="light"
                size="sm"
                style={{
                  marginRight: "0.5rem",
                }}
              />
            ) : null}

            {language === "ar" ? "اضافة رابط..؟" : "Add Link ..?"}
          </Button>
        }
      >
        <Form
          onSubmit={(e) => {
            handleAddLink(e);
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              {language === "ar"
                ? `${selectedItem} الرابط `
                : `Link ${selectedItem}`}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Link"
              onChange={(e) => setFormField(e.target.value)}
              autoFocus
            />
          </Form.Group>
        </Form>
      </CustomModal>
    </div>
  );
};

export default AddLinks;
