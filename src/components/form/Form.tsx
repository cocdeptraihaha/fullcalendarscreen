import { FormContainer,TitleInput } from './Form.styled';

function Form() {
    console.log('This is form');
  return (
    <FormContainer>
        <TitleInput type='text' placeholder='Add title'></TitleInput>

    </FormContainer>
  )
}

export default Form