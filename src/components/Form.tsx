import React from 'react';
import { CustomModalLayout, Layout, Cell, Box, Input, FormField, InputArea } from 'wix-style-react';
import { st, classes } from './Form.st.css';

interface FormState {
  url: string;
  name: string;
  content: string;
}

interface FormProps {
  saveImage: (url: string, name: string, content: string) => void
  showForm: (state: boolean) => void;
}
interface Save{
  target: {
    value:string;
}
}

class Form extends React.Component<FormProps, FormState> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(props: FormProps) {
    super(props);

    this.state = {
      url: '',
      name: '',
      content: ''
    };
  }

  contentChange = (evantValue: Save) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    this.setState({ content: evantValue.target.value });
  };
  urlChange = (event: Save) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    this.setState({ url: event.target.value });

  };
  nameChange = (event: Save) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <div className={st(classes['form'])}>
      <CustomModalLayout
        showHeaderDivider
        primaryButtonText='Save'
        secondaryButtonText='Cancel'
        onCloseButtonClick={() => {this.props.showForm(false)}
        }
        secondaryButtonOnClick={() => this.props.showForm(false)}
        primaryButtonOnClick={() => {
          this.props.saveImage(this.state.url, this.state.name, this.state.content);
        }}
        title='New Contact'
      >
        <Layout gap='24px'>
          <Cell span={2}>
            <FormField label='Name' />
          </Cell>
          <Cell span={10}>
            <Box direction='vertical' gap='12px'>
              <Input onChange={this.nameChange} placeholder='Name' />

            </Box>
          </Cell>
          <Cell span={2}>
            <FormField label='URL' />
          </Cell>
          <Cell span={10}>
            <Box direction='vertical' gap='6px'>
              <Input onChange={this.urlChange} placeholder='URL' />
            </Box>
          </Cell>
          <Cell span={10}>
            <Box direction='vertical' gap='6px'>
              <InputArea onChange={this.contentChange} placeholder='This is a placeholder' resizable />
            </Box>
          </Cell>
        </Layout>
      </CustomModalLayout>
      </div>);

  }
}

export default Form;