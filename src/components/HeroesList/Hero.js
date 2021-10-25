import { useState } from 'react';
import p from 'prop-types';
import s from './Hero.module.css';

export default function Hero({ hero, onDelete, openModal, setEditHero }) {
  return (
    <li className={s.listItem}>
      <img
        src={hero.Images.length > 0 ? hero.Images[0] : ''}
        alt={hero.nickname}
        className={s.productImage}
      />
      <div className={s.heroInfo}>
        <h3 className={s.heroTitle}>{hero.nickname}</h3>
        <p className={s.heroText}>
          <span>Real Name:</span> {hero.real_name}
        </p>
        <p className={s.heroText}>
          <span>Description:</span> {hero.origin_description}
        </p>
        <p className={s.heroText}>
          <span>Superpowers:</span> {hero.superpowers}
        </p>
        <p className={s.heroText}>
          <span>Catch Phrase:</span> {hero.catch_phrase}
        </p>
      </div>
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            openModal(true);
            setEditHero(hero);
          }}
        >
          edit
        </button>
        <button
          type="button"
          onClick={() => {
            onDelete(hero._id);
          }}
        >
          delete
        </button>
      </div>
    </li>
  );
}
