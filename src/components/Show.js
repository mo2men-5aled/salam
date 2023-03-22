import React, { Component } from "react";
import firebase from "../Firebase";

import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import Colors from "./Colors";
import UserImage from "./User_image";

import Icons from "./Icons";

import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MetaDeco from "./metaDeco";
import BgImage from "./bg_image";

function property(object, prop) {
  //asdasd
  return {
    get value() {
      return object[prop];
    },
    set value(val) {
      object[prop] = val;
    },
  };
}

function Get_bg_Color(Color) {
  if (Color) {
    return property(
      Object.values(Colors).find((theme) => theme[Color]),
      Color
    ).value.bg;
  } else {
    return null;
  }
}

class Show extends Component {
  //
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      link: {},
      key: "",
    };
  }

  componentDidMount() {
    const ref = firebase // User_ID
      .firestore()
      .collection("users")
      .doc(this.props.match.params.id);

    const ref1 = firebase // User Links
      .firestore()
      .collection("links")
      .doc(this.props.match.params.id);

    ref.get().then((doc) => {
      //doc ----> User's Data & Colour
      if (doc.exists) {
        this.setState({
          user: doc.data(),
          key: doc.id,
          isLoading: false,
        });
      } else {
        this.setState({ redirect: true }); // Redirect to NOData
      }
    });

    ref1.get().then((doc) => {
      //-----> User's Links
      if (doc.exists) {
        this.setState({
          link: doc.data(),
          key: doc.id,
          isLoading: false,
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  render() {
    // Color of Icons
    const Color = this.state.user.color;

    if (this.state.redirect) {
      return <Redirect to="/NoData" />;
    }
    return (
      // Profile_Image
      <>
        <MetaDeco
          bgcolor={Get_bg_Color(Color)}
          language={this.state.user.language}
        />

        <div>
          <BgImage User={this.state.user} />
          <UserImage
            User={this.state.user}
            classname="profile_image"
            profile="true"
          />
          {/* other segment */}

          <div className="container text-center">
            {/* Profile Bio */}
            <h3>{this.state.user.name}</h3>
            <p>{this.state.user.jobTitle}</p>
            <h5>{this.state.user.company}</h5>
            <h5 style={{ fontFamily: "'Quicksand', sans-serif" }}>
              {this.state.user.bio}
            </h5>

            <Icons
              language={this.state.user.language}
              link={this.state.link}
              color={Color}
              User_ID={this.props.match.params.id}
              User={this.state.user}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Show;
