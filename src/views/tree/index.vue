<template>
  <div class="container">
    <z-tree :data="data" :showCheckbox="true" />
  </div>
</template>

<script>
import zTree from '@/components/tree/tree'

export default {
  components: {
    zTree
  },

  data () {
    return {
      data: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1'
                },
                {
                  title: 'leaf 1-1-2'
                }
              ]
            },
            {
              title: 'parent 1-2',
              children: [
                {
                  title: 'leaf 1-2-1'
                },
                {
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}

</script>

<style lang="less" scoped>

.container {

}

</style>
