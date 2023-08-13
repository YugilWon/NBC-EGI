import { styled } from 'styled-components';

export const Container = styled.div`
  height: 185px;
  display: flex;

  margin-top: 50px;
  margin-bottom: 220px;
`;

export const Wrapper = styled.div`
  display: flex;
  padding: 20px;
`;

export const ProfileBox = styled.div`
  width: 50px;
  height: 50px;
`;
export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const TextBox = styled.div`
  margin-left: 15px;

  padding: 5px;
`;

export const Text = styled.textarea`
  margin-top: 10px;

  width: 1080px;
  height: 80px;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Button = styled.div`
  margin-top: 7px;

  border: 1px solid;
  border: none;
  background-color: transparent;

  font-size: 25px;
  color: #0a3a8d;
`;
