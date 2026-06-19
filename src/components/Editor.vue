<template>
  <div id="editor">
    <div v-if="obj['control']" class="marbo">
      <a-radio-group v-model:value="tab">
        <a-radio-button value="a">通用</a-radio-button>
        <a-radio-button value="b">求生者</a-radio-button>
        <a-radio-button value="c">监管者</a-radio-button>
        <a-radio-button value="e">加页手记</a-radio-button>
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
    <div v-if="tab === 'e'">
      <div class="marbo5">通用</div>
      <a-card class="marbo5">
        <a-card-grid v-for="map in ccGeneralOpMap" style="width: 50%; text-align: center" :hoverable="false">
          {{ map.name }}：
          <a-button @click="openCCModal(map.op, map.name)">
            {{ getCCKeyName(map.op) }}
          </a-button>
        </a-card-grid>
      </a-card>
      <div class="marbo5">求生者</div>
      <a-card class="marbo5">
        <a-card-grid v-for="map in ccSurvivorOpMap" style="width: 50%; text-align: center" :hoverable="false">
          {{ map.name }}：
          <a-button @click="openCCModal(map.op, map.name)">
            {{ getCCKeyName(map.op) }}
          </a-button>
        </a-card-grid>
      </a-card>
      <div class="marbo5">监管者</div>
      <a-card class="marbo5">
        <a-card-grid v-for="map in ccHunterOpMap" style="width: 50%; text-align: center" :hoverable="false">
          {{ map.name }}：
          <a-button @click="openCCModal(map.op, map.name)">
            {{ getCCKeyName(map.op) }}
          </a-button>
        </a-card-grid>
      </a-card>
      <div class="marbo5">未知</div>
      <a-card class="marbo5">
        <a-card-grid v-for="map in ccUnknownOpMap" style="width: 50%; text-align: center" :hoverable="false">
          {{ map.name }}：
          <a-button @click="openCCModal(map.op, map.name)">
            {{ getCCKeyName(map.op) }}
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
    <a-button v-for="key in keys" @click="isCC ? changeCCSingleKey(key.code, key.name) : changeSingleKey(key.code, key.name)">
      {{ key.name }}
    </a-button>
    <template #footer>
      <a-button @click="isCC ? clearCCKey() : clearKey()">清空按键</a-button>
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

// ==================== CC（加页手记）相关代码 ====================

// CC各分区操作映射
const ccGeneralOpMap = opMap.cc.general;
const ccSurvivorOpMap = opMap.cc.survivor;
const ccHunterOpMap = opMap.cc.hunter;
const ccUnknownOpMap = opMap.cc.unknown;

// CC所有操作码的集合（用于判断当前是否为CC模式）
const ccOpSet = new Set([
  ...ccGeneralOpMap.map(m => m.op),
  ...ccSurvivorOpMap.map(m => m.op),
  ...ccHunterOpMap.map(m => m.op),
  ...ccUnknownOpMap.map(m => m.op),
]);

// 是否为CC模式（通过singleOp是否属于CC操作码判断）
const isCC = computed(() => ccOpSet.has(singleOp.value));

// 获取CC操作码当前的按键代码
// 依次查找 cc_keyboard_mapping、cc_mouse_mapping、cc_unmapped_actions
const getCCKeyByOp = (op: string) => {
  const kbMapping = obj.value['control']['cc_keyboard_mapping'];
  if (kbMapping && kbMapping[op] !== undefined) {
    return kbMapping[op];
  }
  const mouseMapping = obj.value['control']['cc_mouse_mapping'];
  if (mouseMapping && mouseMapping[op] !== undefined) {
    return mouseMapping[op];
  }
  return '';
};

// 获取CC操作码对应的按键显示名称
const getCCKeyName = (op: string) => {
  const code = getCCKeyByOp(op);
  if (code === '') {
    const unmapped = obj.value['control']['cc_unmapped_actions'];
    if (unmapped && unmapped.includes(op)) {
      return '空';
    }
    return '空';
  }
  return getNameByCode(code);
};

// 打开CC按键修改对话框
const openCCModal = (op: string, name: string) => {
  open.value = true;
  singleName.value = name;
  singleOp.value = op;
  originKey.value = getCCKeyByOp(op);
};

// 将指定操作码从 cc_keyboard_mapping、cc_mouse_mapping、cc_unmapped_actions 中移除
const removeCCKey = (op: string) => {
  const kbMapping = obj.value['control']['cc_keyboard_mapping'];
  const mouseMapping = obj.value['control']['cc_mouse_mapping'];
  const unmapped = obj.value['control']['cc_unmapped_actions'];

  if (kbMapping && kbMapping[op] !== undefined) {
    delete kbMapping[op];
  }
  if (mouseMapping && mouseMapping[op] !== undefined) {
    delete mouseMapping[op];
  }
  if (unmapped) {
    const idx = unmapped.indexOf(op);
    if (idx !== -1) {
      unmapped.splice(idx, 1);
    }
  }
};

// CC模式：修改单个按键
const changeCCSingleKey = (code: number, name: string) => {
  // 先将操作码从三处移除
  removeCCKey(singleOp.value);

  // 鼠标按键（1/2/4/5/6）放入 cc_mouse_mapping，其他放入 cc_keyboard_mapping
  if (code === 1 || code === 2 || code === 4 || code === 5 || code === 6) {
    if (!obj.value['control']['cc_mouse_mapping']) {
      obj.value['control']['cc_mouse_mapping'] = {};
    }
    obj.value['control']['cc_mouse_mapping'][singleOp.value] = code;
  } else {
    if (!obj.value['control']['cc_keyboard_mapping']) {
      obj.value['control']['cc_keyboard_mapping'] = {};
    }
    obj.value['control']['cc_keyboard_mapping'][singleOp.value] = code;
  }

  open.value = false;
};

// CC模式：清空按键（将操作码放入 cc_unmapped_actions）
const clearCCKey = () => {
  // 先将操作码从三处移除
  removeCCKey(singleOp.value);

  // 放入未映射列表
  if (!obj.value['control']['cc_unmapped_actions']) {
    obj.value['control']['cc_unmapped_actions'] = [];
  }
  obj.value['control']['cc_unmapped_actions'].push(singleOp.value);

  open.value = false;
};

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