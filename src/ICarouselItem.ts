import {ReactElement} from 'react';

export default interface ICarouselItem {
  key: string;
  getItemView(): ReactElement;
}
