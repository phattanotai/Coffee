<template>
  <div class="CustomPagination">
    <paginate :ref="name" :name="name" tag="div" :list="items" :per="perPage">
      <table class="table" :class="tableClass">
        <slot name="table-head"></slot>
        <slot name="table-body"></slot>
      </table>
    </paginate>
    <vs-pagination
      :total="pageCount"
      :max="max"
      v-model="currentPage"
      prev-icon="arrow_back"
      next-icon="arrow_forward"
      @change="changePage"
    ></vs-pagination>
  </div>
</template>

<script>
export default {
  name: "CustomPagination",
  props: {
    tableClass: "",
    value: [],
    perPage: {
      type: Number,
      default: 5,
      required: false,
    },
    limit: {
      type: Number,
      default: 2,
      required: false,
    },
    name: {
      type: String,
      default: "paginate-items",
      required: false,
    },

    pageTotal: {
      type: Number,
      required: false,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      default: 7,
      required: false,
    },
  },
  data() {
    return {
      paginate: [this.name],
      listPage: undefined,
      currentPage: 1,
    };
  },
  mounted() {},
  computed: {
    items: {
      get() {
        this.$emit("setPaginate", this.paginate);
        return this.value;
      },
    },
  },
  methods: {
    changePage() {
      this.$emit("changePage", this.currentPage);
    },
  },
  watch: {
    items: function () {
      this.$emit("setPaginate", this.paginate);
      if (this.$refs[this.name] && this.listPage !== undefined) {
        if (this.value.length > 0) {
          if (this.paginate[this.name].list.length <= 0) {
            setTimeout(() => {
              this.$refs[this.name].goToPage(1);
            }, 100);
          }
        }
      } else {
        this.listPage = this.paginate[this.name].list.length;
      }
    },
  },
};
</script>
<style>
.CustomPagination .vs-pagination--li {
  width: 20px !important;
  height: 19px !important;
}

.CustomPagination .vs-pagination--buttons {
  width: 20px !important;
  height: 19px !important;
}

.CustomPagination .vs-pagination--ul {
  margin-bottom: 0px !important;
}
</style>
