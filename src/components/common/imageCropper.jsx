import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";

import logo from "../../images/logo192.png";
import Button from "./button";
import { isEmpty } from "../../utility/isEmpty";

export default class ImageCropper extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: "%",
      aspect: 4 / 3,
      width: 50,
    },
    croppedImageUrl: "",
    image_width: 0,
    image_height: 0,
    image_format: "jpg",
    blob: "",
  };

  handleAdd = async () => {
    const { blob, image_format, image_width, image_height } = this.state;
    console.info("data...", blob, image_width);
    const bool = isEmpty(blob);
    if (bool) {
      toast.error("You must select an image!");
      return;
    }
    let file = blob;
    let width = image_width;
    let height = image_height;
    let format = image_format;

    if (blob.size > 2097152) {
      width = image_width * 0.75;
      height = image_height * 0.75;
      file = await this.resizeFile(blob, width, height);
      format = "JPG";
    }

    this.props.onImageAdd(file, format, width, height);
    this.handleClearForm();
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
      blob: {},
      base64TextString: "",
      image_format: "",
      image_height: 0,
      image_width: 0,
    });

    this.setState({ src: null });
    var obj = document.getElementById("imageChooser");
    obj.value = null;
    var pic = document.getElementById("cropped");
    pic.src = logo;
    pic.width = "280";
    pic.height = "210";
  };

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
    this.setState({ image_width: crop.width, image_height: crop.height });

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error("Canvas is empty");
            return;
          }
          blob.name = fileName;
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          this.setState({ blob });
          resolve(this.fileUrl);
        },
        "image/jpeg",
        1
      );
    });
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return (
      <div>
        <ul>
          <li>1. Click 'Choose file' to select image.</li>
          <li>2. Use the mouse to crop the image.</li>
          <li>3. Click 'Add' to add to 'Photo List'.</li>
          <li>4. Click 'Done' when finished adding images</li>
        </ul>
        <div>
          <input
            id="imageChooser"
            type="file"
            accept="image/*"
            onChange={this.onSelectFile}
          />
        </div>
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {croppedImageUrl.length > 0 ? (
          <img
            id="cropped"
            alt="Crop"
            style={{ maxWidth: "100%" }}
            src={croppedImageUrl}
          />
        ) : src === null ? (
          <img
            id="cropped"
            alt="Crop"
            style={{ marginLeft: "5px", width: "280px", height: "210px" }}
            src={logo}
          />
        ) : null}
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
    );
  }
}
