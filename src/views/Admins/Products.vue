<template>
  <div>
    <table id="table">
      <thead>
        <tr>
          <th v-for="(header, i) in headers" :key="i">{{ header.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(admin, i) in productList"
          :key="i"
          @click="$router.push(`/product/${admin.id}`)"
        >
        <td>{{ i + 1 }}</td>
          <td>{{ admin.name }}</td>
          <td>{{ admin.company_name }}</td>
          <td>{{ admin.category_name }}</td>
          <td style="padding-left: 40px !important" >{{ Number(admin.price).toLocaleString("de-DE") }} {{ $t('sum') }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { title: "№" },
        { title: "Название" },
        { title: "Завод" },
        { title: "Категория" },
        { title: "Цена" },
      ],
      id: 1,
    };
  },
  computed: {
    productList() {
      return this.$store.state.addUser.products;
    },
  },
  created() {
    this.$store.dispatch("addUser/fetchProducts", this.id );
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
#table {
  width: 100%;
}
</style>
