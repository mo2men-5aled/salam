import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import return_Links from "./links";
import property from "./Get_property_func";
import firebase from "../Firebase";
import { useParams } from "react-router-dom";
import Icon_Codes from "./Icon_Links";

import CustomModal from "../modals/modal";

function Check_HTTP(icon, link) {
  if (link) {
    if (link.includes("https://")) {
      return link;
    } else if (icon === "Call" || icon === "Number") {
      return link;
    } else {
      return "https://" + link;
    }
  } else {
    return null;
  }
}

function List() {
  //modal state
  const [modalShow, setModalShow] = React.useState(false);

  //modal handlers
  const handleShow = () => setModalShow(true);
  const handleClose = () => setModalShow(false);

  const { id } = useParams();

  const [links, setLink] = useState("");
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("links")
      .doc(`${id}`)
      .get()
      .then((link) => {
        if (link.exists) {
          setLink(link.data());
        }
      });

    firebase
      .firestore()
      .collection("titles")
      .doc(`${id}`)
      .get()
      .then((icon) => {
        setIcons(icon.data().list);
      });
  }, []);

  function handleUpdateItem(item, FieldVal) {
    firebase
      .firestore()
      .collection("links")
      .doc(`${id}`)
      .update({
        [item]: FieldVal,
      });
  }

  const handleDeleteItem = () => {
    console.log("delete");
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const itemsCopy = Array.from(icons);
    const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
    itemsCopy.splice(result.destination.index, 0, reorderedItem);

    setIcons(itemsCopy);

    // post the new arrangement to the firebase
    firebase.firestore().collection("titles").doc(`${id}`).update({
      list: itemsCopy,
    });
  };

  const [FormUpdateField, setFormUpdateField] = useState("");

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="items">
        {(provided) => (
          <ul
            className="list-unstyled"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {icons.map((item, index) => {
              if (property(links, item).value !== "") {
                return (
                  <Draggable
                    key={item}
                    draggableId={item.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="mb-3"
                      >
                        <Card.Header>{item}</Card.Header>
                        <Row className="align-items-center">
                          <Col xs={2} sm={2} md={1} lg={1}>
                            <div className="p-2">
                              <img
                                alt="icon"
                                className="rounded"
                                style={{
                                  width: "5rem",
                                  height: "5rem",
                                }}
                                src={
                                  Object.values(
                                    Icon_Codes.find((x) => x[item])
                                  )[0]
                                }
                              />
                            </div>
                          </Col>

                          <Col xs={10} sm={10} md={11} lg={11}>
                            <Card.Body>
                              <div className="d-flex">
                                <div className="me-auto">
                                  <Card.Title
                                    style={{
                                      wordWrap: "break-word",
                                      overflowWrap: "break-word",
                                      hyphens: "auto",
                                    }}
                                  >
                                    {property(links, item).value}
                                  </Card.Title>
                                </div>
                                <div className="ms-auto">
                                  <CustomModal header={item}>
                                    <Form>
                                      <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlInput1"
                                      >
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                          autoFocus
                                          type="text"
                                          placeholder="
                                          Enter new link"
                                          onChange={(e) =>
                                            setFormUpdateField(e.target.value)
                                          }
                                        />
                                        <Form.Text className="text-muted">
                                          Current: {property(links, item).value}
                                        </Form.Text>
                                      </Form.Group>
                                      <Button
                                        variant="dark"
                                        onClick={() => {
                                          handleUpdateItem(
                                            item,
                                            FormUpdateField
                                          );
                                          handleClose();
                                        }}
                                        style={{
                                          width: "100%",
                                        }}
                                      >
                                        Save Changes
                                      </Button>
                                    </Form>
                                  </CustomModal>
                                  <Button
                                    variant="danger"
                                    onClick={() => handleDeleteItem(index)}
                                  >
                                    Delete
                                  </Button>

                                  <Button variant="link">
                                    <i
                                      className="fa-solid fa-share-from-square text-muted"
                                      href={Check_HTTP(
                                        item,
                                        return_Links(
                                          item,
                                          property(links, item).value
                                        )
                                      )}
                                    ></i>
                                  </Button>
                                </div>
                              </div>
                            </Card.Body>
                          </Col>
                        </Row>
                      </Card>
                    )}
                  </Draggable>
                );
              }
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default List;
