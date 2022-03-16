import React from 'react';
import {ImageBackground, Pressable, StyleSheet, View} from 'react-native';
import ICarouselItem from './ICarouselItem';
import Movie from './Movie';

export interface OnItemClicked {
  (movie: Movie): void;
}

export default class MovieCarouselItem implements ICarouselItem {
  movie: Movie;
  key: string;
  callback: OnItemClicked;

  constructor(movie: Movie, callback: OnItemClicked) {
    this.movie = movie;
    this.key = movie.id.toString();
    this.callback = callback;
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      margin: 10,
    },
    image: {
      flex: 1,
      width: 200,
      height: 300,
    },
    text: {
      color: 'white',
      fontSize: 18,
      textAlign: 'center',
      marginTop: 'auto',
    },
  });

  getItemView(): JSX.Element {
    return (
      <Pressable
        style={this.styles.container}
        onPress={() => {
          this.callback(this.movie);
          return true;
        }}>
        <ImageBackground
          resizeMode="cover"
          source={{uri: this.movie.imageUrl}}
          style={this.styles.image}></ImageBackground>
      </Pressable>
    );
  }
}
