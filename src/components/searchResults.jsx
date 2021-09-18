import React, { Component } from "react";
import ImageViewer from "./common/imageViewer";
import { getImages } from "../services/recipeImagesService";

class SearchResultsPage extends Component {
  state = {
    keywords: "none",
    images: [],
  };

  async componentDidMount() {
    await this.loadImages();

    window.scrollTo(0, 0);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.match.params.keywords !== this.props.match.params.keywords) {
      await this.loadImages();
    }
  }

  async loadImages() {
    const keywords = this.props.match.params.keywords;
    const images = await getImages(keywords, 0, 200);
    this.setState({ images });
  }

  handleRecipeSelect = (recipe) => {
    this.props.history.push({ pathname: `/meal/view/${recipe.id}` });
  };

  render() {
    const { images } = this.state;

    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <ImageViewer
            images={images}
            onRecipeSelect={this.handleRecipeSelect}
            showheader={true}
            numColumns={3}
            width={980}
            padding={7}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default SearchResultsPage;
