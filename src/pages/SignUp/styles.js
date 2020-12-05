import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Input as MaInput} from '@material-ui/core';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  form {
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;

    h1 {
      margin: 0 auto;
      color: var(--primary);
    }

    button {
      margin-top: 10px;
      border: 0;
      border-radius: 4px;
      height: 48px;
      font-size: 16px;
      background: var(--primary);
      font-weight: bold;
      color: #fff;
      cursor: pointer;
    }

    a {
      text-decoration: none;
      margin: 5px auto;
      color: #666;

      &:hover {
        color: #999;
      }
    }
  }
`;

export const Input = styled.input`
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 48px;
  padding: 0 20px;
  font-size: 1rem;
  color: #666;

  &::placeholder {
    color: #999;
  }
`;

export const MInput = styled(MaInput)`
  border: none !important;
  color: #666 !important; 
  font-family: 'Roboto Slab', serif !important;
`;

export const SelectContainer = styled.div`
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  height: 48px;
  font-size: 1rem;
  color: #666;
  background: #fff;
  padding: 0 10px;
`;

export const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '95%',
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
