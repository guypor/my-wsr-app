export interface ImageObj {
  thumbnail: string;
  title: string;
  checked: number;
  subTitle : string;
  author: string;
}
interface dataObaject{
  data: {
    thumbnail: string;
    title: string;
    author: string;
  }
}

export function getImagesUrls(): Promise<ImageObj[]> {

  return fetch("http://www.reddit.com/r/pics/.json")
    .then(res => res.json())
    .then((reddit) => {
      return reddit.data.children.reduce((acc: ImageObj[], image: dataObaject) => {
        if (image && image.data) {
          acc.push({thumbnail :image.data.thumbnail,title:image.data.title, checked:0,subTitle:'hh',author:image.data.author})
        }
        return acc;
      }, [])})
}