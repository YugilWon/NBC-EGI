import { UserType } from '../../types/supabase';
import { supabase } from './supabase';

// 회원가입
export const signUpService = async (userData: UserType) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password
    });

    if (error) {
      throw new Error(error.message);
    }
    let profileImgUrl = '';

    if (userData.profileImg) {
      const profileImgFile = new File([userData.profileImg], userData.profileImg);

      const uploadData = await uploadProfileImage(profileImgFile);
      profileImgUrl = uploadData.path;
    }

    console.log('profileImgUrl', profileImgUrl);
    const userInsertData = {
      uid: data.user?.id,
      nickname: userData.nickname,
      profileImg: profileImgUrl,
      email: userData.email
    };

    const { error: insertError } = await supabase.from('users').insert(userInsertData);
    if (insertError) {
      throw new Error(insertError.message);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 로그아웃
export const sigOutService = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.log(error);
  }
};

// 로그인
export const loginService = async (userData: Omit<UserType, 'nickname' | 'profileImg'>) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

// 유저 정보 조회
export const getUserInfo = async (userEmail: string): Promise<Omit<UserType, 'password'> | null> => {
  try {
    const { data: userData, error } = await supabase
      .from('users')
      .select('uid, email, nickname, profileImg')
      .eq('email', userEmail);

    if (error) {
      throw new Error(error.message);
    }

    if (userData && userData.length > 0) {
      return userData[0];
    }

    return null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 비밀번호 찾기
export const resetPassword = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    console.log(data);
    if (!error) {
      alert('Please check your email');
    }
  } catch (error) {
    console.error(error);
  }
};

export const uploadProfileImage = async (profileImgFile: File) => {
  try {
    const { data, error } = await supabase.storage
      .from('1st')
      .upload(`profileImgs/${profileImgFile.name}`, profileImgFile);
    console.log('profileImgFile.name', profileImgFile.name);
    console.log('uploadData', data);
    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
