import VCard from "vcard-creator";
import FileSaver from "file-saver";
import axios from "axios";
import { Buffer } from "buffer";

function property(object, prop) {
  return {
    get value() {
      return object[prop];
    },
    set value(val) {
      object[prop] = val;
    },
  };
}

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
    // .addAddress(address)
    // .addPhoneNumber(number)
    .addCompany(user.company)
    .addJobtitle(user.jobTitle);

  // .addEmail(mail);

  links.map((link) => {
    myVCard.addURL(link.link);
  });

  //   save the vcard
  var blob = new Blob([myVCard.toString()], {
    type: "text/x-vCard;charset=UTF-8",
  });

  FileSaver.saveAs(blob, `${user.name}.vcf`);
};

export default Create_Vcard;
