import React, { useEffect, useState } from 'react';
import { st, classes } from './app.st.css';
import CollapsableCard from './components/CollapsableCard';
import { getImagesUrls, ImageObj } from './Data/getimages';
import { FormField, Tabs } from 'wix-style-react';
import { PageHeader, CustomModalLayout, Layout, Cell, Box, Input } from 'wix-style-react';
import Form from './components/Form';


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
  const [showAddImage, setshowAddImage] = useState(true);


  useEffect(() => {
    getImagesUrls().then((fetchedImagesUrls: ImageObj[]) => {

      setImagesUrls(fetchedImagesUrls);
    }, () => {
      console.log('eeeerrrrrr');
    });
  }, []);



  const saveNewImage = (url: string, name: string, content: string) => {
    setImagesUrls((prevImagesUrl) => {
      return (
        [...prevImagesUrl, { thumbnail: url, title: content, checked: 0, subTitle: 'hh', author: name }]
      );
    });

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

  interface item {
    id: number;
    title: string;
  }

  return (
    <main className={st(classes.root, className)}>

      <div className={st(classes.bar)}>

        <div className={st(classes.title)}>
          <PageHeader
            title='My Images'
          />
        </div>

        <Tabs
          items={[
            { id: 0, title: 'Images for approval' },
            { id: 1, title: 'Approval images' },
            { id: 2, title: 'Disapproval images' }
          ]}
          activeId={checked}
          hasDivider={false}
          onClick={(item) => {
            setChecked(item.id == 0 ? 0 : item.id == 1 ? 1 : 2);
          }}
        />
      </div>


      <section>
        <CollapsableCard showForm={setshowAddImage} setChecked={setUnckecedItem} Checked={checked} ImagesArray={imagesUrls}></CollapsableCard>
        {showAddImage?
        <Form showForm={setshowAddImage} saveImage={saveNewImage}></Form>:
          null}
      </section>
    </main>
  );
};
