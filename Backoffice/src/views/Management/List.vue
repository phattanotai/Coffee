<template>
  <div id="listgamemanagement">
    <div class="row px-4 d-flex justify-content-center card--scroll">
      <div class="col-6">
        <!-- <div class="row" v-sortable="{ onUpdate }"> -->
        <div>
          <draggable v-model="items" class="row" @end="endUpdate">
            <div
              v-for="(data, index) in items"
              :key="index"
              class="col-3 mb-4 sortable"
              :data-id="data.game"
            >
              <div
                class="card--logo d-flex align-items-center justify-content-center"
              >
                <img
                  :src="require(`@/assets/images/Logo_camp/` + data.img)"
                  :alt="data.game"
                  class="w-75"
                />
              </div>
              <div class="small text-center text-black w-100">
                {{ data.game }}
              </div>
            </div>
          </draggable>
        </div>
      </div>
      <ul style="list-style-type: auto">
        <li v-for="(i, index) in items" :key="index">{{ i.game }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "listgamemanagement",
  components: {
    draggable,
  },
  props: {
    value: [],
  },
  methods: {
    onUpdate(event) {
      this.items.splice(
        event.newIndex,
        0,
        this.items.splice(event.oldIndex, 1)[0]
      );
    },
    endUpdate(event) {
      this.$emit("onSortData", this.items);
    },
  },
  computed: {
    items: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
};
</script>
<style>
.sortable {
  cursor: move;
}
.sortable:hover {
  cursor: move;
}
</style>
