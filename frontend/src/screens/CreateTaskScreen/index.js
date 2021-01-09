import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import Message from '../../components/Message';
import PageTitle from '../../components/PageTitle';
import Tag from '../../components/Tag';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../actions/taskActions';
import './styles.scss';

const CreateTask = ({ history }) => {
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [completed, setCompleted] = useState(false);
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

  console.log(dueDate);

  return (
    <div>
      <PageTitle title={'Create New Task'} />
      <form onSubmit={submitHandler}>
        <div className='create-task__form'>
          <div className='create-task__form__input--checkbox bg-blue'>
            <span onClick={() => setCompleted(!completed)}>
              <label>COMPLETED</label>
              {completed ? (
                <span className='check-icon__circle'>
                  <FontAwesomeIcon icon={faCheckCircle} />
                </span>
              ) : (
                <span className='check-icon__circle'>
                  <FontAwesomeIcon icon={faCircle} />
                </span>
              )}
            </span>
          </div>
          <div className='create-task__form__group-input'>
            <label>Description</label>
            <input
              className='create-task__form__input input__box'
              type='text'
              name='description'
              value={description}
              placeholder='Enter description'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='create-task__form__group-input'>
            <label>Details</label>
            <textarea
              className='create-task__form__input input__boxarea'
              type='text'
              name='details'
              rows='4'
              value={details}
              placeholder='Enter details'
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
          <div className='create-task__form__group-input'>
            <label>Due Date</label>
            <input
              className='create-task__form__input input__box--short'
              type='date'
              name='dueDate'
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className='create-task__form__group-input'>
            <label>Tags</label>
            <div className='inline'>
              <input
                className='create-task__form__input input__box'
                type='text'
                name='tag'
                value={tag}
                placeholder='Enter new tag'
                onChange={(e) => setTag(e.target.value)}
              />
              <button
                type='button'
                className='button--rec-solid-grey'
                onClick={addTagHandler}
              >
                Add Tag
              </button>
            </div>
            {message && <Message>{message}</Message>}
            {tags && (
              <div className='tags'>
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    tagName={tag}
                    removeTagHandler={removeTagHandler}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {error && <Message>{error}</Message>}
        <div className='create-task__form__group-button'>
          <button className='create-task__form__button' type='submit'>
            Create
          </button>
          <button
            className='create-task__form__button'
            onClick={() => history.push('/dashboard')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
