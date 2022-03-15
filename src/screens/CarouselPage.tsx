import { useNavigation } from '@react-navigation/native';
import React, {Component} from 'react';
import {
  FlatList,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import ICarouselItem from '../ICarouselItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'contain',
    aspectRatio: 16 / 9,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
  },
});

interface Props<T> {
  source: Map<string, T[]>;
}

type State = {
  isLoading: boolean;
};

export default class CarouselPage<T extends ICarouselItem> extends Component<
  Props<T>,
  State
> {
  state: State = {
    isLoading: false,
  };

  render() {
    const data = Array.from(this.props.source).map(([key, value]) => {
      return {title: key, data: value};
    });
    return (
        <SectionList
          sections={data}
          renderItem={() => null}
          renderSectionHeader={({section}) => (
            <>
              <Text style={styles.header}>{section.title}</Text>
              <FlatList
                data={section.data}
                horizontal
                renderItem={({item}) => item.getItemView()}></FlatList>
            </>
          )}
        />
      
    );
  }
}
