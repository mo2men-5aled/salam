function Check_HTTP(icon, link) {
  if (link) {
    if (link.includes("https://")) {
      return link;
    } else if (
      icon === "Call" ||
      icon === "Number" ||
      icon === "Email" ||
      icon === "Address" ||
      icon === "Header Text" ||
      icon === "WhatsApp" ||
      icon === "Telegram"
    ) {
      return link;
    } else {
      return "https://" + link;
    }
  } else {
    return null;
  }
}

export default Check_HTTP;
