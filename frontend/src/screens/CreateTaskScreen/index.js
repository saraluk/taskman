import React, { useState, useEffect } from 'react';
import Message from '../../components/Message';
import Tag from '../../components/Tag';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../actions/taskActions';
import Card from '../../components/Card';
import {
  ButtonRecRadSolidBlue,
  ButtonRecSolidGrey,
  SubmitButtonRecRadSolidBlue,
} from '../../components/Buttons';

import './styles.scss';
import PageHeader from '../../components/PageHeader';

const CreateTask = ({ history }) => {
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const taskCreate = useSelector((state) => state.taskCreate);
  const { error } = taskCreate;

  useEffect(() => {
    setMessage('');
  }, [tags]);

  const getDate = () => {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    return `${yyyy}-${mm}-${dd}`;
  };

  useEffect(() => {
    const todayDate = getDate();
    setDueDate(todayDate);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const completed = false;
    dispatch(
      createTask(description, details, completed, dueDate, tags, history)
    );
  };

  const addTagHandler = () => {
    if (tag && tags.indexOf(tag) === -1) {
      const cleanTag = tag.trim();
      setTags([...tags, cleanTag]);
      setTag('');
    } else {
      setMessage('Invalid tag name');
    }
  };

  const removeTagHandler = (key) => {
    const remainTags = tags.filter((tag) => tag !== key);
    setTags(remainTags);
  };

  const cancelHandler = () => {
    history.push('/dashboard');
  };

  return (
    <div>
      <PageHeader backTo={cancelHandler}>Create Task</PageHeader>
      <form onSubmit={submitHandler}>
        <Card cardColor='blue-tab'>
          <div className='form__group-input'>
            <label>Description</label>
            <input
              className='form__input'
              type='text'
              name='description'
              maxLength='100'
              value={description}
              placeholder='Enter description (maximum 100 characters)'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='form__group-input'>
            <label>Details</label>
            <textarea
              className='form__input'
              type='text'
              name='details'
              rows='4'
              value={details}
              placeholder='Enter details'
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div className='form__group-input'>
            <label>Due Date</label>
            <input
              className='form__input input--short'
              type='date'
              name='dueDate'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className='form__group-input'>
            <label>Tags</label>
            <div className='inline-wrapper'>
              <input
                className='form__input'
                type='text'
                name='tag'
                value={tag}
                placeholder='Enter new tag'
                onChange={(e) => setTag(e.target.value)}
              />
              <ButtonRecSolidGrey onClickHandler={addTagHandler}>
                Add Tag
              </ButtonRecSolidGrey>
            </div>
            {message && <Message>{message}</Message>}
            {tags && (
              <div className='tags'>
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    tagName={tag}
                    removeTagHandler={removeTagHandler}
                    removable={true}
                  />
                ))}
              </div>
            )}
          </div>

          {error && <Message>{error}</Message>}
        </Card>
        <div className='group-buttons'>
          <SubmitButtonRecRadSolidBlue marginRight='16px'>
            Create
          </SubmitButtonRecRadSolidBlue>
          <ButtonRecRadSolidBlue onClickHandler={cancelHandler}>
            Cancel
          </ButtonRecRadSolidBlue>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
