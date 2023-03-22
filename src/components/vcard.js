import VCard from "vcard-creator";
import FileSaver from "file-saver";
import axios from "axios";

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

const Create_Vcard = async (data, username, user_img) => {
  
  const myVCard = new VCard();

  const image = await axios.get(user_img, { responseType: "arraybuffer" });

  const imagebase64 = Buffer.from(image.data).toString("base64");

  //name
  const n = username.name.split(" ");
  const first_name = n[0];
  const last_name = n[1];
  //URLS
  const address = property(data, "Address").value; //
  const app_link = property(data, "App Link").value; //
  const apple_music = property(data, "Apple Music").value; //
  const cash_app = property(data, "Cash App").value; //
  const club_house = property(data, "Clubhouse").value; //
  const contact_card = property(data, "Contact Card").value; //
  const custom_link = property(data, "Custom link").value; //
  const discord = property(data, "Discord").value; //
  const mail = property(data, "Email").value; //
  const embedded_video = property(data, "Embedded Video").value; //
  const expanable_text = property(data, "Expandable Text").value; //
  const face_time = property(data, "FaceTime").value; //
  const facebook = property(data, "Facebook").value; //
  const file = property(data, "File").value; //
  const header_text = property(data, "Header Text").value; //
  const instagram = property(data, "Instagram").value; //
  const link_tree = property(data, "Link Tree").value; //
  const linkedin = property(data, "LinkedIn").value; //
  const number = property(data, "Number").value; //
  const only_fans = property(data, "OnlyFans").value; //
  const open_sea = property(data, "OpenSea").value; //
  const paypal = property(data, "PayPal").value; //
  const pinterest = property(data, "Pinterest").value; //
  const podcasts = property(data, "Podcasts").value; //
  const push_mark = property(data, "Poshmark").value; //
  const reviews = property(data, "Reviews").value; //
  const snapchat = property(data, "Snapchat").value; //
  const soundcloud = property(data, "SoundCloud").value; //
  const spotify = property(data, "Spotify").value; //
  const telegram = property(data, "Telegram").value; //
  const tiktok = property(data, "TikTok").value; //
  const twitch = property(data, "Twitch").value; //
  const twitter = property(data, "Twitter").value; //
  const venmo = property(data, "Venmo").value; //
  const wechat = property(data, "WeChat").value; //
  const website = property(data, "Website").value; //
  const whatsapp = property(data, "WhatsApp").value; //
  const youtube = property(data, "YouTube").value; //
  const zelle = property(data, "Zelle").value; //
  const zillow = property(data, "Zillow").value; //
  const hoobe = property(data, "hoobe").value; //

  console.log(last_name, first_name);
  myVCard
    .addName(last_name, first_name)
    .addAddress(address)
    .addPhoneNumber(number)
    .addCompany(username.company)
    .addJobtitle(username.jobTitle)
    .addPhoto(imagebase64)
    .addEmail(mail)
    .addURL(app_link)
    .addURL(apple_music)
    .addURL(cash_app)
    .addURL(club_house)
    .addURL(contact_card)
    .addURL(custom_link)
    .addURL(discord)
    .addURL(embedded_video)
    .addURL(expanable_text)
    .addURL(face_time)
    .addURL(facebook)
    .addURL(file)
    .addURL(header_text)
    .addURL(instagram)
    .addURL(link_tree)
    .addURL(linkedin)
    .addURL(only_fans)
    .addURL(open_sea)
    .addURL(paypal)
    .addURL(pinterest)
    .addURL(podcasts)
    .addURL(push_mark)
    .addURL(reviews)
    .addURL(snapchat)
    .addURL(soundcloud)
    .addURL(spotify)
    .addURL(`https://t.me/${telegram}`)
    .addURL(tiktok)
    .addURL(twitch)
    .addURL(twitter)
    .addURL(venmo)
    .addURL(wechat)
    .addURL(website)
    .addURL(`https://wa.me/${whatsapp}`)
    .addURL(youtube)
    .addURL(zelle)
    .addURL(zillow)
    .addURL(hoobe);

  //   save the vcard
  var blob = new Blob([myVCard.toString()], {
    type: "text/x-vCard;charset=UTF-8",
  });
  FileSaver.saveAs(blob, `${username.name}.vcf`);
};

export default Create_Vcard;
