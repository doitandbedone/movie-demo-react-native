import React, {Component} from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, Text} from 'react-native';
import Movie from '../Movie';

export type MovieDetailsProps = {
  movie: Movie;
};

export default class MovieDetails extends Component<MovieDetailsProps> {
  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <ImageBackground
          resizeMode="cover"
          source={{uri: this.props.movie.imageUrl}}
          style={Styles.image}></ImageBackground>
        <Text>{this.props.movie.title}</Text>
      </SafeAreaView>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
  },
  image: {
    flex: 1,
    width: 200,
    height: 300,
  },
});
