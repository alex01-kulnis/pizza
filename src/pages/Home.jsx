import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { AppContext } from '../App';
import { setCategoryId } from '../redux/slices/filterSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);

  const { searchValue } = useContext(AppContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      const itemsResp = await axios.get(
        `https://62d52f16d4406e523554ca5d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sort.sortProperty}&order=desc${search}`,
      );

      setItems(itemsResp.data);

      setIsLoading(false);
      window.scrollTo(0, 0);
    }
    fetchData();
  }, [categoryId, sort.sortType, searchValue, currentPage]);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangeSort = (id) => {
    dispatch(setCategoryId(id));
  };

  const pizzas = items
    .filter((obj) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;
