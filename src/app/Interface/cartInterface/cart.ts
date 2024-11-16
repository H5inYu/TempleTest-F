import { CartItem } from './cartItem';

export interface Cart {
  cartTotal : number;
  cartItemDTOs: CartItem[];
}
