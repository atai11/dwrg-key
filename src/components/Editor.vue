<template>
  <div id="editor">
    <div v-if="obj['control']" class="marbo">
      <a-radio-group v-model:value="tab">
        <a-radio-button value="a">通用</a-radio-button>
        <a-radio-button value="b">求生者</a-radio-button>
        <a-radio-button value="c">监管者</a-radio-button>
        <a-radio-button value="d">其他模式</a-radio-button>
      </a-radio-group>
    </div>
    <div v-if="tab === 'a'">
      <a-card>
        <a-card-grid v-for="map in generalOpMap" style="width: 50%; text-align: center" :hoverable="false">
          {{ map.name }}：
          <a-button @click="openModal(map.op,map.name,obj['control']['op2key'][map.op])">
            {{getNameByCode(obj["control"]["op2key"][map.op])}}
          </a-button>
        </a-card-grid>
      </a-card>
    </div>
    <div v-if="tab === 'b'">
      <div class="marbo5">通用</div>
      <a-card class="marbo5">
        <a-card-grid v-for="map in survivorGeneralOpMap" style="width: 50%; text-align: center" :hoverable="false">
          {{ map.name }}：
          <a-button @click="openModal(map.op,map.name,obj['control']['op2key'][map.op])">
            {{getNameByCode(obj["control"]["op2key"][map.op])}}
          </a-button>
        </a-card-grid>
      </a-card>
      <div class="marbo5">专属</div>
      <div class="marbo5">
        <a-select
            ref="select"
            v-model:value="survivorSelected"
            style="width: 120px"
        >
          <a-select-option v-for="c in survivorOpMap" :value="c.code">{{c.name}}</a-select-option>
        </a-select>
      </div>
      <a-card>
        <a-card-grid v-for="map in survivorOpMap.find(item => item.code == survivorSelected).keys" style="width: 50%; text-align: center" :hoverable="false">
          {{ map.name }}：
          <a-button @click="openModal(map.op,map.name,obj['control']['op2key'][map.op])">
            {{getNameByCode(obj["control"]["op2key"][map.op])}}
          </a-button>
        </a-card-grid>
      </a-card>
    </div>
    <div v-if="tab === 'c'">
      <div class="marbo5">通用</div>
      <a-card class="marbo5">
        <a-card-grid v-for="map in hunterGeneralOpMap" style="width: 50%; text-align: center" :hoverable="false">
          {{ map.name }}：
          <a-button @click="openModal(map.op,map.name,obj['control']['op2key'][map.op])">
            {{getNameByCode(obj["control"]["op2key"][map.op])}}
          </a-button>
        </a-card-grid>
      </a-card>
      <div class="marbo5">专属</div>
      <div class="marbo5">
        <a-select
            ref="select"
            v-model:value="hunterSelected"
            style="width: 120px"
        >
          <a-select-option v-for="c in hunterOpMap" :value="c.code">{{c.name}}</a-select-option>
        </a-select>
      </div>
      <a-card>
        <a-card-grid style="width: 50%; text-align: center" :hoverable="false">
          使用技能1：
          <a-button @click="openModal(`105_${hunterSelected}`,'使用技能1',obj['control']['op2key']['105'][hunterSelected])">
            {{getNameByCode(obj["control"]["op2key"]['105'][hunterSelected])}}
          </a-button>
        </a-card-grid>
        <a-card-grid style="width: 50%; text-align: center" :hoverable="false">
          使用技能2：
          <a-button @click="openModal(`106_${hunterSelected}`,'使用技能2',obj['control']['op2key']['106'][hunterSelected])">
            {{getNameByCode(obj["control"]["op2key"]['106'][hunterSelected])}}
          </a-button>
        </a-card-grid>
        <a-card-grid v-for="map in hunterOpMap.find(item => item.code == hunterSelected).keys" style="width: 50%; text-align: center" :hoverable="false">
          {{ map.name }}：
          <a-button @click="openModal(map.op,map.name,obj['control']['op2key'][map.op])">
            {{getNameByCode(obj["control"]["op2key"][map.op])}}
          </a-button>
        </a-card-grid>
      </a-card>
    </div>
    <div v-if="tab === 'd'">
      <div class="marbo5">娱乐玩法通用</div>
      <a-card class="marbo5">
        <a-card-grid v-for="map in otherGeneralOpMap" style="width: 50%; text-align: center" :hoverable="false">
          {{ map.name }}：
          <a-button @click="openModal(map.op,map.name,obj['control']['op2key'][map.op])">
            {{getNameByCode(obj["control"]["op2key"][map.op])}}
          </a-button>
        </a-card-grid>
      </a-card>
      <div class="marbo5">专属</div>
      <div class="marbo5">
        <a-select
            ref="select"
            v-model:value="modeSelected"
            style="width: 120px"
        >
          <a-select-option v-for="c in modeOpMap" :value="c.code">{{c.name}}</a-select-option>
        </a-select>
      </div>
      <a-card>
        <a-card-grid v-for="map in modeOpMap.find(item => item.code == modeSelected).keys" style="width: 50%; text-align: center" :hoverable="false">
          {{ map.name }}：
          <a-button @click="openModal(map.op,map.name,obj['control']['op2key'][map.op])">
            {{getNameByCode(obj["control"]["op2key"][map.op])}}
          </a-button>
        </a-card-grid>
      </a-card>
    </div>
  </div>
  <a-modal v-model:open="open" :title="singleName">
    <a-button v-for="key in keys" @click="changeSingleKey(key.code, key.name)">
      {{ key.name }}
    </a-button>
    <template #footer>
      <a-button @click="clearKey()">清空按键</a-button>
      <a-button type="primary" @click="open=false">关闭</a-button>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import opMap from "../assets/opMap.json"
