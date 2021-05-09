import React from 'react';
import { st, classes } from './CollapsableCard.st.css';
import type { ImageObj } from '../Data/getimages';
import Image from './Image';
import { AddItem } from 'wix-style-react';
interface CollapsableCardProps {
  ImagesArray: ImageObj[];
  Checked: number;
  setChecked(imageId: string, isChecked: number): void;
  showForm: (state:boolean) => void;
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
        <AddItem onClick={() => this.props.showForm(true)} size="large" />
      </div>

    );
  }
}


export default CollapsableCard;