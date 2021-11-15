<template>
  <div class="center">
      <vs-table
            multiple v-model="selected"
              ref="table"
              pagination
              :max-items="itemsPerPage"
              search
              :data="company"
            >
              <template slot="thead">
                <vs-th sort-key="name">Заявка</vs-th>
                <vs-th sort-key="Наименование_онлайн_савдо">Завод</vs-th>
                <vs-th sort-key="Завод">Продукт</vs-th>
                <vs-th sort-key="Баланс">Дата</vs-th>
                <vs-th sort-key="Категория">Статус</vs-th>
                <vs-th sort-key="Категория">Сумма(в сум)</vs-th>
                <vs-th sort-key="Категория">Дата (доставки)</vs-th>
                <vs-th sort-key="Категория">Действие</vs-th>
              </template>

              <template slot-scope="{ data }" class="scr">
                <tbody>
                  <vs-tr
                    :data="tr"
                    :key="indextr"
                    v-for="(tr, indextr) in data"
                  >
                    <vs-td>
                        <p>{{ tr.name }}</p>
                    </vs-td>

                    <vs-td>
                      <p>{{ tr.username }}</p>
                    </vs-td>

                    <vs-td>
                      <p>
                        {{ tr.email }}
                      </p>
                    </vs-td>
                    <vs-td>
                      <p>
                        {{ tr.website }}
                      </p>
                    </vs-td>
                    <vs-td>
                        <vs-chip class="status">
                          <span style="font-size: 11px; color: #ffffff">
                            Ожидается
                          </span>
                        </vs-chip>
                    </vs-td>
                    <vs-td>
                      {{ tr.ok }}
                    </vs-td>
                    <vs-td>
                      {{ tr.data }}
                    </vs-td>
                    <vs-td>
                      <span style="color: #31B778"  class="material-icons">phone</span>  
                    </vs-td>
                  </vs-tr>
                </tbody>
              </template>
        </vs-table>
  </div>
</template>
<script>
export default {
  data: () => ({
    editActive: false,
    edit: null,
    editProp: {},
    search: "",
    allCheck: false,
    page: 1,
    max: 5,
    active: 0,
    itemsPerPage: 4,
    selected: [],
    company: [
      {
        id: 1,
        name: "№ 353",
        username: "BENKAM",
        email: "Aldox",
        website: "17.04.2021",
        ok: "1млн",
        data: "20.04.2021",
      },
    ],
  }),
};
</script>
<style lang="scss">
.status {
  background: #ea5455 !important;
}
.center {
  .vs-con-table {
    .vs-table {
      th.td-check {
        .con-td-check {
          box-shadow: none !important;
        }
      }
      th {
        padding: 12px 0px;
        padding-left: 20px;
        padding-right: 0px;
        .vs-table-text {
          font-family: Inter;
          font-style: normal;
          font-weight: 500;
          font-size: 12.2335px;
          line-height: 140%;
          letter-spacing: -0.262146px;

          /* Body */
          color: #767676;
        }
      }

      tr {
        td {
          padding: 20px;
          padding-left: 0px !important ;
          font-family: Inter;
          font-style: normal;
          font-weight: 500;
          font-size: 10.4858px !important;
          line-height: 140%;
          text-align: center;
          letter-spacing: -0.262146px;
          color: #767676;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
        }
        td.td-check {
          padding: 20px !important;
        }
      }
    }
  }
}
</style>