import React from "react";

class LanguageStorage extends React.Component {
  componentDidMount() {
    localStorage.setItem('_language', this.props.language)
  }

  render() {
    return "";
  }
}

export default LanguageStorage;
