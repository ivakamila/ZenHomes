export const initialState = {
  cart: [],
  totalCount: 0,
  totalPrice: 0,
};

function reducer(state, action) {
  const product = action.payload;
  switch (action.type) {
    case "ADD_TO_CART":
      const existItem = state.cart.find(
        (cartItem) => cartItem.productName === product.productName
      );

      if (existItem) {
        return {
          ...state,
          cart: state.cart.map((cartItem) =>
            cartItem.productName === product.productName
              ? {
                  ...product,
                  productCount: existItem.productCount + product.productCount,
                }
              : cartItem
          ),
          totalCount: state.totalCount + product.productCount,
          totalPrice: state.totalPrice + product.price * product.productCount,
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload],
          totalCount: state.totalCount + product.productCount,
          totalPrice: state.totalPrice + product.price,
        };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (cartItem) => cartItem.productName !== product.productName
        ),
        totalCount: state.totalCount - product.productCount,
        totalPrice: state.totalPrice - product.price * product.productCount,
      };
    case "EMPTY_CART":
      return {
        ...state,
        cart: [],
        totalCount: 0,
        totalPrice: 0,
      };
    case "ADD_COUNT":
      return {
        ...state,
        cart: state.cart.map((cartItem) =>
          cartItem.productName === product.productName
            ? {
                ...cartItem,
                productCount: cartItem.productCount + 1,
              }
            : cartItem
        ),
        totalCount: state.totalCount + 1,
        totalPrice: state.totalPrice + product.price,
      };

    case "MINUS_COUNT":
      return {
        ...state,
        cart: state.cart
          .map((cartItem) =>
            cartItem.productName === product.productName
              ? {
                  ...cartItem,
                  productCount: cartItem.productCount - 1,
                }
              : cartItem
          )
          .filter((cartItem) => cartItem.productCount !== 0),
        totalCount: state.totalCount - 1,
        totalPrice: state.totalPrice - product.price,
      };
    default:
      return state;
  }
}
export default reducer;
