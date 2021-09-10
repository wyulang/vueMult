<template>
  <div class="fixed al0 at0 ab0 zi-8888 __loading-content ar0 flex ai-c jc-c ba-f5">
    <div style="z-index: 8890;" class="__loading-box rel">
      <div class="__loading-spinner">
        <div v-if="html" v-html="html"></div>
        <div v-if="type==1" class="__spinner-defalut">
          <div class="__spinner_1"></div>
          <div v-if="text" class="__spinner-text">{{spinnerText}}</div>
        </div>
        <div class="__spinner_2" v-if="type==2"></div>
        <div :style="color[0]" class="__spinner_3" v-if="type==3">
          <div :style="{'background-color':color[0]}"></div>
          <div :style="{'background-color':color[1]}"></div>
        </div>
        <div :style="color[0]" class="__spinner_4" v-if="type==4">
          <div :style="{'background-color':color[0]}"></div>
          <div :style="{'background-color':color[1]}"></div>
        </div>
        <div :style="{'color':color[0]}" class="__spinner_5" v-if="type==5"></div>
        <div class="__spinner_6" v-if="type==6">
          <div :style="{'background-color':color[0]}" class="k-ball7a"></div>
          <div :style="{'background-color':color[1]}" class="k-ball7b"></div>
          <div :style="{'background-color':color[2]}" class="k-ball7c"></div>
          <div :style="{'background-color':color[3]}" class="k-ball7d"></div>
        </div>
        <div v-if="text && ![1].includes(type)" class="__spinner-text">{{spinnerText}}</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop } from 'vue-property-decorator';
import {isArray} from '@lib/lang';
export default class spinner extends Vue {
  @Prop({ type: String, default: "" }) text;
  @Prop({ type: [String, Number], default: 4 }) type;
  @Prop({ type: Array, default: [] }) color
  @Prop({ type: String, default: "" }) html;
  @Prop({ type: String, default: "" }) background;
  @Prop({ type: String, default: "" }) customClass;
  bgColor:any = ''
  spinnerText="";
  mounted() {
    let type = parseInt(this.type || 1);
    if (![1, 2, 3, 4, 5, 6].includes(type) && !this.html) {
      type = 1;
    }
    if (isArray(this.color)) {
      this.bgColor = this.color;
    } else {
      this.bgColor = [this.color];
    }
    if ([1].includes(type)) {
      this.spinnerText = this.text ? this.text : "loading..."
    }
  }
}
</script>

