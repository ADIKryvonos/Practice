import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    searchName: '',
    pictures: [],
    page: 1,
  };

  onSubmit = searchName => {
    this.setState({ searchName: searchName });
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
      const { photos } = await ImageService.getImages(value, page);
      this.setState({ pictures: photos });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { pictures } = this.state;
    console.log(this.state.searchName);
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
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
