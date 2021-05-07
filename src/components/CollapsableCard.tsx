import React from 'react';
import { st, classes } from './CollapsableCard.st.css';
import type { ImageObj } from '../Data/getimages';
import Image from './Image';


interface CollapsableCardProps {
  ImagesArray: ImageObj[];
  Checked: number;
  setChecked(imageId: string, isChecked: number): void;
}


class CollapsableCard extends React.Component<CollapsableCardProps> {
  constructor(props: CollapsableCardProps) {
    super(props);
  }

  render() {
    return (
      <div className={st(classes['Image'])}>
        {this.props.ImagesArray.filter((value => {
          return value.checked === this.props.Checked ? true : false;
        })).map((val) => {
          return (
            <Image setChecked={this.props.setChecked}  key={val.thumbnail} Image={val}></Image>);
        })}
      </div>

    );
  }
}


export default CollapsableCard;