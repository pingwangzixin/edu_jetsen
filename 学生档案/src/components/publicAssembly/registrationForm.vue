<template>
	<div id="pdfDom">
		<div class="wd">
			<!-- 头部 -->
			<h3 class="wd_h3">
				{{ this.arr[0].stuName.content2 }}
				<span v-show="isShow">{{ xuehao }}</span>
				<!-- <input v-show="!isShow" type="text" name id v-model="xuehao1" /> -->
				<!-- <button v-show="!isShow" @click="queding">确定</button> -->
				<!-- <button v-show="!isShow" @click="quxiao">取消</button> -->
				<!-- <i class="iconfont iconceshi" v-show="isShow" @click="send" v-if="isS"></i> -->
			</h3>
			<p class="wd_daochu fr" v-if="isS">
				<!-- <span v-if="data.dengji == 3">上传</span> -->
				<!-- <b v-if="data.dengji == 3">丨</b> -->
				<span @click="daochu1">导出</span>
			</p>
			<!-- 基本信息 -->
			<div class="wd_title clearfix">
				<p class="fl">基本信息</p>
				<p class="duan fl" :class="isShowBianji ? '' : 'active'" v-if="isS"></p>
				<p class="chang fl" v-if="!isS"></p>
				<div class="fr" v-if="isS" v-show="!isShowBianji" @click="quxiao1"><p>取消</p></div>
				<div class="fr" v-if="isS" v-show="!isShowBianji" @click="queding1"><p>确定</p></div>
				<div class="fr" v-if="isS" v-show="isShowBianji" @click="send1"><p>编辑</p></div>
			</div>
			<table cellspacing="0" class="wd_tab_jbxx">
				<tr v-for="(item, index) in arr" :key="index">
					<td v-for="(item1, index1) in item" :key="index1" :colspan="item1.heng" :rowspan="item1.lie" :class="item1.cla">
						{{ item1.content}}
						<span v-show="!isShowXinxi">{{ item1.content2 }}</span>
						<input v-if="item1.ifShow" v-show="isShowXinxi" type="text" name id v-model="item1.content1" />
						<input type="date" name id @keypress.prevent v-model="item1.content1" v-show="isShowXinxi" v-if="item1.shijian" max="2019-09-01" />
						<img width="90" height="136"  v-if="item1.img" :src="item1.imgUrl" :title="index==0?'入学照片':'毕业照片'"  alt/>
						<div v-show="isShowXinxi"><input type="file" :ref="'shangc' + index" :id="'sc' + index" v-if="item1.shangchuan" @change="getFileContent(index, index1)" />
						<label :for="'sc' + index" v-if="item1.shangchuan" v-show="isShowXinxi"><i class="iconfont iconshangchuan"></i>上传</label></div>
						<select name id v-if="item1.sec" v-show="isShowXinxi" v-model="item1.content1">
							<option value="男">男</option>
							<option value="女">女</option>
						</select>
					</td>
				</tr>
			</table>

			<!-- 学业成绩 -->
			<div class="wd_title clearfix">
				<p class="fl">学业成绩</p>
				<p class="fl duan" :class="isShowBianji1 ? '' : 'active'" v-if="isS"></p>
				<p class="chang fl" v-if="!isS"></p>
				<div class="fr" v-show="!isShowBianji1" v-if="isS" @click="quxiao2"><p>取消</p></div>
				<div class="fr" v-show="!isShowBianji1" v-if="isS" @click="queding2"><p>确定</p></div>
				<div class="fr" v-show="isShowBianji1" v-if="isS" @click="send2"><p>编辑</p></div>
			</div>
			<table cellspacing="0" class="wd_tab_jbxx">
				<tr v-for="(item, index) in arr1" :key="index">
					<td v-for="(item1, index1) in item" :key="index1" :colspan="item1.heng" :rowspan="item1.lie" :class="item1.cla">
						{{ item1.content }}
						<span v-show="!isShowChengji" v-text="item1.content2"></span>
						<input v-if="item1.ifShow" v-show="isShowChengji" type="text" name id v-model="item1.content1" />
					</td>
				</tr>
			</table>

			<!-- 综合评价 -->
			<div class="wd_title clearfix">
				<p class="fl">综合评价</p>
				<p class="fl duan" :class="isShowBianji2 ? '' : 'active'" v-if="isS"></p>
				<p class="chang fl" v-if="!isS"></p>
				<div class="fr" v-show="!isShowBianji2" @click="quxiao3" v-if="isS"><p>取消</p></div>
				<div class="fr" v-show="!isShowBianji2" @click="queding3" v-if="isS"><p>确定</p></div>
				<div class="fr" v-show="isShowBianji2" @click="send3" v-if="isS"><p>编辑</p></div>
			</div>
			<table cellspacing="0" class="wd_tab_jbxx">
				<tr v-for="(item, index) in arr2" :key="index">
					<td v-for="(item1, index1) in item" :key="index1" :colspan="item1.heng" :rowspan="item1.lie" :class="item1.cla">
						{{ item1.content }}
						<span :class="item1.ifShowText ? 'pingl' : ''" v-show="!isShowPingjia">{{ item1.content2 }}</span>
						<input v-if="item1.ifShow" v-show="isShowPingjia" type="text" v-model="item1.content1" />
						<textarea v-if="item1.ifShowText" v-show="isShowPingjia" name id v-model="item1.content1"></textarea>
					</td>
				</tr>
			</table>

			<!-- 体检数据 -->
			<div  class="wd_title clearfix">
				<p class="fl">体检数据</p>
				<p class="fl duan" :class="isShowBianji3 ? '' : 'active'" v-if="isS"></p>
				<p class="chang fl" v-if="!isS"></p>
				<div class="fr" v-show="!isShowBianji3" @click="quxiao4" v-if="isS"><p>取消</p></div>
				<div class="fr" v-show="!isShowBianji3" @click="queding4" v-if="isS"><p>确定</p></div>
				<div class="fr" v-show="isShowBianji3" @click="send4" v-if="isS"><p>编辑</p></div>
			</div>
			<table cellspacing="0" class="wd_tab_jbxx">
				<tr v-for="(item, index) in arr3" :key="index">
					<td v-for="(item1, index1) in item" :key="index1" :colspan="item1.heng" :rowspan="item1.lie" :class="item1.cla">
						{{ item1.content }}
						<span :class="item1.ifShowText ? 'pingl' : ''" v-show="!isShowTijian">{{ item1.content2 }}</span>
						<input v-if="item1.ifShow" v-show="isShowTijian" type="text" name id v-model="item1.content1" />
						<textarea v-if="item1.ifShowText" v-show="isShowTijian" name id v-model="item1.content1"></textarea>
					</td>
				</tr>
			</table>

			<!-- 体质健康 -->
			<div class="wd_title clearfix">
				<p class="fl">体制健康</p>
				<p class="fl duan" :class="isShowBianji4 ? '' : 'active'" v-if="isS"></p>
				<p class="chang fl" v-if="!isS"></p>
				<div class="fr" v-show="!isShowBianji4" @click="quxiao5" v-if="isS"><p>取消</p></div>
				<div class="fr" v-show="!isShowBianji4" @click="queding5" v-if="isS"><p>确定</p></div>
				<div class="fr" v-show="isShowBianji4" @click="send5" v-if="isS"><p>编辑</p></div>
			</div>
			<table cellspacing="0" class="wd_tab_jbxx">
				<tr v-for="(item, index) in arr4" :key="index">
					<td v-for="(item1, index1) in item" :key="index1" :colspan="item1.heng" :rowspan="item1.lie" :class="item1.cla">
						{{ item1.content }}
						<span v-show="!isShowJiankang">{{ item1.content2 }}</span>
						<input v-if="item1.ifShow" v-show="isShowJiankang" type="text" name id v-model="item1.content1" />
					</td>
				</tr>
			</table>

			<!-- 操行记录 -->
			<div class="wd_title clearfix">
				<p class="fl">操行记录</p>
				<p class="fl duan" :class="isShowBianji5 ? '' : 'active'" v-if="isS"></p>
				<p class="chang fl" v-if="!isS"></p>
				<div class="fr" v-show="!isShowBianji5" @click="quxiao6" v-if="isS"><p>取消</p></div>
				<div class="fr" v-show="!isShowBianji5" @click="queding6" v-if="isS"><p>确定</p></div>
				<div class="fr" v-show="isShowBianji5" @click="send6" v-if="isS"><p>编辑</p></div>
			</div>
			<table cellspacing="0" class="wd_tab_jbxx">
				<tr v-for="(item, index) in arr5" :key="index">
					<td v-for="(item1, index1) in item" :key="index1" :colspan="item1.heng" :rowspan="item1.lie" :class="item1.cla">
						{{ item1.content }}
						<span v-show="!isShowCaoxing">{{ item1.content2 }}</span>
						<input v-if="item1.ifShow" v-show="isShowCaoxing" type="text" name id v-model="item1.content1" />
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
import { record,configure } from '@/api';
export default {
	name: 'registrationForm',
	data() {
		return {
			data:{
				stuNo:null,
				stuName:null,
				dangqian:{
					name:null
				},
				nianji:{
					gradeName:null
				},
				banji:{
					classId:null
				}
			},
			isS: false,
			// 基本信息的数据
			arr: [
				{
					stuName1: {
						content: '姓名',
						cla: 'huise'
					},
					stuName: {
						content2: '',
						content1: '',
						ifShow: true
					},
					stuSex1: {
						content: '性别',
						cla: 'huise'
					},
					stuSex: {
						content2: '',
						ifShow: false,
						content1: '',
						sec: true
					},
					stuBirthday1: {
						content: '出生年月',
						cla: 'huise'
					},
					stuBirthday: {
						content2: '',
						heng: 2,
						ifShow: false,
						content1: '',
						shijian: true
					},
					zhaopian: {
						cla: 'tupian',
						ifShow: false,
						lie: 4,
						shangchuan: true,
						img:true,
						imgUrl:null
					}
				},
				{
					stuNation1: {
						content: '名族',
						cla: 'huise'
					},
					stuNation: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					stuDateJoinYouth1: {
						content: '入团时间',
						cla: 'huise'
					},
					stuDateJoinYouth: {
						content2: '',

						ifShow: false,
						content1: '',
						shijian: true
					},
					stuNativePlace1: {
						content: '籍贯',
						cla: 'huise'
					},
					stuNativePlace: {
						content2: '',
						ifShow: true,
						content1: '',
						heng: 2
					}
				},
				{
					stuCardId1: {
						content: '身份证号',
						cla: 'huise'
					},
					stuCardId: {
						content2: '',
						heng: 6,
						ifShow: true,
						content1: ''
					}
				},
				[
					{
						content: '家庭主要成员',
						lie: 4
					},
					{
						content: '称谓'
					},
					{
						content: '姓名'
					},
					{
						content: '工作单位及职务',
						heng: 2
					},
					{
						content: '电话',
						heng: 2
					}
				],
				{
					named: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					name: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					work: {
						content2: '',
						heng: 2,
						ifShow: true,
						content1: ''
					},
					tel: {
						content2: '',
						heng: 2,
						ifShow: true,
						content1: ''
					},
					zhaopian: {
						lie: 4,
						cla: 'tupian',
						ifShow: false,
						shangchuan: true,
						img:true,
						imgUrl:null
					}
				},
				{
					named: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					name: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					work: {
						content2: '',
						heng: 2,
						ifShow: true,
						content1: ''
					},
					tel: {
						content2: '',
						heng: 2,
						ifShow: true,
						content1: ''
					}
				},
				{
					named: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					name: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					work: {
						content2: '',
						heng: 2,
						ifShow: true,
						content1: ''
					},
					tel: {
						content2: '',
						heng: 2,
						ifShow: true,
						content1: ''
					}
				},
				{
					stuFamiliyAdress1: {
						content: '家庭住址'
					},
					stuFamiliyAdress: {
						content2: '',
						heng: 3,
						ifShow: true,
						content1: ''
					},
					stuTel1: {
						content: '联系电话'
					},
					stuTel: {
						content2: '',
						heng: 2,
						ifShow: true,
						content1: ''
					}
				},
				{
					stuLocalPoliceStation1: {
						content: '所属派出所'
					},
					stuLocalPoliceStation: {
						content2: '',
						heng: 3,
						ifShow: true,
						content1: ''
					},
					stuSchool1: {
						content: '毕业小学'
					},
					stuSchool: {
						content2: '',
						heng: 3,
						ifShow: true,
						content1: ''
					}
				}
			],
			//学业成绩的数据
			arr1: [
				[
					{
						content: '',
						heng: 2
					},
					{
						content: '道德与法治'
					},
					{
						content: '语文'
					},
					{
						content: '数学'
					},
					{
						content: '外语'
					},
					{
						content: '物理'
					},
					{
						content: '化学'
					},
					{
						content: '生物'
					},
					{
						content: '历史'
					},
					{
						content: '地理'
					},
					{
						content: '体育与健康'
					},
					{
						content: '音乐'
					},
					{
						content: '美术'
					},
					{
						content: '信息技术'
					},
					{
						content: '劳动与技术'
					},
					{
						content: '研究性学习'
					}
				],
				{
					dyxn:{
						content: '第一学年',
						lie: 3
					},
					dyxq:{
						content: '第一学期'
					},
					daodeyufazhi:{
						content2: '',
						content1: '',
						ifShow: true
					},
					yuwen:{
						content2: '',
						content1: '',
						ifShow: true
					},
					shuxue:{
						content2: '',
						content1: '',
						ifShow: true
					},
					waiyu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					wuli:{
						content2: '',
						content1: '',
						ifShow: true
					},
					huaxue:{
						content2: '',
						content1: '',
						ifShow: true
					},
					shengwu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					lishi:{
						content2: '',
						content1: '',
						ifShow: true
					},
					dili:{
						content2: '',
						content1: '',
						ifShow: true
					},
					tiyuyujiankang:{
						content2: '',
						content1: '',
						ifShow: true
					},
					yinle:{
						content2: '',
						content1: '',
						ifShow: true
					},
					meishu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					xinxijishu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					laodongyujishu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					yanjiuxingxuexi:{
						content2: '',
						content1: '',
						ifShow: true
					}
				},
				{
					dexq:{
						content: '第二学期'
					},
					daodeyufazhi:{
						content2: '',
						content1: '',
						ifShow: true
					},
					yuwen:{
						content2: '',
						content1: '',
						ifShow: true
					},
					shuxue:{
						content2: '',
						content1: '',
						ifShow: true
					},
					waiyu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					wuli:{
						content2: '',
						content1: '',
						ifShow: true
					},
					huaxue:{
						content2: '',
						content1: '',
						ifShow: true
					},
					shengwu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					lishi:{
						content2: '',
						content1: '',
						ifShow: true
					},
					dili:{
						content2: '',
						content1: '',
						ifShow: true
					},
					tiyuyujiankang:{
						content2: '',
						content1: '',
						ifShow: true
					},
					yinle:{
						content2: '',
						content1: '',
						ifShow: true
					},
					meishu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					xinxijishu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					laodongyujishu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					yanjiuxingxuexi:{
						content2: '',
						content1: '',
						ifShow: true
					}
				},
				{
					xnzp:{
						content: '学年总评'
					},
					daodeyufazhi:{
						content2: '',
						content1: '',
						ifShow: true
					},
					yuwen:{
						content2: '',
						content1: '',
						ifShow: true
					},
					shuxue:{
						content2: '',
						content1: '',
						ifShow: true
					},
					waiyu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					wuli:{
						content2: '',
						content1: '',
						ifShow: true
					},
					huaxue:{
						content2: '',
						content1: '',
						ifShow: true
					},
					shengwu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					lishi:{
						content2: '',
						content1: '',
						ifShow: true
					},
					dili:{
						content2: '',
						content1: '',
						ifShow: true
					},
					tiyuyujiankang:{
						content2: '',
						content1: '',
						ifShow: true
					},
					yinle:{
						content2: '',
						content1: '',
						ifShow: true
					},
					meishu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					xinxijishu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					laodongyujishu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					yanjiuxingxuexi:{
						content2: '',
						content1: '',
						ifShow: true
					}
		    	},
				{
					dexn:{
						content: '第二学年',
						lie: 3
					},
					dyxq:{
						content: '第一学期'
					},
					daodeyufazhi:{
						content2: '',
						content1: '',
						ifShow: false
					},
					yuwen:{
						content2: '',
						content1: '',
						ifShow: false
					},
					shuxue:{
						content2: '',
						content1: '',
						ifShow: false
					},
					waiyu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					wuli:{
						content2: '',
						content1: '',
						ifShow: false
					},
					huaxue:{
						content2: '',
						content1: '',
						ifShow: false
					},
					shengwu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					lishi:{
						content2: '',
						content1: '',
						ifShow: false
					},
					dili:{
						content2: '',
						content1: '',
						ifShow: false
					},
					tiyuyujiankang:{
						content2: '',
						content1: '',
						ifShow: false
					},
					yinle:{
						content2: '',
						content1: '',
						ifShow: false
					},
					meishu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					xinxijishu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					laodongyujishu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					yanjiuxingxuexi:{
						content2: '',
						content1: '',
						ifShow: false
					}
				},
				{
					dexq:{
						content: '第二学期'
					},
					daodeyufazhi:{
						content2: '',
						content1: '',
						ifShow: false
					},
					yuwen:{
						content2: '',
						content1: '',
						ifShow: false
					},
					shuxue:{
						content2: '',
						content1: '',
						ifShow: false
					},
					waiyu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					wuli:{
						content2: '',
						content1: '',
						ifShow: false
					},
					huaxue:{
						content2: '',
						content1: '',
						ifShow: false
					},
					shengwu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					lishi:{
						content2: '',
						content1: '',
						ifShow: false
					},
					dili:{
						content2: '',
						content1: '',
						ifShow: false
					},
					tiyuyujiankang:{
						content2: '',
						content1: '',
						ifShow: false
					},
					yinle:{
						content2: '',
						content1: '',
						ifShow: false
					},
					meishu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					xinxijishu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					laodongyujishu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					yanjiuxingxuexi:{
						content2: '',
						content1: '',
						ifShow: false
					}
				},
				{
					xnzp:{
						content: '学年总评'
					},
					daodeyufazhi:{
						content2: '',
						content1: '',
						ifShow: false
					},
					yuwen:{
						content2: '',
						content1: '',
						ifShow: false
					},
					shuxue:{
						content2: '',
						content1: '',
						ifShow: false
					},
					waiyu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					wuli:{
						content2: '',
						content1: '',
						ifShow: false
					},
					huaxue:{
						content2: '',
						content1: '',
						ifShow: false
					},
					shengwu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					lishi:{
						content2: '',
						content1: '',
						ifShow: false
					},
					dili:{
						content2: '',
						content1: '',
						ifShow: false
					},
					tiyuyujiankang:{
						content2: '',
						content1: '',
						ifShow: false
					},
					yinle:{
						content2: '',
						content1: '',
						ifShow: false
					},
					meishu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					xinxijishu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					laodongyujishu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					yanjiuxingxuexi:{
						content2: '',
						content1: '',
						ifShow: false
					}
		    	},
				{
					dsxn:{
						content: '第三学年',
						lie: 3
					},
					dyxq:{
						content: '第一学期'
					},
					daodeyufazhi:{
						content2: '',
						content1: '',
						ifShow: false
					},
					yuwen:{
						content2: '',
						content1: '',
						ifShow: false
					},
					shuxue:{
						content2: '',
						content1: '',
						ifShow: false
					},
					waiyu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					wuli:{
						content2: '',
						content1: '',
						ifShow: false
					},
					huaxue:{
						content2: '',
						content1: '',
						ifShow: false
					},
					shengwu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					lishi:{
						content2: '',
						content1: '',
						ifShow: false
					},
					dili:{
						content2: '',
						content1: '',
						ifShow: false
					},
					tiyuyujiankang:{
						content2: '',
						content1: '',
						ifShow: false
					},
					yinle:{
						content2: '',
						content1: '',
						ifShow: false
					},
					meishu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					xinxijishu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					laodongyujishu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					yanjiuxingxuexi:{
						content2: '',
						content1: '',
						ifShow: false
					}
				},
				{
					dexq:{
						content: '第二学期'
					},
					daodeyufazhi:{
						content2: '',
						content1: '',
						ifShow: false
					},
					yuwen:{
						content2: '',
						content1: '',
						ifShow: false
					},
					shuxue:{
						content2: '',
						content1: '',
						ifShow: false
					},
					waiyu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					wuli:{
						content2: '',
						content1: '',
						ifShow: false
					},
					huaxue:{
						content2: '',
						content1: '',
						ifShow: false
					},
					shengwu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					lishi:{
						content2: '',
						content1: '',
						ifShow: false
					},
					dili:{
						content2: '',
						content1: '',
						ifShow: false
					},
					tiyuyujiankang:{
						content2: '',
						content1: '',
						ifShow: false
					},
					yinle:{
						content2: '',
						content1: '',
						ifShow: false
					},
					meishu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					xinxijishu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					laodongyujishu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					yanjiuxingxuexi:{
						content2: '',
						content1: '',
						ifShow: false
					}
				},
				{
					xnzp:{
						content: '学年总评'
					},
					daodeyufazhi:{
						content2: '',
						content1: '',
						ifShow: false
					},
					yuwen:{
						content2: '',
						content1: '',
						ifShow: false
					},
					shuxue:{
						content2: '',
						content1: '',
						ifShow: false
					},
					waiyu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					wuli:{
						content2: '',
						content1: '',
						ifShow: false
					},
					huaxue:{
						content2: '',
						content1: '',
						ifShow: false
					},
					shengwu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					lishi:{
						content2: '',
						content1: '',
						ifShow: false
					},
					dili:{
						content2: '',
						content1: '',
						ifShow: false
					},
					tiyuyujiankang:{
						content2: '',
						content1: '',
						ifShow: false
					},
					yinle:{
						content2: '',
						content1: '',
						ifShow: false
					},
					meishu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					xinxijishu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					laodongyujishu:{
						content2: '',
						content1: '',
						ifShow: false
					},
					yanjiuxingxuexi:{
						content2: '',
						content1: '',
						ifShow: false
					}
		    	},
				{
					biye:{
						content: '毕业会考成绩',
						heng: 2
					},
					daodeyufazhi:{
						content2: '',
						content1: '',
						ifShow: true
					},
					yuwen:{
						content2: '',
						content1: '',
						ifShow: true
					},
					shuxue:{
						content2: '',
						content1: '',
						ifShow: true
					},
					waiyu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					wuli:{
						content2: '',
						content1: '',
						ifShow: true
					},
					huaxue:{
						content2: '',
						content1: '',
						ifShow: true
					},
					shengwu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					lishi:{
						content2: '',
						content1: '',
						ifShow: true
					},
					dili:{
						content2: '',
						content1: '',
						ifShow: true
					},
					tiyuyujiankang:{
						content2: '',
						content1: '',
						ifShow: true
					},
					yinle:{
						content2: '',
						content1: '',
						ifShow: true
					},
					meishu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					xinxijishu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					laodongyujishu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					yanjiuxingxuexi:{
						content2: '',
						content1: '',
						ifShow: true
					}
				},
				{
					shengxue:{
						content: '升学会考成绩',
						heng: 2
					},
					daodeyufazhi:{
						content2: '',
						content1: '',
						ifShow: true
					},
					yuwen:{
						content2: '',
						content1: '',
						ifShow: true
					},
					shuxue:{
						content2: '',
						content1: '',
						ifShow: true
					},
					waiyu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					wuli:{
						content2: '',
						content1: '',
						ifShow: true
					},
					huaxue:{
						content2: '',
						content1: '',
						ifShow: true
					},
					shengwu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					lishi:{
						content2: '',
						content1: '',
						ifShow: true
					},
					dili:{
						content2: '',
						content1: '',
						ifShow: true
					},
					tiyuyujiankang:{
						content2: '',
						content1: '',
						ifShow: true
					},
					yinle:{
						content2: '',
						content1: '',
						ifShow: true
					},
					meishu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					xinxijishu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					laodongyujishu:{
						content2: '',
						content1: '',
						ifShow: true
					},
					yanjiuxingxuexi:{
						content2: '',
						content1: '',
						ifShow: true
					}
				}
			],
			//综合评价
			arr2: [
				[
					{
						content: '第一学年',
						lie: 3
					},
					{
						content2: ''
					},
					{
						content: '道德品质'
					},
					{
						content: '公明素养'
					},
					{
						content: '学习能力'
					},
					{
						content: '交流与合作'
					},
					{
						content: '运动与健康'
					},
					{
						content: '审美与表现'
					},
					{
						content: '等第'
					},
					{
						content: '班主任'
					}
				],
				{
					dengdeng: {
						content: '等第'
					},
					pinde: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					suyang: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					xueye: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					shehui: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					xingqu: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					shenxin: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					level: {
						content2: '',
						lie: 2,
						ifShow: true,
						content1: ''
					},
					headmaster: {
						content2: '',
						lie: 2,
						ifShow: true,
						content1: ''
					}
				},
				{
					pingyu11: {
						content: '评语',
						cla: 'gao1'
					},
					pingyu: {
						content2: '',
						heng: 6,
						ifShowText: true,
						content1: ''
					}
				},
				[
					{
						content: '第二学年',
						lie: 3
					},
					{
						content2: ''
					},
					{
						content: '道德品质'
					},
					{
						content: '公明素养'
					},
					{
						content: '学习能力'
					},
					{
						content: '交流与合作'
					},
					{
						content: '运动与健康'
					},
					{
						content: '审美与表现'
					},
					{
						content: '等第'
					},
					{
						content: '班主任'
					}
				],
				{
					dengdeng: {
						content: '等第'
					},
					pinde: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					suyang: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					xueye: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					shehui: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					xingqu: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					shenxin: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					level: {
						content2: '',
						lie: 2,
						ifShow: false,
						content1: ''
					},
					headmaster: {
						content2: '',
						lie: 2,
						ifShow: false,
						content1: ''
					}
				},
				{
					pingyu11: {
						content: '评语',
						cla: 'gao1'
					},
					pingyu: {
						content2: '',
						heng: 6,
						ifShowText: false,
						content1: ''
					}
				},
				[
					{
						content: '第三学年',
						lie: 3
					},
					{
						content2: ''
					},
					{
						content: '道德品质'
					},
					{
						content: '公明素养'
					},
					{
						content: '学习能力'
					},
					{
						content: '交流与合作'
					},
					{
						content: '运动与健康'
					},
					{
						content: '审美与表现'
					},
					{
						content: '等第'
					},
					{
						content: '班主任'
					}
				],
				{
					dengdeng: {
						content: '等第'
					},
					pinde: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					suyang: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					xueye: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					shehui: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					xingqu: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					shenxin: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					level: {
						content2: '',
						lie: 2,
						ifShow: false,
						content1: ''
					},
					headmaster: {
						content2: '',
						lie: 2,
						ifShow: false,
						content1: ''
					}
				},
				{
					pingyu11: {
						content: '评语',
						cla: 'gao1'
					},
					pingyu: {
						content2: '',
						heng: 6,
						ifShowText: false,
						content1: ''
					}
				},
				[
					{
						content: '奖惩情况',
						heng: 2,
						lie: 2
					},
					{
						content: '第一学年',
						heng: 2
					},
					{
						content: '第二学年',
						heng: 3
					},
					{
						content: '第三学年',
						heng: 3
					}
				],
				{
					jiangcheng1: {
						content2: '',
						heng: 2,
						ifShow: true,
						content1: ''
					},
					jiangcheng2: {
						content2: '',
						heng: 3,
						ifShow: false,
						content1: ''
					},
					jiangcheng3: {
						content2: '',
						heng: 3,
						ifShow: false,
						content1: ''
					}
				}
			],
			//体检数据的数据
			arr3: [
				[
					{
						content: '第一学年',
						heng: 4
					},
					{
						content: '第二学年',
						heng: 4
					},
					{
						content: '第三学年',
						heng: 4
					}
				],
				[
					{
						content: '视力',
						heng: 2
					},
					{
						content: '身高（cm）',
						lie: 2
					},
					{
						content: '体重（kg）',
						lie: 2
					},
					{
						content: '视力',
						heng: 2
					},
					{
						content: '身高（cm）',
						lie: 2
					},
					{
						content: '体重（kg）',
						lie: 2
					},
					{
						content: '视力',
						heng: 2
					},
					{
						content: '身高（cm）',
						lie: 2
					},
					{
						content: '体重（kg）',
						lie: 2
					}
				],
				[
					{
						content: '左'
					},
					{
						content: '右'
					},
					{
						content: '左'
					},
					{
						content: '右'
					},
					{
						content: '左'
					},
					{
						content: '右'
					}
				],
				{
					leftEye1: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					rightEye1: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					stuHeight1: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					stuWeight1: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					leftEye2: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					rightEye2: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stuHeight2: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stuWeight2: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					leftEye3: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					rightEye3: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stuHeight3: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stuWeight3: {
						content2: '',
						ifShow: false,
						content1: ''
					}
				},
				[
					{
						content: '疾病',
						heng: 4
					},
					{
						content: '疾病',
						heng: 4
					},
					{
						content: '疾病',
						heng: 4
					}
				],
				{
					remark1: {
						content2: '',
						heng: 4,
						cla: 'gao2',
						ifShowText: true,
						content1: ''
					},
					remark2: {
						content2: '',
						heng: 4,
						ifShowText: false,
						content1: ''
					},
					remark3: {
						content2: '',
						heng: 4,
						ifShowText: false,
						content1: ''
					}
				}
			],
			//体质健康的数据
			arr4: [
				[
					{
						content2: '',
						heng: 2,
						lie: 2
					},
					{
						content: '基础项目',
						heng: 7
					},
					{
						content: '加分项目',
						heng: 2
					},
					{
						content: '学年得分',
						lie: 2,
						cla: 'xuenian'
					},
					{
						content: '身高（cm）',
						lie: 2
					},
					{
						content: '体重（kg）',
						lie: 2
					}
				],
				[
					{
						content: '体重指数（BMI）（kg/m2)'
					},
					{
						content: '肺活量（ml）'
					},
					{
						content: '50米跑（s）'
					},
					{
						content: '坐位体前屈（cm）'
					},
					{
						content: '立定跳远（cm）'
					},
					{
						content: '一分钟仰卧起坐（次）'
					},
					{
						content: '800米跑（min·s）'
					},
					{
						content: '一分钟仰卧起坐（次）'
					},
					{
						content: '800米跑（min·s）'
					}
				],
				{
					dyxn: {
						content: '第一学年',
						lie: 3
					},
					chengji: {
						content: '成绩'
					},
					stuBmi: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					stufeihuoliang: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					sturun: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					stuzwqtq: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					stujump: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					stusitup: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					stulongrun: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					jiafen1: {
						content: ''
					},
					jiafen2: {
						content: ''
					},
					xueniancj: {
						content2: '',
					},
					stuHeight: {
						content2: '',
						lie: 3,
						ifShow: true,
						content1: ''
					},
					stuWeight: {
						content2: '',
						lie: 3,
						ifShow: true,
						content1: ''
					}
				},
				{
					defen: {
						content: '得分'
					},
					stubmiScore: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					stufeihuoliangScore: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					sturunScore: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					stuzwqtqScore: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					stujumpScore: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					stusitupScore: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					stulongrunScore: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					jiafen1: {
						content: ''
					},
					jiafen2: {
						content: ''
					},
					stutotalScore: {
						content2: '',
						ifShow: true,
						content1: ''
					}
				},
				{
					dengji: {
						content: '等级'
					},
					stubmiLevel: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					stufeihuoliangLevel: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					sturunLevel: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					stuzwqtqLevel: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					stujumpLevel: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					stusitupLevel: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					stulongrunLevel: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					jiafen1: {
						content: ''
					},
					jiafen2: {
						content: ''
					},
					stutotalLevel: {
						content2: '',
						ifShow: true,
						content1: ''
					}
				},
				{
					dyxn: {
						content: '第二学年',
						lie: 3
					},
					chengji: {
						content: '成绩'
					},
					stuBmi: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stufeihuoliang: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					sturun: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stuzwqtq: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stujump: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stusitup: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stulongrun: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					jiafen1: {
						content: ''
					},
					jiafen2: {
						content: ''
					},
					xueniancj: {
						content2: '',
					},
					stuHeight: {
						content2: '',
						lie: 3,
						ifShow: false,
						content1: ''
					},
					stuWeight: {
						content2: '',
						lie: 3,
						ifShow: false,
						content1: ''
					}
				},
				{
					defen: {
						content: '得分'
					},
					stubmiScore: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stufeihuoliangScore: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					sturunScore: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stuzwqtqScore: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stujumpScore: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stusitupScore: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stulongrunScore: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					jiafen1: {
						content: ''
					},
					jiafen2: {
						content: ''
					},
					stutotalScore: {
						content2: '',
						ifShow: false,
						content1: ''
					}
				},
				{
					dengji: {
						content: '等级'
					},
					stubmiLevel: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stufeihuoliangLevel: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					sturunLevel: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stuzwqtqLevel: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stujumpLevel: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stusitupLevel: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stulongrunLevel: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					jiafen1: {
						content: ''
					},
					jiafen2: {
						conten: ''
					},
					stutotalLevel: {
						content2: '',
						ifShow: false,
						content1: ''
					}
				},
				{
					dyxn: {
						content: '第三学年',
						lie: 3
					},
					chengji: {
						content: '成绩'
					},
					stuBmi: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stufeihuoliang: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					sturun: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stuzwqtq: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stujump: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stusitup: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stulongrun: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					jiafen1: {
						content: ''
					},
					jiafen2: {
						content: ''
					},
					xueniancj: {
						content2: '',
					},
					stuHeight: {
						content2: '',
						lie: 3,
						ifShow: false,
						content1: ''
					},
					stuWeight: {
						content2: '',
						lie: 3,
						ifShow: false,
						content1: ''
					}
				},
				{
					defen: {
						content: '得分'
					},
					stubmiScore: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stufeihuoliangScore: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					sturunScore: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stuzwqtqScore: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stujumpScore: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stusitupScore: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stulongrunScore: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					jiafen1: {
						content: ''
					},
					jiafen2: {
						content: ''
					},
					stutotalScore: {
						content2: '',
						ifShow: false,
						content1: ''
					}
				},
				{
					dengji: {
						content: '等级'
					},
					stubmiLevel: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stufeihuoliangLevel: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					sturunLevel: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stuzwqtqLevel: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stujumpLevel: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stusitupLevel: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					stulongrunLevel: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					jiafen1: {
						content: ''
					},
					jiafen2: {
						content: ''
					},
					stutotalLevel: {
						content2: '',
						ifShow: false,
						content1: ''
					}
				}
			],
			//操行记录的数据
			arr5: [
				[
					{
						content: '考情统计',
						lie: 7
					},
					{
						content: '学年'
					},
					{
						content: '第一学年',
						heng: 2
					},
					{
						content: '第二学年',
						heng: 2
					},
					{
						content: '第三学年',
						heng: 2
					}
				],
				[
					{
						content: '学期'
					},
					{
						content: '第一学期'
					},
					{
						content: '第二学期'
					},
					{
						content: '第一学期'
					},
					{
						content: '第二学期'
					},
					{
						content: '第一学期'
					},
					{
						content: '第二学期'
					}
				],
				{
					bj: {
						content: '病假（天）'
					},
					bingjia1: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					bingjia2: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					bingjia3: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					bingjia4: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					bingjia5: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					bingjia6: {
						content2: '',
						ifShow: false,
						content1: ''
					}
				},
				{
					sj: {
						content: '事假（天）'
					},
					shijia1: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					shijia2: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					shijia3: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					shijia4: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					shijia5: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					shijia6: {
						content2: '',
						ifShow: false,
						content1: ''
					}
				},
				{
					cd: {
						content: '迟到（天）'
					},
					chidao1: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					chidao2: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					chidao3: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					chidao4: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					chidao5: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					chidao6: {
						content2: '',
						ifShow: false,
						content1: ''
					}
				},
				{
					zt: {
						content: '早退（天）'
					},
					zaotui1: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					zaotui2: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					zaotui3: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					zaotui4: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					zaotui5: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					zaotui6: {
						content2: '',
						ifShow: false,
						content1: ''
					}
				},
				{
					kk: {
						content: '旷课（天）'
					},
					kuangke1: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					kuangke2: {
						content2: '',
						ifShow: true,
						content1: ''
					},
					kuangke3: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					kuangke4: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					kuangke5: {
						content2: '',
						ifShow: false,
						content1: ''
					},
					kuangke6: {
						content2: '',
						ifShow: false,
						content1: ''
					}
				},
				{
					xjbdqk: {
						content: '学籍变动情况',
						lie: 3
					},
					zxjd: {
						content: '转学、借读的时间和去向'
					},
					zhuanxuedesc: {
						content2: '',
						heng: 6,
						ifShow: true,
						content1: ''
					}
				},
				{
					xiuxue: {
						content: '休学、复学时间'
					},
					xiuyuedesc: {
						content2: '',
						heng: 6,
						ifShow: true,
						content1: ''
					}
				},
				{
					biye: {
						content: '毕业、修业的时间和去向'
					},
					graduation: {
						content2: '',
						heng: 6,
						ifShow: true,
						content1: ''
					}
				},
				{
					beizhu: {
						content: '备注'
					},
					remark: {
						content2: '',
						heng: 7,
						ifShow: true,
						content1: ''
					}
				}
			],
			htmlTitle: '学籍卡',
			num: -1,
			//头部点击事件的隐藏显示
			isShow: true,
			//头部的学号
			xuehao: '',
			//头部输入框的绑定数据
			xuehao1: '',
			//基本数据的控制
			isShowXinxi: false,
			isShowBianji: true,
			//学业成绩的控制
			isShowChengji: false,
			isShowBianji1: true,
			//综合评价的控制
			isShowPingjia: false,
			isShowBianji2: true,
			//体检数据的控制
			isShowTijian: false,
			isShowBianji3: true,
			//体质健康的控制
			isShowJiankang: false,
			isShowBianji4: true,
			//操行记录的控制
			isShowCaoxing: false,
			isShowBianji5: true
		};
	},
	//父传子的数据，控制页面功能
	props: ['data1'],
	methods: {
		//头部编辑控制
		send() {
			if (this.num == 1) {
				this.$parent.$parent.timingFn('fail', '基本信息尚未保存');
				return;
			} else if (this.num == 2) {
				this.$parent.$parent.timingFn('fail', '学业成绩尚未保存');
				return;
			} else if (this.num == 3) {
				this.$parent.$parent.timingFn('fail', '综合评价尚未保存');
				return;
			} else if (this.num == 4) {
				this.$parent.$parent.timingFn('fail', '体检数据尚未保存');
				return;
			} else if (this.num == 5) {
				this.$parent.$parent.timingFn('fail', '体质健康尚未保存');
				return;
			} else if (this.num == 6) {
				this.$parent.$parent.timingFn('fail', '操行记录尚未保存');
				return;
			}
			this.isShow = false;
			this.xuehao1 = this.xuehao;
			this.num = 0;
		},
		//头部确定按钮
		queding() {
			let yanzhen = /^G\d{18}$/;
			if (!yanzhen.test(this.xuehao1)) {
				this.$parent.$parent.timingFn('fail', '学号错误');
				return;
			}
			this.isShow = true;
			this.xuehao = this.xuehao1;
			this.num = -1;
		},
		//头部取消按钮
		quxiao() {
			this.isShow = true;
			this.num = -1;
		},
		//基本信息的编辑按钮
		send1() {
			if (this.num == 0) {
				this.$parent.$parent.timingFn('fail', '学号尚未保存');
				return;
			} else if (this.num == 2) {
				this.$parent.$parent.timingFn('fail', '学业成绩尚未保存');
				return;
			} else if (this.num == 3) {
				this.$parent.$parent.timingFn('fail', '综合评价尚未保存');
				return;
			} else if (this.num == 4) {
				this.$parent.$parent.timingFn('fail', '体检数据尚未保存');
				return;
			} else if (this.num == 5) {
				this.$parent.$parent.timingFn('fail', '体质健康尚未保存');
				return;
			} else if (this.num == 6) {
				this.$parent.$parent.timingFn('fail', '操行记录尚未保存');
				return;
			}
			this.isShowXinxi = true;
			this.isShowBianji = false;
			this.arr = this.arr.map(ele => {
				for (let i in ele) {
					if (ele[i].hasOwnProperty('content1')) {
						ele[i].content1 = ele[i].content2;
					}
				}
				return ele;
			});
			this.num = 1;
		},
		//基本信息的取消按钮
		quxiao1() {
			this.isShowXinxi = false;
			this.isShowBianji = true;
			this.num = -1;
		},
		//基本信息的确定按钮
		queding1() {
			let sfz = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
			let dh = /^1[34578]\d{9}$/;
			if (this.arr[0].stuName.content1 == '' || this.arr[0].stuName.content1 == undefined) {
				this.$parent.$parent.timingFn('fail', '姓名不能为空');
				return;
			} else if (!sfz.test(this.arr[2].stuCardId.content1) && this.arr[2].stuCardId.content1 != '' && this.arr[2].stuCardId.content1 != undefined) {
				this.$parent.$parent.timingFn('fail', '身份证错误');
				return;
			} else if (!dh.test(this.arr[4].tel.content1) && this.arr[4].tel.content1 != '' && this.arr[4].tel.content1 != undefined) {
				this.$parent.$parent.timingFn('fail', '家庭成员联系电话错误');
				return;
			} else if (!dh.test(this.arr[5].tel.content1) && this.arr[5].tel.content1 != '' && this.arr[5].tel.content1 != undefined) {
				this.$parent.$parent.timingFn('fail', '家庭成员联系电话错误');
				return;
			} else if (!dh.test(this.arr[6].tel.content1) && this.arr[6].tel.content1 != '' && this.arr[6].tel.content1 != undefined) {
				this.$parent.$parent.timingFn('fail', '家庭成员联系电话错误');
				return;
			} else if (!dh.test(this.arr[7].stuTel.content1) && this.arr[7].stuTel.content1 != '' && this.arr[7].stuTel.content1 != undefined) {
				this.$parent.$parent.timingFn('fail', '联系电话错误');
				return;
			}

			this.isShowXinxi = false;
			this.isShowBianji = true;
			this.arr = this.arr.map(ele => {
				for (let i in ele) {
					if (ele[i].hasOwnProperty('content1')) {
						ele[i].content2 = ele[i].content1;
					}
				}
				return ele;
			});
            record.stuBaseInforlist({ stuNo:this.data.stuNo}).then(res=>{
				let obj = {};
				obj.stuName = this.arr[0].stuName.content2;
				obj.stuStudyNo = this.data.stuNo;
				obj.stuSex = this.arr[0].stuSex.content2;
				obj.stuBirthday = this.arr[0].stuBirthday.content2;
				obj.stuNation = this.arr[1].stuNation.content2;
				obj.stuDateJoinYouth = this.arr[1].stuDateJoinYouth.content2;
				obj.stuNativePlace = this.arr[1].stuNativePlace.content2;
				obj.stuCardId = this.arr[2].stuCardId.content2;
				obj.stuFamiliyAdress = this.arr[7].stuFamiliyAdress.content2;
		    	obj.stuTel = this.arr[7].stuTel.content2;
				obj.stuLocalPoliceStation = this.arr[8].stuLocalPoliceStation.content2;
				obj.stuSchool = this.arr[8].stuSchool.content2;
				obj.stuGradeName = this.data.nianji.gradeName;
				obj.stuClassName = this.data.banji.className;
				let arr = [];
						if(this.arr[4].name.content2 != undefined || this.arr[4].named.content2 != undefined || this.arr[4].tel.content2 != undefined || this.arr[4].work.content2 != undefined ){
							let obj1 = {
								name:this.arr[4].name.content2,
								named:this.arr[4].named.content2,
								tel:this.arr[4].tel.content2,
								work:this.arr[4].work.content2
							}
							arr.push(obj1)
						}
						if(this.arr[5].name.content2 != undefined || this.arr[5].named.content2 != undefined || this.arr[5].tel.content2 != undefined || this.arr[5].work.content2 != undefined ){
							let obj1 = {
								name:this.arr[5].name.content2,
								named:this.arr[5].named.content2,
								tel:this.arr[5].tel.content2,
								work:this.arr[5].work.content2
							}
							arr.push(obj1)
						}
						if(this.arr[6].name.content2 != undefined || this.arr[6].named.content2 != undefined || this.arr[6].tel.content2 != undefined || this.arr[6].work.content2 != undefined ){
							let obj1 = {
								name:this.arr[6].name.content2,
								named:this.arr[6].named.content2,
								tel:this.arr[6].tel.content2,
								work:this.arr[6].work.content2
							}
							arr.push(obj1)
						}
						if(this.data.nianji.gradeName == "初一"){
							obj.stuSchoolYear = "第一学年";
						}else if(this.data.nianji.gradeName == "初二"){
							obj.stuSchoolYear = "第二学年";
						}else{
							obj.stuSchoolYear = "第三学年";
						}
						obj.stuFamiliy = JSON.stringify(arr)
						obj.stuClassId  = this.data.banji.classId;
						record.stuBaseInforUp(obj).then(res=>{
							this.show(this.data)
						})
			})
			
			this.$parent.$parent.timingFn('success', '保存成功');
			this.num = -1;
		},
		//学业成绩的编辑按钮
		send2() {
			if (this.num == 0) {
				this.$parent.$parent.timingFn('fail', '学号尚未保存');
				return;
			} else if (this.num == 1) {
				this.$parent.$parent.timingFn('fail', '基本信息尚未保存');
				return;
			} else if (this.num == 3) {
				this.$parent.$parent.timingFn('fail', '综合评价尚未保存');
				return;
			} else if (this.num == 4) {
				this.$parent.$parent.timingFn('fail', '体检数据尚未保存');
				return;
			} else if (this.num == 5) {
				this.$parent.$parent.timingFn('fail', '体质健康尚未保存');
				return;
			} else if (this.num == 6) {
				this.$parent.$parent.timingFn('fail', '操行记录尚未保存');
				return;
			}
			this.isShowChengji = true;
			this.isShowBianji1 = false;
			this.arr1 = this.arr1.map(ele => {
				for (let i in ele) {
					if (ele[i].hasOwnProperty('content1')) {
						ele[i].content1 = ele[i].content2;
					}
				}
				return ele;
			});
			this.num = 2;
		},
		//学业成绩的取消按钮
		quxiao2() {
			this.isShowChengji = false;
			this.isShowBianji1 = true;
			this.num = -1;
		},
		//学业成绩的确定按钮
		queding2() {
			let bol = true;
			this.arr1.forEach(ele => {
				for(let i in ele){
					if (ele[i].hasOwnProperty('content1') && ele[i].content1 != '' && isNaN(ele[i].content1)) {
						bol = false;
					}
				}
			});
			if (!bol) {
				this.$parent.$parent.timingFn('fail', '成绩必须是数字');
				return;
			}
			this.isShowChengji = false;
			this.isShowBianji1 = true;
			this.arr1 = this.arr1.map(ele => {
				for (let i in ele) {
					if (ele[i].hasOwnProperty('content1')) {
						ele[i].content2 = ele[i].content1;
					}
				}
				return ele;
			});
			record.studyScoreDatalist({ stuNo:this.data.stuNo }).then(res=>{
				let arr = [];
				let obj = {
					daodeyufazhi:{
						stuCourse: '道德与法治',
						stuScore: '',
					},
					yuwen:{
						stuCourse: '语文',
						stuScore: '',
					},
					shuxue:{
						stuCourse: '数学',
						stuScore: '',
					},
					waiyu:{
						stuCourse: '外语',
						stuScore: '',
					},
					wuli:{
						stuCourse: '物理',
						stuScore: '',
					},
					huaxue:{
						stuCourse: '化学',
						stuScore: '',
					},
					shengwu:{
						stuCourse: '生物',
						stuScore: '',
					},
					lishi:{
						stuCourse: '历史',
						stuScore: '',
					},
					dili:{
						stuCourse: '地理',
						stuScore: '',
					},
					tiyuyujiankang:{
						stuCourse: '体育与健康',
						stuScore: '',
					},
					yinle:{
						stuCourse: '音乐',
						stuScore: '',
					},
					meishu:{
						stuCourse: '美术',
						stuScore: '',
					},
					xinxijishu:{
						stuCourse: '信息技术',
						stuScore: '',
					},
					laodongyujishu:{
						stuCourse: '劳动与技术',
						stuScore: '',
					},
					yanjiuxingxuexi:{
						stuCourse: '研究性学习',
						stuScore: '',
					},
					
				};
				let  obj1 = JSON.parse(JSON.stringify(obj));
				for(let a in obj1){
                    obj1[a].stuScore = this.arr1[1][a].content2 
				}
				obj1.stuSchoolYear="第一学年";
				obj1.stuSchoolTerm="第一学期";
				obj1.stuClassId  = this.data.banji.classId;
				let  obj2 = JSON.parse(JSON.stringify(obj));
				for(let a in obj2){
                    obj2[a].stuScore = this.arr1[2][a].content2 
				}
				obj2.stuSchoolYear="第一学年";
				obj2.stuSchoolTerm="第二学期";
				obj2.stuClassId  = this.data.banji.classId;
				let  obj3 = JSON.parse(JSON.stringify(obj));
				for(let a in obj3){
                    obj3[a].stuScore = this.arr1[3][a].content2 
				}
				obj3.stuSchoolYear="第一学年";
				obj3.stuSchoolTerm="学年总评";
				obj3.stuClassId  = this.data.banji.classId;
				let  obj10 = JSON.parse(JSON.stringify(obj));
				for(let a in obj10){
                    obj10[a].stuScore = this.arr1[10][a].content2 
				}
				obj10.stuSchoolYear="毕业会考";
				obj10.stuSchoolTerm="";
				obj10.stuClassId  = this.data.banji.classId;
				let  obj11 = JSON.parse(JSON.stringify(obj));
				for(let a in obj11){
                    obj11[a].stuScore = this.arr1[11][a].content2 
				}
				obj11.stuSchoolYear="升学考试";
				obj11.stuSchoolTerm="";
				obj11.stuClassId  = this.data.banji.classId;
				arr.push(obj1,obj2,obj3,obj10,obj11,)
                if(this.data.nianji.gradeName == '初二'){
					let  obj4 = JSON.parse(JSON.stringify(obj));
					for(let a in obj4){
						obj4[a].stuScore = this.arr1[4][a].content2 
					}
					obj4.stuSchoolYear="第二学年";
					obj4.stuSchoolTerm="第一学期";
					obj4.stuClassId  = this.data.banji.classId;
					let  obj5 = JSON.parse(JSON.stringify(obj));
					for(let a in obj5){
						obj5[a].stuScore = this.arr1[5][a].content2 
					}
					obj5.stuSchoolYear="第二学年";
					obj5.stuSchoolTerm="第二学期";
					obj5.stuClassId  = this.data.banji.classId;
					let  obj6 = JSON.parse(JSON.stringify(obj));
					for(let a in obj6){
						obj6[a].stuScore = this.arr1[6][a].content2 
					}
					obj6.stuSchoolYear="第二学年";
					obj6.stuSchoolTerm="学年总评";
					obj6.stuClassId  = this.data.banji.classId;
					arr.push(obj4,obj5,obj6)
				}
				if(this.data.nianji.gradeName == '初三'){
					let  obj4 = JSON.parse(JSON.stringify(obj));
					for(let a in obj4){
						obj4[a].stuScore = this.arr1[4][a].content2 
					}
					obj4.stuSchoolYear="第二学年";
					obj4.stuSchoolTerm="第一学期";
					obj4.stuClassId  = this.data.banji.classId;
					let  obj5 = JSON.parse(JSON.stringify(obj));
					for(let a in obj5){
						obj5[a].stuScore = this.arr1[5][a].content2 
					}
					obj5.stuSchoolYear="第二学年";
					obj5.stuSchoolTerm="第二学期";
					obj5.stuClassId  = this.data.banji.classId;
					let  obj6 = JSON.parse(JSON.stringify(obj));
					for(let a in obj6){
						obj6[a].stuScore = this.arr1[6][a].content2 
					}
					obj6.stuSchoolYear="第二学年";
					obj6.stuSchoolTerm="学年总评";
					obj6.stuClassId  = this.data.banji.classId;
					arr.push(obj4,obj5,obj6)
					let  obj7 = JSON.parse(JSON.stringify(obj));
					for(let a in obj7){
						obj7[a].stuScore = this.arr1[7][a].content2 
					}
					obj7.stuSchoolYear="第三学年";
					obj7.stuSchoolTerm="第一学期";
					obj7.stuClassId  = this.data.banji.classId;
					let  obj8 = JSON.parse(JSON.stringify(obj));
					for(let a in obj8){
						obj8[a].stuScore = this.arr1[8][a].content2 
					}
					obj8.stuSchoolYear="第三学年";
					obj8.stuSchoolTerm="第二学期";
					obj8.stuClassId  = this.data.banji.classId;
					let  obj9 = JSON.parse(JSON.stringify(obj));
					for(let a in obj9){
						obj9[a].stuScore = this.arr1[9][a].content2 
					}
					obj9.stuSchoolYear="第三学年";
					obj9.stuSchoolTerm="学年总评";
					obj9.stuClassId  = this.data.banji.classId;
					arr.push(obj7,obj8,obj9)
				}
				for(let i=0;i<arr.length;i++){
					arr[i].stuNo = this.data.stuNo;
				};
				record.studyScoreDataUp(arr).then(res=>{
					this.show(this.data);
					if(res.data.message == "sccess"){
						this.$parent.$parent.timingFn('success', '保存成功')
					}else{
						this.$parent.$parent.timingFn('fail', '保存失败');
					}
				})
			})
			
			this.num = -1;
		},
		//综合评价的编辑按钮
		send3() {
			if (this.num == 0) {
				this.$parent.$parent.timingFn('fail', '学号尚未保存');
				return;
			} else if (this.num == 1) {
				this.$parent.$parent.timingFn('fail', '基本信息尚未保存');
				return;
			} else if (this.num == 2) {
				this.$parent.$parent.timingFn('fail', '学业成绩尚未保存');
				return;
			} else if (this.num == 4) {
				this.$parent.$parent.timingFn('fail', '体检数据尚未保存');
				return;
			} else if (this.num == 5) {
				this.$parent.$parent.timingFn('fail', '体质健康尚未保存');
				return;
			} else if (this.num == 6) {
				this.$parent.$parent.timingFn('fail', '操行记录尚未保存');
				return;
			}
			this.isShowPingjia = true;
			this.isShowBianji2 = false;
			this.arr2 = this.arr2.map(ele => {
				for (let i in ele) {
					if (ele[i].hasOwnProperty('content1')) {
						ele[i].content1 = ele[i].content2;
					}
				}
				return ele;
			});
			this.num = 3;
		},
		//综合评价的取消按钮
		quxiao3() {
			this.isShowPingjia = false;
			this.isShowBianji2 = true;
			this.num = -1;
		},
		//综合评价的确定按钮
		queding3() {
			this.isShowPingjia = false;
			this.isShowBianji2 = true;
			this.arr2 = this.arr2.map(ele => {
				for (let i in ele) {
					if (ele[i].hasOwnProperty('content1')) {
						ele[i].content2 = ele[i].content1;
					}
				}
				return ele;
			});
			let obj = {
				pinde: '',
				shehui: '',
				shenxin: '',
				suyang: '',
				xingqu: '',
				xueye: '',
				level: '',
				headmaster: '',
				pingyu: '',
			};
			let arr = [];
			let arr1 = [];
			record.evalStuScorelist({ stuNo: this.data.stuNo }).then(res => {
				if (this.data.nianji.gradeName == '初三') {
					let disan = '';
					let dier = '';
					let diyi = '';
					res.data.data.list.forEach(ele => {
						if (ele.schoolyear == this.data.dangqian.name.substring(0, 9)) {
							disan = ele.id;
						}
						if (ele.schoolyear == this.bianxn(this.data.dangqian.name)) {
							dier = ele.id;
						}
						if (ele.schoolyear == this.bianxn(this.bianxn(this.data.dangqian.name))) {
							diyi = ele.id;
						}
					});
					let obj1 = JSON.parse(JSON.stringify(obj));
					for (let i in obj1) {
						for (let a = 1; a <= 2; a++) {
							for (let b in this.arr2[a]) {
								if (b == i) {
									obj1[i] = this.arr2[a][b].content2;
								}
							}
						}
					}
					obj1.jiangcheng = this.arr2[10].jiangcheng1.content2;
					if (diyi == '') {
						obj1.schoolyear = this.bianxn(this.bianxn(this.data.dangqian.name));
						obj1.classId = this.data.banji.classId;
						obj1.stuNo = this.data.stuNo;
						arr1.push(obj1);
					} else {
						obj1.id = diyi;
						arr.push(obj1);
					}
					let obj2 = JSON.parse(JSON.stringify(obj));
					for (let i in obj2) {
						for (let a = 4; a <= 5; a++) {
							for (let b in this.arr2[a]) {
								if (b == i) {
									obj2[i] = this.arr2[a][b].content2;
								}
							}
						}
					}
					obj2.jiangcheng = this.arr2[10].jiangcheng2.content2;
					if (dier == '') {
						obj2.schoolyear = this.bianxn(this.data.dangqian.name);
						obj2.classId = this.data.banji.classId;
						obj2.stuNo = this.data.stuNo;
						arr1.push(obj2);
					} else {
						obj2.id = dier;
						arr.push(obj2);
					}
					let obj3 = JSON.parse(JSON.stringify(obj));
					for (let i in obj3) {
						for (let a = 7; a <= 8; a++) {
							for (let b in this.arr2[a]) {
								if (b == i) {
									obj3[i] = this.arr2[a][b].content2;
								}
							}
						}
					}
					obj3.jiangcheng = this.arr2[10].jiangcheng3.content2;
					if (disan == '') {
						obj3.schoolyear = this.data.dangqian.name.substring(0, 9);
						obj3.classId = this.data.banji.classId;
						obj3.stuNo = this.data.stuNo;
						arr1.push(obj3);
					} else {
						obj3.id = disan;
						arr.push(obj3);
					}
				}
				if (this.data.nianji.gradeName == '初二') {
					let dier = '';
					let diyi = '';
					res.data.data.list.forEach(ele => {
						if (ele.schoolyear == this.data.dangqian.name.substring(0, 9)) {
							dier = ele.id;
						}
						if (ele.schoolyear == this.bianxn(this.data.dangqian.name)) {
							diyi = ele.id;
						}
					});
					let obj1 = JSON.parse(JSON.stringify(obj));
					for (let i in obj1) {
						for (let a = 1; a <= 2; a++) {
							for (let b in this.arr2[a]) {
								if (b == i) {
									obj1[i] = this.arr2[a][b].content2;
								}
							}
						}
					}
					obj1.jiangcheng = this.arr2[10].jiangcheng1.content2;
					if (diyi == '') {
						obj1.schoolyear = this.bianxn(this.data.dangqian.name);
						obj1.classId = this.data.banji.classId;
						obj1.stuNo = this.data.stuNo;
						arr1.push(obj1);
					} else {
						obj1.id = diyi;
						arr.push(obj1);
					}
					let obj2 = JSON.parse(JSON.stringify(obj));
					for (let i in obj2) {
						for (let a = 4; a <= 5; a++) {
							for (let b in this.arr2[a]) {
								if (b == i) {
									obj2[i] = this.arr2[a][b].content2;
								}
							}
						}
					}
					obj2.jiangcheng = this.arr2[10].jiangcheng2.content2;
					if (dier == '') {
						obj2.schoolyear = this.data.dangqian.name.substring(0, 9);
						obj2.classId = this.data.banji.classId;
						obj2.stuNo = this.data.stuNo;
						arr1.push(obj2);
					} else {
						obj2.id = dier;
						arr.push(obj2);
					}
				}
				if (this.data.nianji.gradeName == '初一') {
					let diyi = '';
					res.data.data.list.forEach(ele => {
						if (ele.schoolyear == this.data.dangqian.name.substring(0, 9)) {
							diyi = ele.id;
						}
					});
					let obj1 = JSON.parse(JSON.stringify(obj));
					for (let i in obj1) {
						for (let a = 1; a <= 2; a++) {
							for (let b in this.arr2[a]) {
								if (b == i) {
									obj1[i] = this.arr2[a][b].content2;
								}
							}
						}
					}
					obj1.jiangcheng = this.arr2[10].jiangcheng1.content2;
					if (diyi == '') {
						obj1.schoolyear = this.data.dangqian.name.substring(0, 9);
						obj1.classId = this.data.banji.classId;
						obj1.stuNo = this.data.stuNo;
						arr1.push(obj1);
					} else {
						obj1.id = diyi;
						arr.push(obj1);
					}
				}
				if(arr.length>0 &&  arr1.length>0){
					record.evalStuScoreUp(arr).then(res=>{
                        record.evalStuScoreIn(arr1).then(res1=>{
                            if(res.data.message == "操作成功" && res1.data.message == "操作成功" ){
							    this.$parent.$parent.timingFn('success', '保存成功')
							}else{
								this.$parent.$parent.timingFn('fail', '保存失败');
							}
							this.show(this.data)
					    })
					})
				}
				if(arr.length>0 &&  arr1.length==0){
					record.evalStuScoreUp(arr).then(res=>{
                        if(res.data.message == "操作成功" ){
							this.$parent.$parent.timingFn('success', '保存成功')
						}else{
							this.$parent.$parent.timingFn('fail', '保存失败');
						}
						this.show(this.data)
					})
				}
				if(arr.length==0 &&  arr1.length>0){
					record.evalStuScoreIn(arr1).then(res=>{
                        if(res.data.message == "操作成功" ){
							this.$parent.$parent.timingFn('success', '保存成功')
						}else{
							this.$parent.$parent.timingFn('fail', '保存失败');
						}
						this.show(this.data)
					})
				}
				
			});
			this.num = -1;
		},
		//体检数据的编辑按钮
		send4() {
			if (this.num == 0) {
				this.$parent.$parent.timingFn('fail', '学号尚未保存');
				return;
			} else if (this.num == 1) {
				this.$parent.$parent.timingFn('fail', '基本信息尚未保存');
				return;
			} else if (this.num == 2) {
				this.$parent.$parent.timingFn('fail', '学业成绩尚未保存');
				return;
			} else if (this.num == 3) {
				this.$parent.$parent.timingFn('fail', '综合评价尚未保存');
				return;
			} else if (this.num == 5) {
				this.$parent.$parent.timingFn('fail', '体质健康尚未保存');
				return;
			} else if (this.num == 6) {
				this.$parent.$parent.timingFn('fail', '操行记录尚未保存');
				return;
			}
			this.isShowTijian = true;
			this.isShowBianji3 = false;
			this.arr3 = this.arr3.map(ele => {
				for (let i in ele) {
					if (ele[i].hasOwnProperty('content1')) {
						ele[i].content1 = ele[i].content2;
					}
				}
				return ele;
			});
			this.num = 4;
		},
		//体检数据的取消按钮
		quxiao4() {
			this.isShowTijian = false;
			this.isShowBianji3 = true;
			this.num = -1;
		},
		//体检数据的确定按钮
		queding4() {
			this.isShowTijian = false;
			this.isShowBianji3 = true;
			this.arr3 = this.arr3.map(ele => {
				for (let i in ele) {
					if (ele[i].hasOwnProperty('content1')) {
						ele[i].content2 = ele[i].content1;
					}
				}
				return ele;
			});
			let arr = [];
			let arr1 = [];
			record.stuBaseDatalist({ stuNo: this.data.stuNo }).then(res => {
				if (this.data.nianji.gradeName == '初三') {
					let disan = '';
					let dier = '';
					let diyi = '';
					res.data.data.list.forEach(ele => {
						if (ele.schoolyear == this.data.dangqian.name.substring(0, 9)) {
							disan = ele.id;
						}
						if (ele.schoolyear == this.bianxn(this.data.dangqian.name)) {
							dier = ele.id;
						}
						if (ele.schoolyear == this.bianxn(this.bianxn(this.data.dangqian.name))) {
							diyi = ele.id;
						}
					});
					let obj1 = {
						leftEye: this.arr3[3].leftEye1.content2,
						rightEye: this.arr3[3].rightEye1.content2,
						stuHeight: this.arr3[3].stuHeight1.content2,
						stuWeight: this.arr3[3].stuWeight1.content2,
						remark: this.arr3[5].remark1.content2
					};
					if (diyi == '') {
						obj1.schoolyear = this.bianxn(this.bianxn(this.data.dangqian.name));
						obj1.classId = this.data.banji.classId;
						obj1.stuNo = this.data.stuNo;
						arr1.push(obj1);
					} else {
						obj1.id = diyi;
						arr.push(obj1);
					}
					let obj2 = {
						leftEye: this.arr3[3].leftEye2.content2,
						rightEye: this.arr3[3].rightEye2.content2,
						stuHeight: this.arr3[3].stuHeight2.content2,
						stuWeight: this.arr3[3].stuWeight2.content2,
						remark: this.arr3[5].remark2.content2
					};
					if (dier == '') {
						obj2.schoolyear = this.bianxn(this.data.dangqian.name);
						obj2.classId = this.data.banji.classId;
						obj2.stuNo = this.data.stuNo;
						arr1.push(obj2);
					} else {
						obj2.id = dier;
						arr.push(obj2);
					}
					let obj3 = {
						leftEye: this.arr3[3].leftEye3.content2,
						rightEye: this.arr3[3].rightEye3.content2,
						stuHeight: this.arr3[3].stuHeight3.content2,
						stuWeight: this.arr3[3].stuWeight3.content2,
						remark: this.arr3[5].remark3.content2
					};
					if (disan == '') {
						obj3.schoolyear = this.data.dangqian.name.substring(0, 9);
						obj3.classId = this.data.banji.classId;
						obj3.stuNo = this.data.stuNo;
						arr1.push(obj3);
					} else {
						obj3.id = disan;
						arr.push(obj3);
					}
				}
				if (this.data.nianji.gradeName == '初二') {
					let dier = '';
					let diyi = '';
					res.data.data.list.forEach(ele => {
						if (ele.schoolyear == this.data.dangqian.name.substring(0, 9)) {
							dier = ele.id;
						}
						if (ele.schoolyear == this.bianxn(this.data.dangqian.name)) {
							diyi = ele.id;
						}
					});
					let obj1 = {
						leftEye: this.arr3[3].leftEye1.content2,
						rightEye: this.arr3[3].rightEye1.content2,
						stuHeight: this.arr3[3].stuHeight1.content2,
						stuWeight: this.arr3[3].stuWeight1.content2,
						remark: this.arr3[5].remark1.content2
					};
					if (diyi == '') {
						obj1.schoolyear = this.bianxn(this.data.dangqian.name);
						obj1.classId = this.data.banji.classId;
						obj1.stuNo = this.data.stuNo;
						arr1.push(obj1);
					} else {
						obj1.id = diyi;
						arr.push(obj1);
					}
					let obj2 = {
						leftEye: this.arr3[3].leftEye2.content2,
						rightEye: this.arr3[3].rightEye2.content2,
						stuHeight: this.arr3[3].stuHeight2.content2,
						stuWeight: this.arr3[3].stuWeight2.content2,
						remark: this.arr3[5].remark2.content2
					};
					if (dier == '') {
						obj2.schoolyear = this.data.dangqian.name.substring(0, 9);
						obj2.classId = this.data.banji.classId;
						obj2.stuNo = this.data.stuNo;
						arr1.push(obj2);
					} else {
						obj2.id = dier;
						arr.push(obj2);
					}
				}
				if (this.data.nianji.gradeName == '初一') {
					let diyi = '';
					res.data.data.list.forEach(ele => {
						if (ele.schoolyear == this.data.dangqian.name.substring(0, 9)) {
							diyi = ele.id;
						}
					});
					let obj1 = {
						leftEye: this.arr3[3].leftEye1.content2,
						rightEye: this.arr3[3].rightEye1.content2,
						stuHeight: this.arr3[3].stuHeight1.content2,
						stuWeight: this.arr3[3].stuWeight1.content2,
						remark: this.arr3[5].remark1.content2
					};
					if (diyi == '') {
						obj1.schoolyear = this.data.dangqian.name.substring(0, 9);
						obj1.classId = this.data.banji.classId;
						obj1.stuNo = this.data.stuNo;
						arr1.push(obj1);
					} else {
						obj1.id = diyi;
						arr.push(obj1);
					}
				}
				if(arr.length>0 &&  arr1.length>0){
					record.stuBaseDataUp(arr).then(res=>{
                        record.stuBaseDataIn(arr1).then(res1=>{
                            if(res.data.message == "操作成功" && res1.data.message == "操作成功" ){
							    this.$parent.$parent.timingFn('success', '保存成功')
							}else{
								this.$parent.$parent.timingFn('fail', '保存失败');
							}
							this.show(this.data)
					    })
					})
				}
				if(arr.length>0 &&  arr1.length==0){
					record.stuBaseDataUp(arr).then(res=>{
                        if(res.data.message == "操作成功" ){
							this.$parent.$parent.timingFn('success', '保存成功')
						}else{
							this.$parent.$parent.timingFn('fail', '保存失败');
						}
						this.show(this.data)
					})
				}
				if(arr.length==0 &&  arr1.length>0){
					record.stuBaseDataIn(arr1).then(res=>{
                        if(res.data.message == "操作成功" ){
							this.$parent.$parent.timingFn('success', '保存成功')
						}else{
							this.$parent.$parent.timingFn('fail', '保存失败');
						}
						this.show(this.data)
					})
				}
				
			});
			this.num = -1;
		},
		//体质健康的编辑按钮
		send5() {
			if (this.num == 0) {
				this.$parent.$parent.timingFn('fail', '学号尚未保存');
				return;
			} else if (this.num == 1) {
				this.$parent.$parent.timingFn('fail', '基本信息尚未保存');
				return;
			} else if (this.num == 2) {
				this.$parent.$parent.timingFn('fail', '学业成绩尚未保存');
				return;
			} else if (this.num == 3) {
				this.$parent.$parent.timingFn('fail', '综合评价尚未保存');
				return;
			} else if (this.num == 4) {
				this.$parent.$parent.timingFn('fail', '体检数据尚未保存');
				return;
			} else if (this.num == 6) {
				this.$parent.$parent.timingFn('fail', '操行记录尚未保存');
				return;
			}
			this.isShowJiankang = true;
			this.isShowBianji4 = false;
			this.arr4 = this.arr4.map(ele => {
				for (let i in ele) {
					if (ele[i].hasOwnProperty('content1')) {
						ele[i].content1 = ele[i].content2;
					}
				}
				return ele;
			});
			this.num = 5;
		},
		//体质健康的取消按钮
		quxiao5() {
			this.isShowJiankang = false;
			this.isShowBianji4 = true;
			this.num = -1;
		},
		//体质健康的确定按钮
		queding5() {
			this.isShowJiankang = false;
			this.isShowBianji4 = true;
			this.arr4 = this.arr4.map(ele => {
				for (let i in ele) {
					if (ele[i].hasOwnProperty('content1')) {
						ele[i].content2 = ele[i].content1;
					}
				}
				return ele;
			});
			let arr = [];
			let arr1 = [];
			let obj = {
				stuBmi: null,
				stubmiLevel: null,
				stubmiScore: null,
				stufeihuoliang: null,
				stufeihuoliangLevel: null,
				stufeihuoliangScore: null,
				sturun: null,
				sturunLevel:null,
				sturunScore: null,
				stuzwqtq: null,
				stuzwqtqLevel: null,
				stuzwqtqScore: null,
				stujump: null,
				stujumpLevel: null,
				stujumpScore: null,
				stusitup: null,
				stusitupLevel: null,
				stusitupScore: null,
				stulongrun: null,
				stulongrunLevel: null,
				stulongrunScore: null,
				stutotalLevel: null,
				stutotalScore: null,
				stuHeight: null,
				stuWeight: null
			};
			record.healthStuscorelist({ stuNo: this.data.stuNo }).then(res => {
				if (this.data.nianji.gradeName == '初三') {
					let disan = '';
					let dier = '';
					let diyi = '';
					res.data.data.list.forEach(ele => {
						if (ele.schoolyear == this.data.dangqian.name.substring(0, 9)) {
							disan = ele.id;
						}
						if (ele.schoolyear == this.bianxn(this.data.dangqian.name)) {
							dier = ele.id;
						}
						if (ele.schoolyear == this.bianxn(this.bianxn(this.data.dangqian.name))) {
							diyi = ele.id;
						}
					});
					let obj1 = JSON.parse(JSON.stringify(obj));
					for (let i in obj1) {
						for (let a = 2; a <= 4; a++) {
							for (let b in this.arr4[a]) {
								if (b == i) {
									obj1[i] = this.arr4[a][b].content2;
								}
							}
						}
					}
					if (diyi == '') {
						obj1.schoolyear = this.bianxn(this.bianxn(this.data.dangqian.name));
						obj1.classId = this.data.banji.classId;
						obj1.stuNo = this.data.stuNo;
						arr1.push(obj1);
					} else {
						obj1.id = diyi;
						arr.push(obj1);
					}
					let obj2 = JSON.parse(JSON.stringify(obj));
					for (let i in obj2) {
						for (let a = 5; a <= 7; a++) {
							for (let b in this.arr4[a]) {
								if (b == i) {
									obj2[i] = this.arr4[a][b].content2;
								}
							}
						}
					}
					if (dier == '') {
						obj2.schoolyear = this.bianxn(this.data.dangqian.name);
						obj2.classId = this.data.banji.classId;
						obj2.stuNo = this.data.stuNo;
						arr1.push(obj2);
					} else {
						obj2.id = dier;
						arr.push(obj2);
					}
					let obj3 = JSON.parse(JSON.stringify(obj));
					for (let i in obj3) {
						for (let a = 8; a <= 10; a++) {
							for (let b in this.arr4[a]) {
								if (b == i) {
									obj3[i] = this.arr4[a][b].content2;
								}
							}
						}
					}
					if (disan == '') {
						obj3.schoolyear = this.data.dangqian.name.substring(0, 9);
						obj3.classId = this.data.banji.classId;
						obj3.stuNo = this.data.stuNo;
						arr1.push(obj3);
					} else {
						obj3.id = disan;
						arr.push(obj3);
					}
				}
				if (this.data.nianji.gradeName == '初二') {
					let dier = '';
					let diyi = '';
					res.data.data.list.forEach(ele => {
						if (ele.schoolyear == this.data.dangqian.name.substring(0, 9)) {
							dier = ele.id;
						}
						if (ele.schoolyear == this.bianxn(this.data.dangqian.name)) {
							diyi = ele.id;
						}
					});
					let obj1 = JSON.parse(JSON.stringify(obj));
					for (let i in obj1) {
						for (let a = 2; a <= 4; a++) {
							for (let b in this.arr4[a]) {
								if (b == i) {
									obj1[i] = this.arr4[a][b].content2;
								}
							}
						}
					}
					if (diyi == '') {
						obj1.schoolyear = this.bianxn(this.data.dangqian.name);
						obj1.classId = this.data.banji.classId;
						obj1.stuNo = this.data.stuNo;
						arr1.push(obj1);
					} else {
						obj1.id = diyi;
						arr.push(obj1);
					}
					let obj2 = JSON.parse(JSON.stringify(obj));
					for (let i in obj2) {
						for (let a = 5; a <= 7; a++) {
							for (let b in this.arr4[a]) {
								if (b == i) {
									obj2[i] = this.arr4[a][b].content2;
								}
							}
						}
					}
					if (dier == '') {
						obj2.schoolyear = this.data.dangqian.name.substring(0, 9);
						obj2.classId = this.data.banji.classId;
						obj2.stuNo = this.data.stuNo;
						arr1.push(obj2);
					} else {
						obj2.id = dier;
						arr.push(obj2);
					}
				}
				if (this.data.nianji.gradeName == '初一') {
					let diyi = '';
					res.data.data.list.forEach(ele => {
						if (ele.schoolyear == this.data.dangqian.name.substring(0, 9)) {
							diyi = ele.id;
						}
					});
					let obj1 = JSON.parse(JSON.stringify(obj));
					for (let i in obj1) {
						for (let a = 2; a <= 4; a++) {
							for (let b in this.arr4[a]) {
								if (b == i) {
									obj1[i] = this.arr4[a][b].content2;
								}
							}
						}
					}
					if (diyi == '') {
						obj1.schoolyear = this.data.dangqian.name.substring(0, 9);
						obj1.classId = this.data.banji.classId;
						obj1.stuNo = this.data.stuNo;
						arr1.push(obj1);
					} else {
						obj1.id = diyi;
						arr.push(obj1);
					}
				}
				if(arr.length>0 &&  arr1.length>0){
					record.healthStuscoreUp(arr).then(res=>{
                        record.healthStuscoreIn(arr1).then(res1=>{
                            if(res.data.message == "操作成功" && res1.data.message == "操作成功" ){
							    this.$parent.$parent.timingFn('success', '保存成功')
							}else{
								this.$parent.$parent.timingFn('fail', '保存失败');
							}
							this.show(this.data)
					    })
					})
				}
				if(arr.length>0 &&  arr1.length==0){
					record.healthStuscoreUp(arr).then(res=>{
                        if(res.data.message == "操作成功" ){
							this.$parent.$parent.timingFn('success', '保存成功')
						}else{
							this.$parent.$parent.timingFn('fail', '保存失败');
						}
						this.show(this.data)
					})
				}
				if(arr.length==0 &&  arr1.length>0){
					record.healthStuscoreIn(arr1).then(res=>{
                        if(res.data.message == "操作成功" ){
							this.$parent.$parent.timingFn('success', '保存成功')
						}else{
							this.$parent.$parent.timingFn('fail', '保存失败');
						}
						this.show(this.data)
					})
				}
			});
			this.bangding();
			this.num = -1;
		},
		//操行记录的编辑按钮
		send6() {
			if (this.num == 0) {
				this.$parent.$parent.timingFn('fail', '学号尚未保存');
				return;
			} else if (this.num == 1) {
				this.$parent.$parent.timingFn('fail', '基本信息尚未保存');
				return;
			} else if (this.num == 2) {
				this.$parent.$parent.timingFn('fail', '学业成绩尚未保存');
				return;
			} else if (this.num == 3) {
				this.$parent.$parent.timingFn('fail', '综合评价尚未保存');
				return;
			} else if (this.num == 4) {
				this.$parent.$parent.timingFn('fail', '体检数据尚未保存');
				return;
			} else if (this.num == 5) {
				this.$parent.$parent.timingFn('fail', '体质健康尚未保存');
				return;
			}
			this.isShowCaoxing = true;
			this.isShowBianji5 = false;
			this.arr5 = this.arr5.map(ele => {
				for (let i in ele) {
					if (ele[i].hasOwnProperty('content1')) {
						ele[i].content1 = ele[i].content2;
					}
				}
				return ele;
			});
			this.num = 6;
		},
		//操行记录的取消按钮
		quxiao6() {
			this.isShowCaoxing = false;
			this.isShowBianji5 = true;
			this.num = -1;
		},
		//操行记录的确定按钮
		queding6() {
			this.isShowCaoxing = false;
			this.isShowBianji5 = true;
			this.arr5 = this.arr5.map(ele => {
				for (let i in ele) {
					if (ele[i].hasOwnProperty('content1')) {
						ele[i].content2 = ele[i].content1;
					}
				}
				return ele;
			});
			let arr = [];
			let arr1 = [];
			record.stuRecordDetaillist({ stuNo: this.data.stuNo }).then(res => {
				if (this.data.nianji.gradeName == '初三') {
					let diliu = '';
					let diwu = '';
					let disi = '';
					let disan = '';
					let dier = '';
					let diyi = '';
					res.data.data.forEach(ele => {
						if (ele.schoolyear == this.data.dangqian.name.substring(0, 9) && ele.term == '下学期') {
							diliu = ele.id;
						}
						if (ele.schoolyear == this.data.dangqian.name.substring(0, 9) && ele.term == '上学期') {
							diwu = ele.id;
						}
						if (ele.schoolyear == this.bianxn(this.data.dangqian.name) && ele.term == '下学期') {
							disi = ele.id;
						}
						if (ele.schoolyear == this.bianxn(this.data.dangqian.name) && ele.term == '上学期') {
							disan = ele.id;
						}
						if (ele.schoolyear == this.bianxn(this.bianxn(this.data.dangqian.name)) && ele.term == '下学期') {
							dier = ele.id;
						}
						if (ele.schoolyear == this.bianxn(this.bianxn(this.data.dangqian.name)) && ele.term == '上学期') {
							diyi = ele.id;
						}
					});
					let obj1 = {
						bingjia: this.arr5[2].bingjia1.content2,
						shijia: this.arr5[3].shijia1.content2,
						chidao: this.arr5[4].chidao1.content2,
						zaotui: this.arr5[5].zaotui1.content2,
						kuangke: this.arr5[6].kuangke1.content2
					};
					if (diyi == '') {
						obj1.schoolyear = this.bianxn(this.bianxn(this.data.dangqian.name));
						obj1.classId = this.data.banji.classId;
						obj1.stuNo = this.data.stuNo;
						obj1.term = '上学期';
						arr1.push(obj1);
					} else {
						obj1.id = diyi;
						arr.push(obj1);
					}
					let obj2 = {
						bingjia: this.arr5[2].bingjia2.content2,
						shijia: this.arr5[3].shijia2.content2,
						chidao: this.arr5[4].chidao2.content2,
						zaotui: this.arr5[5].zaotui2.content2,
						kuangke: this.arr5[6].kuangke2.content2
					};
					if (dier == '') {
						obj2.schoolyear = this.bianxn(this.bianxn(this.data.dangqian.name));
						obj2.classId = this.data.banji.classId;
						obj2.stuNo = this.data.stuNo;
						obj2.term = '下学期';
						arr1.push(obj2);
					} else {
						obj2.id = dier;
						arr.push(obj2);
					}
					let obj3 = {
						bingjia: this.arr5[2].bingjia3.content2,
						shijia: this.arr5[3].shijia3.content2,
						chidao: this.arr5[4].chidao3.content2,
						zaotui: this.arr5[5].zaotui3.content2,
						kuangke: this.arr5[6].kuangke3.content2
					};
					if (disan == '') {
						obj3.schoolyear = this.bianxn(this.data.dangqian.name);
						obj3.classId = this.data.banji.classId;
						obj3.stuNo = this.data.stuNo;
						obj3.term = '上学期';
						arr1.push(obj3);
					} else {
						obj3.id = disan;
						arr.push(obj3);
					}
					let obj4 = {
						bingjia: this.arr5[2].bingjia4.content2,
						shijia: this.arr5[3].shijia4.content2,
						chidao: this.arr5[4].chidao4.content2,
						zaotui: this.arr5[5].zaotui4.content2,
						kuangke: this.arr5[6].kuangke4.content2
					};
					if (disi == '') {
						obj4.schoolyear = this.bianxn(this.data.dangqian.name);
						obj4.classId = this.data.banji.classId;
						obj4.stuNo = this.data.stuNo;
						obj4.term = '下学期';
						arr1.push(obj4);
					} else {
						obj4.id = disi;
						arr.push(obj4);
					}
					let obj5 = {
						bingjia: this.arr5[2].bingjia5.content2,
						shijia: this.arr5[3].shijia5.content2,
						chidao: this.arr5[4].chidao5.content2,
						zaotui: this.arr5[5].zaotui5.content2,
						kuangke: this.arr5[6].kuangke5.content2,
						zhuanxuedesc: this.arr5[7].zhuanxuedesc.content2,
						xiuyuedesc: this.arr5[8].xiuyuedesc.content2,
						graduation: this.arr5[9].graduation.content2,
						remark: this.arr5[10].remark.content2
					};
					if (diwu == '') {
						obj5.schoolyear = this.data.dangqian.name.substring(0, 9);
						obj5.classId = this.data.banji.classId;
						obj5.stuNo = this.data.stuNo;
						obj5.term = '上学期';
						arr1.push(obj5);
					} else {
						obj5.id = diwu;
						arr.push(obj5);
					}
					let obj6 = {
						bingjia: this.arr5[2].bingjia6.content2,
						shijia: this.arr5[3].shijia6.content2,
						chidao: this.arr5[4].chidao6.content2,
						zaotui: this.arr5[5].zaotui6.content2,
						kuangke: this.arr5[6].kuangke6.content2,
						zhuanxuedesc: this.arr5[7].zhuanxuedesc.content2,
						xiuyuedesc: this.arr5[8].xiuyuedesc.content2,
						graduation: this.arr5[9].graduation.content2,
						remark: this.arr5[10].remark.content2
					};
					if (diliu == '') {
						obj6.schoolyear = this.data.dangqian.name.substring(0, 9);
						obj6.classId = this.data.banji.classId;
						obj6.stuNo = this.data.stuNo;
						obj6.term = '下学期';
						arr1.push(obj6);
					} else {
						obj6.id = diliu;
						arr.push(obj6);
					}
				}
				if (this.data.nianji.gradeName == '初二') {
					let disi = '';
					let disan = '';
					let dier = '';
					let diyi = '';
					res.data.data.forEach(ele => {
						if (ele.schoolyear == this.data.dangqian.name.substring(0, 9) && ele.term == '下学期') {
							disi = ele.id;
						}
						if (ele.schoolyear == this.data.dangqian.name.substring(0, 9) && ele.term == '上学期') {
							disan = ele.id;
						}
						if (ele.schoolyear == this.bianxn(this.data.dangqian.name) && ele.term == '下学期') {
							dier = ele.id;
						}
						if (ele.schoolyear == this.bianxn(this.data.dangqian.name) && ele.term == '上学期') {
							diyi = ele.id;
						}
					});
					let obj1 = {
						bingjia: this.arr5[2].bingjia1.content2,
						shijia: this.arr5[3].shijia1.content2,
						chidao: this.arr5[4].chidao1.content2,
						zaotui: this.arr5[5].zaotui1.content2,
						kuangke: this.arr5[6].kuangke1.content2
					};
					if (diyi == '') {
						obj1.schoolyear = this.bianxn(this.data.dangqian.name);
						obj1.classId = this.data.banji.classId;
						obj1.stuNo = this.data.stuNo;
						obj1.term = '上学期';
						arr1.push(obj1);
					} else {
						obj1.id = diyi;
						arr.push(obj1);
					}
					let obj2 = {
						bingjia: this.arr5[2].bingjia2.content2,
						shijia: this.arr5[3].shijia2.content2,
						chidao: this.arr5[4].chidao2.content2,
						zaotui: this.arr5[5].zaotui2.content2,
						kuangke: this.arr5[6].kuangke2.content2
					};
					if (dier == '') {
						obj2.schoolyear = this.bianxn(this.data.dangqian.name);
						obj2.classId = this.data.banji.classId;
						obj2.stuNo = this.data.stuNo;
						obj2.term = '下学期';
						arr1.push(obj2);
					} else {
						obj2.id = dier;
						arr.push(obj2);
					}
					let obj3 = {
						bingjia: this.arr5[2].bingjia3.content2,
						shijia: this.arr5[3].shijia3.content2,
						chidao: this.arr5[4].chidao3.content2,
						zaotui: this.arr5[5].zaotui3.content2,
						kuangke: this.arr5[6].kuangke3.content2,
						zhuanxuedesc: this.arr5[7].zhuanxuedesc.content2,
						xiuyuedesc: this.arr5[8].xiuyuedesc.content2,
						graduation: this.arr5[9].graduation.content2,
						remark: this.arr5[10].remark.content2
					};
					if (disan == '') {
						obj3.schoolyear =this.data.dangqian.name.substring(0, 9);
						obj3.classId = this.data.banji.classId;
						obj3.stuNo = this.data.stuNo;
						obj3.term = '上学期';
						arr1.push(obj3);
					} else {
						obj3.id = disan;
						arr.push(obj3);
					}
					let obj4 = {
						bingjia: this.arr5[2].bingjia4.content2,
						shijia: this.arr5[3].shijia4.content2,
						chidao: this.arr5[4].chidao4.content2,
						zaotui: this.arr5[5].zaotui4.content2,
						kuangke: this.arr5[6].kuangke4.content2,
						zhuanxuedesc: this.arr5[7].zhuanxuedesc.content2,
						xiuyuedesc: this.arr5[8].xiuyuedesc.content2,
						graduation: this.arr5[9].graduation.content2,
						remark: this.arr5[10].remark.content2
					};
					if (disi == '') {
						obj4.schoolyear = this.data.dangqian.name.substring(0, 9);
						obj4.classId = this.data.banji.classId;
						obj4.stuNo = this.data.stuNo;
						obj4.term = '下学期';
						arr1.push(obj4);
					} else {
						obj4.id = disi;
						arr.push(obj4);
					}
				}
				if (this.data.nianji.gradeName == '初一') {
					let dier = '';
					let diyi = '';
					res.data.data.forEach(ele => {
						if (ele.schoolyear == this.data.dangqian.name.substring(0, 9) && ele.term == '下学期') {
							dier = ele.id;
						}
						if (ele.schoolyear == this.data.dangqian.name.substring(0, 9) && ele.term == '上学期') {
							diyi = ele.id;
						}
					});
					let obj1 = {
						bingjia: this.arr5[2].bingjia1.content2,
						shijia: this.arr5[3].shijia1.content2,
						chidao: this.arr5[4].chidao1.content2,
						zaotui: this.arr5[5].zaotui1.content2,
						kuangke: this.arr5[6].kuangke1.content2,
						zhuanxuedesc: this.arr5[7].zhuanxuedesc.content2,
						xiuyuedesc: this.arr5[8].xiuyuedesc.content2,
						graduation: this.arr5[9].graduation.content2,
						remark: this.arr5[10].remark.content2
					};
					if (diyi == '') {
						obj1.schoolyear = this.data.dangqian.name.substring(0, 9);
						obj1.classId = this.data.banji.classId;
						obj1.stuNo = this.data.stuNo;
						obj1.term = '上学期';
						arr1.push(obj1);
					} else {
						obj1.id = diyi;
						arr.push(obj1);
					}
					let obj2 = {
						bingjia: this.arr5[2].bingjia2.content2,
						shijia: this.arr5[3].shijia2.content2,
						chidao: this.arr5[4].chidao2.content2,
						zaotui: this.arr5[5].zaotui2.content2,
						kuangke: this.arr5[6].kuangke2.content2,
						zhuanxuedesc: this.arr5[7].zhuanxuedesc.content2,
						xiuyuedesc: this.arr5[8].xiuyuedesc.content2,
						graduation: this.arr5[9].graduation.content2,
						remark: this.arr5[10].remark.content2
					};
					if (dier == '') {
						obj2.schoolyear = this.data.dangqian.name.substring(0, 9);
						obj2.classId = this.data.banji.classId;
						obj2.stuNo = this.data.stuNo;
						obj2.term = '下学期';
						arr1.push(obj2);
					} else {
						obj2.id = dier;
						arr.push(obj2);
					}
				}
				if(arr.length>0 &&  arr1.length>0){
					record.stuRecordDetailUp(arr).then(res=>{
                        record.stuRecordDetailIn(arr1).then(res1=>{
                            if(res.data.message == "操作成功" && res1.data.message == "操作成功" ){
							    this.$parent.$parent.timingFn('success', '保存成功')
							}else{
								this.$parent.$parent.timingFn('fail', '保存失败');
							}
							this.show(this.data)
					    })
					})
				}
				if(arr.length>0 &&  arr1.length==0){
					record.stuRecordDetailUp(arr).then(res=>{
                        if(res.data.message == "操作成功" ){
							this.$parent.$parent.timingFn('success', '保存成功')
						}else{
							this.$parent.$parent.timingFn('fail', '保存失败');
						}
						this.show(this.data)
					})
				}
				if(arr.length==0 &&  arr1.length>0){
					record.stuRecordDetailIn(arr1).then(res=>{
                        if(res.data.message == "操作成功" ){
							this.$parent.$parent.timingFn('success', '保存成功')
						}else{
							this.$parent.$parent.timingFn('fail', '保存失败');
						}
						this.show(this.data)
					})
				}
			});
			this.num = -1;
		},
		daochu1(){
			this.isS=false;
			$("#pdfDom").css("padding-bottom","130px");
			window.scrollTo(0,0);
			setTimeout( ()=>{
					this.getPdf("#pdfDom");
					$("#pdfDom").css("padding-bottom","")
			        this.isS=true;
			},0 )
		},
		bangding() {
			this.arr4[2]['jiafen1'].content = this.arr4[2]['stusitup'].content2;
			this.arr4[2]['jiafen2'].content = this.arr4[2]['stulongrun'].content2;
			this.arr4[3]['jiafen1'].content = this.arr4[3]['stusitupScore'].content2;
			this.arr4[3]['jiafen2'].content = this.arr4[3]['stulongrunScore'].content2;
			this.arr4[4]['jiafen1'].content = this.arr4[4]['stusitupLevel'].content2;
			this.arr4[4]['jiafen2'].content = this.arr4[4]['stulongrunLevel'].content2;
			this.arr4[5]['jiafen1'].content = this.arr4[5]['stusitup'].content2;
			this.arr4[5]['jiafen2'].content = this.arr4[5]['stulongrun'].content2;
			this.arr4[6]['jiafen1'].content = this.arr4[6]['stusitupScore'].content2;
			this.arr4[6]['jiafen2'].content = this.arr4[6]['stulongrunScore'].content2;
			this.arr4[7]['jiafen1'].content = this.arr4[7]['stusitupLevel'].content2;
			this.arr4[7]['jiafen2'].content = this.arr4[7]['stulongrunLevel'].content2;
			this.arr4[8]['jiafen1'].content = this.arr4[8]['stusitup'].content2;
			this.arr4[8]['jiafen2'].content = this.arr4[8]['stulongrun'].content2;
			this.arr4[9]['jiafen1'].content = this.arr4[9]['stusitupScore'].content2;
			this.arr4[9]['jiafen2'].content = this.arr4[9]['stulongrunScore'].content2;
			this.arr4[10]['jiafen1'].content = this.arr4[10]['stusitupLevel'].content2;
			this.arr4[10]['jiafen2'].content = this.arr4[10]['stulongrunLevel'].content2;
		},
		getFileContent(index, index1) {
			let _this = this;
			if (index == 0) { 
				const file1 = this.$refs.shangc0[0].files[0];
				const data = new  window.FormData();
				data.append('file', file1);
				data.append('classId', this.data.banji.classId);
				data.append('type ', "ruxue");
				data.append('stuNo', this.data.stuNo);
                record.StuBaseInforImgDr(data).then(res=>{
					this.$nextTick(()=>{
						this.arr[0].zhaopian.imgUrl = configure.studentRecord+"stuRecord/image/"+this.data.banji.classId+"/ruxue/"+this.data.stuNo+"?"+new Date().getTime();
						this.$refs.shangc0[0].value = "";
					})
				})
			} else {
				const file1 = this.$refs.shangc4[0].files[0];
				const data = new  window.FormData();
				data.append('file', file1);
				data.append('classId', this.data.banji.classId);
				data.append('type ', "biye");
				data.append('stuNo', this.data.stuNo);
                record.StuBaseInforImgDr(data).then(res=>{
					this.$nextTick(()=>{
						this.arr[4].zhaopian.imgUrl = configure.studentRecord+"stuRecord/image/"+this.data.banji.classId+"/biye/"+this.data.stuNo+"?"+new Date().getTime();
						this.$refs.shangc0[0].value ="";
					})
				})
			}
		},
		bianxn(str){
            let num = Number(str.substring(0, 4));
            return num - 1 + "-" + num;
		},
		empty(){
			this.isShowXinxi=false;
			this.isShowBianji= true;
			//学业成绩的控制
			this.isShowChengji= false;
			this.isShowBianji1=true;
			//综合评价的控制
			this.isShowPingjia=false;
			this.isShowBianji2= true;
			//体检数据的控制
			this.isShowTijian=false;
			this.isShowBianji3=true;
			//体质健康的控制
			this.isShowJiankang= false;
			this.isShowBianji4=true;
			//操行记录的控制
			this.isShowCaoxing= false;
			this.isShowBianji5= true;
			this.num = -1;
			//基本信息清空
				for(let i= 0;i<this.arr.length;i++){
                    for(let b in this.arr[i]){
						if (this.arr[i][b].hasOwnProperty('content2')){
							this.arr[i][b].content2 = "";
						}
					}
				}
				
				//学业成绩清空
                for (let a = 1; a <= 11; a++) {
					for (let b in this.arr1[a]) {
						if (this.arr1[a][b].hasOwnProperty('content2')) {
							this.arr1[a][b].content2 = "";
						}
					}
				}
				this.arr2[10].jiangcheng3.content2 = "";
				for (let a = 1; a <= 8; a++) {
					for (let b in this.arr2[a]) {
						if (this.arr2[a][b].hasOwnProperty('content2')) {
							this.arr2[a][b].content2 = "";
						}
					}
				}
				this.arr2[10].jiangcheng1.content2 = "";
				this.arr2[10].jiangcheng2.content2 = "";
				//体检数据清空
				for (let a = 3; a <= 5; a++) {
					for (let b in this.arr3[a]) {
						if (this.arr3[a][b].hasOwnProperty('content2')) {
							this.arr3[a][b].content2 = "";
						}
					}
				}
				//体质健康清空
				for (let a = 2; a <= 10; a++) {
					for (let b in this.arr4[a]) {
						if (this.arr4[a][b].hasOwnProperty('content2')) {
							this.arr4[a][b].content2 = "";
						}
					}
				}
				this.bangding();
				//操行记录清空
				for (let a = 2; a <= 10; a++) {
					for (let b in this.arr5[a]) {
						if (this.arr5[a][b].hasOwnProperty('content2')) {
							this.arr5[a][b].content2 = "";
						}
					}
				}
		},
		show(nval){
			this.arr[0].stuName.content2 = nval.stuName;
			record.stuRecordAll({ stuNo: nval.stuNo }).then(res => {
				//学业成绩赋值
				res.data.data.studyScoreData.forEach((ele,index)=>{
					if (ele.stuSchoolYear == "第一学年"  && ele.stuSchoolTerm == "第一学期"){
                        for(let a in this.arr1[1]){
							for(let b in ele){
								if(a==b){
                                    this.arr1[1][a].content2 = ele[b].stuScore;
								}
							}
						}
					}
					if (ele.stuSchoolYear == "第一学年"  && ele.stuSchoolTerm == "第二学期"){
                        for(let a in this.arr1[2]){
							for(let b in ele){
								if(a==b){
                                    this.arr1[2][a].content2 = ele[b].stuScore;
								}
							}
						}
					}
					if (ele.stuSchoolYear == "第一学年"  && ele.stuSchoolTerm == "学年总评"){
                        for(let a in this.arr1[3]){
                            for(let b in ele){
								if(a==b){
                                    this.arr1[3][a].content2 = ele[b].stuScore;
								}
							}
						}
					}
					if (ele.stuSchoolYear == "第二学年"  && ele.stuSchoolTerm == "第一学期"){
                        for(let a in this.arr1[4]){
                            for(let b in ele){
								if(a==b){
                                    this.arr1[4][a].content2 = ele[b].stuScore;
								}
							}
						}
					}
					if (ele.stuSchoolYear == "第二学年"  && ele.stuSchoolTerm == "第二学期"){
                        for(let a in this.arr1[5]){
                            for(let b in ele){
								if(a==b){
                                    this.arr1[5][a].content2 = ele[b].stuScore;
								}
							}
						}
					}
					if (ele.stuSchoolYear == "第二学年"  && ele.stuSchoolTerm == "学年总评"){
                        for(let a in this.arr1[6]){
                            for(let b in ele){
								if(a==b){
                                    this.arr1[6][a].content2 = ele[b].stuScore;
								}
							}
						}
					}
					if (ele.stuSchoolYear == "第三学年"  && ele.stuSchoolTerm == "第一学期"){
                        for(let a in this.arr1[7]){
                            for(let b in ele){
								if(a==b){
                                    this.arr1[7][a].content2 = ele[b].stuScore;
								}
							}
						}
					}
					if (ele.stuSchoolYear == "第三学年"  && ele.stuSchoolTerm == "第二学期"){
                        for(let a in this.arr1[8]){
                            for(let b in ele){
								if(a==b){
                                    this.arr1[8][a].content2 = ele[b].stuScore;
								}
							}
						}
					}
					if (ele.stuSchoolYear == "第三学年"  && ele.stuSchoolTerm == "学年总评"){
                        for(let a in this.arr1[9]){
                            for(let b in ele){
								if(a==b){
                                    this.arr1[9][a].content2 = ele[b].stuScore;
								}
							}
						}
					}
					if (ele.stuSchoolYear == "毕业会考" ){
                        for(let a in this.arr1[10]){
                            for(let b in ele){
								if(a==b){
                                    this.arr1[10][a].content2 = ele[b].stuScore;
								}
							}
						}
					}
					if (ele.stuSchoolYear == "升学考试" ){
                         for(let a in this.arr1[11]){
                            for(let b in ele){
								if(a==b){
                                    this.arr1[11][a].content2 = ele[b].stuScore;
								}
							}
						}
					}
				})
				
				
				if (nval.nianji.gradeName == '初三') {
					//基本信息赋值
					res.data.data.baseInfoData.forEach((ele, index) => {
						if (ele.stuSchoolYear == "第三学年") {
							this.arr.forEach((ele1, index1) => {
								for (let i in ele1) {
									ele1[i].content2 = ele[i];
								}
								return ele1;
							});
							if(ele.familyList){
								for (let a = 0; a < ele.familyList.length; a++) {
									for (let i in this.arr[a + 4]) {
										this.arr[a + 4][i].content2 = ele.familyList[a][i];
									}
								}
							}
							
						}
					});
					//学业成绩编辑
					for(let i =1;i<=9;i++){
						for(let a in this.arr1[i]){
							if(this.arr1[i][a].hasOwnProperty("ifShow")){
								this.arr1[i][a].ifShow = true;
							}
						}
					}
					// 综合评价-编辑状态
					for (let a = 1; a <= 8; a++) {
						for (let b in this.arr2[a]) {
							if (this.arr2[a][b].hasOwnProperty('ifShow')) {
								this.arr2[a][b].ifShow = true;
							}
							if (this.arr2[a][b].hasOwnProperty('ifShowText')) {
								this.arr2[a][b].ifShowText = true;
							}
						}
					}
					this.arr2[10].jiangcheng1.ifShow = true;
					this.arr2[10].jiangcheng2.ifShow = true;
					this.arr2[10].jiangcheng3.ifShow = true;
					// 综合评价-赋值
					res.data.data.evalData.forEach((ele, index) => {
						if (nval.dangqian.name.substring(0, 9) == ele.schoolyear) {
							for (let a = 7; a <= 8; a++) {
								for (let b in this.arr2[a]) {
									this.arr2[a][b].content2 = ele[b];
								}
							}
							this.arr2[10].jiangcheng3.content2 = ele.jiangcheng;
							
						}
						if (this.bianxn(nval.dangqian.name) == ele.schoolyear) {
							for (let a = 4; a <= 5; a++) {
								for (let b in this.arr2[a]) {
									this.arr2[a][b].content2 = ele[b];
								}
							}
							this.arr2[10].jiangcheng2.content2 = ele.jiangcheng;
							
						}
						if (this.bianxn(this.bianxn(nval.dangqian.name)) == ele.schoolyear) {
							for (let a = 1; a <= 2; a++) {
								for (let b in this.arr2[a]) {
									this.arr2[a][b].content2 = ele[b];
								}
							}
							this.arr2[10].jiangcheng1.content2 = ele.jiangcheng;
						}
					});
					// 体检数据-编辑
					this.arr3[3].leftEye3.ifShow = true;
					this.arr3[3].rightEye3.ifShow = true;
					this.arr3[3].stuHeight3.ifShow = true;
					this.arr3[3].stuWeight3.ifShow = true;
					this.arr3[5].remark3.ifShowText = true;
					this.arr3[3].leftEye2.ifShow = true;
					this.arr3[3].rightEye2.ifShow = true;
				    this.arr3[3].stuHeight2.ifShow = true;
					this.arr3[3].stuWeight2.ifShow = true;
					this.arr3[5].remark2.ifShowText = true;
					this.arr3[3].leftEye3.ifShow = true;
					this.arr3[3].rightEye3.ifShow = true;
				    this.arr3[3].stuHeight3.ifShow = true;
					this.arr3[3].stuWeight3.ifShow = true;
					this.arr3[5].remark3.ifShowText = true;
					// 体检数据-赋值
					res.data.data.baseData.forEach((ele, index) => {
						if (nval.dangqian.name.substring(0, 9) == ele.schoolyear) {
							this.arr3[3].leftEye3.content2 = ele.leftEye;
							this.arr3[3].rightEye3.content2 = ele.rightEye;
							this.arr3[3].stuHeight3.content2 = ele.stuHeight;
							this.arr3[3].stuWeight3.content2 = ele.stuWeight;
							this.arr3[5].remark3.content2 = ele.remark;
							
						}
						if (this.bianxn(nval.dangqian.name) == ele.schoolyear) {
							this.arr3[3].leftEye2.content2 = ele.leftEye;
							this.arr3[3].rightEye2.content2 = ele.rightEye;
							this.arr3[3].stuHeight2.content2 = ele.stuHeight;
							this.arr3[3].stuWeight2.content2 = ele.stuWeight;
							this.arr3[5].remark2.content2 = ele.remark;
							
						}
						if (this.bianxn(this.bianxn(nval.dangqian.name)) == ele.schoolyear) {
							this.arr3[3].leftEye1.content2 = ele.leftEye;
							this.arr3[3].rightEye1.content2 = ele.rightEye;
							this.arr3[3].stuHeight1.content2 = ele.stuHeight;
							this.arr3[3].stuWeight1.content2 = ele.stuWeight;
							this.arr3[5].remark1.content2 = ele.remark;
						}
					});
			
					// 体质健康-编辑
					for (let a = 2; a <= 10; a++) {
						for (let b in this.arr4[a]) {
							if (this.arr4[a][b].hasOwnProperty('ifShow')) {
								this.arr4[a][b].ifShow = true;
							}
						}
					}
					// 体质健康-赋值
					res.data.data.healthData.forEach((ele, index) => {
						if (nval.dangqian.name.substring(0, 9) == ele.schoolyear) {
							for (let a = 8; a <= 10; a++) {
								for (let b in this.arr4[a]) {
									this.arr4[a][b].content2 = ele[b];
								}
							}
							this.bangding();
						}
						if (this.bianxn(nval.dangqian.name) == ele.schoolyear) {
							for (let a = 5; a <= 7; a++) {
								for (let b in this.arr4[a]) {
									this.arr4[a][b].content2 = ele[b];
								}
							}
							this.bangding();
						}
						if (this.bianxn(this.bianxn(nval.dangqian.name)) == ele.schoolyear) {
							for (let a = 2; a <= 4; a++) {
								for (let b in this.arr4[a]) {
									this.arr4[a][b].content2 = ele[b];
								}
							}
							this.bangding();
						}
					});
					// 操行记录-编辑
					this.arr5[2].bingjia5.ifShow = true;
					this.arr5[3].shijia5.ifShow = true;
				    this.arr5[4].chidao5.ifShow = true;
					this.arr5[5].zaotui5.ifShow = true;
					this.arr5[6].kuangke5.ifShow = true;
					this.arr5[2].bingjia6.ifShow = true;
					this.arr5[3].shijia6.ifShow = true;
					this.arr5[4].chidao6.ifShow = true;
					this.arr5[5].zaotui6.ifShow = true;
					this.arr5[6].kuangke6.ifShow = true;
					this.arr5[2].bingjia3.ifShow = true;
					this.arr5[3].shijia3.ifShow = true;
					this.arr5[4].chidao3.ifShow = true;
					this.arr5[5].zaotui3.ifShow = true;
					this.arr5[6].kuangke3.ifShow = true;
					this.arr5[2].bingjia4.ifShow = true;
					this.arr5[3].shijia4.ifShow = true;
					this.arr5[4].chidao4.ifShow = true;
					this.arr5[5].zaotui4.ifShow = true;
					this.arr5[6].kuangke4.ifShow = true;
					// 操行记录赋值
					res.data.data.stuRecordData.forEach((ele, index) => {
						if (nval.dangqian.name.substring(0, 9) == ele.schoolyear) {
							this.arr5[7].zhuanxuedesc.content2 = ele.zhuanxuedesc;
							this.arr5[8].xiuyuedesc.content2 = ele.xiuyuedesc;
							this.arr5[9].graduation.content2 = ele.graduation;
							this.arr5[10].remark.content2 = ele.remark;
							if (ele.term == '上学期') {
								this.arr5[2].bingjia5.content2 = ele.bingjia;
								this.arr5[3].shijia5.content2 = ele.shijia;
								this.arr5[4].chidao5.content2 = ele.chidao;
								this.arr5[5].zaotui5.content2 = ele.zaotui;
								this.arr5[6].kuangke5.content2 = ele.kuangke;
							} else {
								this.arr5[2].bingjia6.content2 = ele.bingjia;
								this.arr5[3].shijia6.content2 = ele.shijia;
								this.arr5[4].chidao6.content2 = ele.chidao;
								this.arr5[5].zaotui6.content2 = ele.zaotui;
								this.arr5[6].kuangke6.content2 = ele.kuangke;
							}
						}
						if (this.bianxn(nval.dangqian.name) == ele.schoolyear) {
							if (ele.term == '上学期') {
								this.arr5[2].bingjia3.content2 = ele.bingjia;
								this.arr5[3].shijia3.content2 = ele.shijia;
								this.arr5[4].chidao3.content2 = ele.chidao;
								this.arr5[5].zaotui3.content2 = ele.zaotui;
								this.arr5[6].kuangke3.content2 = ele.kuangke;
							} else {
								this.arr5[2].bingjia4.content2 = ele.bingjia;
								this.arr5[3].shijia4.content2 = ele.shijia;
								this.arr5[4].chidao4.content2 = ele.chidao;
								this.arr5[5].zaotui4.content2 = ele.zaotui;
								this.arr5[6].kuangke4.content2 = ele.kuangke;
							}
							
						}
						if (this.bianxn(this.bianxn(nval.dangqian.name)) == ele.schoolyear) {
							if (ele.term == '上学期') {
								this.arr5[2].bingjia1.content2 = ele.bingjia;
								this.arr5[3].shijia1.content2 = ele.shijia;
								this.arr5[4].chidao1.content2 = ele.chidao;
								this.arr5[5].zaotui1.content2 = ele.zaotui;
								this.arr5[6].kuangke1.content2 = ele.kuangke;
							} else {
								this.arr5[2].bingjia2.content2 = ele.bingjia;
								this.arr5[3].shijia2.content2 = ele.shijia;
								this.arr5[4].chidao2.content2 = ele.chidao;
								this.arr5[5].zaotui2.content2 = ele.zaotui;
								this.arr5[6].kuangke2.content2 = ele.kuangke;
							}
						}
					});
				}
				if (nval.nianji.gradeName == '初二') {
					//基本信息赋值
					res.data.data.baseInfoData.forEach((ele, index) => {
						if (ele.stuSchoolYear == "第二学年") {
							this.arr.forEach((ele1, index1) => {
								for (let i in ele1) {
									ele1[i].content2 = ele[i];
								}
								return ele1;
							});
							if(ele.familyList){
								for (let a = 0; a < ele.familyList.length; a++) {
									for (let i in this.arr[a + 4]) {
										this.arr[a + 4][i].content2 = ele.familyList[a][i];
									}
								}
							}
							
						}
					});
					// 学业成绩编辑
					for(let i =4;i<=6;i++){
						for(let a in this.arr1[i]){
							if(this.arr1[i][a].hasOwnProperty("ifShow")){
								this.arr1[i][a].ifShow = true;
							}
						}
					}
					for(let i =7;i<=9;i++){
						for(let a in this.arr1[i]){
							if(this.arr1[i][a].hasOwnProperty("ifShow")){
								this.arr1[i][a].ifShow = false;
							}
						}
					}
					// 综合评价-编辑
					for (let a = 1; a <= 5; a++) {
						for (let b in this.arr2[a]) {
							if (this.arr2[a][b].hasOwnProperty('ifShow')) {
								this.arr2[a][b].ifShow = true;
							}
							if (this.arr2[a][b].hasOwnProperty('ifShowText')) {
								this.arr2[a][b].ifShowText = true;
							}
						}
					}
					for (let a = 7; a <= 8; a++) {
						for (let b in this.arr2[a]) {
							if (this.arr2[a][b].hasOwnProperty('ifShow')) {
								this.arr2[a][b].ifShow = false;
							}
							if (this.arr2[a][b].hasOwnProperty('ifShowText')) {
								this.arr2[a][b].ifShowText = false;
							}
						}
					}
					this.arr2[10].jiangcheng1.ifShow = true;
					this.arr2[10].jiangcheng2.ifShow = true;
					this.arr2[10].jiangcheng3.ifShow = false;
					// 综合评价-赋值
					res.data.data.evalData.forEach((ele, index) => {
						if (nval.dangqian.name.substring(0, 9) == ele.schoolyear) {
							for (let a = 4; a <= 5; a++) {
								for (let b in this.arr2[a]) {
									this.arr2[a][b].content2 = ele[b];
								}
							}
							this.arr2[10].jiangcheng2.content2 = ele.jiangcheng;
						}
						if (this.bianxn(nval.dangqian.name) == ele.schoolyear) {
							for (let a = 1; a <= 2; a++) {
								for (let b in this.arr2[a]) {
									this.arr2[a][b].content2 = ele[b];
								}
							}
							this.arr2[10].jiangcheng1.content2 = ele.jiangcheng;
						}
					});
					// 体检数据-编辑
					this.arr3[3].leftEye2.ifShow = true;
					this.arr3[3].rightEye2.ifShow = true;
				    this.arr3[3].stuHeight2.ifShow = true;
					this.arr3[3].stuWeight2.ifShow = true;
					this.arr3[5].remark2.ifShowText = true;
					this.arr3[3].leftEye3.ifShow = false;
					this.arr3[3].rightEye3.ifShow = false;
				    this.arr3[3].stuHeight3.ifShow = false;
					this.arr3[3].stuWeight3.ifShow = false;
					this.arr3[5].remark3.ifShowText = false;
					// 体检数据-赋值
					res.data.data.baseData.forEach((ele, index) => {
						if (nval.dangqian.name.substring(0, 9) == ele.schoolyear) {
							this.arr3[3].leftEye2.content2 = ele.leftEye;
							this.arr3[3].rightEye2.content2 = ele.rightEye;
							this.arr3[3].stuHeight2.content2 = ele.stuHeight;
							this.arr3[3].stuWeight2.content2 = ele.stuWeight;
							this.arr3[5].remark2.content2 = ele.remark;
						}
						if (this.bianxn(nval.dangqian.name) == ele.schoolyear) {
							this.arr3[3].leftEye1.content2 = ele.leftEye;
							this.arr3[3].rightEye1.content2 = ele.rightEye;
							this.arr3[3].stuHeight1.content2 = ele.stuHeight;
							this.arr3[3].stuWeight1.content2 = ele.stuWeight;
							this.arr3[5].remark1.content2 = ele.remark;
						}
					});
					
					// 体质健康-编辑
					for (let a = 2; a <= 7; a++) {
						for (let b in this.arr4[a]) {
							if (this.arr4[a][b].hasOwnProperty('ifShow')) {
								this.arr4[a][b].ifShow = true;
							}
						}
					}
					for (let a = 8; a <= 10; a++) {
						for (let b in this.arr4[a]) {
							if (this.arr4[a][b].hasOwnProperty('ifShow')) {
								this.arr4[a][b].ifShow = false;
							}
						}
					}
					// 体质健康-赋值
					res.data.data.healthData.forEach((ele, index) => {
						if (nval.dangqian.name.substring(0, 9) == ele.schoolyear) {
							for (let a = 5; a <= 7; a++) {
								for (let b in this.arr4[a]) {
									this.arr4[a][b].content2 = ele[b];
									if (this.arr4[a][b].hasOwnProperty('ifShow')) {
										this.arr4[a][b].ifShow = true;
									}
								}
							}
							this.bangding();
						}
						if (this.bianxn(nval.dangqian.name) == ele.schoolyear) {
							for (let a = 2; a <= 4; a++) {
								for (let b in this.arr4[a]) {
									this.arr4[a][b].content2 = ele[b];
								}
							}
							this.bangding();
						}
					});
					// 操行记录编辑
					this.arr5[2].bingjia5.ifShow = false;
					this.arr5[3].shijia5.ifShow = false;
				    this.arr5[4].chidao5.ifShow = false;
					this.arr5[5].zaotui5.ifShow = false;
					this.arr5[6].kuangke5.ifShow = false;
					this.arr5[2].bingjia6.ifShow = false;
					this.arr5[3].shijia6.ifShow = false;
					this.arr5[4].chidao6.ifShow = false;
					this.arr5[5].zaotui6.ifShow = false;
					this.arr5[6].kuangke6.ifShow = false;
					this.arr5[2].bingjia3.ifShow = true;
					this.arr5[3].shijia3.ifShow = true;
					this.arr5[4].chidao3.ifShow = true;
					this.arr5[5].zaotui3.ifShow = true;
					this.arr5[6].kuangke3.ifShow = true;
					this.arr5[2].bingjia4.ifShow = true;
					this.arr5[3].shijia4.ifShow = true;
					this.arr5[4].chidao4.ifShow = true;
					this.arr5[5].zaotui4.ifShow = true;
					this.arr5[6].kuangke4.ifShow = true;
					// 操行记录-赋值
					res.data.data.stuRecordData.forEach((ele, index) => {
						if (nval.dangqian.name.substring(0, 9) == ele.schoolyear) {
							this.arr5[7].zhuanxuedesc.content2 = ele.zhuanxuedesc;
							this.arr5[8].xiuyuedesc.content2 = ele.xiuyuedesc;
							this.arr5[9].graduation.content2 = ele.graduation;
							this.arr5[10].remark.content2 = ele.remark;
							if (ele.term == '上学期') {
								this.arr5[2].bingjia3.content2 = ele.bingjia;
								this.arr5[3].shijia3.content2 = ele.shijia;
								this.arr5[4].chidao3.content2 = ele.chidao;
								this.arr5[5].zaotui3.content2 = ele.zaotui;
								this.arr5[6].kuangke3.content2 = ele.kuangke;
							} else {
								this.arr5[2].bingjia4.content2 = ele.bingjia;
								this.arr5[3].shijia4.content2 = ele.shijia;
								this.arr5[4].chidao4.content2 = ele.chidao;
								this.arr5[5].zaotui4.content2 = ele.zaotui;
								this.arr5[6].kuangke4.content2 = ele.kuangke;
							}
						}
						if (this.bianxn(nval.dangqian.name) == ele.schoolyear) {
							if (ele.term == '上学期') {
								this.arr5[2].bingjia1.content2 = ele.bingjia;
								this.arr5[3].shijia1.content2 = ele.shijia;
								this.arr5[4].chidao1.content2 = ele.chidao;
								this.arr5[5].zaotui1.content2 = ele.zaotui;
								this.arr5[6].kuangke1.content2 = ele.kuangke;
							} else {
								this.arr5[2].bingjia2.content2 = ele.bingjia;
								this.arr5[3].shijia2.content2 = ele.shijia;
								this.arr5[4].chidao2.content2 = ele.chidao;
								this.arr5[5].zaotui2.content2 = ele.zaotui;
								this.arr5[6].kuangke2.content2 = ele.kuangke;
							}
						}
					});
				}
				if (nval.nianji.gradeName == '初一') {
					//基本信息赋值
					res.data.data.baseInfoData.forEach((ele, index) => {
						if (ele.stuSchoolYear == "第一学年") {
							this.arr.forEach((ele1, index1) => {
								for (let i in ele1) {
									ele1[i].content2 = ele[i];
								}
								return ele1;
							});
							if(ele.familyList){
								for (let a = 0; a < ele.familyList.length; a++) {
									for (let i in this.arr[a + 4]) {
										this.arr[a + 4][i].content2 = ele.familyList[a][i];
									}
								}
							}
							
						}
					});
					//学业成绩编辑
					for(let i =4;i<=9;i++){
						for(let a in this.arr1[i]){
							if(this.arr1[i][a].hasOwnProperty("ifShow")){
								this.arr1[i][a].ifShow = false;
							}
						}
					}
					// 综合评价-编辑
					for (let a = 4; a <= 8; a++) {
						for (let b in this.arr2[a]) {
							if (this.arr2[a][b].hasOwnProperty('ifShow')) {
								this.arr2[a][b].ifShow = false;
							}
							if (this.arr2[a][b].hasOwnProperty('ifShowText')) {
								this.arr2[a][b].ifShowText = false;
							}
						}
					}
					this.arr2[10].jiangcheng1.ifShow = true;
					this.arr2[10].jiangcheng2.ifShow = false;
					this.arr2[10].jiangcheng3.ifShow = false;
					// 综合评价-赋值
					res.data.data.evalData.forEach((ele, index) => {
						if (nval.dangqian.name.substring(0, 9) == ele.schoolyear) {
							for (let a = 1; a <= 2; a++) {
								for (let b in this.arr2[a]) {
									this.arr2[a][b].content2 = ele[b];
								}
							}
							this.arr2[10].jiangcheng1.content2 = ele.jiangcheng;
						}
					});
					// 体检数据-编辑
					this.arr3[3].leftEye2.ifShow = false;
					this.arr3[3].rightEye2.ifShow = false;
				    this.arr3[3].stuHeight2.ifShow = false;
					this.arr3[3].stuWeight2.ifShow = false;
					this.arr3[5].remark2.ifShowText = false;
					this.arr3[3].leftEye3.ifShow = false;
					this.arr3[3].rightEye3.ifShow = false;
				    this.arr3[3].stuHeight3.ifShow = false;
					this.arr3[3].stuWeight3.ifShow = false;
					this.arr3[5].remark3.ifShowText = false;
					res.data.data.baseData.forEach((ele, index) => {
						if (nval.dangqian.name.substring(0, 9) == ele.schoolyear) {
							this.arr3[3].leftEye1.content2 = ele.leftEye;
							this.arr3[3].rightEye1.content2 = ele.rightEye;
							this.arr3[3].stuHeight1.content2 = ele.stuHeight;
							this.arr3[3].stuWeight1.content2 = ele.stuWeight;
							this.arr3[5].remark1.content2 = ele.remark;
						}
					});
					// 体质健康-编辑
					for (let a = 5; a <= 10; a++) {
						for (let b in this.arr4[a]) {
							if (this.arr4[a][b].hasOwnProperty('ifShow')) {
								this.arr4[a][b].ifShow = false;
							}
						}
					}
					// 体质健康-赋值
					res.data.data.healthData.forEach((ele, index) => {
						if (nval.dangqian.name.substring(0, 9) == ele.schoolyear) {
							for (let a = 2; a <= 4; a++) {
								for (let b in this.arr4[a]) {
									this.arr4[a][b].content2 = ele[b];
								}
							}
							this.bangding();
						}
					});
					// 操行记录编辑
					this.arr5[2].bingjia5.ifShow = false;
					this.arr5[3].shijia5.ifShow = false;
				    this.arr5[4].chidao5.ifShow = false;
					this.arr5[5].zaotui5.ifShow = false;
					this.arr5[6].kuangke5.ifShow = false;
					this.arr5[2].bingjia6.ifShow = false;
					this.arr5[3].shijia6.ifShow = false;
					this.arr5[4].chidao6.ifShow = false;
					this.arr5[5].zaotui6.ifShow = false;
					this.arr5[6].kuangke6.ifShow = false;
					this.arr5[2].bingjia3.ifShow = false;
					this.arr5[3].shijia3.ifShow = false;
					this.arr5[4].chidao3.ifShow = false;
					this.arr5[5].zaotui3.ifShow = false;
					this.arr5[6].kuangke3.ifShow = false;
					this.arr5[2].bingjia4.ifShow = false;
					this.arr5[3].shijia4.ifShow = false;
					this.arr5[4].chidao4.ifShow = false;
					this.arr5[5].zaotui4.ifShow = false;
					this.arr5[6].kuangke4.ifShow = false;
					res.data.data.stuRecordData.forEach((ele, index) => {
						if (nval.dangqian.name.substring(0, 9) == ele.schoolyear) {
							this.arr5[7].zhuanxuedesc.content2 = ele.zhuanxuedesc;
							this.arr5[8].xiuyuedesc.content2 = ele.xiuyuedesc;
							this.arr5[9].graduation.content2 = ele.graduation;
							this.arr5[10].remark.content2 = ele.remark;
							if (ele.term == '上学期') {
								this.arr5[2].bingjia1.content2 = ele.bingjia;
								this.arr5[3].shijia1.content2 = ele.shijia;
								this.arr5[4].chidao1.content2 = ele.chidao;
								this.arr5[5].zaotui1.content2 = ele.zaotui;
								this.arr5[6].kuangke1.content2 = ele.kuangke;
							} else {
								this.arr5[2].bingjia2.content2 = ele.bingjia;
								this.arr5[3].shijia2.content2 = ele.shijia;
								this.arr5[4].chidao2.content2 = ele.chidao;
								this.arr5[5].zaotui2.content2 = ele.zaotui;
								this.arr5[6].kuangke2.content2 = ele.kuangke;
							}
						}
					});
				}
			});
			console.log(this.arr1)
		}
		
	},
	watch: {
		data1(nval, oval) {
			if(JSON.stringify(nval) != JSON.stringify(oval)){
				this.isS = false;
				this.xuehao = "";
				this.arr[0].stuName.content2 = "";
				this.empty();
				if (nval.nianji != undefined && nval.dangqian.length != 0 &&  nval.stuNo != ""   ) {
					this.isS = nval.isS;
					this.xuehao = nval.stuNo;
					this.data = nval; 
					this.arr[0].zhaopian.imgUrl = configure.studentRecord+"stuRecord/image/"+this.data.banji.classId+"/ruxue/"+this.data.stuNo+"?"+new Date().getTime();
					this.arr[4].zhaopian.imgUrl = configure.studentRecord+"stuRecord/image/"+this.data.banji.classId+"/biye/"+this.data.stuNo+"?"+new Date().getTime();
					this.show(nval);
				}
			}
			
		},
		$route(nval,oval){
			this.xuehao = "";
			this.arr[0].stuName.content2 = "";
			this.empty();
			if(nval.query.stuNo != undefined && JSON.stringify(nval.query) != JSON.stringify(oval.query)){
				this.xuehao = nval.query.stuNo;
				this.data.stuNo =nval.query.stuNo;
				this.data.stuName =nval.query.stuName;
				this.data.dangqian.name =nval.query.cureentGrade;
				this.data.nianji.gradeName = nval.query.gradeName;
				this.data.banji.classId =nval.query.classId;
				this.arr[0].zhaopian.imgUrl = configure.studentRecord+"stuRecord/image/"+this.data.banji.classId+"/ruxue/"+this.data.stuNo+"?"+new Date().getTime();
				this.arr[4].zhaopian.imgUrl = configure.studentRecord+"stuRecord/image/"+this.data.banji.classId+"/biye/"+this.data.stuNo+"?"+new Date().getTime();
				this.show(this.data);
			}
		}
	},
	created() {
		if(this.data1){
			if (this.data1.nianji != undefined && this.data1.dangqian.length != 0 &&  this.data1.stuNo != undefined) {
				this.xuehao = this.data1.stuNo;
				this.data = this.data1; 
				this.arr[0].zhaopian.imgUrl = configure.studentRecord+"stuRecord/image/"+this.data.banji.classId+"/ruxue/"+this.data.stuNo+"?"+new Date().getTime();
			    this.arr[4].zhaopian.imgUrl = configure.studentRecord+"stuRecord/image/"+this.data.banji.classId+"/biye/"+this.data.stuNo+"?"+new Date().getTime();
				this.show(this.data1);
			}
		}
		if(JSON.stringify(this.$route.query) != "{}"){
			if(this.$route.query.stuNo != undefined){
				this.xuehao = this.$route.query.stuNo;
				this.data.stuNo =this.$route.query.stuNo;
				this.data.stuName =this.$route.query.stuName;
				this.data.dangqian.name =this.$route.query.cureentGrade;
				this.data.nianji.gradeName = this.$route.query.gradeName;
				this.data.banji.classId =this.$route.query.classId;
				this.arr[0].zhaopian.imgUrl = configure.studentRecord+"stuRecord/image/"+this.data.banji.classId+"/ruxue/"+this.data.stuNo+"?"+new Date().getTime();
				this.arr[4].zhaopian.imgUrl = configure.studentRecord+"stuRecord/image/"+this.data.banji.classId+"/biye/"+this.data.stuNo+"?"+new Date().getTime();
				this.show(this.data);
			}
			
		}
		
 	}
};
</script>

