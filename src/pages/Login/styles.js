import styled from 'styled-components';

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

    input {
      margin-top: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 48px;
      padding: 0 20px;
      font-size: 1rem;
      color: #666;

      &::placeholder{
        color: #999;
      }
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
