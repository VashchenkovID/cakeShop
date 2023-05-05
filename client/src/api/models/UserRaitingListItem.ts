export interface UserRaitingListItem {
  id: number;
  ratingComment: string;
  rating: string;
  createdAt: string;
  updatedAt: string;
  UserId: number | null;
  deviceId: number;
  user: string;
}
