import React, {useState} from 'react';
import {CustomTextArea, FormButton} from './styled';

const CommentForm = ({handleSubmit, submitLabel, hasCancelButton= false, initialText='', handleCancel}) => {
  const [value, setValue] = useState(initialText);
  const isFormDisabled = value.length === 0;

  const onSubmit = e => {
    e.preventDefault();
    handleSubmit(value);
    setValue('');
  }

  const onChange = e => {
    setValue(e.target.value)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <CustomTextArea
          value={value}
          onChange={onChange}
        />
        <FormButton disabled={isFormDisabled}>{submitLabel}</FormButton>
        {hasCancelButton && (
          <FormButton
            type={'button'}
            className={'cancel'}
            onClick={handleCancel}
          >Cancel</FormButton>
        )}
      </form>
    </div>
  );
};

export default CommentForm;