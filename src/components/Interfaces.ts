export interface MainProps {
  chatroomName: string;
  handleSignOut: () => void;
}

export interface IMessage {
  text: string;
  sender: string;
  createdAt: string;
  chatroomName: string;
  id: string;
  uid: string;
}

export interface SidebarProps {
  handleSignOut: () => void;
}

export interface ChatroomProps {
  chatroomName: string;
  setChatroomName: React.Dispatch<React.SetStateAction<string | null>>;
  setIsChatroom: React.Dispatch<React.SetStateAction<boolean>>;
  handleSignOut: () => void;
}


export interface MenuProps {
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  handleSignOut: () => void;
}