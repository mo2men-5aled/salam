import { Container, Row, Image, Button } from "react-bootstrap";

import UnAuthorized from "../assets/3832382-ai.png";

const NotAuthorized = () => {
  return (
    <div style={{ backgroundColor: "#ededed" }}>
      <Container>
        <Row
          style={{ minHeight: "100vh" }}
          className="justify-content-center align-items-center"
        >
          <div className="text-center">
            <Image
              style={{ width: "30rem" }}
              src={UnAuthorized}
              alt="not found"
            />
            <div className="text-center p-3">
              <h1>Sorry, We couldn't load this page please login first</h1>
            </div>

            <div className="m-2">
              <Button href="/user/login" variant="dark" className="m-1">
                login
              </Button>
              <div>or</div>
              <Button href="/" variant="dark" className="m-1">
                Back to Home ..?
              </Button>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default NotAuthorized;