<style lang='less'>
.__loading-content {
  position: absolute;
  z-index: 2000;
  background-color: rgba(255, 255, 255, 0.7);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-transition: opacity 0.3s;
  transition: opacity 0.3s;
  .__loading-box {
    display: flex;
    align-items: center;
    justify-content: center;
    .__loading-spinner {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: relative;
      .__spinner-defalut {
        display: inline-flex;
        padding: 10px 10px;
        background-color: rgba(0, 0, 0, 0.4);
        border-radius: 5px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .__spinner-text {
          margin-top: 7px;
          color: #f2f2f2;
        }
      }
    }
    .__spinner-text {
      font-size: 16px;
    }
  }
}
@-moz-keyframes __spinner_2 {
  0% {
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes __spinner_2 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes __spinner_2 {
  0% {
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

/* :not(:required) hides this rule from IE9 and below */
.__spinner_2:not(:required) {
  overflow: hidden;
  position: relative;
  text-indent: -9999px;
  display: inline-block;
  width: 8px;
  height: 8px;
  background: transparent;
  -moz-border-radius: 100%;
  -webkit-border-radius: 100%;
  border-radius: 100%;
  -moz-box-shadow: #eee 0px 26px 0 6px, #eee 0.90971px 26.05079px 0 5.93333px,
    #eee 1.82297px 26.06967px 0 5.86667px, #eee 2.73865px 26.05647px 0 5.8px,
    #eee 3.65561px 26.01104px 0 5.73333px, #eee 4.57274px 25.93327px 0 5.66667px,
    #eee 5.48887px 25.8231px 0 5.6px, #eee 6.40287px 25.68049px 0 5.53333px,
    #eee 7.31358px 25.50548px 0 5.46667px, #eee 8.21985px 25.2981px 0 5.4px,
    #eee 9.12054px 25.05847px 0 5.33333px,
    #eee 10.01448px 24.78672px 0 5.26667px, #eee 10.90054px 24.48302px 0 5.2px,
    #eee 11.77757px 24.1476px 0 5.13333px,
    #eee 12.64443px 23.78072px 0 5.06667px, #eee 13.5px 23.38269px 0 5px,
    #eee 14.34315px 22.95384px 0 4.93333px,
    #eee 15.17277px 22.49455px 0 4.86667px, #eee 15.98776px 22.00526px 0 4.8px,
    #eee 16.78704px 21.48643px 0 4.73333px,
    #eee 17.56953px 20.93855px 0 4.66667px, #eee 18.33418px 20.36217px 0 4.6px,
    #eee 19.07995px 19.75787px 0 4.53333px,
    #eee 19.80582px 19.12626px 0 4.46667px, #eee 20.5108px 18.468px 0 4.4px,
    #eee 21.1939px 17.78379px 0 4.33333px,
    #eee 21.85416px 17.07434px 0 4.26667px, #eee 22.49067px 16.34043px 0 4.2px,
    #eee 23.10251px 15.58284px 0 4.13333px,
    #eee 23.68881px 14.80241px 0 4.06667px, #eee 24.24871px 14px 0 4px,
    #eee 24.7814px 13.1765px 0 3.93333px, #eee 25.28607px 12.33284px 0 3.86667px,
    #eee 25.76198px 11.46997px 0 3.8px, #eee 26.2084px 10.58888px 0 3.73333px,
    #eee 26.62462px 9.69057px 0 3.66667px, #eee 27.01001px 8.77608px 0 3.6px,
    #eee 27.36392px 7.84648px 0 3.53333px, #eee 27.68577px 6.90284px 0 3.46667px,
    #eee 27.97502px 5.94627px 0 3.4px, #eee 28.23116px 4.97791px 0 3.33333px,
    #eee 28.4537px 3.99891px 0 3.26667px, #eee 28.64223px 3.01042px 0 3.2px,
    #eee 28.79635px 2.01364px 0 3.13333px, #eee 28.91571px 1.00976px 0 3.06667px,
    #eee 29px 0px 0 3px, #eee 29.04896px -1.01441px 0 2.93333px,
    #eee 29.06237px -2.03224px 0 2.86667px, #eee 29.04004px -3.05223px 0 2.8px,
    #eee 28.98185px -4.07313px 0 2.73333px,
    #eee 28.88769px -5.09368px 0 2.66667px, #eee 28.75754px -6.1126px 0 2.6px,
    #eee 28.59138px -7.12863px 0 2.53333px,
    #eee 28.38926px -8.14049px 0 2.46667px, #eee 28.15127px -9.1469px 0 2.4px,
    #eee 27.87755px -10.1466px 0 2.33333px,
    #eee 27.56827px -11.1383px 0 2.26667px, #eee 27.22365px -12.12075px 0 2.2px,
    #eee 26.84398px -13.09268px 0 2.13333px,
    #eee 26.42956px -14.05285px 0 2.06667px, #eee 25.98076px -15px 0 2px,
    #eee 25.49798px -15.93291px 0 1.93333px,
    #eee 24.98167px -16.85035px 0 1.86667px, #eee 24.43231px -17.75111px 0 1.8px,
    #eee 23.85046px -18.63402px 0 1.73333px,
    #eee 23.23668px -19.49789px 0 1.66667px, #eee 22.5916px -20.34157px 0 1.6px,
    #eee 21.91589px -21.16393px 0 1.53333px,
    #eee 21.21024px -21.96384px 0 1.46667px, #eee 20.4754px -22.74023px 0 1.4px,
    #eee 19.71215px -23.49203px 0 1.33333px,
    #eee 18.92133px -24.2182px 0 1.26667px, #eee 18.10379px -24.91772px 0 1.2px,
    #eee 17.26042px -25.58963px 0 1.13333px,
    #eee 16.39217px -26.23295px 0 1.06667px, #eee 15.5px -26.84679px 0 1px,
    #eee 14.58492px -27.43024px 0 0.93333px,
    #eee 13.64796px -27.98245px 0 0.86667px, #eee 12.69018px -28.50262px 0 0.8px,
    #eee 11.7127px -28.98995px 0 0.73333px,
    #eee 10.71663px -29.4437px 0 0.66667px, #eee 9.70313px -29.86317px 0 0.6px,
    #eee 8.67339px -30.2477px 0 0.53333px, #eee 7.6286px -30.59666px 0 0.46667px,
    #eee 6.57001px -30.90946px 0 0.4px, #eee 5.49886px -31.18558px 0 0.33333px,
    #eee 4.41643px -31.42451px 0 0.26667px, #eee 3.32401px -31.6258px 0 0.2px,
    #eee 2.22291px -31.78904px 0 0.13333px,
    #eee 1.11446px -31.91388px 0 0.06667px, #eee 0px -32px 0 0px,
    #eee -1.11911px -32.04713px 0 -0.06667px,
    #eee -2.24151px -32.05506px 0 -0.13333px,
    #eee -3.36582px -32.02361px 0 -0.2px,
    #eee -4.49065px -31.95265px 0 -0.26667px,
    #eee -5.61462px -31.84212px 0 -0.33333px,
    #eee -6.73634px -31.69198px 0 -0.4px,
    #eee -7.8544px -31.50227px 0 -0.46667px,
    #eee -8.9674px -31.27305px 0 -0.53333px,
    #eee -10.07395px -31.00444px 0 -0.6px,
    #eee -11.17266px -30.69663px 0 -0.66667px,
    #eee -12.26212px -30.34982px 0 -0.73333px,
    #eee -13.34096px -29.96429px 0 -0.8px,
    #eee -14.4078px -29.54036px 0 -0.86667px,
    #eee -15.46126px -29.07841px 0 -0.93333px, #eee -16.5px -28.57884px 0 -1px,
    #eee -17.52266px -28.04212px 0 -1.06667px,
    #eee -18.52792px -27.46878px 0 -1.13333px,
    #eee -19.51447px -26.85936px 0 -1.2px,
    #eee -20.48101px -26.21449px 0 -1.26667px,
    #eee -21.42625px -25.53481px 0 -1.33333px,
    #eee -22.34896px -24.82104px 0 -1.4px,
    #eee -23.2479px -24.07391px 0 -1.46667px,
    #eee -24.12186px -23.29421px 0 -1.53333px,
    #eee -24.96967px -22.48279px 0 -1.6px,
    #eee -25.79016px -21.64052px 0 -1.66667px,
    #eee -26.58223px -20.76831px 0 -1.73333px,
    #eee -27.34477px -19.86714px 0 -1.8px,
    #eee -28.07674px -18.938px 0 -1.86667px,
    #eee -28.7771px -17.98193px 0 -1.93333px, #eee -29.44486px -17px 0 -2px,
    #eee -30.07908px -15.99333px 0 -2.06667px,
    #eee -30.67884px -14.96307px 0 -2.13333px,
    #eee -31.24325px -13.91039px 0 -2.2px,
    #eee -31.7715px -12.83652px 0 -2.26667px,
    #eee -32.26278px -11.74269px 0 -2.33333px,
    #eee -32.71634px -10.63018px 0 -2.4px,
    #eee -33.13149px -9.5003px 0 -2.46667px,
    #eee -33.50755px -8.35437px 0 -2.53333px,
    #eee -33.84391px -7.19374px 0 -2.6px, #eee -34.14px -6.0198px 0 -2.66667px,
    #eee -34.39531px -4.83395px 0 -2.73333px,
    #eee -34.60936px -3.63759px 0 -2.8px,
    #eee -34.78173px -2.43218px 0 -2.86667px,
    #eee -34.91205px -1.21916px 0 -2.93333px, #eee -35px 0px 0 -3px,
    #eee -35.04531px 1.22381px 0 -3.06667px,
    #eee -35.04775px 2.45078px 0 -3.13333px, #eee -35.00717px 3.6794px 0 -3.2px,
    #eee -34.92345px 4.90817px 0 -3.26667px,
    #eee -34.79654px 6.13557px 0 -3.33333px, #eee -34.62643px 7.36007px 0 -3.4px,
    #eee -34.41316px 8.58016px 0 -3.46667px,
    #eee -34.15683px 9.79431px 0 -3.53333px, #eee -33.85761px 11.001px 0 -3.6px,
    #eee -33.5157px 12.19872px 0 -3.66667px,
    #eee -33.13137px 13.38594px 0 -3.73333px,
    #eee -32.70493px 14.56117px 0 -3.8px,
    #eee -32.23675px 15.72291px 0 -3.86667px,
    #eee -31.72725px 16.86968px 0 -3.93333px, #eee -31.17691px 18px 0 -4px,
    #eee -30.58627px 19.11242px 0 -4.06667px,
    #eee -29.95589px 20.2055px 0 -4.13333px,
    #eee -29.28642px 21.27783px 0 -4.2px,
    #eee -28.57852px 22.32799px 0 -4.26667px,
    #eee -27.83295px 23.35462px 0 -4.33333px,
    #eee -27.05047px 24.35635px 0 -4.4px,
    #eee -26.23192px 25.33188px 0 -4.46667px,
    #eee -25.37819px 26.27988px 0 -4.53333px,
    #eee -24.49018px 27.1991px 0 -4.6px, #eee -23.56888px 28.0883px 0 -4.66667px,
    #eee -22.6153px 28.94626px 0 -4.73333px, #eee -21.6305px 29.77183px 0 -4.8px,
    #eee -20.61558px 30.56385px 0 -4.86667px,
    #eee -19.57168px 31.32124px 0 -4.93333px, #eee -18.5px 32.04294px 0 -5px,
    #eee -17.40175px 32.72792px 0 -5.06667px,
    #eee -16.27818px 33.37522px 0 -5.13333px,
    #eee -15.1306px 33.98389px 0 -5.2px,
    #eee -13.96034px 34.55305px 0 -5.26667px,
    #eee -12.76875px 35.08186px 0 -5.33333px,
    #eee -11.55724px 35.56951px 0 -5.4px,
    #eee -10.32721px 36.01527px 0 -5.46667px,
    #eee -9.08014px 36.41843px 0 -5.53333px, #eee -7.81748px 36.77835px 0 -5.6px,
    #eee -6.54075px 37.09443px 0 -5.66667px,
    #eee -5.25147px 37.36612px 0 -5.73333px, #eee -3.95118px 37.59293px 0 -5.8px,
    #eee -2.64145px 37.77443px 0 -5.86667px,
    #eee -1.32385px 37.91023px 0 -5.93333px;
  -webkit-box-shadow: #eee 0px 26px 0 6px, #eee 0.90971px 26.05079px 0 5.93333px,
    #eee 1.82297px 26.06967px 0 5.86667px, #eee 2.73865px 26.05647px 0 5.8px,
    #eee 3.65561px 26.01104px 0 5.73333px, #eee 4.57274px 25.93327px 0 5.66667px,
    #eee 5.48887px 25.8231px 0 5.6px, #eee 6.40287px 25.68049px 0 5.53333px,
    #eee 7.31358px 25.50548px 0 5.46667px, #eee 8.21985px 25.2981px 0 5.4px,
    #eee 9.12054px 25.05847px 0 5.33333px,
    #eee 10.01448px 24.78672px 0 5.26667px, #eee 10.90054px 24.48302px 0 5.2px,
    #eee 11.77757px 24.1476px 0 5.13333px,
    #eee 12.64443px 23.78072px 0 5.06667px, #eee 13.5px 23.38269px 0 5px,
    #eee 14.34315px 22.95384px 0 4.93333px,
    #eee 15.17277px 22.49455px 0 4.86667px, #eee 15.98776px 22.00526px 0 4.8px,
    #eee 16.78704px 21.48643px 0 4.73333px,
    #eee 17.56953px 20.93855px 0 4.66667px, #eee 18.33418px 20.36217px 0 4.6px,
    #eee 19.07995px 19.75787px 0 4.53333px,
    #eee 19.80582px 19.12626px 0 4.46667px, #eee 20.5108px 18.468px 0 4.4px,
    #eee 21.1939px 17.78379px 0 4.33333px,
    #eee 21.85416px 17.07434px 0 4.26667px, #eee 22.49067px 16.34043px 0 4.2px,
    #eee 23.10251px 15.58284px 0 4.13333px,
    #eee 23.68881px 14.80241px 0 4.06667px, #eee 24.24871px 14px 0 4px,
    #eee 24.7814px 13.1765px 0 3.93333px, #eee 25.28607px 12.33284px 0 3.86667px,
    #eee 25.76198px 11.46997px 0 3.8px, #eee 26.2084px 10.58888px 0 3.73333px,
    #eee 26.62462px 9.69057px 0 3.66667px, #eee 27.01001px 8.77608px 0 3.6px,
    #eee 27.36392px 7.84648px 0 3.53333px, #eee 27.68577px 6.90284px 0 3.46667px,
    #eee 27.97502px 5.94627px 0 3.4px, #eee 28.23116px 4.97791px 0 3.33333px,
    #eee 28.4537px 3.99891px 0 3.26667px, #eee 28.64223px 3.01042px 0 3.2px,
    #eee 28.79635px 2.01364px 0 3.13333px, #eee 28.91571px 1.00976px 0 3.06667px,
    #eee 29px 0px 0 3px, #eee 29.04896px -1.01441px 0 2.93333px,
    #eee 29.06237px -2.03224px 0 2.86667px, #eee 29.04004px -3.05223px 0 2.8px,
    #eee 28.98185px -4.07313px 0 2.73333px,
    #eee 28.88769px -5.09368px 0 2.66667px, #eee 28.75754px -6.1126px 0 2.6px,
    #eee 28.59138px -7.12863px 0 2.53333px,
    #eee 28.38926px -8.14049px 0 2.46667px, #eee 28.15127px -9.1469px 0 2.4px,
    #eee 27.87755px -10.1466px 0 2.33333px,
    #eee 27.56827px -11.1383px 0 2.26667px, #eee 27.22365px -12.12075px 0 2.2px,
    #eee 26.84398px -13.09268px 0 2.13333px,
    #eee 26.42956px -14.05285px 0 2.06667px, #eee 25.98076px -15px 0 2px,
    #eee 25.49798px -15.93291px 0 1.93333px,
    #eee 24.98167px -16.85035px 0 1.86667px, #eee 24.43231px -17.75111px 0 1.8px,
    #eee 23.85046px -18.63402px 0 1.73333px,
    #eee 23.23668px -19.49789px 0 1.66667px, #eee 22.5916px -20.34157px 0 1.6px,
    #eee 21.91589px -21.16393px 0 1.53333px,
    #eee 21.21024px -21.96384px 0 1.46667px, #eee 20.4754px -22.74023px 0 1.4px,
    #eee 19.71215px -23.49203px 0 1.33333px,
    #eee 18.92133px -24.2182px 0 1.26667px, #eee 18.10379px -24.91772px 0 1.2px,
    #eee 17.26042px -25.58963px 0 1.13333px,
    #eee 16.39217px -26.23295px 0 1.06667px, #eee 15.5px -26.84679px 0 1px,
    #eee 14.58492px -27.43024px 0 0.93333px,
    #eee 13.64796px -27.98245px 0 0.86667px, #eee 12.69018px -28.50262px 0 0.8px,
    #eee 11.7127px -28.98995px 0 0.73333px,
    #eee 10.71663px -29.4437px 0 0.66667px, #eee 9.70313px -29.86317px 0 0.6px,
    #eee 8.67339px -30.2477px 0 0.53333px, #eee 7.6286px -30.59666px 0 0.46667px,
    #eee 6.57001px -30.90946px 0 0.4px, #eee 5.49886px -31.18558px 0 0.33333px,
    #eee 4.41643px -31.42451px 0 0.26667px, #eee 3.32401px -31.6258px 0 0.2px,
    #eee 2.22291px -31.78904px 0 0.13333px,
    #eee 1.11446px -31.91388px 0 0.06667px, #eee 0px -32px 0 0px,
    #eee -1.11911px -32.04713px 0 -0.06667px,
    #eee -2.24151px -32.05506px 0 -0.13333px,
    #eee -3.36582px -32.02361px 0 -0.2px,
    #eee -4.49065px -31.95265px 0 -0.26667px,
    #eee -5.61462px -31.84212px 0 -0.33333px,
    #eee -6.73634px -31.69198px 0 -0.4px,
    #eee -7.8544px -31.50227px 0 -0.46667px,
    #eee -8.9674px -31.27305px 0 -0.53333px,
    #eee -10.07395px -31.00444px 0 -0.6px,
    #eee -11.17266px -30.69663px 0 -0.66667px,
    #eee -12.26212px -30.34982px 0 -0.73333px,
    #eee -13.34096px -29.96429px 0 -0.8px,
    #eee -14.4078px -29.54036px 0 -0.86667px,
    #eee -15.46126px -29.07841px 0 -0.93333px, #eee -16.5px -28.57884px 0 -1px,
    #eee -17.52266px -28.04212px 0 -1.06667px,
    #eee -18.52792px -27.46878px 0 -1.13333px,
    #eee -19.51447px -26.85936px 0 -1.2px,
    #eee -20.48101px -26.21449px 0 -1.26667px,
    #eee -21.42625px -25.53481px 0 -1.33333px,
    #eee -22.34896px -24.82104px 0 -1.4px,
    #eee -23.2479px -24.07391px 0 -1.46667px,
    #eee -24.12186px -23.29421px 0 -1.53333px,
    #eee -24.96967px -22.48279px 0 -1.6px,
    #eee -25.79016px -21.64052px 0 -1.66667px,
    #eee -26.58223px -20.76831px 0 -1.73333px,
    #eee -27.34477px -19.86714px 0 -1.8px,
    #eee -28.07674px -18.938px 0 -1.86667px,
    #eee -28.7771px -17.98193px 0 -1.93333px, #eee -29.44486px -17px 0 -2px,
    #eee -30.07908px -15.99333px 0 -2.06667px,
    #eee -30.67884px -14.96307px 0 -2.13333px,
    #eee -31.24325px -13.91039px 0 -2.2px,
    #eee -31.7715px -12.83652px 0 -2.26667px,
    #eee -32.26278px -11.74269px 0 -2.33333px,
    #eee -32.71634px -10.63018px 0 -2.4px,
    #eee -33.13149px -9.5003px 0 -2.46667px,
    #eee -33.50755px -8.35437px 0 -2.53333px,
    #eee -33.84391px -7.19374px 0 -2.6px, #eee -34.14px -6.0198px 0 -2.66667px,
    #eee -34.39531px -4.83395px 0 -2.73333px,
    #eee -34.60936px -3.63759px 0 -2.8px,
    #eee -34.78173px -2.43218px 0 -2.86667px,
    #eee -34.91205px -1.21916px 0 -2.93333px, #eee -35px 0px 0 -3px,
    #eee -35.04531px 1.22381px 0 -3.06667px,
    #eee -35.04775px 2.45078px 0 -3.13333px, #eee -35.00717px 3.6794px 0 -3.2px,
    #eee -34.92345px 4.90817px 0 -3.26667px,
    #eee -34.79654px 6.13557px 0 -3.33333px, #eee -34.62643px 7.36007px 0 -3.4px,
    #eee -34.41316px 8.58016px 0 -3.46667px,
    #eee -34.15683px 9.79431px 0 -3.53333px, #eee -33.85761px 11.001px 0 -3.6px,
    #eee -33.5157px 12.19872px 0 -3.66667px,
    #eee -33.13137px 13.38594px 0 -3.73333px,
    #eee -32.70493px 14.56117px 0 -3.8px,
    #eee -32.23675px 15.72291px 0 -3.86667px,
    #eee -31.72725px 16.86968px 0 -3.93333px, #eee -31.17691px 18px 0 -4px,
    #eee -30.58627px 19.11242px 0 -4.06667px,
    #eee -29.95589px 20.2055px 0 -4.13333px,
    #eee -29.28642px 21.27783px 0 -4.2px,
    #eee -28.57852px 22.32799px 0 -4.26667px,
    #eee -27.83295px 23.35462px 0 -4.33333px,
    #eee -27.05047px 24.35635px 0 -4.4px,
    #eee -26.23192px 25.33188px 0 -4.46667px,
    #eee -25.37819px 26.27988px 0 -4.53333px,
    #eee -24.49018px 27.1991px 0 -4.6px, #eee -23.56888px 28.0883px 0 -4.66667px,
    #eee -22.6153px 28.94626px 0 -4.73333px, #eee -21.6305px 29.77183px 0 -4.8px,
    #eee -20.61558px 30.56385px 0 -4.86667px,
    #eee -19.57168px 31.32124px 0 -4.93333px, #eee -18.5px 32.04294px 0 -5px,
    #eee -17.40175px 32.72792px 0 -5.06667px,
    #eee -16.27818px 33.37522px 0 -5.13333px,
    #eee -15.1306px 33.98389px 0 -5.2px,
    #eee -13.96034px 34.55305px 0 -5.26667px,
    #eee -12.76875px 35.08186px 0 -5.33333px,
    #eee -11.55724px 35.56951px 0 -5.4px,
    #eee -10.32721px 36.01527px 0 -5.46667px,
    #eee -9.08014px 36.41843px 0 -5.53333px, #eee -7.81748px 36.77835px 0 -5.6px,
    #eee -6.54075px 37.09443px 0 -5.66667px,
    #eee -5.25147px 37.36612px 0 -5.73333px, #eee -3.95118px 37.59293px 0 -5.8px,
    #eee -2.64145px 37.77443px 0 -5.86667px,
    #eee -1.32385px 37.91023px 0 -5.93333px;
  box-shadow: #eee 0px 26px 0 6px, #eee 0.90971px 26.05079px 0 5.93333px,
    #eee 1.82297px 26.06967px 0 5.86667px, #eee 2.73865px 26.05647px 0 5.8px,
    #eee 3.65561px 26.01104px 0 5.73333px, #eee 4.57274px 25.93327px 0 5.66667px,
    #eee 5.48887px 25.8231px 0 5.6px, #eee 6.40287px 25.68049px 0 5.53333px,
    #eee 7.31358px 25.50548px 0 5.46667px, #eee 8.21985px 25.2981px 0 5.4px,
    #eee 9.12054px 25.05847px 0 5.33333px,
    #eee 10.01448px 24.78672px 0 5.26667px, #eee 10.90054px 24.48302px 0 5.2px,
    #eee 11.77757px 24.1476px 0 5.13333px,
    #eee 12.64443px 23.78072px 0 5.06667px, #eee 13.5px 23.38269px 0 5px,
    #eee 14.34315px 22.95384px 0 4.93333px,
    #eee 15.17277px 22.49455px 0 4.86667px, #eee 15.98776px 22.00526px 0 4.8px,
    #eee 16.78704px 21.48643px 0 4.73333px,
    #eee 17.56953px 20.93855px 0 4.66667px, #eee 18.33418px 20.36217px 0 4.6px,
    #eee 19.07995px 19.75787px 0 4.53333px,
    #eee 19.80582px 19.12626px 0 4.46667px, #eee 20.5108px 18.468px 0 4.4px,
    #eee 21.1939px 17.78379px 0 4.33333px,
    #eee 21.85416px 17.07434px 0 4.26667px, #eee 22.49067px 16.34043px 0 4.2px,
    #eee 23.10251px 15.58284px 0 4.13333px,
    #eee 23.68881px 14.80241px 0 4.06667px, #eee 24.24871px 14px 0 4px,
    #eee 24.7814px 13.1765px 0 3.93333px, #eee 25.28607px 12.33284px 0 3.86667px,
    #eee 25.76198px 11.46997px 0 3.8px, #eee 26.2084px 10.58888px 0 3.73333px,
    #eee 26.62462px 9.69057px 0 3.66667px, #eee 27.01001px 8.77608px 0 3.6px,
    #eee 27.36392px 7.84648px 0 3.53333px, #eee 27.68577px 6.90284px 0 3.46667px,
    #eee 27.97502px 5.94627px 0 3.4px, #eee 28.23116px 4.97791px 0 3.33333px,
    #eee 28.4537px 3.99891px 0 3.26667px, #eee 28.64223px 3.01042px 0 3.2px,
    #eee 28.79635px 2.01364px 0 3.13333px, #eee 28.91571px 1.00976px 0 3.06667px,
    #eee 29px 0px 0 3px, #eee 29.04896px -1.01441px 0 2.93333px,
    #eee 29.06237px -2.03224px 0 2.86667px, #eee 29.04004px -3.05223px 0 2.8px,
    #eee 28.98185px -4.07313px 0 2.73333px,
    #eee 28.88769px -5.09368px 0 2.66667px, #eee 28.75754px -6.1126px 0 2.6px,
    #eee 28.59138px -7.12863px 0 2.53333px,
    #eee 28.38926px -8.14049px 0 2.46667px, #eee 28.15127px -9.1469px 0 2.4px,
    #eee 27.87755px -10.1466px 0 2.33333px,
    #eee 27.56827px -11.1383px 0 2.26667px, #eee 27.22365px -12.12075px 0 2.2px,
    #eee 26.84398px -13.09268px 0 2.13333px,
    #eee 26.42956px -14.05285px 0 2.06667px, #eee 25.98076px -15px 0 2px,
    #eee 25.49798px -15.93291px 0 1.93333px,
    #eee 24.98167px -16.85035px 0 1.86667px, #eee 24.43231px -17.75111px 0 1.8px,
    #eee 23.85046px -18.63402px 0 1.73333px,
    #eee 23.23668px -19.49789px 0 1.66667px, #eee 22.5916px -20.34157px 0 1.6px,
    #eee 21.91589px -21.16393px 0 1.53333px,
    #eee 21.21024px -21.96384px 0 1.46667px, #eee 20.4754px -22.74023px 0 1.4px,
    #eee 19.71215px -23.49203px 0 1.33333px,
    #eee 18.92133px -24.2182px 0 1.26667px, #eee 18.10379px -24.91772px 0 1.2px,
    #eee 17.26042px -25.58963px 0 1.13333px,
    #eee 16.39217px -26.23295px 0 1.06667px, #eee 15.5px -26.84679px 0 1px,
    #eee 14.58492px -27.43024px 0 0.93333px,
    #eee 13.64796px -27.98245px 0 0.86667px, #eee 12.69018px -28.50262px 0 0.8px,
    #eee 11.7127px -28.98995px 0 0.73333px,
    #eee 10.71663px -29.4437px 0 0.66667px, #eee 9.70313px -29.86317px 0 0.6px,
    #eee 8.67339px -30.2477px 0 0.53333px, #eee 7.6286px -30.59666px 0 0.46667px,
    #eee 6.57001px -30.90946px 0 0.4px, #eee 5.49886px -31.18558px 0 0.33333px,
    #eee 4.41643px -31.42451px 0 0.26667px, #eee 3.32401px -31.6258px 0 0.2px,
    #eee 2.22291px -31.78904px 0 0.13333px,
    #eee 1.11446px -31.91388px 0 0.06667px, #eee 0px -32px 0 0px,
    #eee -1.11911px -32.04713px 0 -0.06667px,
    #eee -2.24151px -32.05506px 0 -0.13333px,
    #eee -3.36582px -32.02361px 0 -0.2px,
    #eee -4.49065px -31.95265px 0 -0.26667px,
    #eee -5.61462px -31.84212px 0 -0.33333px,
    #eee -6.73634px -31.69198px 0 -0.4px,
    #eee -7.8544px -31.50227px 0 -0.46667px,
    #eee -8.9674px -31.27305px 0 -0.53333px,
    #eee -10.07395px -31.00444px 0 -0.6px,
    #eee -11.17266px -30.69663px 0 -0.66667px,
    #eee -12.26212px -30.34982px 0 -0.73333px,
    #eee -13.34096px -29.96429px 0 -0.8px,
    #eee -14.4078px -29.54036px 0 -0.86667px,
    #eee -15.46126px -29.07841px 0 -0.93333px, #eee -16.5px -28.57884px 0 -1px,
    #eee -17.52266px -28.04212px 0 -1.06667px,
    #eee -18.52792px -27.46878px 0 -1.13333px,
    #eee -19.51447px -26.85936px 0 -1.2px,
    #eee -20.48101px -26.21449px 0 -1.26667px,
    #eee -21.42625px -25.53481px 0 -1.33333px,
    #eee -22.34896px -24.82104px 0 -1.4px,
    #eee -23.2479px -24.07391px 0 -1.46667px,
    #eee -24.12186px -23.29421px 0 -1.53333px,
    #eee -24.96967px -22.48279px 0 -1.6px,
    #eee -25.79016px -21.64052px 0 -1.66667px,
    #eee -26.58223px -20.76831px 0 -1.73333px,
    #eee -27.34477px -19.86714px 0 -1.8px,
    #eee -28.07674px -18.938px 0 -1.86667px,
    #eee -28.7771px -17.98193px 0 -1.93333px, #eee -29.44486px -17px 0 -2px,
    #eee -30.07908px -15.99333px 0 -2.06667px,
    #eee -30.67884px -14.96307px 0 -2.13333px,
    #eee -31.24325px -13.91039px 0 -2.2px,
    #eee -31.7715px -12.83652px 0 -2.26667px,
    #eee -32.26278px -11.74269px 0 -2.33333px,
    #eee -32.71634px -10.63018px 0 -2.4px,
    #eee -33.13149px -9.5003px 0 -2.46667px,
    #eee -33.50755px -8.35437px 0 -2.53333px,
    #eee -33.84391px -7.19374px 0 -2.6px, #eee -34.14px -6.0198px 0 -2.66667px,
    #eee -34.39531px -4.83395px 0 -2.73333px,
    #eee -34.60936px -3.63759px 0 -2.8px,
    #eee -34.78173px -2.43218px 0 -2.86667px,
    #eee -34.91205px -1.21916px 0 -2.93333px, #eee -35px 0px 0 -3px,
    #eee -35.04531px 1.22381px 0 -3.06667px,
    #eee -35.04775px 2.45078px 0 -3.13333px, #eee -35.00717px 3.6794px 0 -3.2px,
    #eee -34.92345px 4.90817px 0 -3.26667px,
    #eee -34.79654px 6.13557px 0 -3.33333px, #eee -34.62643px 7.36007px 0 -3.4px,
    #eee -34.41316px 8.58016px 0 -3.46667px,
    #eee -34.15683px 9.79431px 0 -3.53333px, #eee -33.85761px 11.001px 0 -3.6px,
    #eee -33.5157px 12.19872px 0 -3.66667px,
    #eee -33.13137px 13.38594px 0 -3.73333px,
    #eee -32.70493px 14.56117px 0 -3.8px,
    #eee -32.23675px 15.72291px 0 -3.86667px,
    #eee -31.72725px 16.86968px 0 -3.93333px, #eee -31.17691px 18px 0 -4px,
    #eee -30.58627px 19.11242px 0 -4.06667px,
    #eee -29.95589px 20.2055px 0 -4.13333px,
    #eee -29.28642px 21.27783px 0 -4.2px,
    #eee -28.57852px 22.32799px 0 -4.26667px,
    #eee -27.83295px 23.35462px 0 -4.33333px,
    #eee -27.05047px 24.35635px 0 -4.4px,
    #eee -26.23192px 25.33188px 0 -4.46667px,
    #eee -25.37819px 26.27988px 0 -4.53333px,
    #eee -24.49018px 27.1991px 0 -4.6px, #eee -23.56888px 28.0883px 0 -4.66667px,
    #eee -22.6153px 28.94626px 0 -4.73333px, #eee -21.6305px 29.77183px 0 -4.8px,
    #eee -20.61558px 30.56385px 0 -4.86667px,
    #eee -19.57168px 31.32124px 0 -4.93333px, #eee -18.5px 32.04294px 0 -5px,
    #eee -17.40175px 32.72792px 0 -5.06667px,
    #eee -16.27818px 33.37522px 0 -5.13333px,
    #eee -15.1306px 33.98389px 0 -5.2px,
    #eee -13.96034px 34.55305px 0 -5.26667px,
    #eee -12.76875px 35.08186px 0 -5.33333px,
    #eee -11.55724px 35.56951px 0 -5.4px,
    #eee -10.32721px 36.01527px 0 -5.46667px,
    #eee -9.08014px 36.41843px 0 -5.53333px, #eee -7.81748px 36.77835px 0 -5.6px,
    #eee -6.54075px 37.09443px 0 -5.66667px,
    #eee -5.25147px 37.36612px 0 -5.73333px, #eee -3.95118px 37.59293px 0 -5.8px,
    #eee -2.64145px 37.77443px 0 -5.86667px,
    #eee -1.32385px 37.91023px 0 -5.93333px;
  -moz-animation: __spinner_2 1.25s infinite linear;
  -webkit-animation: __spinner_2 1.25s infinite linear;
  animation: __spinner_2 1.25s infinite linear;
  -moz-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
}
//======================================
@-moz-keyframes __spinner_1 {
  0% {
    -moz-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@-webkit-keyframes __spinner_1 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes __spinner_1 {
  0% {
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
/* :not(:required) hides this rule from IE9 and below */
.__spinner_1:not(:required) {
  -moz-animation: __spinner_1 2200ms infinite linear;
  -webkit-animation: __spinner_1 2200ms infinite linear;
  animation: __spinner_1 2200ms infinite linear;
  -moz-border-radius: 0.5em;
  -webkit-border-radius: 0.5em;
  border-radius: 0.5em;
  -moz-box-shadow: #eee 1.5em 0 0 0, #eee 1.1em 1.1em 0 0, #eee 0 1.5em 0 0,
    #eee -1.1em 1.1em 0 0, #eee -1.5em 0 0 0, #eee -1.1em -1.1em 0 0,
    #eee 0 -1.5em 0 0, #eee 1.1em -1.1em 0 0;
  -webkit-box-shadow: #eee 1.5em 0 0 0, #eee 1.1em 1.1em 0 0, #eee 0 1.5em 0 0,
    #eee -1.1em 1.1em 0 0, #eee -1.5em 0 0 0, #eee -1.1em -1.1em 0 0,
    #eee 0 -1.5em 0 0, #eee 1.1em -1.1em 0 0;
  box-shadow: #eee 1.5em 0 0 0, #eee 1.1em 1.1em 0 0, #eee 0 1.5em 0 0,
    #eee -1.1em 1.1em 0 0, #eee -1.5em 0 0 0, #eee -1.1em -1.1em 0 0,
    #eee 0 -1.5em 0 0, #eee 1.1em -1.1em 0 0;
  display: inline-block;
  font-size: 10px;
  width: 1em;
  height: 1em;
  margin: 1.5em;
  overflow: hidden;
  text-indent: 100%;
}

//==========================================
.__spinner_3 {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  color: inherit;
  vertical-align: middle;
  pointer-events: none;
  div {
    content: "";
    width: inherit;
    height: inherit;
    border-radius: 50%;
    background-color: #35e426;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-animation: __spinner_3 2s infinite ease-in-out;
    animation: __spinner_3 2s infinite ease-in-out;
  }
  div:nth-child(2) {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
}

@-webkit-keyframes __spinner_3 {
  0%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes __spinner_3 {
  0%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
//========================================
.__spinner_5 {
  color: #ff9900;
  font-size: 12px;
  margin: 100px auto;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load4 1.3s infinite linear;
  animation: load4 1.3s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
@-webkit-keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em,
      0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em,
      0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}
@keyframes load4 {
  0%,
  100% {
    box-shadow: 0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0;
  }
  12.5% {
    box-shadow: 0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0,
      0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em,
      0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  50% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em,
      0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow: 0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em;
  }
  75% {
    box-shadow: 0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0;
  }
  87.5% {
    box-shadow: 0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em,
      0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em;
  }
}

//============================================
.__spinner_6 {
  position: absolute;
  left: -25px;
  top: -25px;
  div {
    border: 0;
    margin: 0;
    width: 20px;
    height: 20px;
    position: absolute;
    border-radius: 50%;
  }
  .k-ball7a {
    animation: k-loading 2s ease infinite;
    background: #19a68c;
    animation-delay: -1.5s;
  }

  .k-ball7b {
    animation: k-loading 2s ease infinite;
    background: #f63d3a;
    animation-delay: -1s;
  }

  .k-ball7c {
    animation: k-loading 2s ease infinite;
    background: #fda543;
    animation-delay: -0.5s;
  }

  .k-ball7d {
    animation: k-loading 2s ease infinite;
    background: #193b48;
  }
}

@keyframes k-loading {
  0%,
  100% {
    transform: translate(0);
  }
  25% {
    transform: translate(160%);
  }
  50% {
    transform: translate(160%, 160%);
  }
  75% {
    transform: translate(0, 160%);
  }
}
//==============================

.__spinner_4 {
  margin: 0 auto;
  padding-bottom: 15px;
  display: block;
  width: 60px;
  height: 60px;
  position: relative;
  text-align: center;
  -webkit-animation: rotate 2s infinite linear;
  animation: rotate 2s infinite linear;
  div {
    content: "";
    width: 60%;
    height: 60%;
    display: inline-block;
    position: absolute;
    top: 0;
    background-color: #f63d3a;
    border-radius: 100%;
    -webkit-animation: bounce 2s infinite ease-in-out;
    animation: bounce 2s infinite ease-in-out;
  }
  div:nth-child(2) {
    top: auto;
    bottom: 0px;
    background-color: #289eb8;
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
}

@-webkit-keyframes rotate {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}

@-webkit-keyframes bounce {
  0%,
  100% {
    -webkit-transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: scale(0);
    -webkit-transform: scale(0);
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>