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
<style lang="scss" scoped>
#table{
    min-width: 400px;
border-collapse:collapse;
   thead{
height: 56px;

background: #EDF2FD;
   -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
position: relative;
 width: 100%;
tr{
    border-radius: 6px;
    th{
font-family: Montserrat;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
padding: 20px 30px;
align-items: center;
letter-spacing: 0.03em;

/* Main */

color: #4679EC;
}
}
   }
   tbody{
       width: 100%;
       background: #FAFBFE;
border-radius: 6px;
padding-top: 20px;
tr{
    cursor: pointer;
    td{
        border: none;
            padding: 20px 30px;
        font-family: Montserrat;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
/* identical to box height */


color: #464E5F;
    }
}
   }
}
</style>