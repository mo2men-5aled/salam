import Colors from "./Colors";
import property from "./Get_property_func";
function Get_Color(color) {
  if (color) {
    return property(
      Object.values(Colors).find((theme) => theme[color]),
      color
    ).value.background;
  }
}

export default Get_Color;
