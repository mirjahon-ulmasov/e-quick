<template>
    <div>
        <table id="table">
  <thead>
    <tr>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
    </tr>
  </thead>
<tbody>
      <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
  <tr>
    <td>Ernst Handel</td>
    <td>Roland Mendel</td>
    <td>Austria</td>
  </tr>
  <tr>
    <td>Island Trading</td>
    <td>Helen Bennett</td>
    <td>UK</td>
  </tr>
  <tr>
    <td>Laughing Bacchus Winecellars</td>
    <td>Yoshi Tannamuri</td>
    <td>Canada</td>
  </tr>
  <tr>
    <td>Magazzini Alimentari Riuniti</td>
    <td>Giovanni Rovelli</td>
    <td>Italy</td>
  </tr>
</tbody>
</table>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
#table{
    min-width: 400px;
border-collapse:collapse;
   thead{
height: 56px;

background: #EDF2FD;
border-radius: 6px;
//  display: flex;
//  justify-content: space-between;
position: relative;
 width: 100%;
tr{
    th{
font-family: Montserrat;
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 17px;
padding: 10px 15px;
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
tr{
    cursor: pointer;
    td{
        border: none;
            padding: 10px 15px;
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