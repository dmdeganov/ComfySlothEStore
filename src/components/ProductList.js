import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import GridView from "./GridView";
import ListView from "./ListView";
import { getProductsBegin, loadProducts } from "../actions";

const ProductList = () => {
  const { filtered_products: products, grid_view } = useSelector(
    (state) => state.filter_reducer
  );

  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.products_reducer.products);

  useEffect(() => {
    dispatch(getProductsBegin());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadProducts(getProducts));
  }, [dispatch, getProducts]);

  if (products.length < 1) {
    return (
      <h5 style={{ textTransform: "none" }}>
        Sorry, no products match your search...
      </h5>
    );
  }
  if (grid_view === false) {
    return <ListView products={products} />;
  }

  return <GridView products={products} />;
};

export default ProductList;
