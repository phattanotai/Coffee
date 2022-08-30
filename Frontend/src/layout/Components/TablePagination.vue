<template>
  <div>
    <paginate :ref="name" :name="name" tag="div" :list="items" :per="perPage">
      <table class="table">
        <slot name="table-head"></slot>
        <slot name="table-body"></slot>
      </table>
    </paginate>
    <paginate-links
      :for="name"
      class="pagination justify-content-center"
      :limit="limit"
      :async="true"
      :show-step-links="true"
      :step-links="{
        next: '>',
        prev: '<',
      }"
      :classes="{
        'ul.paginate-links > li': 'page-item',
        'ul.paginate-links > li > a': 'page-link',
      }"
    >
    </paginate-links>
  </div>
</template>

<script>
export default {
  name: "TablePagination",
  props: {
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
  },
  data() {
    return {
      paginate: [this.name],
      listPage: undefined,
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
