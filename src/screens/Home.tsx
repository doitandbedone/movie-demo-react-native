import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {Component, useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackParams} from '../App';
import ICarouselItem from '../ICarouselItem';
import Movie from '../Movie';
import MovieCarouselItem, {OnItemClicked} from '../MovieCarouselItem';
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
} from '../MovieCatalog';
import CarouselPage from './CarouselPage';

type State = {
  isLoading: boolean;
  movieMap: Map<string, ICarouselItem[]>;
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movieMap, setMovieMap] = useState(new Map<string, ICarouselItem[]>());

  const navigator =
    useNavigation<NativeStackNavigationProp<StackParams, 'MovieDetails'>>();

  const OnItemClicked: OnItemClicked = (movie: Movie) => {
    navigator?.navigate('MovieDetails', {movie: movie});
  };

  const getMovies = async () => {
    try {
      const popularMovies = await getPopularMovies();
      const topMovies = await getTopRatedMovies();
      const nowPlayingMovies = await getNowPlayingMovies();
      console.log(`Movies loaded.`);
      const movieDictionary = new Map<string, ICarouselItem[]>();
      movieDictionary.set(
        'Popular',
        popularMovies.map(movie => new MovieCarouselItem(movie, OnItemClicked)),
      );
      movieDictionary.set(
        'Top Rated',
        topMovies.map(m => new MovieCarouselItem(m, OnItemClicked)),
      );
      movieDictionary.set(
        'Now Playing',
        nowPlayingMovies.map(m => new MovieCarouselItem(m, OnItemClicked)),
      );
      setMovieMap(movieDictionary);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  });

  return (
    <SafeAreaView style={Styles.container}>
      {isLoading ? <ActivityIndicator /> : <CarouselPage source={movieMap} />}
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
