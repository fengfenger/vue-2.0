<style lang="scss">
@import '../styles/view_page/home.scss';
</style>
<template>
<div>
    <div>我是首页</div>
    <div class="">
        <p v-for="item in list">
            {{item.content}}
        </p>
    </div>
</div>
</template>
<script>
import Vue from 'vue';
import { mapState } from 'vuex'

	export default {
		created(){
			//获取数据
			this.getHomeList();
		},
		computed:{
			list(){
				return this.$store.state.home.homeList
			}
		},
		methods: {
			getHomeList(){
				this.$store.dispatch('getHomeData');
			}
		},
	}
</script>