<style scoped>
.wd {
	width: 875px;
	margin: 10px auto;
	padding-bottom: 30px;
	background: #fff;
}
.wd_h3 {
	margin: 0 auto;
	text-align: center;
	padding: 20px 0 0;
	font-size: 18px;
	letter-spacing: 1px;
	color: #282a2c;
}
.wd_h3 .iconceshi {
	color: #f4ae59;
	font-size: 22px;
	margin-left: 10px;
	cursor: pointer;
}
.wd_h3 input:nth-child(2) {
	width: 250px;
	height: 30px;
	outline: none;
	border: 1px solid #ddd;
	box-sizing: border-box;
	padding-left: 10px;
	vertical-align: middle;
}
.wd_h3 button:nth-child(3) {
	width: 45px;
	height: 30px;
	outline: none;
	box-sizing: border-box;
	border: none;
	background: #5093e1;
	color: #fff;
	font-size: 14px;
	margin: 0 10px;
	border-radius: 3px;
	cursor: pointer;
}
.wd_h3 button:nth-child(4) {
	width: 45px;
	height: 30px;
	outline: none;
	box-sizing: border-box;
	border: none;
	background: #fff;
	color: #333;
	font-size: 14px;
	border-radius: 3px;
	border: 1px solid #ddd;
	cursor: pointer;
}
.wd_daochu {
	color: #09af97;
	font-size: 16px;
	margin: -21px 3% 0 0;
	cursor: pointer;
}
.wd_daochu b {
	color: #ddd;
	font-size: 14px;
}
.wd_title {
	width: 95%;
	margin: 20px auto 5px;
}
.wd_title p:first-child {
	font-weight: 600;
	font-size: 18px;
	letter-spacing: 1px;
	color: #5093e1;
}
.wd_title .chang {
	width: 90%;
	height: 20px;
	border-bottom: 1px dashed #fee5c7;
}
.wd_title .duan {
	width: 82%;
	height: 20px;
	border-bottom: 1px dashed #fee5c7;
}
.wd_title .active {
	width: 73% !important;
}
.wd_title div:last-child {
	width: 64px;
	height: 34px;
	border: 1px solid;
	border-image: linear-gradient(to right, #f19f15, #e36e4d) 1 10;
	border-radius: 2px;
	cursor: pointer;
}
.wd_title div:last-child p {
	width: 60px;
	height: 30px;
	background: linear-gradient(to right, #f19f15, #e36e4d);
	border-radius: 2px;
	margin: 2px;
	color: #fff;
	text-align: center;
	line-height: 30px;
	font-weight: 400;
	font-size: 16px;
}
.wd_title div:nth-last-child(2) {
	width: 64px;
	height: 34px;
	border: 1px solid #eb872f;
	border-radius: 2px;
	cursor: pointer;
	margin-right: 10px;
}
.wd_title div:nth-last-child(2) p {
	width: 60px;
	height: 30px;
	background: #eb872f;
	border-radius: 2px;
	margin: 2px;
	color: #fff;
	text-align: center;
	line-height: 30px;
	font-weight: 400;
	font-size: 16px;
}
.wd_title div:nth-last-child(3) {
	width: 64px;
	height: 34px;
	border: 1px solid #818181;
	border-radius: 2px;
	cursor: pointer;
}
.wd_title div:nth-last-child(3) p {
	width: 60px;
	height: 30px;
	background: #818181;
	border-radius: 2px;
	margin: 2px;
	color: #fff;
	text-align: center;
	line-height: 30px;
	font-weight: 400;
	font-size: 16px;
}
.wd_tab_jbxx {
	width: 95%;
	margin: 0 auto;
}
.wd_tab_jbxx .huise {
	background: #f7f7f9;
}
.wd_tab_jbxx .gao1 {
	height: 120px;
}
.wd_tab_jbxx .gao2 {
	height: 80px;
	width: 274px;
}
.wd_tab_jbxx .tupian {
	position: relative;
	width:105px;
}
.wd_tab_jbxx .tupian:hover  label{
   opacity: 1;
}
.wd_tab_jbxx td {
	width: 100px;
	box-sizing: border-box;
	height: 40px;
	text-align: center;
	border: 1px solid #ccd0d3;

}
.wd_tab_jbxx td input {
	width: calc(100% - 10px);
	height: 30px;
	outline: none;
	border: 1px solid #9ac0ef;
	border-radius: 3px;
	box-sizing: border-box;
	padding-left: 5px;
}
.wd_tab_jbxx td textarea {
	width: calc(100% - 10px);
	height: calc(100% - 20px);
	outline: none;
	border: 1px solid #9ac0ef;
	border-radius: 3px;
	box-sizing: border-box;
	padding-left: 5px;
}
.wd_tab_jbxx td select {
	width: calc(100% - 10px);
	height: 30px;
	outline: none;
	border: 1px solid #9ac0ef;
	border-radius: 3px;
	box-sizing: border-box;
}
.wd_tab_jbxx td input[type='file'] {
	display: none;
}
.wd_tab_jbxx td input[type='file'] + label {
	display: block;
	width: 90px;
	height: 28px;
	background-image: linear-gradient(0deg, 
		#5093e1 0%, 
		#95c2f6 100%);
    position: absolute;
	color: #fff;
	line-height: 28px;
	border-radius: 5px;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	z-index: 20;
	opacity: 0;
	cursor: pointer;
}

.wd_tab_jbxx td img {
	width: 90px;
	height:136px;
}
.wd_tab_jbxx td .pingl {
	display: inline-block;
	text-align: left;
	padding: 10px;
}

</style>
