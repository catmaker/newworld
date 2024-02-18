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
}

export interface MypageProps {
  session: {
    name: string;
    id: string;
    nickname: string;
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
