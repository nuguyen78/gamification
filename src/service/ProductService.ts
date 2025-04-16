export interface Product {
  id: string
  slot: string
  name: string
  description: string
  image: string
  price: number
  bonus: string
  quantity: number
  inventoryStatus: string
  rating: number
  orders?: Order[]
}

export interface Order {
  id: string
  productCode: string
  date: string
  amount: number
  quantity: number
  customer: string
  status: string
}

export const ProductService = {
  getProductsData(): Product[] {
    return [
      {
        id: '1000',
        slot: 'Helmet',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        bonus: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
      },
      {
        id: '1001',
        slot: 'nvklal433',
        name: 'Black Watch',
        description: 'Product Description',
        image: 'black-watch.jpg',
        price: 72,
        bonus: 'Accessories',
        quantity: 61,
        inventoryStatus: 'INSTOCK',
        rating: 4,
      },
      // Add the remaining products here...
    ]
  },

  getProductsWithOrdersData(): Product[] {
    return [
      {
        id: '1000',
        slot: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        bonus: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5,
        orders: [
          {
            id: '1000-0',
            productCode: 'f230fh0g3',
            date: '2020-09-13',
            amount: 65,
            quantity: 1,
            customer: 'David James',
            status: 'PENDING',
          },
          // Add more orders here...
        ],
      },
      // Add the remaining products with orders here...
    ]
  },

  getProductsMini(): Promise<Product[]> {
    return Promise.resolve(this.getProductsData().slice(0, 5))
  },

  getProductsSmall(): Promise<Product[]> {
    return Promise.resolve(this.getProductsData().slice(0, 10))
  },

  getProducts(): Promise<Product[]> {
    return Promise.resolve(this.getProductsData())
  },

  getProductsWithOrdersSmall(): Promise<Product[]> {
    return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10))
  },

  getProductsWithOrders(): Promise<Product[]> {
    return Promise.resolve(this.getProductsWithOrdersData())
  },
}
