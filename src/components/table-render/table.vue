<template>
  <table>
    <thead>
      <tr>
        <th v-for="(col, index) in columns" :key="index">{{ col.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="rowIndex">
        <td v-for="(column, colIndex) in columns" :key="colIndex">
          <template v-if="'render' in column">
            <render
              :row="row"
              :column="column"
              :rowIndex="rowIndex"
              :render="column.render"
            />
          </template>
          <template v-else>{{ row[column.key] }}</template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Render from './render.vue'

export default {
  name: 'tableRenderComponent',

  components: {
    Render
  },

  props: {
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>
  table{
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #e9e9e9;
  }
  table th{
    background: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
    white-space: nowrap;
  }
  table td, table th{
    padding: 8px 16px;
    border: 1px solid #e9e9e9;
    text-align: left;
  }
</style>
