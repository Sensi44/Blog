import React from 'react';

import styles from 'assets/css-modules/forms.module.scss';
import stylesAdd from 'assets/css-modules/newEdit.module.scss';

const NewTag = ({
  title,
  register,
  addTag,
  deleteTag,
  last,
  id,
  required,
  errors,
}) => {
  return (
    <div className={stylesAdd.newTagContainer}>
      <div className={stylesAdd.inputsContainer}>
        <input
          className={`${styles.input} ${stylesAdd.tagInput}`}
          type='text'
          placeholder='Tag'
          {...register(`${title}`, {
            required,
            minLength: 2,
            maxLength: 25,
            pattern: /^[0-9A-Za-zА-Яа-я]+$/i,
          })}
        />

        <input
          type='button'
          value='Delete'
          onClick={() => deleteTag(id, title)}
          className={`${stylesAdd.deleteBtn}`}
        />

        {last ? (
          <input
            type='button'
            value='Add Tag'
            onClick={addTag}
            className={`${stylesAdd.addTagButton}`}
          />
        ) : null}
      </div>

      {errors[`${title}`] && (
        <span className={styles.inputError}>
          Minimum tag length 2 characters
        </span>
      )}
    </div>
  );
};

export default NewTag;
