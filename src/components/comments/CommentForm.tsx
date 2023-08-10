import React, { Dispatch, SetStateAction, useState } from 'react';
import useCommentMutation from '../../hooks/useCommentMutation';
import * as S from './Styled.Comments';

interface CommentFormProps {
  uid: string;
  pid: string;
  setIsCommenting: Dispatch<SetStateAction<boolean>>;
}

const CommentForm = ({ uid, pid, setIsCommenting }: CommentFormProps) => {
  const { addCommentMutation } = useCommentMutation();
  const [commentText, setCommentText] = useState('');
  const handleCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };
  const handleAddSubmitBtn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (commentText === '') {
      alert('댓글을 작성해 주세요.');
      return false;
    }

    const newComment = {
      uid: uid,
      pid: Number(pid),
      nickname: '테스트',
      body: commentText,
      created_at: new Date().toISOString()
    };

    addCommentMutation.mutate(newComment);
    setCommentText('');
    setIsCommenting(false);
  };
  return (
    <S.CommentForm onSubmit={handleAddSubmitBtn}>
      <S.CommentItem>
        <S.CommentProfileImgBox>사진</S.CommentProfileImgBox>
        <S.CommentInput type="text" value={commentText} onChange={handleCommentInputChange} />
        <S.CommentPanel>
          <S.Button width="50px" height="30px">
            등록
          </S.Button>
        </S.CommentPanel>
      </S.CommentItem>
    </S.CommentForm>
  );
};

export default CommentForm;