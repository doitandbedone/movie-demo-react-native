import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import YoutubePlayer, {YoutubeIframeRef} from 'react-native-youtube-iframe';
import {StackParams} from '../App';
import * as config from '../../config';
import {Alert, BackHandler} from 'react-native';

const secrets = config.secrets;

export type YouTubePlayerProps = {
  videoId: string;
};

type Props = NativeStackScreenProps<StackParams, 'YouTube Player'>;

const YouTubePlayer = (props: Props) => {
  const playerRef = useRef<YoutubeIframeRef>(null);
  const [playing, setPlaying] = useState(true);
  const videoProps: YouTubePlayerProps = props.route.params;

  const onStateChange = useCallback(state => {
    switch (state) {
      case 'ended':
        setPlaying(false);
        Alert.alert('video has finished playing!');
        break;
      case 'ready':
        break;
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);

  function onBackPressed() {
    togglePlaying();
    props.navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPressed);
    return () => {
      BackHandler.addEventListener('hardwareBackPress', onBackPressed);
    };
  });

  return (
    <YoutubePlayer
      ref={playerRef}
      play={playing}
      videoId={videoProps.videoId} // The YouTube video ID
      onChangeState={onStateChange}
      height={300}
    />
  );
};

export default YouTubePlayer;
