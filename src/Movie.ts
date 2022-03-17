export default class Movie {
  title: string;
  id: Number;
  imageUrl: string;
  releaseDate: Date;
  score?: Number;
  description: string;

  constructor(
    title: string,
    id: Number,
    imageUrl: string,
    description: string,
    releaseDate: Date
  ) {
    this.title = title;
    this.id = id;
    this.imageUrl = imageUrl;
    this.description = description;
    this.releaseDate = new Date(releaseDate);
  }
}
