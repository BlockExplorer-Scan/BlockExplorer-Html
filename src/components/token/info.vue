<template>
  <div>
    <div class="title">
      <h3>{{$t('message.OVERVIEW')}}</h3>
      <p>Binance aims to build a world-class crypto exchange, powering the future of crypto finance.</p>
    </div>
    <div class="info-contente">
      <div class="info-item">
        <h3 class="under-l">{{$t('message.Profitability/Loss')}}</h3>
        <p>
          <span class="w150">{{$t('message.SinceICO')}}</span>
          <span class="w15">:</span>
          <span>{{$t('message.USD')}} $0.1063</span>
          <span class='btn'>
            <i class='fa fa-caret-up'></i>
            <i class='fa fa-caret-down'></i>
            <span>6240.12%</span>
        </span>
        </p>
      </div>
      <div class="info-item">
        <h3 class="under-l">{{$t('message.Market')}}</h3>
        <p>
          <span class="w150"> {{$t('message.Volume')}}</span>
          <span class="w15">:</span>
          <span>$59,269,135.72</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  }
};
</script>

<style scoped lang='scss'>
.title,
h3,
p {
  text-align: left;
}
span {
  display: inline-block;
}
p {
  margin-bottom: 30px;
}
.w150 {
  width: 150px;
}
.w15 {
  width: 15px;
}
.btn{
    display: inline-block;
    background-color: #5cb85c;
    color: #fff;
    border-radius: 4px;
    padding: 4px 7px;
    margin: 0 15px
}
</style>