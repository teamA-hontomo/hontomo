<template>
  <!--モーダルウインドウを表示するためのコンポーネント
必読事項:
  下記二つの属性が必要
    ①モーダルウインドウの表示状態を切り替えるdata(ブール値)(初期値はfalseに設定してください)
    ②fromModalイベントに対して上で述べたdataをfalseに切り替えるイベントハンドラ
    ③横幅を決めるString型のwidth(0~100%で指定)
    ④縦幅を決めるString型のheight(0~100%で指定)
  また、モーダルウインドウを表示状態にするために下記のイベントハンドラが必要
    ボタンなどにClickイベントへのハンドラなどの形で上で述べたdataをtrueにするためのイベントハンドラ
  <ModalWindow></ModalWindow>の間の要素がModalWindow内に出力されます
使い方:
  <template>
    <button v-on:click="openModal">このボタンによってモーダルを表示します</button>
    <ModalWindow v-show:showModal v-on:fromModal="closeModal">
      <span>この中身がモーダルウインドウに表示されます</span>
    </ModalWindow>
  </template>
  <script>
    export default {
      data: function () {
        return {
          showModal: false,
        }
      },
      method: {
        openModal: function () {
          this.showModal = true;
        }
        closeModal: function () {
          this.showModal = false;
        }
      }
    }
  </script>-->
  <div class="overlay" v-on:click="closeOverlay" v-show="showOverlay">
    <div class="content" v-on:click="stopClose" :style="modalStyle">
      <div class="row">
        <div class="col-md-3 offset-9">
          <font-awesome-icon
            icon="times"
            class="fa-2x mx-auto my-auto"
            v-on:click="closeOverlay"
          />
        </div>
      </div>
      <div class="container">
        <div class="row mx-auto my-auto">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ModalWindow",
  props: {
    width: {
      type: String,
      required: true
    },
    height: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      showOverlay: true
    };
  },
  methods: {
    closeOverlay: function() {
      this.$emit("fromModal");
    },
    stopClose: function() {
      event.stopPropagation();
    }
  },
  computed: {
    modalStyle: function() {
      return `width: ${this.width}%; height: ${this.height}%;`;
    }
  }
};
</script>
<style scoped>
.overlay {
  z-index: 1;
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  z-index: 2;
  position: fixed;
  background: #656565;
}
.close-button {
  position: fixed;
  top: 5%;
  right: 5%;
  color: #eeeeee;
}
</style>
