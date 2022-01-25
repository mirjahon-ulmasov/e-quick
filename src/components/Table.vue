<template>
    <div>
<table id="table">
  <thead>
    <tr>
    <th v-for="(item, i) in header" :key="i" >{{ item.title }}</th>
    </tr>
  </thead>
<tbody>
   <tr>
    <td v-for="(item, i) in items" :key="i" >{{ item.title }}</td>
  </tr>
</tbody>
</table>
    </div>
</template>
<script>
export default {
    props: ['header', 'items']
}
</script>
