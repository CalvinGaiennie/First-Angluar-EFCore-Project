export interface Order {
  _id: string;
  OrderNumber: string;
  Date: string;
  OrderContent: string;
  OrderPuller: string;
  OrderStatus: 'correct' | 'incorrect';
  OrderChecker: string;
  mistakeType?: 'Minor Count' | 'Major Count' | 'Profile';
  __v: number;
}
