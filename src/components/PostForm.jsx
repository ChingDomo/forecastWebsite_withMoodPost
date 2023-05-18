import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    Input,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import { getMoodIcon } from 'utilities/weather.js';
import {
    createPost,     // mood, text V
    input,          // value
    inputDanger,    // danger
    toggleMood,     // Nein
    setMoodToggle,  // toggle
    selectMood      // mood
} from 'states/post-actions.js';

import './PostForm.css';
import { useDispatch, connect, useSelector } from 'react-redux';

function PostForm(props) {
    const inputEl = useRef(null);

    // TODO

    // 【chun】
    // const {
    //     inputValue
    //     // moodToggle
    // } = useSelector((state) => ({
    //     ...state.post
    // }))
    // 【domo】
    const [mood, setMood] = useState('na')
    const [inputValue, setInputValue] = useState('')
    const [inputDangerClass, setInputDanger] = useState(false)
    const [moodToggle, setMoodToggle] = useState(false)
    const dispatch = useDispatch()

    // 【CHUN】
    useEffect(() => {
        dispatch(selectMood(mood));
    }, [mood, dispatch]);

    useEffect(() => {
        if (props.inputValue !== '') {
            dispatch(input(inputValue));
        }
    }, [inputValue, dispatch]);

    const handleInputChange = (e) => {
        const text = e.target.value
        setInputValue(text)
        dispatch(input(text));
        if (text) {
            setInputDanger(false)
            dispatch(inputDanger(inputDanger))
        }
    };

    const handleMoodToggle = () => {
        setMoodToggle(!moodToggle);
        dispatch(toggleMood());
    }

    const handleDropdownSelect = (mmood) => {
        setMood(mmood)
        dispatch(selectMood(mmood))
    }

    const handlePost = () => {
        if (mood === 'na') {
            dispatch(setMoodToggle(true));
            return;
        }
        if (!inputValue) {
            dispatch(inputDanger(true))
            return;
        }

        dispatch(createPost(mood, inputValue))
        setMood('na')
        setInputValue('')
    }

    return (
        <div className="post-form">
            <Alert color='info' className={`d-flex flex-column flex-sm-row justify-content-center ${inputDangerClass}`}>
                <div className='mood align-self-start'>
                    <ButtonDropdown type='buttom' isOpen={moodToggle} toggle={handleMoodToggle}>
                        <DropdownToggle className='mood-toggle' type='button' caret color="secondary">
                            <i className={getMoodIcon(mood)}></i>&nbsp;{
                                mood === 'na' ? 'Mood' : mood
                            }
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Clear')}><i className={getMoodIcon('Clear')}></i>&nbsp;&nbsp;Clear</DropdownItem>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Clouds')}><i className={getMoodIcon('Clouds')}></i>&nbsp;&nbsp;Clouds</DropdownItem>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Drizzle')}><i className={getMoodIcon('Drizzle')}></i>&nbsp;&nbsp;Drizzle</DropdownItem>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Rain')}><i className={getMoodIcon('Rain')}></i>&nbsp;&nbsp;Rain</DropdownItem>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Thunder')}><i className={getMoodIcon('Thunder')}></i>&nbsp;&nbsp;Thunder</DropdownItem>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Snow')}><i className={getMoodIcon('Snow')}></i>&nbsp;&nbsp;Snow</DropdownItem>
                            <DropdownItem type='button' onClick={() => handleDropdownSelect('Windy')}><i className={getMoodIcon('Windy')}></i>&nbsp;&nbsp;Windy</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                </div>
                <Input className='input' type='textarea' innerRef={inputEl} value={inputValue} onChange={handleInputChange} placeholder="What's on your mind?"></Input>
                <Button className='btn-post align-self-end' color="info" onClick={handlePost}>Post</Button>
            </Alert>
        </div>
    );
};

PostForm.propTypes = {
    inputValue: PropTypes.string,
    inputDanger: PropTypes.bool,
    moodToggle: PropTypes.bool,
    mood: PropTypes.string,
    dispatch: PropTypes.func,
};

export default connect((state) => {
    // TODO
    return {
        ...state.PostForm,
    };
})(PostForm);


    // const handleInputChange = (e) => {
    //     const text = e.target.value
    //     dispatch(input(e.target.value));
    //     if (text) {
    //         dispatch(inputDanger(inputDanger))
    //     }
    // };

    // const handleMoodToggle = () => {
    //     setMoodToggle(!moodToggle);
    //     dispatch(toggleMood());
    // }



    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     inputEl.current.blur();
    //     if (inputValue && inputValue.trim()) {
    //         dispatch(submitAction(inputValue, unit));
    //         setFormToggle(false);
    //     } else {
    //         dispatch(input(city));
    //     }
    // };
