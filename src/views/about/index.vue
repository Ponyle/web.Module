<template>
<div>
	<!-- v-if="userInfo.rolename == 'StudentRole'" -->

	<div v-if="1" style="height: calc(100vh - 80px);overflow: hidden;">
		<n-card  :bordered="false" class="rounded-5px shadow-sm homeBox" style="height: calc(100vh - 100px);">
			<div class="title">
				<div class="welcome">欢迎访问</div>
				<div class="EspTitle">医境工坊</div>
			</div>
		</n-card>
	</div>

	</div>
</template>
<script setup lang="jsx">
import { onMounted,onActivated } from 'vue';

onMounted(() => {

});
onActivated(() => {
});



</script>

<style lang="scss" scoped>
h3{
	font-size: 18px;
	font-weight:400 ;
	color: rgb(31, 34, 37);
}
h4{
		font-size: 16px;
		color: #494E58;
		font-weight: 400;
		margin-left: 38px;
	}
.left{
	float: left;
}
.right{
	float: right;
}
.lineNum{
	height: 162px;
	border: 1px solid  #D7DFEB;
	border-radius: 5px;
	position:relative;
	width:308px;
	.reloadClass{
		position:absolute;
		top: 0px;
		left: 4px;
		span{
			color:#F53F3F;
			margin-right: 2px;
		}
	}
	>div{

		overflow: hidden;
	}
	>div:nth-child(1){
		padding:14px 20px 8px 20px;
		border-bottom:1px solid #D7DFEB;
		color:#8472BB;
	}
	>div:nth-child(2){
		padding:12px 20px 14px 20px;
		color: #D35191;
	}
	.Text{
		display: inline-block;
		width:120px;
		text-align: right;
		font-size: 16px;
		color:#494E58 ;
		font-weight: 500;
	}
	.Num{
		width: 120px;
		text-align: right;
		font-size: 20px;
		font-weight: 700;
		margin-top: 8px;
		line-height: 24px;
	}
	.NumRed{

	}
}
.statisticBox{
	height: 163px;
	border-radius: 5px;
	box-sizing: border-box;
	padding:20px 12px 20px 20px;
	width: 330px;
	color: #fff;
	:deep(svg){
		color: #fff;
	};
	>div:nth-child(1){
		overflow: hidden;
		margin-top: 20px;
		>.right{
			width: calc(100% - 92px);
			padding: 6px 0;
			>div:nth-child(1){
				border-bottom: 2px solid #fff;
				padding-bottom: 4px;
			}
			>div:nth-child(2){
				margin-top: 4px;
			}
			>div{
				overflow: hidden;
				>.left{
					font-size: 14px;
					line-height: 26px;
					&.bolder{
						font-size: 20px;
						font-weight: 500;
					}
				}
				>.left:nth-child(1){
					width:60px;
				}
				>.left:nth-child(2){
					display: inline-block;
					width:calc(100% - 60px);
					text-align: right;
				}
			}
		}

	}
	>div:nth-child(2){
		display: inline-block;
		margin-left: 16px;
		margin-top: 10px;
	}
}
.pageView{
	background: linear-gradient(180deg, rgba(88, 177, 227, 0.77) 1.39%, #58A7E3 98.33%, rgba(137, 227, 255, 0.67) 133.9%);
}
.userView{
	background: linear-gradient(180deg, #F7BA20 -33.9%, rgba(249, 104, 0, 0.73) 134.75%);;
}
.ExView{
	width: 132px;
	background: linear-gradient(180deg, #EF4398 -33.9%, rgba(140, 38, 86, 0.64) 134.75%);;
	>div:nth-child(1){
		>.right{
			width:100%;
			>div:nth-child(1){

			}
		}
	}
}
.userNum{
	width: 500px;
	background:linear-gradient(180deg, rgba(97, 75, 166, 0.75) 0%, #684FB8 133.9%);
	>div{
		>.right{
			>div{
				display: flex;
				justify-content: space-between;
				>div,span{
					display: inline-block;

					font-size: 14px;
					font-weight: 400;
					&.bolder{
						font-size: 20px;
						font-weight: 500;
					}
					&:nth-child(1){
						text-align: left;
						width: 25%!important;
					}
					&:nth-child(2){
						width: 25%!important;
						text-align: right!important;
					}
					&:nth-child(3){
						width: 40%!important;
						text-align: right;
					}
				}
			}
		}
	}
}
.n-card{
	margin-bottom: 20px;
}
:deep(.n-icon-wrapper) {
	// background:#fff!important;
	margin-left: 4px;
}
:deep(.n-icon-wrapper svg){
	// color: #684FB8!important;
};
.ExStatisticBox{
	height: 90px;
	border-radius: 5px;
	box-sizing: border-box;
	padding:0 42px 0 28px;
	width: 310px;
	color: #fff;
	:deep(svg){
		color: #fff;
	};
	>div:nth-child(1){
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 90px;
		>.right{
			>div{
				overflow: hidden;
				display: flex;
				justify-content: center;
				>.left{
					font-size: 16px;
					line-height: 26px;
					display: flex;
					align-items: center;
					&.bolder{
						font-size: 20px;
						font-weight: 500;
					}
					:deep(.n-icon-wrapper){
						margin-left: 4px;
					}

				}
			}
		}
	}
	&.ExNumber{
		background: linear-gradient(180deg, rgba(88, 177, 227, 0.77) 1.39%, #58A7E3 98.33%, rgba(137, 227, 255, 0.67) 133.9%);
		:deep(.n-icon-wrapper svg) {
			color: #58B1E3!important;
		}
	}
	&.ExView{
		background: linear-gradient(180deg, #FAD77E -33.9%, rgba(252, 106, 0, 0.73) 134.75%);
	}
	&.allLearnTime{
		background: linear-gradient(180deg, #EF4398 -33.9%, rgba(140, 38, 86, 0.64) 134.75%);
	}
	&.meanLearnTime{
		background: linear-gradient(180deg, rgba(97, 75, 166, 0.75) 0%, #684FB8 133.9%);
	}
	&.talkingNum{
		background: linear-gradient(180deg, rgba(72, 200, 186, 0.65) 0%, #29D7C4 133.9%);
	}
}
.listBox{
	padding-left:12px ;
	.listTile{
		:deep(.n-thing-header__title){
			font-size: 16px;
			font-weight: 400;
			color:#494E58 ;
		}
		:deep(.n-thing-header__extra){
			font-size: 16px;
			font-weight: 400;
			color:#494E58 ;
		}
	}
	.listContent{
		:deep(.n-thing-header__title){
			font-size: 14px;
			color:#717989 ;
		}
		:deep(.n-thing-header__extra){
			font-size: 14px;
			font-weight: 400;
			color:#F53F3F ;
			width: 64px;
			text-align: center;
		}
	}
	.n-list:nth-child(1){
		height: 36px;
		margin-top: 12px;
	}
}
.LearningStatusTitle{
	display: flex;
	align-items: center;
	:deep(.n-icon-wrapper){
		background:#A5B0C5!important;
		margin-left: 4px;
	};
	:deep(.n-icon-wrapper svg){
		color: #fff!important;
	}
}

.sortListBox{
	margin-left:38px;
	.title{
		display: flex;
		justify-content: space-between;
		font-size: 16px;
		font-weight: 400;
		padding:6px 0;
		color:#494E58;
		div{
			float: left;
		}
		div:nth-child(1){
			width: 120px;
		}
		div:nth-child(2){
			width: 135px;
		}
		div:nth-child(3){
			width: 200px;
			text-align: center;
		}
		div:nth-child(4){
			width: 80px;
			text-align: center;
		}
		div:nth-child(5){
			width: 80px;
			text-align: center;
		}
	}
	.listContent{
		>div{
			>div:nth-child(1){
				>div:nth-child(1){
					&::before{
						content:'';
						margin-left: 12px;
						display:inline-block;
						width: 34px;
						height: 34px;
						border-radius: 17px;
						background: url(@/assets/images/mengoo/sort_1.png) no-repeat center center;
						background-size:68%;
					}
				}
			}
			>div:nth-child(2){
				div:nth-child(1){
					&::before{
						content:'';
						margin-left: 12px;
						display:inline-block;
						width: 34px;
						height: 34px;
						border-radius: 17px;
						background: url(@/assets/images/mengoo/sort_2.png) no-repeat center center;
						background-size:68%;
					}
				}
			}
			>div:nth-child(3){
				div:nth-child(1){
					&::before{
						content:'';
						margin-left: 12px;
						display:inline-block;
						width: 34px;
						height: 34px;
						border-radius: 17px;
						background: url(@/assets/images/mengoo/sort_3.png) no-repeat center center;
						background-size:68%;
					}
				}
			}
			>div:nth-child(4){
				div:nth-child(1){
					&::before{
						content:'4';
						margin-left: 8px;
						display:inline-block;
						width: 34px;
						height: 34px;
						line-height: 34px;
						float: left;
						text-align: center;
						font-size: 16px;
						font-weight: bolder;
						color: #67A97F;
					}
				}
			}
			>div:nth-child(5){
				div:nth-child(1){
					&::before{
						content:'5';
						margin-left: 8px;
						display:inline-block;
						width: 34px;
						height: 34px;
						line-height: 34px;
						float: left;
						text-align: center;
						font-size: 16px;
						font-weight: bolder;
						color: #67A97F;
					}
				}
			}
			>div{
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-top: 1px solid #efefef;
				padding:10px 0;
				>div{
					float: left;
				}
				div:nth-child(1){
					width: 120px;

				}
				div:nth-child(2){
					width: 135px;
					font-size: 14px;
					color: #717171;
				}
				div:nth-child(3){
					width: 200px;
					font-size: 14px;
					color: #717171;
					text-align: center;
				}
				div:nth-child(4){
					width: 80px;
					font-size: 14px;
					font-weight: bolder;
					color: #0BB41C;
					text-align: center;
				}
				div:nth-child(5){
					width: 80px;
					font-size: 14px;
					font-weight: bolder;
					color: #0BB41C;
					text-align: center;
				}
			}
		}
	}

}
	#teacherBox{

		.Num::before{
			color: #fbb122!important;

		}

	}
	@media screen and (max-width:1910px) {
		:deep(.n-space div:has(.userNum)){
			position: absolute;
			top: 174px;
			left: 0px;
			width: 100%;
			.userNum{
				width: 100%;
			}
		}
		.fixedHeight{
			height: 416px;
		}
		:deep(.n-space div:has(.pageView)){
			width: calc((100% - 416px )/2);
			.pageView{
				width: 100%;
			}
		}
		:deep(.n-space div:has(.userView)){
			width: calc((100% - 416px )/2);
			.userView{
				width: 100%;
			}
		}

	}

	.headerCard{
		border: 1px solid #d7dfeb;
		height: 162px;
		width: 308px;
		padding: 14px 24px;
		.title{
			font-size: 18px;
			margin-bottom: 10px;
		}
		.num{
			font-size: 26px;
			line-height: 78px;
		}
	}
	.schoolSelect{
		position: absolute;
		width: 260px;
		top: 14px;
		left: 120px;
	}

	.homeBox{
			height: calc(100vh - 140px);
			min-height: 400px;
			background: url(@/assets/images/homeBg.png) no-repeat center bottom;
			background-color: #fff;
			background-size: 100%;
			.title{
				margin:40px 0 0 40px;
				.welcome{
					font-size:34px;
					color: #017980;
					border-bottom: 3px solid #017980;
					width: 138px;
					padding-bottom:4px;
					margin-bottom: 6px;
				}
				.EspTitle{
					font-size: 38px;
					color:#017980 ;
				}
			}
		}
</style>
