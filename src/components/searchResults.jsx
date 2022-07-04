import React, { Component } from "react";

import ImageViewer from "./common/imageViewer";
import { getImages } from "../services/recipeImagesService";
import PaginationPanel from "./common/pagination";

class SearchResultsPage extends Component {
  state = {
    keywords: "none",
    images: [],
    currentPage: 0,
    pageSize: 12,
    totalPages: 0,
    totalImages: 0,
  };

  async componentDidMount() {
    await this.loadImages();

    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.keywords !== this.props.match.params.keywords) {
      this.setState({ currentPage: 0 }, async () => await this.loadImages());
    }
  }

  async loadImages() {
    const { currentPage, pageSize } = this.state;
    const keywords = this.props.match.params.keywords;
    const offset = currentPage * pageSize;
    const searchResults = await getImages(keywords, offset, pageSize);
    const pagecount = Math.ceil(searchResults.totalItems / pageSize);
    this.setState({
      images: searchResults.images,
      totalImages: searchResults.totalItems,
      totalPages: pagecount,
    });
  }

  handleRecipeSelect = (recipe) => {
    this.props.history.push({ pathname: `/meal/view/${recipe.id}` });
  };

  handleFirst = () => {
    const { currentPage } = this.state;
    if (currentPage > 0) {
      this.setState({ currentPage: 0 }, async () => await this.loadImages());
    }
  };

  handlePrevious = () => {
    const { currentPage } = this.state;
    if (currentPage > 0) {
      const page = currentPage - 1;
      this.setState({ currentPage: page }, async () => await this.loadImages());
    }
  };

  handleNext = () => {
    const { currentPage, totalPages } = this.state;
    if (currentPage < totalPages - 1) {
      const page = currentPage + 1;
      console.log("Next: ", currentPage, page);
      this.setState({ currentPage: page }, async () => await this.loadImages());
    }
  };
  handleLast = () => {
    const { totalPages } = this.state;
    this.setState(
      { currentPage: totalPages - 1 },
      async () => await this.loadImages()
    );
  };

  render() {
    const { images, currentPage, totalImages, totalPages } = this.state;

    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginLeft: "7px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <ImageViewer
              images={images}
              onRecipeSelect={this.handleRecipeSelect}
              totalImages={totalImages}
              showheader={true}
              numColumns={3}
              width={980}
              padding={7}
            />
            <div style={{ marginTop: "30px", paddingRight: "15px" }}>
              {totalPages > 1 && (
                <PaginationPanel
                  onFirst={this.handleFirst}
                  onPrevious={this.handlePrevious}
                  onNext={this.handleNext}
                  onLast={this.handleLast}
                  totalPages={totalPages}
                  currentPage={currentPage + 1}
                />
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchResultsPage;
