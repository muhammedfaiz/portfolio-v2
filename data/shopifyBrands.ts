export type ShopifyBrand = {
  id: string;
  name: string;
  url: string;
  image: string;
};

export const shopifyBrands: ShopifyBrand[] = [
  {
    id: "conscious-chemist",
    name: "Conscious Chemist",
    url: "https://consciouschemist.com/",
    image: "/screenshots/conscious-chemist.jpg",
  },
  {
    id: "fflirtygo",
    name: "Fflirtygo",
    url: "https://www.fflirtygo.com/",
    image: "/screenshots/fflirtygo.jpg",
  },
  {
    id: "formial",
    name: "Formial Labs",
    url: "https://formial.in/",
    image: "/screenshots/formial.jpg",
  },
  {
    id: "kreo-tech",
    name: "Kreo",
    url: "https://kreo-tech.com/",
    image: "/screenshots/kreo-tech.jpg",
  },
];
