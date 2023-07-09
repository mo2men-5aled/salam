import VCard from "vcard-creator";
import FileSaver from "file-saver";
import axios from "axios";
import { Buffer } from "buffer";

const Create_Vcard = async (links, user) => {
  const myVCard = new VCard();

  const image = await axios.get(user.image, { responseType: "arraybuffer" });
  if (image) {
    const imagebase64 = Buffer.from(image.data).toString("base64");
    myVCard.addPhoto(imagebase64);
  }

  //name
  const name = user.name;
  const n = name.split(" ");
  const first_name = n[0];
  const last_name = n[1];

  myVCard
    .addName(last_name, first_name)
    .addCompany(user.company)
    .addJobtitle(user.jobTitle);

  links.forEach((link) => {
    if (link.type === "Email") {
      myVCard.addEmail(link.link);
    } else if (link.type === "Call") {
      myVCard.addPhoneNumber(link.link);
    } else if (link.type === "Address") {
      myVCard.addAddress(link.link);
    } else {
      myVCard.addURL(link.link);
    }
  });

  //   save the vcard
  var blob = new Blob([myVCard.toString()], {
    type: "text/x-vCard;charset=UTF-8",
  });

  FileSaver.saveAs(blob, `${user.name}.vcf`);
};

export default Create_Vcard;
