export interface UserPoints {
  clearPoints?: number;
  attendancePoints?: number;
  totalPoints?: number;
}

export interface RankingProps {
  [username: string]: UserPoints;
}
