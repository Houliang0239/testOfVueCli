<template>
  <div class="drainage-container">
    <div class="drainage-main">
      <!--中间水槽-->
      <div class="drainage-water">
        <img
          alt
          v-for="(pic,index) in drainageWater"
          :key="index"
          :src="pic.imgsrc"
          :class="[pic.draClass]"
          :style="pic.move==1 ? {'top': 320-waterLevel*(6-setHeight)+'px','transition':'top 1.3s'} : (pic.move == 2 ?{'top': 284.5-waterLevel*(6-setHeight)+'px','transition':'top 1.3s'}:{})"
        />
        <div class="itemIcon">
          <img
            class="static"
            v-for="(item,index) in iconList"
            :key="index"
            :src="item.iconSrc"
            :class="showClick(index)"
          />
        </div>

        <div class="shelter"></div>
      </div>
      <!-- 溢出提示 -->
      <div class="overFlow" v-show="overFlow" :overItem="overItem">{{overItem}}的体积超出水槽剩余容量了</div>
      <!-- 水位变化量 -->
      <div
        class="variationFront"
        :style="{'height':variation[0].height,'top':variation[0].top}"
        v-show="variationActive"
      ></div>
      <div
        class="variationRight"
        :style="{'height':variation[1].height,'top':variation[1].top}"
        v-show="variationActive"
      ></div>
      <!-- 隐藏的物体 -->

      <span class="ten-cm">10cm</span>
      <span class="five-cm">5cm</span>

      <div class="hint">
        <div class="dra-hint">
          <span>4cm</span>
        </div>
        <div
          class="dra-line-hint"
          v-show="isActive"
          :style="{'position':'absolute' , 'top':-70-(6-setHeight)*waterLevel+'px' ,'transition':'top 1.2s'}"
        >
          <span>{{10-setHeight}}cm</span>
        </div>
      </div>
      <!--左侧隐藏按钮-->
      <div class="drainage-button" v-show="buttonIsActive">
        <div class="change" @click="variationChange" :class="variationChangeBlue()">水位变化量</div>
        <div class="clear-item" @click="clickClear">清空物品</div>
      </div>
    </div>
    <!--下方物体点击栏-->
    <div class="drainage-item">
      <div class="item-list">
        <div
          class="btn"
          v-for="(item,index) in itemList"
          :key="index"
          @click="clickItem(index,item)"
          :class="[blueClick(index),{isgray: item.isGrayStatus}]"
        >
          <img :src="item.imgsrc" alt />
          <span>{{item.itemName}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      drainageWater: [
        {
          move: 0,
          draClass: "dra-bottle-back",
          imgsrc: require("../../public/img/drainage/dra-bottle-back.png")
        },
        {
          move: 1,
          draClass: "dra-column-front",
          imgsrc: require("../../public/img/drainage/dra-column-front.png")
        },
        {
          move: 2,
          draClass: "dra-column-back",
          imgsrc: require("../../public/img/drainage/dra-column-back.png")
        },
        {
          move: 0,
          draClass: "dra-bottle-front",
          imgsrc: require("../../public/img/drainage/dra-bottle-front.png")
        }
      ],
      itemList: [
        {
          imgsrc: require("../../public/img/drainage/dra-little-stone-icon.png"),
          itemName: "小石头",
          height: 1,
          status: 0,
          isGrayStatus: false,
          selected: true
        },
        {
          imgsrc: require("../../public/img/drainage/dra-big-stone-icon.png"),
          itemName: "大石头",
          height: 2,
          status: 0,
          isGrayStatus: false,
          selected: true
        },
        {
          imgsrc: require("../../public/img/drainage/dra-cylinder-icon.png"),
          itemName: "圆锥体",
          height: 3,
          status: 0,
          isGrayStatus: false,
          selected: true
        },
        {
          imgsrc: require("../../public/img/drainage/dra-cone-icon.png"),
          itemName: "圆柱体",
          height: 3,
          status: 0,
          isGrayStatus: false,
          selected: true
        },
        {
          imgsrc: require("../../public/img/drainage/dra-pear-icon.png"),
          itemName: "小鸭梨",
          height: 1,
          status: 0,
          isGrayStatus: false,
          selected: true
        }
      ],
      iconList: [
        {
          iconSrc: require("../../public/img/drainage/dra-little-stone.png")
        },
        {
          iconSrc: require("../../public/img/drainage/dra-big-stone.png")
        },
        {
          iconSrc: require("../../public/img/drainage/dra-cone.png")
        },
        {
          iconSrc: require("../../public/img/drainage/dra-cylinder.png")
        },
        {
          iconSrc: require("../../public/img/drainage/dra-pear.png")
        }
      ],
      variation: [
        {
          height: "",
          top: ""
        },
        {
          height: "",
          top: ""
        }
      ],
      buttonIsActive: false,
      isActive: false,
      hinkStatus: 0,
      heightStatus: 6,
      waterLevel: 36.666667,
      overFlow: false,
      overItem: "",
      variationActive: false,
      changeBlueActive: false,
      setHeight: 6,
      setWaterHeight: 6
    };
  },
  methods: {
    buttonActive() {
      //左侧按钮显示控制
      return this.hinkStatus == 0
        ? (this.buttonIsActive = false)
        : (this.buttonIsActive = true);
    },
    blueClick(index) {
      return [this.$data.itemList[index].status == 1 ? "isblue" : ""];
    },
    variationChangeBlue() {
      return [this.changeBlueActive ? "isblue" : ""];
    },
    heightFull() {
      for (var i = 0; i < this.$data.itemList.length; i++) {
        if (
          this.heightStatus < this.$data.itemList[i].height &&
          this.$data.itemList[i].status != 1
        ) {
          this.$data.itemList[i].isGrayStatus = true;
        } else {
          this.$data.itemList[i].isGrayStatus = false;
        }
      }
    },
    rightChange() {
      if (this.heightStatus >= 0 && this.heightStatus < 6) {
        this.isActive = true;
      } else if (this.heightStatus == 6) {
        this.isActive = false;
      }
    },
    showClick(index) {
      return this.$data.itemList[index].status == 1
        ? `movePosition${index}`
        : "";
    },
    resetVariationChange() {
      if (this.changeBlueActive) {
        this.variation[0].height =
          this.waterLevel * (6 - this.heightStatus) + "px";
        this.variation[1].height =
          this.waterLevel * (6 - this.heightStatus) + "px";
        this.variation[0].top =
          438 - this.waterLevel * (6 - this.heightStatus) + "px";
        this.variation[1].top =
          400 - this.waterLevel * (6 - this.heightStatus) + "px";
      } else {
        this.variationActive = false;
        this.variation[0].height = "";
        this.variation[0].top = "";
        this.variation[1].height = "";
        this.variation[1].top = "";
      }
    },
    clickItem(index, item) {
      if (this.$data.itemList[index].isGrayStatus) {  //灰色不可触发点击
        this.overFlow = true;
        this.overItem = item.itemName;
        setTimeout(() => {
          this.overFlow = false;
          this.overItem = "";
        }, 2000);
      } else {
        if (this.$data.itemList[index].status == 0) {  //判断当前物体按钮状态
          this.hinkStatus++;
          this.heightStatus -= this.$data.itemList[index].height;
          this.itemList[index].status = 1;
          setTimeout(() => {                            //完成延时上升
            this.setHeight = this.heightStatus;
          }, 1000);
        } else {
          this.hinkStatus--;
          this.heightStatus += this.$data.itemList[index].height;
          this.$data.itemList[index].status = 0;
          this.setHeight = this.heightStatus;
        }
        this.buttonActive(); 
        this.heightFull();                             
        this.rightChange();
        this.showClick(index);                           
        if (this.changeBlueActive) {
          this.changeBlueActive = false;
          this.resetVariationChange();                 //水面变化量按钮
        }
      }
    },
    //重置
    clickClear() {
      this.buttonIsActive = false;
      this.isActive = false;
      this.hinkStatus = 0;
      this.heightStatus = 6;
      this.clearFlag = true;
      this.variationActive = false;
      this.changeBlueActive = false;
      this.setHeight = 6;
      this.setWaterHeight = 6;
      for (let i = 0; i < this.itemList.length; i++) {
        this.itemList[i].status = 0;
        this.itemList[i].heightStatus = false;
      }
      this.heightFull();
    },
    variationChange() {
      this.variationActive = true;
      this.changeBlueActive = !this.changeBlueActive;
      this.resetVariationChange();
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  user-select: none;
}
.drainage-container {
  width: 1280px;
  height: 800px;
  margin: 0 auto;
  background-color: #84ccc9;
}
.drainage-main {
  position: relative;
  width: 1280px;
  height: 643px;
  .drainage-water {
    position: relative;
    top: 50%;
    width: 636px;
    height: 497px;
    margin: 0 auto;
    transform: translateY(-50%);
    overflow: hidden;
    .dra-bottle-back {
      position: absolute;
      top: 0;
      left: 0;
      width: 636px;
      height: 497px;
    }
    .dra-column-front {
      position: absolute;
      top: 320px;
      left: 14px;
      width: 615px;
      height: 387px;
      z-index: 5;
    }
    .dra-column-back {
      position: absolute;
      top: 284px;
      left: 61px;
      z-index: 5;
    }
    .dra-bottle-front {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 5;
    }
    .shelter {
      position: absolute;
      right: -33px;
      bottom: -28px;
      transform: rotate(-42deg);
      width: 130px;
      height: 70px;
      background: #84ccc9;
      z-index: 10;
    }
  }
}

.overFlow {
  position: absolute;
  top: 20px;
  left: 450px;
  width: 405px;
  height: 40px;
  border: 3px solid #e8e8e8;
  border-radius: 30px;
  text-align: center;
  line-height: 40px;
  font-size: 25px;
  color: #595959;
  opacity: 0.8;
}
.variationFront {
  position: absolute;
  top: 438px;
  left: 336px;
  width: 530px;
  height: 0px;
  background-color: #def739;
  opacity: 0.7;
  animation: shining 2s linear;
  @keyframes shining {
    25% {
      opacity: 0;
    }
    50% {
      opacity: 0.7;
    }
    75% {
      opacity: 0;
    }
  }
  // overflow: hidden;
}
.variationRight {
  position: absolute;
  top: 400px;
  left: 866px;
  transform: skewY(-42deg);
  width: 85px;
  height: 0px;
  background-color: #def739;
  opacity: 0.7;
  animation: shining 2s linear;
  @keyframes shining {
    25% {
      opacity: 0;
    }
    50% {
      opacity: 0.7;
    }
    75% {
      opacity: 0;
    }
  }
}
.ten-cm {
  position: absolute;
  top: 566px;
  left: 560px;
  font-size: 45px;
  color: #000;
}
.five-cm {
  position: absolute;
  top: 525px;
  left: 914px;
  font-size: 45px;
  color: #000;
}
.hint {
  position: absolute;
  top: 437px;
  left: 957px;
  color: #ffffff;
  font-size: 40px;
}
.dra-hint {
  width: 140px;
  height: 73px;
  background: url("../../public/img/drainage/dra-hint.png") no-repeat;
}
.dra-hint span {
  margin: 0 auto;
  position: relative;
  top: 25%;
}
.dra-line-hint {
  position: absolute;
  top: -70px;
  left: -123px;
  width: 261px;
  height: 73px;
  background: url("../../public/img/drainage/dra-hint2.png");
}
.dra-line-hint span {
  position: absolute;
  top: 15px;
  right: 30px;
}
.drainage-button {
  position: absolute;
  top: 300px;
  left: 30px;
}
.change,
.clear-item {
  width: 200px;
  height: 60px;
  border: 3px solid #e8e8e8;
  border-radius: 30px;
  font-size: 28px;
  text-align: center;
  line-height: 60px;
  background-color: #fff;
  cursor: pointer;
}
.clear-item {
  margin-top: 35px;
}
.drainage-item {
  width: 1280px;
  height: 157px;
}
.drainage-item {
  position: relative;
}
.item-list {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 960px;
}
.btn {
  position: relative;
  float: left;
  width: 160px;
  height: 45px;
  border-radius: 60px;
  border: 3px solid #e8e8e8;
  margin-left: 25px;
  cursor: pointer;
  background-color: #fff;
}
.btn::after {
  content: "";
  clear: both;
}
.btn img {
  position: absolute;
  left: 0;
  top: 0;
  left: -15px;
  top: -30px;
}
.btn span {
  width: 72px;
  height: 31px;
  margin-left: 45px;
  text-align: center;
  font-size: 24px;
}
.itemIcon {
  position: absolute;
  top: -335px;
  left: 0px;
}
.static {
  position: absolute;
  top: 0;
  left: 0;
}
.item-leave {
  position: absolute;
  top: 0;
  left: 0;
}
//被js操作的css
.isblue {
  background-color: #009cff;
}
.isgray {
  color: #ccc;
}
.movePosition0 {
  position: absolute;
  top: 720px;
  left: 40px;
  transition: top 1.5s, left 1.5s;
  z-index: 3;
}
.movePosition1 {
  position: absolute;
  top: 690px;
  left: 120px;
  transition: top 1.5s, left 1.5s;
  z-index: 3;
}
.movePosition2 {
  position: absolute;
  top: 610px;
  left: 270px;
  transition: top 1.5s, left 1.5s;
  z-index: 4;
}
.movePosition3 {
  position: absolute;
  top: 575px;
  left: 400px;
  transition: top 1.5s, left 1.5s;
  z-index: 4;
}
.movePosition4 {
  position: absolute;
  top: 650px;
  left: 210px;
  transition: top 1.5s, left 1.5s;
  z-index: 3;
}
</style>
