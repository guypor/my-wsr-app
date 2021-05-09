import React from 'react';
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
      <div >
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
