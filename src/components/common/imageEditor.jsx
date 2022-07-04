import React, { Component } from "react";
import Resizer from "react-image-file-resizer";
import "react-image-crop/dist/ReactCrop.css";

import { toast } from "react-toastify";
import logo from "../../images/logo192.png";

import Button from "./button";
import { isEmpty } from "../../utility/isEmpty";

class ImageEditor extends Component {
  state = {
    image_file: {},
    image_format: "",
    base64TextString: "",
    image_width: 0,
    image_height: 0,
    resizeImage: false,
    crop: {
      unit: "%",
      width: 30,
      aspect: 4 / 3,
    },
  };

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (prevProps.clearForm !== this.props.clearForm) this.handleClearForm();
  }

  onFileChange(e) {
    const file = e.target.files[0];

    if (file) {
      const image_format = file.name.split(".").pop();
      this.setState({ image_format });
      this.setState({ image_file: file });

      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readEvt) {
    let binaryString = readEvt.target.result;
    const base64String = btoa(binaryString);

    const format = this.state.image_format;
    const pic = document.getElementById("picture");

    pic.src = "data:image/" + format + ";base64," + base64String;
    pic.width = 300;

    this.setState({
      base64TextString: base64String,
    });
  }

  onImgLoad = ({ target: img }) => {
    this.setState({
      image_height: img.naturalHeight,
      image_width: img.naturalWidth,
    });
  };

  resizeFile = (file, width, height) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        width,
        height,
        "JPG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  handleClearForm = () => {
    toast.dismiss();
    this.setState({
      image_file: {},
      base64TextString: "",
      image_format: "",
      image_height: 0,
      image_width: 0,
    });

    var obj = document.getElementById("imageChooser");
    obj.value = null;
    var pic = document.getElementById("picture");
    pic.src = logo;
  };

  handleAdd = async () => {
    const { image_file, image_format, image_width, image_height } = this.state;

    const bool = isEmpty(image_file);
    console.info(bool);
    if (bool) {
      toast.error("You must select an image!");
      return;
    }
    let file = {};
    let width = image_width;
    let height = image_height;
    let format = image_format;

    if (image_file.size > 2097152) {
      width = image_width * 0.5;
      height = image_height * 0.5;
      file = await this.resizeFile(image_file, width, height);
      format = "JPG";
    } else file = image_file;

    this.props.onImageAdd(file, format, width, height);
    this.handleClearForm();
  };

  render() {
    return (
      <div>
        <div style={{ marginTop: "10px", width: "300px" }}>
          <img
            src={logo}
            alt=""
            id="picture"
            className="Photo"
            onLoad={this.onImgLoad}
          />
          <div>Click Choose File to select an image.</div>
          <input
            type="file"
            name="btnBrowse"
            id="imageChooser"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => this.onFileChange(e)}
          ></input>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "20px",
              paddingRight: "10px",
            }}
          >
            <div>
              <Button
                title={this.props.submitButtonName}
                icon={this.props.submitButtonIcon}
                className="Button Primary"
                onPress={() => this.handleAdd()}
              />
              <Button
                title="CLEAR"
                icon="ban"
                className="Button Primary"
                onPress={() => this.handleClearForm()}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageEditor;
