import React from "react";

class LanguageStorage extends React.Component {
  componentDidMount() {
    if(["nl","fr","en"].includes(this.props.language)){
      localStorage.setItem('_language', this.props.language)
    }
  }

  render() {
    return "";
  }
}

export default LanguageStorage;
