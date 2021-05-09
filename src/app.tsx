import React, { useEffect, useState } from 'react';
import { st, classes } from './app.st.css';
import CollapsableCard from './components/CollapsableCard';
import { getImagesUrls, ImageObj } from './Data/getimages';
import { Tabs } from 'wix-style-react';
import { PageHeader } from 'wix-style-react';
import Form from './components/Form';

const itemNames = ['Images for approval', 'Approval images', 'disapproval images'];
export interface AppProps {
  className?: string;
}

export interface AppState {
  imagesUrls?: ImageObj[];
  checked: number;
  showAddImage: boolean;
}

export const App: React.VFC<AppProps> = ({ className }) => {
  const [imagesUrls, setImagesUrls] = useState<ImageObj[]>([]);
  const [checked, setChecked] = useState(0);
  const [showAddImage, setShowAddImage] = useState(false);


  useEffect(() => {
    getImagesUrls().then((fetchedImagesUrls: ImageObj[]) => {
      setImagesUrls(fetchedImagesUrls);
    }, () => {
      null
    });
  }, []);


  const saveNewImage = (url: string, name: string, content: string) => {
    setImagesUrls((prevImagesUrl) => {
      return (
        [...prevImagesUrl, { thumbnail: url, title: content, checked: 0, author: name }]
      );
    });
    setShowAddImage(false);
  };

  const setUnckecedItem = (imageId: string, checked: number) => {
    setImagesUrls((currentImagesUrl) => {
      return currentImagesUrl.map((imageUrl) => {
        if (imageUrl.thumbnail === imageId) {
          imageUrl.checked = checked;
        }
        return imageUrl;
      });
    });
  };



  return (
    <main className={st(classes.root, className)}>

      <div className={st(classes.bar)}>

        <div className={st(classes.title)}>
          <PageHeader
            title='My Images'
          />
        </div>

        <Tabs
          items={itemNames.map((itemName, itemIndex) => ({
            id: itemIndex, title: itemName}))}
          activeId={checked}
          hasDivider={false}
          onClick={(item) => {
            setChecked(item.id == 0 ? 0 : item.id == 1 ? 1 : 2);
          }}
        />
      </div>


      <section>
        <CollapsableCard showForm={setShowAddImage} setChecked={setUnckecedItem} Checked={checked} ImagesArray={imagesUrls}></CollapsableCard>
        {showAddImage?
        <Form showForm={setShowAddImage} saveImage={saveNewImage}></Form>:
          null}
      </section>
    </main>
  );
};
