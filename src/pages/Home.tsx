/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { useAppDispatch } from '../redux/store';
import { selectPizzaData } from '../redux/pizza/selectors';
import { selectFilter } from '../redux/filter/selectors';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    // const category = categoryId > 0 ? `category=${categoryId}` : '';
    // const search = searchValue ? `&search=${searchValue}` : '';
    const sortBy = sort.sortProperty;
    // const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? String(categoryId) : '';
    const search = searchValue;
    dispatch(fetchPizzas({ category, search, currentPage: String(currentPage), sortBy }));
    window.scrollTo(0, 0);
  };

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

  //     const sort = list.find((obj) => obj.sortProperty === params.sort);

  //     if (sort) {
  //       params.sort = sort;
  //     }

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || list[0],
  //       }),
  //     );
  //     // dispatch(setFilters({ ...params, sort }));
  //   }
  // }, []);

  useEffect(() => {
    getPizzas();
  }, [categoryId, searchValue, currentPage, sort.sortProperty]);

  // useEffect(() => {
  //   const queryString = qs.stringify({
  //     sortProperty: sort.sortProperty,
  //     categoryId,
  //     currentPage,
  //   });
  //   navigate(`?${queryString}`);
  // }, [categoryId, currentPage, sort.sortProperty]);

  const pizzas = items
    .filter((obj: any) => {
      return obj.title.toLowerCase().includes(searchValue.toLowerCase());
    })
    .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