import keyMap from "../assets/keyMap.json"

const tab = ref("")
const generalOpMap = opMap.general;
const survivorGeneralOpMap = opMap.survivor.general;
const survivorOpMap = opMap.survivor.character;
const survivorSelected = ref(127)
const hunterGeneralOpMap = opMap.hunter.general;
const hunterOpMap = opMap.hunter.character;
const hunterSelected = ref(75)
const otherGeneralOpMap = opMap.other.general;
const modeOpMap = opMap.other.mode
const modeSelected = ref(20)
const keys = keyMap.keys;
const props = defineProps(['obj'])
//读取到的按键文件
const obj = computed(() => props.obj)

//更改按键对话框打开状态
const open = ref(false);
//更改按键中的事件名
const singleName = ref<string>();
//更改按键中的事件代码
const singleOp = ref()
//更改按键中，原本的按键值
const originKey = ref()

const openModal = (op, name, key) => {
  open.value = true
  singleName.value = name
  singleOp.value = op
  originKey.value = key
}

const changeSingleKey = (code, name) => {
  //更改op2key
  //判断是否为使用技能12，是则特殊处理
  const parts = String(singleOp.value).split("_")
  if (parts.length === 2){
    obj.value['control']['op2key'][parts[0]][parts[1]] = code
  }else{
    obj.value['control']['op2key'][singleOp.value] = code
  }
  //更改key2op_list
  //移除原本的列表中的值
  const key = formatComma(String(originKey.value))
  const array1 = obj.value['control']['key2op_lst'][String(key)]
  const index = array1.indexOf(singleOp.value)
  if (index !== -1) {
    array1.splice(index, 1);
  }
  //在更改按键的列表中增加值
  let array2 = obj.value['control']['key2op_lst'][String(code)]
  //如果原先没有这个列表，则新增
  if (array2 === undefined) {
    obj.value['control']['key2op_lst'][String(code)] = []
    array2 = obj.value['control']['key2op_lst'][String(code)]
  }
  array2.push(singleOp.value)
  open.value = false
}

//清空按键
const clearKey = () => {
  //更改key2op_list
  //移除原本的列表中的值
  const key = formatComma(String(originKey.value))
  const array1 = obj.value['control']['key2op_lst'][String(key)]
  const index = array1.indexOf(singleOp.value)
  if (index !== -1) {
    array1.splice(index, 1);
  }
  //更改op2key
  //判断是否为使用技能12，是则特殊处理
  const parts = String(singleOp.value).split("_")
  if (parts.length === 2){
    obj.value['control']['op2key'][parts[0]][parts[1]] = ''
  }else{
    obj.value['control']['op2key'][singleOp.value] = ''
  }
  open.value = false
}

const getNameByCode = (code) => {
  if (code == ""){
    return '空'
  }
  const found = keyMap.keys.find(item=>item.code === code)
  return found ? found.name : '未知按键或组合键'
}

const formatComma = (input: string) => {
  const parts = input.split(',');
  return parts.length === 2 ? `(${parts[0]}, ${parts[1]})` : input;
}

</script>

<style scoped>
#editor {
  margin-top: 16px;
}
.marbo {
  margin-bottom: 16px;
}
.marbo5 {
  margin-bottom: 5px;
}
</style>