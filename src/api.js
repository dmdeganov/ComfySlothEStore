import axios from "axios";

export const fetchProducts = async () => {
  let products;
  try {
    const response = await axios.get(
      "https://course-api.com/react-store-products"
    );
    products = response.data;
  } catch (error) {
    console.log(error);
  }
  return products;
};

export const fetchSingleProduct = async (url) => {
  let singleProduct;
  try {
    const response = await axios.get(url);
    singleProduct = response.data;
  } catch (error) {
    console.log(error);
  }
  return singleProduct;
};
