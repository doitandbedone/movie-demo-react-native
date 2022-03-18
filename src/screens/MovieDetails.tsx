import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {Component} from 'react';
import {LogBox} from 'react-native';
import {
  ActivityIndicator,
  Button,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {StackParams} from '../App';
import Separator from '../components/Separator';
import Movie from '../Movie';
import {getVideos, VideoItem} from '../MovieCatalog';

export type MovieDetailsProps = {
  movie: Movie;
};

type Props = NativeStackScreenProps<StackParams, 'Movie Details'>;

type State = {
  isLoading: boolean;
  videos: VideoItem[];
};
export default class MovieDetails extends Component<Props> {
  state: State = {
    isLoading: true,
    videos: [],
  };
  movie: Movie = this.props.route.params.movie;
  render() {
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
    ]);
    return this.state.isLoading ? (
      <ActivityIndicator style={{flex: 1, alignContent: 'center'}} />
    ) : (
      <SafeAreaView style={Styles.container}>
        <ScrollView>
          <Text style={Styles.title}>
            {this.movie.title} (
            {this.movie.releaseDate.getFullYear().toString()})
          </Text>
          <View style={Styles.row}>
            <View style={Styles.column}>
              <ImageBackground
                resizeMode="cover"
                source={{uri: this.movie.imageUrl}}
                style={Styles.image}
              />
            </View>
            <View style={Styles.column}>
              <Text>{this.movie.description}</Text>
            </View>
          </View>
          <Separator />
          <View style={Styles.row}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Trailers</Text>
            {this.state.videos
              .filter(v => v.type == 'Trailer')
              .sort((videoA, videoB) => {
                if (videoA.name > videoB.name) {
                  return 1;
                } else if (videoA.name < videoB.name) {
                  return -1;
                }
                return 0;
              })
              .map(video => (
                <TouchableOpacity
                  key={video.id}
                  style={Styles.button}
                  onPress={() => {
                    this.props.navigation.navigate('YouTube Player', {
                      videoId: video.key,
                    });
                  }}>
                  <Text>
                    {video.official ? `${video.name}` : `${video.name}`}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  async getVideos() {
    const result = await getVideos(this.movie.id.toString());
    this.setState({videos: result});
    this.setState({isLoading: false});
  }

  componentDidMount() {
    this.getVideos();
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  image: {
    width: 170,
    height: 255,
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
  },
  button: {
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#1e90ff',
    borderColor: '#000',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
    width: '90%',
  },
});
