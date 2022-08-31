<template>
  <div>
    <Navbar navbar-page="Sort management" />
    <div id="Sortmanagement" class="container-fluid py-4">
      <div class="row">
        <div class="col-12">
          <div class="card shadow">
            <div
              class="card-header card-header-card d-flex align-items-center bg-gray-90"
            >
              <div class="w-50">
                <h5 class="mb-0">Sort management / เรียงลำดับค่ายเกม</h5>
              </div>
              <div
                class="w-50 d-flex align-items-center justify-content-end btn-setting"
              >
                <vs-button class="me-2" color="#146EFF" @click="onSaveData"
                  ><span class="material-icons"> save </span> Save
                </vs-button>
                <vs-button
                  color="#ADADAD"
                  @click="
                    () => {
                      this.items = this.oldItems;
                    }
                  "
                  ><span class="material-icons">highlight_off</span>Cancel
                </vs-button>
              </div>
            </div>
            <div class="card-body card--scroll">
              <Listcomponent @onSortData="onEditData" v-model="items" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Listcomponent from "@/views/Management/List";
import Navbar from "@/layout/Navbar";
import alertService from "../../service/alertService";
import notifyService from "../../service/notifyService";
import dayjs from "dayjs";

export default {
  name: "Sortmanagement",
  components: {
    Navbar,
    Listcomponent,
  },
  data() {
    return {
      items: [],
      oldItems: [],
    };
  },
  methods: {
    onEditData(data) {
      this.items = data;
    },
    async onSaveData() {
      try {
        const dataUpdate = [];
        this.items.forEach((e) => {
          dataUpdate.push({
            logo: e.img,
            title: e.game,
          });
        });
        if (
          dataUpdate.length &&
          JSON.stringify(this.items) !== JSON.stringify(this.oldItems)
        ) {
          this.openLoading();
          await sortManageService
            .updateSortManagement({
              data: {
                gamelist: dataUpdate,
              },
            })
            .then((res) => {
              if (res.data) {
                notifyService.Success(`Update Success !!
                 At :  ${dayjs(
                   res.data.attributes.updatedAt,
                   "YYYY MMMM DD HH:mm:ss",
                   true
                 )}
              `);
                this.oldItems = this.items;
              }
              this.closeLoading();
            })
            .catch((error) => {
              throw error;
            });
        } else {
          notifyService.warning("ไม่มีข้อมูลที่เปลี่ยนแปลง !!");
        }
      } catch (error) {
        this.closeLoading();
        alertService.error(error.message);
      }
    },
    async fetchData() {
      try {
        this.closeLoading();
      } catch (error) {
        this.closeLoading();
        alertService.error(error.message);
      }
    },
    openLoading() {
      this.$vs.loading({
        type: "default",
      });
    },
    closeLoading() {
      this.$vs.loading.close();
    },
  },
  mounted() {
    // this.openLoading();
    // this.fetchData();
  },
};
</script>
