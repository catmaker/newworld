export interface postUserProfileInterface {
  currentPassword: string;
  newPassword: string;
}
export interface ProfileImageManagement {
  profilePicture: string;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectedItemComponentProps {
  selectedItem: string;
  dummy: any;
  dummy2: any;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentItems: any[];
  totalPages: number;
  currentPage: number;
  handlePageClick: (page: number) => void;
  quizzes: any[];
}

export interface MypageProps {
  session: {
    name: string;
    id: string;
    nickname: string;
    imageFile: string;
    point: number;
    signupDate: string;
    puzzleCount: number;
  };
  status?: any;
}
export interface WelcomeMessageProps {
  session: {
    name: string;
    id: string;
    nickname: string;
    signupDate: string;
    puzzleCount: number;
    point: number;
  };
}
export interface PrivacyControlBoxProps {
  selectedItem: string;
  setSelectedItem: (item: string) => void;
}

export interface PersonalInfoManagementProps {
  userId: string;
  userNickname: string;
}
export interface ClearQuizProps {
  quizzes: any[];
  currentItems: any[];
  totalPages: number;
  currentPage: number;
  handlePageClick: (page: number) => void;
  session: any;
}
