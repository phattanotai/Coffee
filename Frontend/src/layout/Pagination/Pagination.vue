<template>
  <div>
    <paginate ref="paginator" class="flex-container" name="items" :list="data">
    </paginate>
    <div class="pagination-row">
      <button
        class="pagination-button"
        :disabled="pageChangeNumber <= 1"
        @click="changePageNumber(pageNumber - 1)"
      >
        Prev
      </button>
      <span v-for="(item, index) in new Array(numberPages)" :key="index">
        <button
          :class="[
            'pagination-button',
            pageChangeNumber == index + 1 ? 'active' : '',
          ]"
          @click="changePageNumber(index + 1)"
        >
          {{ index + 1 }}
        </button>
      </span>
      <button
        class="pagination-button"
        :disabled="pageChangeNumber >= numberPages"
        @click="changePageNumber(pageNumber + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "meta", "changePageNumber", "pageChangeNumber"],
  data() {
    return {
      items: [],
      paginate: ["items"],
      pageNumber: 1,
      perPage: 25,
      totalItems: 0,
      page: 1,
      pageCount: 0,
    };
  },
  computed: {
    numberPages() {
      return Math.ceil(this.totalItems / this.perPage);
    },
    paginatedItems() {
      if (this.items) {
        let end = this.perPage * this.pageNumber;
        return this.items.slice(end - this.perPage, end);
      }
    },
  },
  methods: {
    changePerPage(newPerPage) {
      this.perPage = newPerPage;
      let newNumberPages = Math.ceil(this.totalItems / newPerPage);
      if (newNumberPages <= this.pageNumber) {
        this.pageNumber = newNumberPages;
      }
    },
  },
  mounted() {
    this.items = this.data;
    this.totalItems = this.meta.pagination.total;
    this.pageNumber = this.meta.pagination.page;
    this.pageCount = this.meta.pagination.pageCount;
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
ul.flex-container {
  padding: 0;
  margin: 0;
  list-style-type: none;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row wrap;
  flex-direction: row wrap;
  flex-wrap: wrap;
  justify-content: space-around;
}
li img {
  display: initial;
  height: 100px;
}
.flex-item {
  background: tomato;
  width: calc(100% / 3.5);
  padding: 5px;
  height: auto;
  margin-top: 10px;
  color: white;
  font-weight: bold;
  text-align: center;
}
.pagination-button {
  background: transparent;
  padding: 5px;
  border-radius: 5px;
  margin: 5px;
  outline: none;
  border: none;
  width: auto;
  height: 30px;
}
.active {
  border: 1px solid #63b3ed;
}
.downloads {
  margin-top: 10px;
}
ul.paginate-links.items li {
  display: inline-block;
  margin: 5px;
}
ul.paginate-links.items a {
  cursor: pointer;
}
ul.paginate-links.items li.active a {
  font-weight: bold;
}
ul.paginate-links.items li.next:before {
  content: " | ";
  margin-right: 13px;
  color: #ddd;
}
ul.paginate-links.items li.disabled a {
  color: #ccc;
  cursor: no-drop;
}
</style>
