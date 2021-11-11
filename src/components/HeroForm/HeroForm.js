import { useReducer, useEffect, useState } from 'react';
import s from './HeroForm.module.css';

const initialState = {
  nickname: '',
  real_name: '',
  origin_description: '',
  superpowers: '',
  catch_phrase: '',
  image: [],
};

export default function HeroForm({
  onAddHero,
  onUpdateHero,
  editHero,
  setEditHero,
  openModal,
}) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [previewSource, setPreviewSource] = useState('');

  function formReducer(state, action) {
    switch (action.type) {
      case 'nickname':
        return { ...state, [action.type]: action.payload };

      case 'real_name':
        return { ...state, [action.type]: action.payload };

      case 'origin_description':
        return { ...state, [action.type]: action.payload };

      case 'catch_phrase':
        return { ...state, [action.type]: action.payload };

      case 'superpowers':
        return { ...state, [action.type]: action.payload };

      case 'image':
        previewFile(action.payload);
        return {
          ...state,
          [action.type]: action.payload,
        };

      case 'edit':
        return action.payload;

      case 'reset': {
        return initialState;
      }

      default:
        throw new Error(`Unsupported action type ${action.type}`);
    }
  }

  useEffect(() => {
    editHero && dispatch({ type: 'edit', payload: editHero });
    return () => {
      setPreviewSource(null);
      resetInputs();
    };
  }, [editHero]);

  function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }

  const resetInputs = () => dispatch({ type: 'reset' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !state.nickname &&
      !state.real_name &&
      !state.origin_description &&
      !state.superpowers &&
      !state.catch_phrase &&
      !state.image
    ) {
      alert('Заполните все поля!');
      return;
    }

    editHero
      ? onUpdateHero(
          {
            nickname: state.nickname,
            real_name: state.real_name,
            origin_description: state.origin_description,
            superpowers: state.superpowers,
            catch_phrase: state.catch_phrase,
          },
          state.heroId,
          state.image
        )
      : onAddHero(
          {
            nickname: state.nickname,
            real_name: state.real_name,
            origin_description: state.origin_description,
            superpowers: state.superpowers,
            catch_phrase: state.catch_phrase,
          },
          state.image
        );
    setEditHero(null);
    setPreviewSource(null);
    resetInputs();
    openModal(false);
  };

  return (
    <>
      <form className={s.heroForm} onSubmit={handleSubmit}>
        <div className={s.heroFormFields}>
          <h3 className={s.formTitle}>Superhero details</h3>
          <label>
            Nickname:
            <input
              autoComplete="off"
              placeholder="nickname"
              name="nickname"
              className={s.textInput}
              type="text"
              value={state.nickname}
              onChange={(e) =>
                dispatch({ type: 'nickname', payload: e.target.value })
              }
            />
          </label>
          <label>
            Real Name:
            <input
              autoComplete="off"
              placeholder="real name"
              name="real_name"
              className={s.textInput}
              type="text"
              value={state.real_name}
              onChange={(e) =>
                dispatch({ type: 'real_name', payload: e.target.value })
              }
            />
          </label>
          <label>
            Description:
            <input
              autoComplete="off"
              placeholder="description"
              name="origin_description"
              className={s.textInput}
              type="text"
              value={state.origin_description}
              onChange={(e) =>
                dispatch({
                  type: 'origin_description',
                  payload: e.target.value,
                })
              }
            />
          </label>
          <label>
            Superpowers:
            <input
              autoComplete="off"
              placeholder="superpowers"
              name="superpowers"
              className={s.textInput}
              type="text"
              value={state.superpowers}
              onChange={(e) =>
                dispatch({
                  type: 'superpowers',
                  payload: e.target.value,
                })
              }
            />
          </label>
          <label>
            Phrase:
            <input
              autoComplete="off"
              placeholder="superhero phrase"
              name="catch_phrase"
              className={s.textInput}
              type="text"
              value={state.catch_phrase}
              onChange={(e) =>
                dispatch({ type: 'catch_phrase', payload: e.target.value })
              }
            />
          </label>
          <input
            name="image"
            className={s.uploadInput}
            type="file"
            onChange={(event) => {
              dispatch({ type: 'image', payload: event.target.files[0] });
            }}
          />
          {previewSource && (
            <img src={previewSource} alt="chosen" style={{ width: '100px' }} />
          )}
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}
