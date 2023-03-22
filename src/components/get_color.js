function Get_Color(color, Colors, property) {
  if (color) {
    return property(
      Object.values(Colors).find((theme) => theme[color]),
      color
    );
  }
}

export default Get_Color;
