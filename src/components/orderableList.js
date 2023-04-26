import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, Button, Row, Col, Form, ButtonGroup } from "react-bootstrap";
import return_Links from "./links";
import property from "./Get_property_func";
import { db } from "../Firebase";
import { useParams } from "react-router-dom";
import Icon_Codes from "./Icon_Links";

import Check_HTTP from "./Check_Http";
import CustomModal from "../modals/modal";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function List({ triggerAction, setTriggerAction }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id } = useParams();

  const [links, setLink] = useState("");
  const [icons, setIcons] = useState([]);

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

    const ref1 = doc(db, "titles", id);
    getDoc(ref1)
      .then((icon) => {
        setIcons(icon.data().list);
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [setTriggerAction, triggerAction, id]);

  const handleUpdateItem = useCallback(
    (item, FieldVal) => {
      const ref = doc(db, "links", id);
      updateDoc(ref, {
        [item]: FieldVal,
      });
      setTriggerAction(true);
    },
    [id, setTriggerAction]
  );
  const handleDeleteItem = useCallback(
    (item) => {
      const ref = doc(db, "links", id);
      updateDoc(ref, {
        [item]: "",
      });
      setTriggerAction(true);
    },
    [id, setTriggerAction]
  );

  const handleDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;

      const itemsCopy = Array.from(icons);
      const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
      itemsCopy.splice(result.destination.index, 0, reorderedItem);

      setIcons(itemsCopy);

      // post the new arrangement to the firebase
      const ref = doc(db, "titles", id);
      updateDoc(ref, {
        list: itemsCopy,
      });

      setTriggerAction(true);
    },
    [id, icons, setTriggerAction]
  );
  const [FormUpdateField, setFormUpdateField] = useState("");

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="items">
        {(provided) => (
          <div
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
                        <Card.Header>
                          <div className="d-flex ">{item}</div>
                        </Card.Header>
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
                              <div>
                                <span>{property(links, item).value}</span>
                              </div>

                              <div className="d-flex justify-content-end">
                                <div className="ms-auto">
                                  <div className="d-flex justify-content-end">
                                    <ButtonGroup>
                                      <CustomModal
                                        show={show}
                                        handleClose={handleClose}
                                        handleShow={handleShow}
                                        header={`Update ${item}`}
                                        ButtonIcon={
                                          <i className="fa-solid fa-edit text-muted"></i>
                                        }
                                        FooterChildren={
                                          <>
                                            <Button
                                              variant="danger"
                                              onClick={() => {
                                                handleDeleteItem(item);
                                                handleClose();
                                              }}
                                            >
                                              Delete
                                            </Button>
                                            <Button
                                              variant="dark"
                                              onClick={() => {
                                                handleUpdateItem(
                                                  item,
                                                  FormUpdateField
                                                );
                                              }}
                                            >
                                              Update
                                            </Button>
                                          </>
                                        }
                                      >
                                        <Form>
                                          <Form.Group className="mb-3">
                                            <Form.Label>
                                              Update Field
                                            </Form.Label>
                                            <Form.Control
                                              autoFocus
                                              type="text"
                                              placeholder="
                                          Enter new link"
                                              onChange={(e) =>
                                                setFormUpdateField(
                                                  e.target.value
                                                )
                                              }
                                            />
                                            <Form.Text className="text-muted">
                                              Current:{" "}
                                              {property(links, item).value}
                                            </Form.Text>
                                          </Form.Group>
                                        </Form>
                                      </CustomModal>

                                      <Button variant="link">
                                        <i
                                          className="fa-solid fa-share-from-square"
                                          href={Check_HTTP(
                                            item,
                                            return_Links(
                                              item,
                                              property(links, item).value
                                            )
                                          )}
                                          _target="blank"
                                        ></i>
                                      </Button>
                                    </ButtonGroup>
                                  </div>
                                </div>
                              </div>
                            </Card.Body>
                          </Col>
                        </Row>
                      </Card>
                    )}
                  </Draggable>
                );
              } else {
                return null;
              }
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default List;
