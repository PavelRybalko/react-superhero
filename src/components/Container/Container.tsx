import s from './Container.module.css';
import { FC } from 'react';

const Container: FC = ({ children }) => (
  <div className={s.Container}>{children}</div>
);

export default Container;
