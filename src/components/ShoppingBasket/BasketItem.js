import { useState } from 'react';
import s from './BasketItem.module.css';

export default function BasketItem({ product, subtotalPrice, onSubmit }) {
  const [productAmount, setProductAmount] = useState(1);

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'increment':
        setProductAmount(state =>
          state >= product.amount ? state : state + 1,
        );
        break;

      case 'decrement':
        setProductAmount(state => (state <= 0 ? state : state - 1));
        break;

      case 'quantity':
        setProductAmount(+value > product.amount ? product.amount : +value);
        break;

      default:
        console.warn(`Тип поля name - ${name} не обрабатывается!`);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(product, productAmount);

    setProductAmount(1);
  };

  return (
    <li className={s.basketItem}>
      <img src={product.image} alt={product.name} className={s.productImage} />
      {product.amount && <p className={s.boughtAmount}>{product.amount} шт.</p>}
      <p className={s.productName}>{product.name}</p>
      <p className={s.productCost}>Всего : {subtotalPrice} $</p>

      {product.name === 'Папайя' ? (
        <p className={s.additionalText}>'*Скидка на каждый 3кг 50% !'</p>
      ) : (
        ' '
      )}

      <form onSubmit={handleSubmit}>
        <button className={s.productButton} type="submit">
          <i className="material-icons button__icon">shopping_cart</i>
          Убрать
        </button>
        <div className={s.quantityBlock}>
          <button
            type="button"
            name="decrement"
            className={s.quantityArrowMinus}
            onClick={handleChange}
          >
            {' '}
            -{' '}
          </button>
          <input
            name="quantity"
            className={s.quantityNum}
            type="number"
            min="1"
            max={product.amount}
            value={productAmount}
            onChange={handleChange}
            size="2"
          />
          <button
            type="button"
            name="increment"
            className={s.quantityArrowPlus}
            onClick={handleChange}
          >
            {' '}
            +{' '}
          </button>
        </div>
      </form>
    </li>
  );
}
