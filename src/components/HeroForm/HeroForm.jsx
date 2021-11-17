import { useEffect, useState } from 'react';
import s from './HeroForm.module.css';

export default function HeroForm({
  onAddHero,
  onUpdateHero,
  editHero,
  setEditHero,
  openModal,
}) {
  const [nickname, setNickname] = useState(editHero?.nickname || '');
  const [real_name, setRealname] = useState(editHero?.real_name || '');
  const [origin_description, setOrigin_description] = useState(
    editHero?.origin_description || ''
  );
  const [superpowers, setSuperpowers] = useState(editHero?.superpowers || '');
  const [catch_phrase, setCatch_phrase] = useState(
    editHero?.catch_phrase || ''
  );
  const [Image, setImage] = useState(editHero?.Image || []);
  const [previewSource, setPreviewSource] = useState('');

  const handleChange = (name, value) => {
    switch (name) {
      case 'nickname':
        return setNickname(value);
      case 'real_name':
        return setRealname(value);
      case 'origin_description':
        return setOrigin_description(value);
      case 'superpowers':
        return setSuperpowers(value);
      case 'catch_phrase':
        return setCatch_phrase(value);
      case 'Image':
        previewFile(value);
        return setImage(value);
      default:
        throw new Error(`Unsupported field name ${name}`);
    }
  };

  useEffect(() => {
    return () => {
      setEditHero(null);
      setPreviewSource(null);
      resetInputs();
    };
  }, [editHero, setEditHero]);

  function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }

  const resetInputs = () => {
    setNickname('');
    setRealname('');
    setOrigin_description('');
    setSuperpowers('');
    setCatch_phrase('');
    setImage([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !nickname &&
      !real_name &&
      !origin_description &&
      !superpowers &&
      !catch_phrase &&
      !Image
    ) {
      alert('Заполните все поля!');
      return;
    }

    editHero
      ? onUpdateHero(
          {
            nickname,
            real_name,
            origin_description,
            superpowers,
            catch_phrase,
          },
          editHero.heroId,
          Image
        )
      : onAddHero(
          {
            nickname,
            real_name,
            origin_description,
            superpowers,
            catch_phrase,
          },
          Image
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
              value={nickname}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
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
              value={real_name}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
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
              value={origin_description}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
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
              value={superpowers}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
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
              value={catch_phrase}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </label>
          <input
            name="Image"
            className={s.uploadInput}
            type="file"
            onChange={(e) => {
              handleChange(e.target.name, e.target.files[0]);
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
