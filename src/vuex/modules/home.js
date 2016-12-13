import {
	HOME_FETCH_ALL_LIST
} from '../mutation-types'


import * as actions from '../actions/home.js';

const state = {
		homeList:[],
}

const mutations = {
	[HOME_FETCH_ALL_LIST] (state, dataList) {
		state.homeList = dataList;
	}
}

export default {
	state,
	mutations,
	actions
}
