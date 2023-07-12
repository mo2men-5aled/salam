import { useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable as arrayMove } from "array-move";

import { useParams } from "react-router-dom";
import { doc, updateDoc, collection, deleteDoc } from "firebase/firestore";
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
            {item.type}
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
              href={Check_HTTP(item.type, return_Links(item.type, value))}
              target="_blank"
              rel="noreferrer"
            >
              {item.type !== "Header Text" && item.type !== "Address" && (
                <Button variant="outline-dark" size="sm">
                  {language === "ar" ? "عرض" : "Visit"}
                </Button>
              )}
            </a>
          </Col>
        </Row>
      </Card.Header>
      <Row>
        <Col xs={2} sm={2} md={1} lg={1}>
          <div className="p-2">
            <img
              src={Icon_Codes[item.type]}
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
              {Check_HTTP(item.type, value)}
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
          {links.map((link, index) => {
            if (link) {
              num = num + 1;
              return (
                <SortableItem
                  language={language}
                  key={`item-${link.id}`}
                  index={index}
                  value={link.link}
                  item={link}
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

const OrderableList = ({
  triggerAction,
  setTriggerAction,
  icons,
  setIcons,
  language,
  links,
  setLink,
}) => {
  var num = 0;
  const { id } = useParams();

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

  // Sortable function
  const onSortEnd = async ({ oldIndex, newIndex }) => {
    const linkCollectionRef = collection(db, "link");
    const nestedCollectionRef = collection(linkCollectionRef, id, "order");
    let tempLinks;
    try {
      tempLinks = arrayMove(links, oldIndex, newIndex);
      setLink(tempLinks);
    } catch (error) {
      console.log(error);
    } finally {
      await Promise.all(
        tempLinks.map(async (link, index) => {
          const docRef = doc(nestedCollectionRef, link.id);
          await updateDoc(docRef, {
            number: index,
          });
        })
      );
    }
  };

  // Delete function
  const handleDelete = async (e) => {
    e.preventDefault();
    const linkCollectionRef = collection(db, "link");
    const nestedCollectionRef = collection(linkCollectionRef, id, "order");
    const docRef = doc(nestedCollectionRef, selectedItem.id);

    // resort the items after delete
    await Promise.all(
      links
        .filter((link) => link.id !== selectedItem.id)
        .map(async (link, index) => {
          const docRef = doc(nestedCollectionRef, link.id);
          await updateDoc(docRef, {
            number: index,
          });
        })
    );

    await deleteDoc(docRef).then(
      handleDeleteModalClose(),
      setSelectedItem(""),
      setTriggerAction(true)
    );
  };

  // Update function
  const handleUpdate = (e) => {
    e.preventDefault();

    const linkCollectionRef = collection(db, "link");
    const nestedCollectionRef = collection(linkCollectionRef, id, "order");
    const docRef = doc(nestedCollectionRef, selectedItem.id);
    updateDoc(docRef, {
      link: FormField,
    }).then(
      setFormField(""),
      handleUpdateModalClose(),
      setSelectedItem(""),
      setTriggerAction(true)
    );
  };

  if (!links) {
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
        links={links}
        onSortEnd={onSortEnd}
        pressDelay={100}
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
        header={`Update ${selectedItem.type}`}
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
                ? `${selectedItem.link} الرابط الحالي`
                : `Current link : ${selectedItem.link}`}
            </Form.Text>
          </Form.Group>
        </Form>
      </CustomModal>

      <CustomModal
        show={DeleteModalshow}
        handleClose={handleDeleteModalClose}
        header={`Update ${selectedItem.type}`}
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
            ? `${selectedItem.type} هل انت متاكد من انك تريد حذف`
            : `Are you sure you want to delete ${selectedItem.type}?`}
        </Form.Text>
      </CustomModal>
    </>
  );
};

export default OrderableList;
