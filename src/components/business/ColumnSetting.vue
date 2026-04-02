<template>
	<div>

		<n-popover placement="bottom" trigger="click">
		  <template #trigger>
		    <!-- <n-button size="small" type="primary"> -->
				<n-button quaternary circle>
					<icon-ant-design-setting-outlined class="text-16px" />
				</n-button>

		    <!-- </n-button> -->
		  </template>
		  <div class="w-220px">
		    <vue-draggable v-model="list" item-key="key">
		      <template #item="{ element }">
		        <div v-if="element.key&&!element.fixed" class="flex-y-center h-36px px-12px hover:bg-primary_active">

							<icon-mdi-drag class="mr-8px text-20px cursor-move" />
		          <n-checkbox v-model:checked="element.checked">
		            {{ element.setTitle || element.title }}

		          </n-checkbox>
		        </div>
		      </template>
		    </vue-draggable>

		  </div>
		</n-popover>
	</div>

</template>

<script setup lang="ts">
import { ref, watch, nextTick, onActivated } from 'vue';
import type { DataTableColumn } from 'naive-ui';
import VueDraggable from 'vuedraggable';
import { useRoute } from 'vue-router'

type Column = DataTableColumn<UserManagement.User>;

interface Props {
  columns: Column[];
}

const props = defineProps<Props>();

interface Emits {
  (e: 'update', columns: Column[]): void;
}

const route = useRoute()
const routeName = route.name
const emit = defineEmits<Emits>();

type List = Column & { checked?: boolean };

const list = ref(initList());

function initList(): List[] {
  return props.columns.map(item => ({ ...item, checked: true}));
}
function setLocalColumns(list) {
	const List = []
	list.forEach((item,index) => {
		if (item.key) {
			List.push({key:item.key,index,checked:item.checked})
		}
	})
	localStorage.setItem(routeName,JSON.stringify(List))
}
nextTick(() => {
	const routeList = JSON.parse(localStorage.getItem(routeName))
	if (!routeList || routeList.length == 0) {
		return
	}
	let nowList = [...list.value]
	let newList = []
	routeList.forEach((item,index) => {
		let reRouteIndex = nowList.findIndex(Item => {
			return Item.key == item.key
		})
		if (reRouteIndex || reRouteIndex === 0) {
			newList[item.index] = nowList[reRouteIndex]
			// newList[item.index].checked = item.checked
			nowList.splice(reRouteIndex,1)
		}
	})
	newList = newList.filter(Boolean)
	list.value = [...nowList,...newList]
})
watch(
  list,
  newValue => {
    const newColumns = newValue.filter(item => item.checked);
		setLocalColumns(newValue)
    const columns: Column[] = newColumns.map(item => {
      const column = { ...item };

      return column;
    }) as Column[];
    // console.log('columns-------------------------------',columns)
    emit('update', columns);
  },
  { deep: true }
);
onActivated(()=>{
  const newColumns = list.value.filter(item => item.checked);
  setLocalColumns(list.value)
    const columns: Column[] = newColumns.map(item => {
      const column = { ...item };
      delete column.checked;
      return column;
    }) as Column[];
    console.log('columns---1111111----------------------------',columns)
    emit('update', columns);
})
</script>

<style scoped></style>
