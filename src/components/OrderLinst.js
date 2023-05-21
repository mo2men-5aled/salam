import { useEffect } from "react";
import { useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable as arrayMove } from "array-move";

import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import {
  Card,
  Row,
  Col,
  ButtonGroup,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";
import Icon_Codes from "./Icon_Links";
import Check_HTTP from "./Check_Http";
import CustomModal from "../modals/modal";
import return_Links from "../components/links";

const SortableItem = SortableElement(
  ({
    item,
    value,
    handleDeleteModalShow,
    handleUpdateModalShow,
    setSelectedItem,
    language,
  }) => (
    <Card className="mb-3">
      <Card.Header>
        <Row>
          <Col
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            {item}
          </Col>
          <Col
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <a
              href={Check_HTTP(item, return_Links(item, value))}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="outline-dark" size="sm">
                {language === "ar" ? "عرض" : "Visit"}
              </Button>
            </a>
          </Col>
        </Row>
      </Card.Header>
      <Row>
        <Col xs={2} sm={2} md={1} lg={1}>
          <div className="p-2">
            <img
              src={Icon_Codes[item]}
              alt="icon"
              className="rounded"
              style={{
                width: "4rem",
                height: "4rem",
              }}
            />
          </div>
        </Col>
        <Col xs={10} sm={10} md={11} lg={11}>
          <Card.Body
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card.Text
              style={{
                fontSize: "1.3rem",
                flexGrow: "1",
                marginRight: "1rem",
                whiteSpace: "nowrap", //if you want to view all the text remove this
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {Check_HTTP(item, return_Links(item, value))}
            </Card.Text>
            <div style={{ alignSelf: "center" }}>
              <ButtonGroup size="sm">
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    handleUpdateModalShow();
                    setSelectedItem(item);
                  }}
                >
                  {language === "ar" ? "تعديل" : "Update"}
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    handleDeleteModalShow();
                    setSelectedItem(item);
                  }}
                >
                  {language === "ar" ? "حذف" : "Delete"}
                </Button>
              </ButtonGroup>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  )
);

const SortableList = SortableContainer(
  ({
    num,
    items,
    links,
    onDelete,
    onUpdate,
    handleShow,
    UpdateModalshow,
    handleUpdateModalClose,
    handleUpdateModalShow,
    DeleteModalshow,
    handleDeleteModalClose,
    handleDeleteModalShow,
    FormField,
    setFormField,
    setSelectedItem,
    language,
  }) => {
    return (
      <>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
          }}
        >
          {items.map((item, index) => {
            if (links[item]) {
              num = num + 1;
              return (
                <SortableItem
                  language={language}
                  key={`item-${item}`}
                  index={index}
                  value={links[item]}
                  item={item}
                  handleShow={handleShow}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                  UpdateModalshow={UpdateModalshow} //show
                  handleUpdateModalClose={handleUpdateModalClose} //handleClose
                  handleUpdateModalShow={handleUpdateModalShow} //handleShow
                  DeleteModalshow={DeleteModalshow}
                  handleDeleteModalClose={handleDeleteModalClose}
                  handleDeleteModalShow={handleDeleteModalShow}
                  FormField={FormField}
                  setFormField={setFormField}
                  setSelectedItem={setSelectedItem}
                />
              );
            } else {
              return null;
            }
          })}
        </ul>
        {num === 0 && (
          <div className="text-center" style={{ fontSize: "2rem" }}>
            {language === "ar" ? "لا يوجد روابط" : "No Links"}
          </div>
        )}
      </>
    );
  }
);

