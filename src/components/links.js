function return_Links(icon, link) {
  if (icon === "WhatsApp" && link) {
    return `https://wa.me/${link}`;
  } else if (icon === "Call" && link) {
    return `tel:${link}`;
  } else if (icon === "Number" && link) {
    return `tel:${link}`;
  } else if (icon === "Email" && link) {
    return `mailto:${link}`;
  } else if (icon === "Telegram" && link) {
    return `https://t.me/${link}`;
  } else {
    return link;
  }
}

export default return_Links;
