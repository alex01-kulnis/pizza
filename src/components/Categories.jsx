import React, { useState } from 'react';

function Categories() {
  const [activateCategory, setActivateCategory] = useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const onClickCategory = (index) => {
    setActivateCategory(index);
  };

  return (
    <div class="categories">
      <ul>
        {categories.map((item, index) => (
          <li onClick={() => onClickCategory(index)} className={activateCategory === index ? 'active' : null}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
