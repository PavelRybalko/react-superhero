import React from 'react';
import MyLoader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Loader.module.css';

export default function Loader() {
  //other logic
  return (
    <>
      <p className={s.title}>Loading</p>
      <MyLoader
        className={s.spinner}
        type="TailSpin"
        color="#00BFFF"
        height={100}
        width={100}
      />
    </>
  );
}
