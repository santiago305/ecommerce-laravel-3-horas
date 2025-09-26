export const path = {
    home: '/',
    products: '/products',
    product: (id: string) => `/products/${id}`,
    cart: '/cart',
    cartStore: '/cart/items',
    cartItemsStore: '/cart/items',
    cartItem: (id: string) => `/cart/items/${id}`,
    checkoutCreate: '/checkout',
    checkoutStore: '/checkout',
    accountOrders: '/account/orders',
    accountOrder: (id: string) => `/account/orders/${id}`,
    login: '/login'
};