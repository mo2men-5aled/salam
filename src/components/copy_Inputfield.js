import { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

const CopyInput = ({ link }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleInputClick = () => {
    const inputField = document.createElement("textarea");
    inputField.value = link;
    document.body.appendChild(inputField);
    inputField.select();
    document.execCommand("copy");
    document.body.removeChild(inputField);
    setIsCopied(true);
  };

  return (
    <InputGroup>
      <FormControl type="text" disabled value={link} />

      <Button
        variant={isCopied ? "success" : "outline-secondary"}
        id="button-addon2"
        onClick={handleInputClick}
      >
        {isCopied ? "Copied!" : <i className="fas fa-copy"></i>}
      </Button>
    </InputGroup>
  );
};

export default CopyInput;
