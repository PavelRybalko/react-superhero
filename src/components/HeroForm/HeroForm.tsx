import React, { useState } from 'react';
import s from './HeroForm.module.css';
import { CgClose } from 'react-icons/cg';
import { IHero } from '../../interfaces/Hero.interface';
import { IHeroFormItem } from '../../interfaces/HeroFormItem.interface';

interface HeroFormProps {
  onAddHero(hero: IHeroFormItem, Images: File | null): void;
  onUpdateHero(hero: IHeroFormItem, heroId: string, Images: File | null): void;
  editHero: IHero | null;
  setEditHero(hero: IHero | null): void;
  openModal(setValue: boolean): void;
  onDeleteImage(id: string, image: string): void;
}

const styles = {
  marginRight: 6,
};

export default function HeroForm({
  onAddHero,
  onUpdateHero,
  editHero,
  setEditHero,
  openModal,
  onDeleteImage,
}: HeroFormProps) {
  const [nickname, setNickname] = useState(editHero?.nickname || '');
  const [real_name, setRealname] = useState(editHero?.real_name || '');
  const [origin_description, setOrigin_description] = useState(
    editHero?.origin_description || ''
  );
  const [superpowers, setSuperpowers] = useState(editHero?.superpowers || '');
  const [catch_phrase, setCatch_phrase] = useState(
    editHero?.catch_phrase || ''
  );
  const [Images, setImages] = useState<File | null>(null);
  const [previewSource, setPreviewSource] = useState<
    string | null | ArrayBuffer
  >(null);

  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (name: string, value: any) => {
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
      case 'Images':
        previewFile(value);
        return setImages(value);
      default:
        throw new Error(`Unsupported field name ${name}`);
    }
  };

  function previewFile(file: File) {
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
    setImages(null);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (
      !nickname ||
      !real_name ||
      !origin_description ||
      !superpowers ||
      (!catch_phrase && !Images)
    ) {
      alert('Заполните все поля!');
      return;
    }

    if (
      editHero?.nickname === nickname &&
      editHero?.real_name === real_name &&
      editHero?.origin_description === origin_description &&
      editHero?.superpowers === superpowers &&
      editHero?.catch_phrase === catch_phrase &&
      !Images?.size
    ) {
      openModal(false);
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
          editHero._id,
          Images
        )
      : onAddHero(
          {
            nickname,
            real_name,
            origin_description,
            superpowers,
            catch_phrase,
          },
          Images
        );
    setEditHero(null);
    setPreviewSource(null);
    resetInputs();
    openModal(false);
  };

  return (
    <>
      <form className={s.heroForm} onSubmit={handleSubmit} autoComplete="off">
        <div className={s.heroFormFields}>
          <h3 className={s.formTitle}>Superhero details</h3>
          <label>
            Nickname:
            <input
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
              placeholder="superhero phrase"
              name="catch_phrase"
              className={s.textInput}
              type="text"
              value={catch_phrase}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </label>
          <input
            ref={inputFileRef}
            name="Images"
            className={s.uploadInput}
            type="file"
            onChange={(e) => {
              handleChange(
                e.target.name,
                e.target.files && (e.target.files[0] as File)
              );
            }}
          />
          {(previewSource || editHero?.Images[0]) && (
            <div className={s.previewContainer}>
              <button
                className={s.imageDeleteButton}
                title="delete"
                type="button"
                onClick={() => {
                  if (editHero?.Images?.length) {
                    onDeleteImage(editHero?._id, editHero.Images[0]);
                    setEditHero({ ...editHero, Images: [] });
                  }
                  if (null !== inputFileRef.current) {
                    inputFileRef.current.value = '';
                  }
                  setPreviewSource(null);
                  setImages(null);
                }}
              >
                <CgClose size="26" style={styles} />
              </button>
              <img
                className={s.imagePreview}
                src={previewSource?.toString() || editHero?.Images[0]}
                alt="chosen"
              />
            </div>
          )}
          <button
            className="waves-effect  deep-orange darken-3 btn-small"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
