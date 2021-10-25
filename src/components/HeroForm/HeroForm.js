import { useReducer } from 'react';
import s from './HeroForm.module.css';

const initialState = {
  nickname: '',
  realname: '',
  description: '',
  superpowers: '',
  phrase: '',
  image: [],
};

function formReducer(state, action) {
  switch (action.type) {
    case 'nickname':
      return { ...state, [action.type]: action.payload };

    case 'realname':
      return { ...state, [action.type]: action.payload };

    case 'description':
      return { ...state, [action.type]: action.payload };

    case 'superpowers':
      return { ...state, [action.type]: action.payload };

    case 'phrase':
      return { ...state, [action.type]: action.payload };

    case 'image':
      return {
        ...state,
        [action.type]: [...state.image, action.payload],
      };

    case 'reset':
      return initialState;

    default:
      throw new Error(`Unsuported action type ${action.type}`);
  }
}

export default function HeroForm({
  onAddHero,
  onUpdateHero,
  editHero,
  setEditHero,
  openModal,
}) {
  const [state, dispatch] = useReducer(formReducer, editHero || initialState);

  const resetInputs = () => dispatch({ type: 'reset' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !state.nickname &&
      !state.realname &&
      !state.description &&
      !state.superpowers &&
      !state.phrase &&
      !state.image
    ) {
      alert('Заполните все поля!');
      return;
    }
    editHero
      ? onUpdateHero(
          {
            nickname: state.nickname,
            real_name: state.realname,
            origin_description: state.description,
            superpowers: state.superpowers,
            catch_phrase: state.phrase,
          },
          { heroId: state._id },
          { image: state.image }
        )
      : onAddHero(
          {
            nickname: state.nickname,
            real_name: state.realname,
            origin_description: state.description,
            superpowers: state.superpowers,
            catch_phrase: state.phrase,
          },
          { image: state.image }
        );
    resetInputs();
    setEditHero(null);
    openModal(false);
  };

  return (
    <form className={s.heroForm} onSubmit={handleSubmit}>
      <div className={s.heroFormFields}>
        <h3 className={s.formTitle}>Superhero details</h3>
        <label>
          Nickname:
          <input
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
            placeholder="real name"
            name="realname"
            className={s.textInput}
            type="text"
            value={state.realname}
            onChange={(e) =>
              dispatch({ type: 'realname', payload: e.target.value })
            }
          />
        </label>
        <label>
          Description:
          <input
            placeholder="description"
            name="description"
            className={s.textInput}
            type="text"
            value={state.description}
            onChange={(e) =>
              dispatch({
                type: 'description',
                payload: e.target.value,
              })
            }
          />
        </label>
        <label>
          Superpowers:
          <input
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
            placeholder="superhero phrase"
            name="phrase"
            className={s.textInput}
            type="text"
            value={state.phrase}
            onChange={(e) =>
              dispatch({ type: 'phrase', payload: e.target.value })
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
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
