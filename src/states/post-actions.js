// Redux 中，狀態被儲存在一個稱為 "store" 的單一物件中
// reducer是用來改變狀態的
// "action" 來描述你希望的改變，並將這些 actions 傳遞給 "reducer" 函數
// Reducer 會根據 action 的類型來決定如何處理狀態的變化，並返回一個新的狀態。這個新的狀態將取代原來的狀態，並成為 store 中的當前狀態

import {
    listPosts as listPostsFromApi,
    createPost as createPostFromApi,
    createVote as createVoteFromApi
} from 'api/posts.js';


/*  Posts */

function startLoading() {
    return {
        type: '@POST/START_LOADING'
    };
}

function endLoading() {
    return {
        type: '@POST/END_LOADING'
    };
}

function endListPosts(posts) {
    return {
        type: '@POST/END_LIST_POSTS',
        posts
    };
}

function endCreatePost(post) {
    return {
        type: '@POST/END_CREATE_POST',
        post
    };
}

function endCreateVote(post) {
    return {
        type: '@POST/END_CREATE_VOTE',
        post
    };
}


// dispatch 是 Redux store 物件上的方法，用於將 action 傳遞給 reducer 進行狀態更
export function listPosts(searchText) {
    return (dispatch, getState) => {
        dispatch(startLoading());
        return listPostsFromApi(searchText).then(posts => {
            dispatch(endListPosts(posts));
        }).catch(err => {
            console.error('Error listing posts', err);
        }).then(() => {
            dispatch(endLoading())
        });
    };
};

// handleCreatePost in today.jsx
export function createPost(mood, text) {
    return (dispatch, getState) => {
        //TODO
        dispatch(startLoading());

        return createPostFromApi(mood, text).then(post => {
            dispatch(listPosts())
            console.log("create post")
            console.log(post)
            dispatch(endCreatePost(post));
        }).catch(err => {
            console.error('Error creating post', err);
        }).then(() => dispatch(endLoading()));
    };
};


// handleCreateVote in today.jsx
export function createVote(id, mood) {
    //TODO
    return (dispatch, getState) => {
        dispatch(startLoading());
        // console.log("inside create vote")
        // console.log(id)
        return createVoteFromApi(id, mood).then(post => {    // ？
            // console.log("post:")
            // console.log(post)
            dispatch(listPosts());
            dispatch(endCreateVote(post));
        }).catch(err => {
            console.error('Error creating vote', err);
        }).then(() => {
            dispatch(endLoading());
        });
    };
};

/*  Search text */

// handle 
export function setSearchText(searchText) {
    // console.log(searchText)
    // TODO
    return {
        type: '@SEARCHPOST/setSearchText',
        searchText
    }
}

/*  Post Form */

// this.state & handleInputChange
export function input(value) {
    //TODO
    return {
        type: '@POSTFORM/input',
        value
    }
};

// handleInputChange-> use to check wheather there is "input" or not
export function inputDanger(danger) {
    //TODO
    return {
        type: '@POSTFORM/inputDanger',
        danger
    }
};

// handleMoodToggle
export function toggleMood() {
    //TODO
    return {
        type: '@POSTFORM/toggleMood'
    }
};

// IDK maybe setMoodToggle = handlePost - createPost or this.state
export function setMoodToggle(toggle) {
    //TODO
    return {
        type: 'POSTFORM/setMoodToggle',
        toggle
    }
};

// hanleDropdownSelect
export function selectMood(mood) {
    //TODO
    return {
        type: 'POSTFORM/selectMood',
        mood
    }
};

/*  Post item */

// handle toggleTooltip
export function toggleTooltip(id) {
    //TODO
    return {
        type: 'POSTITEM/toggleTooltip',
        id
    }
};

// this.state
export function setTooltipToggle(id, toggle) {
    //TODO
    return {

        type: 'POSTITEM/setTooltipToggle',
        id,
        toggle
    }
};