const MyComponent = ({
  triggerAction,
  setTriggerAction,
  icons,
  setIcons,
  language,
}) => {
  var num = 0;
  const { id } = useParams();

  const [links, setLink] = useState("");

  //Update Modal state
  const [UpdateModalshow, setUpdateModalShow] = useState(false);
  //Delete Modal state
  const [DeleteModalshow, setDeleteModalShow] = useState(false);

  //Update Modal handlers
  const handleUpdateModalClose = () => setUpdateModalShow(false);
  const handleUpdateModalShow = () => setUpdateModalShow(true);

  //Delete Modal handlers
  const handleDeleteModalClose = () => setDeleteModalShow(false);
  const handleDeleteModalShow = () => setDeleteModalShow(true);

  const [FormField, setFormField] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    if (!triggerAction) {
      const ref = doc(db, "links", id);
      getDoc(ref)
        .then((link) => {
          if (link.exists()) {
            setLink(link.data());
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
    if (setTriggerAction !== false) setTriggerAction(false);
  }, [id, triggerAction, setTriggerAction]);

  // Sortable function
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setIcons(arrayMove(icons, oldIndex, newIndex));
    const ref = doc(db, "titles", id);
    updateDoc(ref, {
      list: arrayMove(icons, oldIndex, newIndex),
    });
  };

  // Delete function
  const handleDelete = (e) => {
    e.preventDefault();
    const ref = doc(db, "links", id);
    updateDoc(ref, {
      [selectedItem]: "",
    }).then(
      (num = num - 1),
      setFormField(""),
      handleDeleteModalClose(),
      setSelectedItem(""),
      setTriggerAction(true)
    );
  };

  // Update function
  const handleUpdate = (e) => {
    e.preventDefault();
    const ref = doc(db, "links", id);
    updateDoc(ref, {
      [selectedItem]: FormField,
    }).then(
      setFormField(""),
      handleUpdateModalClose(),
      setSelectedItem(""),
      setTriggerAction(true)
    );
  };

  if (!icons && !links) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <Spinner animation="border" variant="dark" />
      </div>
    );
  }

  return (
    <>
      <SortableList
        num={num}
        items={icons}
        links={links}
        onSortEnd={onSortEnd}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        UpdateModalshow={UpdateModalshow} //show
        handleUpdateModalClose={handleUpdateModalClose} //handleClose
        handleUpdateModalShow={handleUpdateModalShow} //handleShow
        DeleteModalshow={DeleteModalshow}
        handleDeleteModalClose={handleDeleteModalClose}
        handleDeleteModalShow={handleDeleteModalShow}
        setSelectedItem={setSelectedItem}
        language={language}
      />

      <CustomModal
        show={UpdateModalshow}
        handleClose={handleUpdateModalClose}
        header={`Update ${selectedItem}`}
        Button={
          <Button variant="outline-dark" onClick={handleUpdateModalShow}>
            {language === "ar" ? "تعديل" : "Update"}
          </Button>
        }
        FooterChildren={
          <Button variant="dark" type="submit" onClick={handleUpdate}>
            {language === "ar" ? "تعديل" : "Update"}
          </Button>
        }
      >
        <Form onSubmit={handleUpdate}>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            style={
              language === "ar" ? { textAlign: "right" } : { textAlign: "left" }
            }
          >
            <Form.Label>{language === "ar" ? "الرابط" : "Link"}</Form.Label>
            <Form.Control
              style={
                language === "ar"
                  ? { textAlign: "right" }
                  : { textAlign: "left" }
              }
              type="text"
              placeholder={language === "ar" ? "ادخل الرابط" : "Enter link"}
              onChange={(e) => {
                setFormField(e.target.value);
              }}
              autoFocus
            />
            <Form.Text
              className="text-muted"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {language === "ar"
                ? `${links[selectedItem]} الرابط الحالي`
                : `Current link : ${links[selectedItem]}`}
            </Form.Text>
          </Form.Group>
        </Form>
      </CustomModal>

      <CustomModal
        show={DeleteModalshow}
        handleClose={handleDeleteModalClose}
        header={`Update ${selectedItem}`}
        FooterChildren={
          <Button variant="dark" onClick={handleDelete}>
            {language === "ar" ? "حذف" : "Delete"}
          </Button>
        }
      >
        <Form.Text
          className="text-muted"
          style={
            language === "ar" ? { textAlign: "right" } : { textAlign: "left" }
          }
        >
          {language === "ar"
            ? `${selectedItem} هل انت متاكد من انك تريد حذف`
            : `Are you sure you want to delete ${selectedItem}?`}
        </Form.Text>
      </CustomModal>
    </>
  );
};

export default MyComponent;
