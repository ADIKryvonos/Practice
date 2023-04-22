import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    searchName: '',
    pictures: [],
    page: 1,
    error: null,
    showBtn: false,
    empty: false,
  };

  onSubmit = searchName => {
    this.setState({
      searchName: searchName,
      pictures: [],
      page: 1,
      error: null,
      empty: false,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.page !== this.state.page
    ) {
      this.getPictures(this.state.searchName, this.state.page);
    }
  }

  getPictures = async (value, page) => {
    try {
      const {
        photos,
        page: newPage,
        per_page,
        total_results,
      } = await ImageService.getImages(value, page);
      if (photos.length === 0) {
        this.setState({ empty: true });
      }
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...photos],
        showBtn: newPage < Math.ceil(total_results / per_page),
      }));
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { pictures, error, showBtn, empty, searchName } = this.state;
    console.log(error);
    return (
      <>
        <SearchForm searchName={this.onSubmit} />
        <Grid>
          {pictures.map(({ id, avg_color, alt, src }) => {
            return (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={src.large} alt={alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        {showBtn && <Button onClick={this.loadMore}>Добавити ще</Button>}

        {error && (
          <Text textAlign="center">Sorry. There are {error} ... 😭</Text>
        )}
        {empty && (
          <Text textAlign="center">
            Sorry. There are not photos in {searchName} ... 😭
          </Text>
        )}
      </>
    );
  }
}
