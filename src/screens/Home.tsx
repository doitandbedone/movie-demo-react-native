import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {Component} from 'react';
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

export default class Home extends Component {
  state: State = {
    isLoading: true,
    movieMap: new Map<string, ICarouselItem[]>(),
  };
  //navigator?: NativeStackNavigationProp<StackParams, "MovieDetails"> = undefined;

  constructor(props: any) {
    super(props);
  }

  OnItemClicked: OnItemClicked = (movie: Movie) => {
    const navigator =
      useNavigation<NativeStackNavigationProp<StackParams, 'MovieDetails'>>();
    navigator?.navigate('MovieDetails', {movie: movie});
  };

  async getMovies() {
    try {
      const popularMovies = await getPopularMovies();
      const topMovies = await getTopRatedMovies();
      const nowPlayingMovies = await getNowPlayingMovies();
      console.log(`Movies loaded.`);
      const movieDictionary = new Map<string, ICarouselItem[]>();
      movieDictionary.set(
        'Popular',
        popularMovies.map(
          movie => new MovieCarouselItem(movie, this.OnItemClicked),
        ),
      );
      movieDictionary.set(
        'Top Rated',
        topMovies.map(m => new MovieCarouselItem(m, this.OnItemClicked)),
      );
      movieDictionary.set(
        'Now Playing',
        nowPlayingMovies.map(m => new MovieCarouselItem(m, this.OnItemClicked)),
      );
      this.setState({movieMap: movieDictionary});
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({isLoading: false});
    }
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    return (
      <SafeAreaView style={Styles.container}>
        {this.state.isLoading ? (
          <ActivityIndicator />
        ) : (
          <CarouselPage source={this.state.movieMap} />
        )}
      </SafeAreaView>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
