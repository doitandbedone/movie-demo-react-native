import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {Component} from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, Text} from 'react-native';
import Movie from '../Movie';

export type MovieDetailsProps = {
  movie: Movie;
};

type Props = NativeStackScreenProps<MovieDetailsProps>;
export default class MovieDetails extends Component<Props> {
  render() {
    return (
      <SafeAreaView style={Styles.container}>
        <ImageBackground
          resizeMode="cover"
          source={{uri: this.props.route.params.movie.imageUrl}}
          style={Styles.image}></ImageBackground>
        <Text>{this.props.route.params.movie.title}</Text>
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
