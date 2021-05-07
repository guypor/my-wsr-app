import React from 'react';
import { st, classes } from './Image.st.css';
import type { ImageObj } from '../Data/getimages';
import { CardGalleryItem } from 'wix-style-react';
interface ImageProps {
  Image:ImageObj;
  setChecked(imageId: string, isChecked: number): void;
}

class Image extends React.Component<ImageProps> {

  constructor(props: ImageProps) {
    super(props);
  }

  render() {
    return (
      <div className={st(classes['ImageDiv'])}>
            {/*<ImageViewer onRemoveImage={() =>this.props.setChecked (this.props.Image.thumbnail,2)} width={'75%'} height={'75%'} imageUrl={this.props.Image.thumbnail} />*/}




        <CardGalleryItem
          backgroundImageUrl={this.props.Image.thumbnail}
          badge=""
          primaryActionProps={{
            label: 'Approve',
            onClick: () => {this.props.setChecked (this.props.Image.thumbnail,1)
            }
          }}
          secondaryActionProps={{
            label: 'Disapprove',
            onClick: () => {
              this.props.setChecked (this.props.Image.thumbnail,2);
            }
          }}
          settingsMenu=""
          subtitle={this.props.Image.author}
          title={this.props.Image.title}
        />

      </div>);
  }


}

export default Image;
