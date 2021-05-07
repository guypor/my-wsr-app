import React, { useEffect, useState } from 'react';
import { st, classes } from './app.st.css';
import CollapsableCard from './components/CollapsableCard';
import { getImagesUrls, ImageObj } from './Data/getimages';
import { Tabs} from 'wix-style-react';
import { PageHeader } from 'wix-style-react';
export interface AppProps {
  className?: string;
}

export interface AppState {
  imagesUrls?: ImageObj[];
  checked: number;
}

export const App: React.VFC<AppProps> = ({ className }) => {
  const [imagesUrls, setImagesUrls] = useState([]);
  const [checked, setChecked] = useState(0);

  useEffect(() => {
    getImagesUrls().then((fetchedImagesUrls: ImageObj[]) => {

      setImagesUrls(fetchedImagesUrls);
    }, () => {
      console.log('eeeerrrrrr');
    });
  }, []);

  const setUnckecedItem = (imageId: string, checked: number) => {
    const x = imagesUrls.find(image => image.thumbnail === imageId);
    // @ts-ignore
    x.checked = checked;
    // @ts-ignore
    setImagesUrls((val)=>{
      return val.map((val)=>{if(val.thumbnail !==imageId){return val} else{val.cheked=imageId; return val;}  })
    })
  }

  return (
    <main className={st(classes.root, className)}>
      <div className={st(classes.bar)}>
        <div className={st(classes.title)} >
        <PageHeader
          title="My Images"
        />
        </div>

      <Tabs
        items={[
          { id: 0, title: 'Images for approval'},
          { id: 1, title: 'Approval images'},
          { id: 2, title: 'disapproval images'}
        ]}
        activeId={checked}
        hasDivider={false}
        onClick={(item)=>{ // @ts-ignore
          setChecked(item.id)}}
      />
      </div>
      <section>
        <CollapsableCard setChecked={setUnckecedItem}  Checked={checked} ImagesArray={imagesUrls}></CollapsableCard>
      </section>
    </main>
  );
};
