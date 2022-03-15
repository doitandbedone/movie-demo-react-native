export default class Movie {
  title: string;
  id: Number;
  imageUrl: string;

  constructor(title: string, id: Number, imageUrl: string) {
    this.title = title;
    this.id = id;
    this.imageUrl = imageUrl;
  }
}
