import {
	HOME_FETCH_ALL_LIST,
    HOME_SET_ACTIVITY_PROJECT_LIST
} from '../mutation-types'

import api from '../../api/index.js';

export const getHomeData = ({ commit, dispatch, state }, product) => {
	api.getHometData({
		deviceinfo: '{"aid":"30001001"}',
		videoId: 1604,
	}).then((response)=>{
		var data = response.data.data.messageModelList;
		commit('HOME_FETCH_ALL_LIST',data);
	}).then(()=>{
		console.log(state.homeList);
	})
}
